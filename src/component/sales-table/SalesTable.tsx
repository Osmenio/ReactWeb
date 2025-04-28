import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Dropdown, Input, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './SalesTable.scss';
import { ListProductsMock } from '../../mock/product.mock';
import { ItemSaleModel } from '../../models/item-sale.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { PaymentTypeEnum } from '../../models';
import { decimalFormat } from '../../utils/format-utils';


interface ItemSale extends ItemSaleModel {
  idx: number;
  discountStr?: string;
}

interface SalesTableProps {
  numLine?: number;
  paymentType?: PaymentTypeEnum;
  // items: ItemSale[];
  onChangeItems?: () => void;
  // listProduct: ItemSale[];
  // setListProduct: React.Dispatch<React.SetStateAction<ItemSale[]>>;
}

// const SalesTable = ({
//   numLine,
//   paymentType,
//   // items,
//   onChangeItems = () => { },
//   // listProduct,
//   // setListProduct,
// }: SalesTableProps) => {

// const SalesTable = forwardRef((props, ref) => {
const SalesTable = forwardRef((props: SalesTableProps, ref) => {
  const {
    numLine,
    paymentType,
    onChangeItems = () => { },
  } = props;


  // const [listProduct, setListProduct] = useState<ItemSale[]>(items);
  const [listProduct, setListProduct] = useState<ItemSale[]>([]);
  const [total, setTotal] = useState<number>(0);

  // console.log(`handleCountLine.end:${countLine}`)

  useImperativeHandle(ref, () => ({
    clearList() {
      setListProduct([]); // ou qualquer lógica de limpar
    }
  }));


  const handleCountItem = useCallback((idx: number, value: number) => {
    setListProduct(prev => {
      const newList = [...prev];
      const item = newList.find(p => p.idx === idx);
      if (item) {
        item.count = value
      } else {
        newList.push({ idx: idx, count: value });
      }
      return newList;
    });
  }, [])

  const handleSelectItem = useCallback((idx: number, value: string) => {
    const selected = ListProductsMock.find(p => p.description === value);
    setListProduct(prev => {
      const newList = [...prev];
      const item = newList.find(p => p.idx === idx);
      if (item) {
        item.product = selected
      } else {
        newList.push({ idx: idx, product: selected });
      }
      return newList;
    });
  }, [])

  const handleRemoveItem = useCallback((idx: number) => {
    setListProduct(prev => {
      const newList = [...prev];
      const item = newList.find(p => p.idx === idx);
      if (item) {
        item.product = undefined
        item.count = undefined
        item.discount = undefined
        item.discountStr = undefined
      }
      return newList;
    });
  }, [])


  // const handleDiscountItem = useCallback((idx: number, value: number) => {
  const handleDiscountItem = useCallback((idx: number, value: string) => {
    setListProduct(prev => {
      const newList = [...prev];
      const item = newList.find(p => p.idx === idx);
      const numeric = parseFloat(value.replace(',', '.'));
      let discount = 0
      if (!isNaN(numeric)) {
        discount = numeric
      }

      if (item) {
        item.discountStr = value
        item.discount = discount
      } else {
        newList.push({ idx: idx, discount: discount, discountStr: value });
      }
      return newList;
    });
  }, [])

  const handleCalculateSubtotal = useCallback((idx: number) => {
    setListProduct(prev => {
      const item = prev.find(p => p.idx === idx);
      if (item) {
        if (item.product) {
          const price = paymentType === PaymentTypeEnum.Credit
            ? item.product.creditPrice
            : item.product.cashPrice;
          item.subtotal = (price - (item.discount ?? 0)) * (item.count ?? 0)
        } else {
          item.subtotal = undefined
        }
      }
      return prev;
    });
  }, [])

  useEffect(() => {
    const result = listProduct.reduce((acc, prev) => {
      return acc + (prev.subtotal ?? 0)
    }, 0)
    setTotal(result)
  }, [listProduct]);

  useEffect(() => {
    setListProduct(prev => {
      const updated = prev.map(item => {
        if (item.product) {
          const price = paymentType === PaymentTypeEnum.Credit
            ? item.product.creditPrice
            : item.product.cashPrice;
          item.subtotal = (price - (item.discount ?? 0)) * (item.count ?? 0)
        }
        // if (item.product) {
        //   const price = paymentType === PaymentTypeEnum.Credit
        //   ? item.product.creditPrice
        //   : item.product.cashPrice;
        //   item.subtotal = (price - (item.discount ?? 0)) * (item.count ?? 0)
        // } else {
        //   item.subtotal = undefined
        // }
        // }

        return item;
      });
      return updated;
    });
  }, [paymentType]);

  const products = ListProductsMock.map(item => ({
    key: item.description,
    value: item.description,
    text: item.description,
  }))

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

            const itemProduct = listProduct.find(p => p.idx === index);
            return (<TableRow
              key={index}
            >
              <TableCell
                textAlign='center'
              >
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
                    handleCalculateSubtotal(index)
                  }}
                ></Input>
              </TableCell>
              <TableCell>

                <div
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Dropdown
                    inline
                    icon={null}
                    fluid
                    search
                    closeOnChange
                    clearable
                    options={products}
                    value={itemProduct?.product?.description ?? ""}
                    onChange={(_, data) => {
                      handleSelectItem(index, String(data.value))
                      handleCalculateSubtotal(index)
                    }}
                  />

                  {itemProduct?.product &&
                    <FontAwesomeIcon
                      className="no_print"
                      icon={faClose}
                      size="lg"
                      onClick={() => {
                        handleRemoveItem(index)
                        handleCalculateSubtotal(index)
                      }}
                    />
                  }
                </div>
              </TableCell>
              <TableCell textAlign='center' >
                {
                  itemProduct?.product && (
                    paymentType === PaymentTypeEnum.Credit
                      ? decimalFormat(itemProduct?.product?.creditPrice)
                      : decimalFormat(itemProduct?.product?.cashPrice)
                  )}

              </TableCell>
              <TableCell textAlign='center' >
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                  value={itemProduct?.discountStr ?? ""}
                  // value={itemProduct?.discount ? itemProduct?.discount.toString().replace('.', ',') : ""}
                  // value={itemProduct?.discount !== undefined
                  //   ? itemProduct.discount.toFixed(2).replace('.', ',')
                  //   : ""}
                  onKeyDown={(event) => {
                    const { key, currentTarget } = event;
                    const value = currentTarget.value;

                    // console.log(`onKeyDown.key:${key}`)
                    // console.log(`onKeyDown.value:${value}`)

                    const isNumber = /^[0-9]$/.test(key);
                    const isComma = key === ',';
                    const hasComma = value.includes(',');
                    const isBackspace = key === 'Backspace';
                    const decimalPart = value.split(',')[1] ?? '';
                    const tooManyDecimals = hasComma && decimalPart.length >= 2;

                    if (!isBackspace && ((!isNumber && !isComma) || (isComma && hasComma) || tooManyDecimals)) {
                      event.preventDefault();
                      // console.log(`preventDefault`)
                      // console.log(`isBackspace:${isBackspace}`)
                      // console.log(`isNumber:${isNumber}`)
                      // console.log(`isComma:${isComma}`)
                      // console.log(`hasComma:${hasComma}`)
                      // console.log(`tooManyDecimals:${tooManyDecimals}`)
                    }
                  }}
                  onChange={(event) => {
                    // const input = event.target.value;
                    handleDiscountItem(index, event.target.value);
                    handleCalculateSubtotal(index);
                  }}
                  // onChange={(event) => {
                  //   const input = event.target.value.replace(',', '.');
                  //   const value = parseFloat(input)
                  //   console.log(`value:${value}`)
                  //   handleDiscountItem(index, value || 0);
                  //   handleCalculateSubtotal(index);
                  // }}
                  onBlur={(event) => {
                    const value = parseFloat(event.target.value.replace(',', '.'));
                    if (!isNaN(value)) {
                      // event.target.value = valor.toFixed(2).replace('.', ',');
                      // handleDiscountItem(index, parseFloat(valor.toFixed(2).replace('.', ',')) || 0);
                      handleDiscountItem(index, value.toFixed(2).replace('.', ','));
                      handleCalculateSubtotal(index);
                    }
                  }}
                ></Input>
              </TableCell>
              <TableCell textAlign='center' >
                {itemProduct?.subtotal && decimalFormat(itemProduct?.subtotal)}
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
                {total > 0 &&
                  <div className="text_total">
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

