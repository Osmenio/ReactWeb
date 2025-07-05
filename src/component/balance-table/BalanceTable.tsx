import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Grid, Input, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './BalanceTable.scss';
import { format } from 'date-fns';
import { PaymentTypeEnum } from '../../models/payment-type.enum';
import { SaleModel } from '../../models';
import { decimalFormat } from '../../utils/format-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const SALESMAN_MOCK = ["Carlos", "Ingrid", "Roberto", "Marcia"]
// const salesmanOptions = Object.entries(SALESMAN_MOCK).map(([key, value]) => ({
//   key: key,
//   text: value,
//   value: value,
// }));

// const paymentOptions = Object.entries(PaymentTypeEnum).map(([key, value]) => ({
//   key: key,
//   text: value,
//   value: value,
// }));

interface BalanceTableProps {
  items?: SaleModel[];
  onChangeClient?: (string) => void;
  onChangeSalesMan?: (string) => void;
  onChangeProduct?: (string) => void;
  onChangeInitialDate?: (string) => void;
  onChangeFinalDate?: (string) => void;
  onChangePaymentType?: (PaymentTypeEnum) => void;
  onSearch?: () => void;
}

const BalanceTable = ({
  items,
  onChangeClient = () => { },
  onChangeSalesMan = () => { },
  onChangeProduct = () => { },
  onChangeInitialDate = () => { },
  onChangeFinalDate = () => { },
  onChangePaymentType = () => { },
  onSearch = () => { },
}: BalanceTableProps) => {

  // const [dateNow] = useState<string>(format(new Date(), 'dd/MM/yyyy'));

  // const handleChangeType = useCallback((type: PaymentTypeEnum) => {
  //   onChangePaymentType(type);
  // }, [paymentType])

  return (
    <div className="bt_table_content">
      <Table
        className="bt_table"
        celled
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              Data
            </TableHeaderCell>
            <TableHeaderCell
              textAlign='center'
              width={1}
            >
              Hora
            </TableHeaderCell>
            <TableHeaderCell
              width={3}
              textAlign='center'
            >
              Cliente
            </TableHeaderCell>
            <TableHeaderCell
              width={2}
              textAlign='center'
            >
              Vendedor
            </TableHeaderCell>
            <TableHeaderCell
              width={3}
              textAlign='center'
            >
              Produto
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              Pgto
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              Qtd
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              <>
                Valor <br /> Compra
              </>
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              <>
                Subtotal <br /> Compra
              </>
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              <>
                Valor <br /> Venda
              </>
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              Desconto
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              <>
                Subtotal <br /> Venda
              </>
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              <>
                Valor <br /> Liq.
              </>
            </TableHeaderCell>
            <TableHeaderCell
              width={1}
              textAlign='center'
            >
              Ações
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items?.map((sale, index) => {
            return sale.itemsSale.map((itemsale, index) => {

              const buySubtotal = (itemsale.count ?? 0) * (itemsale.buyPrice ?? 0)
              const saleSubtotal = (itemsale.count ?? 0) * ((itemsale.unitPrice ?? 0) - (itemsale.discount ?? 0))
              const totalDiff = saleSubtotal - buySubtotal
              return (
                <TableRow>
                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {sale.date}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {sale.time}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='left'
                  >
                    {sale.client}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {sale.saleman}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='left'
                  >
                    {itemsale.product}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {sale.paymentType}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {itemsale.count}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(itemsale.buyPrice ?? 0)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(buySubtotal)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(itemsale.unitPrice ?? 0)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {itemsale.discount}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(saleSubtotal)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(totalDiff)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color='red'
                      onClick={() => { }} />
                  </TableCell>
                </TableRow>
              )
            })
          })}
        </TableBody>

      </Table>
    </div>
  );
};

export { BalanceTable };
