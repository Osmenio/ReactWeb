import React, { useCallback, useRef, useState } from 'react';
import { Button, Dropdown, DropdownItemProps, Input, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './SalesTable.scss';
import { ListProductsMock } from '../../mock/product.mock';
import { ItemSaleModel } from '../../models/item-sale.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faClose } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from '../../models/product.model';


interface SalesTableProps {
  numLine?: Number;
}

interface ItemSale extends ItemSaleModel {
  idx: Number;
}

const SalesTable = ({
  numLine,
  // onClick = () => { },
}: SalesTableProps) => {

  const [listProduct, setListProduct] = useState<ItemSale[]>([]);
  // console.log(`handleCountLine.end:${countLine}`)

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
      }
      return newList;
    });
  }, [])


  const handleDiscountItem = useCallback((idx: number, value: number) => {
    setListProduct(prev => {
      const newList = [...prev];
      const item = newList.find(p => p.idx === idx);
      if (item) {
        item.discount = value
      } else {
        newList.push({ idx: idx, count: value });
      }
      return newList;
    });
  }, [])

  const handleCalculate = useCallback((idx: number) => {
    setListProduct(prev => {
      const item = prev.find(p => p.idx === idx);
      if (item) {
        if (item.product) {
          item.subtototal = (item.product.buyPrice - (item.discount ?? 0)) * (item.count ?? 0)
        } else {
          item.subtototal = undefined
        }
      }
      return prev;
    });
  }, [])


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
              Preço Unit.
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              Desconto
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              Subtotal
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
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    handleCountItem(index, Number(event.target.value.replace(/\D/g, '')))
                    handleCalculate(index)
                  }}
                ></Input>
              </TableCell>
              <TableCell>

                <div
                  //  className="text_total"
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
                      handleCalculate(index)
                    }}
                  />

                  {itemProduct?.product &&
                    <FontAwesomeIcon
                      className="no_print"
                      icon={faClose}
                      size="lg"
                      onClick={() => {
                        handleRemoveItem(index)
                        handleCalculate(index)
                      }}
                    />
                  }
                </div>
              </TableCell>
              <TableCell textAlign='center' >{itemProduct?.product?.buyPrice}</TableCell>
              <TableCell textAlign='center' >
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => {
                    handleDiscountItem(index, Number(event.target.value.replace(/\D/g, '')))
                    handleCalculate(index)
                  }}

                ></Input>
              </TableCell>
              <TableCell textAlign='center' >{itemProduct?.subtototal}</TableCell>
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
                <div className="text_total">
                  R$ 123,45
                </div>
              </div>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* <div className="footer_buttons">
        <Button
          className="button_size"
          onClick={handlePrint}
        >
          Imprimir
        </Button>
      </div> */}

    </div>
  );
};

export { SalesTable };

