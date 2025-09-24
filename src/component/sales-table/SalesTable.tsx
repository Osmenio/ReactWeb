import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Dropdown, Input, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './SalesTable.scss';
import { ItemSaleModel } from '../../models/ItemSaleModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { PaymentTypeEnum, ProductModel, ProductStatusEnum } from '../../models';
import { decimalFormat, decimalFormatMask } from '../../utils/format-utils';
import { DefaultItemSaleModel } from '../../models/DefaultModels';

interface ItemSale extends ItemSaleModel {
  idx: number;
}

interface SalesTableProps {
  paymentType: PaymentTypeEnum;
  products: ProductModel[];
  onChangeItems?: (list: ItemSaleModel[]) => void;
}

const SalesTable = forwardRef((props: SalesTableProps, ref) => {
  const {
    paymentType,
    products,
    onChangeItems = () => { },
  } = props;

  const [numLine, setNumLine] = useState<number>(5);
  const [listItems, setListItems] = useState<ItemSale[]>([]);
  const [total, setTotal] = useState<number>(0);

  const productsOptions = products.map(item => ({
    key: item.description,
    value: item.description,
    text: item.description,
  }));

  useImperativeHandle(ref, () => ({
    clearList() {
      setListItems([]);
      handleCalculateTotals();
    },
    updateNumLines(isAdd: boolean) {
      handleNumLines(isAdd);
    }
  }));

  const handleNumLines = useCallback((isAdd: boolean) => {
    if (isAdd) {
      setNumLine(prev => prev + 1)
    } else {
      const listSize = (listItems.reduce((max, item) => item.idx > max ? item.idx : max, 0) + 1);
      setNumLine(prev => (
        (listSize < prev && prev > 5) ? prev - 1 : prev
      ))
    }
  }, [listItems]);

  const handleCountItem = useCallback((idx: number, value: number) => {
    setListItems(prev => {
      const exists = prev.some(item => item.idx === idx);
      if (exists) {
        return prev.map(item =>
          item.idx === idx
            ? { ...item, count: value }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...DefaultItemSaleModel,
            idx,
            count: value
          }];
      }
    });
  }, []);

  const handleSelectItem = useCallback((idx: number, value: string) => {
    const selected = products.find(p => p.description === value);
    if (selected) {
      setListItems(prev => {
        const exists = prev.some(item => item.idx === idx);
        if (exists) {
          return prev.map(item =>
            item.idx === idx
              ? { ...item, product: selected, buyPrice: selected.buyPrice }
              : item
          );
        } else {
          return [
            ...prev,
            {
              ...DefaultItemSaleModel,
              idx,
              product: selected,
              buyPrice: selected.buyPrice
            }
          ];
        }
      });
    }
  }, [products]);

  const handleRemoveItem = useCallback((idx: number) => {
    setListItems(prev => prev.filter(item => item.idx !== idx));
  }, []);

  const handleDiscountItem = useCallback((idx: number, value: string) => {
    const numeric = parseFloat(value.replace(/\./g, "").replace(",", "."));
    let discount = isNaN(numeric) ? 0 : numeric;

    setListItems(prev => {
      const exists = prev.some(item => item.idx === idx);
      if (exists) {
        return prev.map(item =>
          item.idx === idx
            ? { ...item, discount, discountStr: value }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...DefaultItemSaleModel,
            idx,
            discount,
            discountStr: value
          }
        ];
      }
    });
  }, []);

  const handleOnChangeListProduct = () => {
    const list = listItems
      .filter(item => item.product !== undefined && item.count !== undefined)
      .map(({ idx, ...rest }) => rest);
    onChangeItems(list)
  };

  const handleCalculateTotals = useCallback(() => {
    setListItems(prev => {
      let total = 0
      const updated = prev.map(item => {
        if (!item.product) return item

        let price = 0
        switch (paymentType) {
          case PaymentTypeEnum.Pix:
            price = item.product.priceOne
            break;
          case PaymentTypeEnum.Debit:
            price = item.product.priceTwo
            break;
          default:
            price = item.product.priceThree
        }
        const subtotal = (price - (item.discount ?? 0)) * (item.count ?? 0)
        total += subtotal
        return {
          ...item,
          unitPrice: price,
        };
      })

      setTotal(total);
      return updated;
    });
  }, [paymentType]);

  useEffect(() => {
    handleCalculateTotals()
  }, [paymentType]);

  useEffect(() => {
    handleOnChangeListProduct()
  }, [listItems]);


  return (
    <div>
      <Table
        className="table_print"
        celled
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              className="table_header"
              warning
              width={1}
              textAlign='center'
            >
              Qtd.</TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={3}
            >
              Produto
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>
                Preço Unit.<br />(R$)
              </>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>
                Desconto <br />(R$)
              </>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>
                Subtotal <br /> (R$)
              </>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(numLine)].map((value, index) => {

            const itemProduct = listItems.find(p => p.idx === index);
            const subtotal = ((itemProduct?.unitPrice ?? 0) - (itemProduct?.discount ?? 0)) * (itemProduct?.count ?? 0)
            return (<TableRow
              key={index}
            >
              <TableCell
                className="table_cell_sale"
                textAlign='center'>
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                  value={itemProduct?.count ?? ""}
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    handleCountItem(index, Number(event.target.value.replace(/\D/g, '')))
                    handleCalculateTotals()
                  }}
                ></Input>
              </TableCell>
              <TableCell className="table_cell_sale">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Dropdown
                    inline
                    icon={null}
                    fluid
                    search
                    closeOnChange
                    clearable
                    options={productsOptions}
                    value={itemProduct?.product?.description ?? ""}
                    onChange={(_, data) => {
                      handleSelectItem(index, String(data.value))
                      handleCalculateTotals()
                    }}
                  />

                  {itemProduct?.product &&
                    <FontAwesomeIcon
                      className="no_print"
                      icon={faClose}
                      size="lg"
                      onClick={() => {
                        handleRemoveItem(index)
                        handleCalculateTotals()
                      }}
                    />
                  }
                </div>
              </TableCell>
              <TableCell
                className="table_cell_sale"
                textAlign='center' >
                {itemProduct?.product && itemProduct?.unitPrice && decimalFormat(itemProduct?.unitPrice)}
              </TableCell>
              <TableCell
                className="table_cell_sale"
                textAlign='center' >
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                  value={itemProduct?.discount === undefined ? "" : decimalFormat(itemProduct?.discount ?? 0)}
                  onChange={(event) => {
                    let value = event.target.value.replace(/\D/g, "")
                    handleDiscountItem(index, decimalFormatMask(value));
                    handleCalculateTotals()
                  }}
                />
              </TableCell>
              <TableCell
                className={subtotal > 0 ? "table_cell_sale" : "table_cell_sale table_cell_red"}
                textAlign='center'
              >
                {subtotal != 0 && decimalFormat(subtotal)}
              </TableCell>
            </TableRow>)
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell
              className="table_header"
              textAlign='center'
            >
              <div className="text_total">
                Obs.:
              </div>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              colSpan="100%"
            >
              <Input
                fluid
                transparent
              ></Input>
            </TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell
              className="table_header"
              colSpan="100%"
            >
              <div className="table_total">
                <div className="text_total">
                  Total da compra
                </div>
                {total != 0 &&
                  <div className={total > 0 ? "text_total" : "table_cell_red text_total"}>
                    {`R$ ${decimalFormat(total)}`}
                  </div>
                }
              </div>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});

export { SalesTable };

