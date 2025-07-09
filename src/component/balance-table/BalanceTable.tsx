import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './BalanceTable.scss';
import { decimalFormat } from '../../utils/format-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ItemBalance } from '../../page/balance-page/BalancePage';
import { useEffect, useState } from 'react';

interface BalanceTableProps {
  items: ItemBalance[];
  onDelete?: (ItemBalance) => void;
}

const BalanceTable = ({
  items,
  onDelete = () => { },
}: BalanceTableProps) => {

  const [totalCount, setTotalCount] = useState(0);
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalSubBuy, setTotalSubBuy] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [totaldDiscount, setTotalDiscount] = useState(0);
  const [totalSubSale, setTotalSubSale] = useState(0);
  const [totalDiff, setTotalDiff] = useState(0);

  useEffect(() => {
    let totalCount = 0
    let totalBuy = 0
    let totalSubBuy = 0
    let totalSale = 0
    let totaldDiscount = 0
    let totalSubSale = 0
    // let totalDiff = 0
    items.forEach(item => {
      totalCount += item.count
      totalBuy += item.buyPrice
      totalSubBuy += (item.count * item.buyPrice)
      totalSale += item.unitPrice
      totaldDiscount += item.discount
      // totalSubSale += ((item.unitPrice - item.discount) * item.count)
      totalSubSale += (item.count * (item.unitPrice - item.discount))
    })

    setTotalCount(totalCount)
    setTotalBuy(totalBuy)
    setTotalSubBuy(totalSubBuy)
    setTotalSale(totalSale)
    setTotalDiscount(totaldDiscount)
    setTotalSubSale(totalSubSale)
    setTotalDiff(totalSubSale - totalSubBuy)
  }, [items]);


  return (
    <div className="bt_table_content">
      <Table
        className="bt_table"
        celled
      >

        <TableHeader
        >
          <TableRow
            // className="bt_table_header_resume"
            active
          >
            <TableHeaderCell
              className="bt_table_header_resume"
              colSpan="3"
              textAlign='center'
            // error
            >
              Resumo
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              colSpan="3"
            />
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {totalCount}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totalBuy)}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totalSubBuy)}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totalSale)}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totaldDiscount)}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totalSubSale)}
            </TableHeaderCell>
            <TableHeaderCell
              className="bt_table_header_resume"
              textAlign='center'
            >
              {decimalFormat(totalDiff)}
            </TableHeaderCell>
            <TableHeaderCell className="bt_table_header_resume" />
          </TableRow>
        </TableHeader>

        <TableHeader
        // fullWidth={true}
        >
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
          {
            // listItemBalance?.map((item, index) => {
            items?.map((item, index) => {
              //   return sale.itemsSale.map((itemsale, index) => {

              const buySubtotal = (item.count ?? 0) * (item.buyPrice ?? 0)
              const saleSubtotal = (item.count ?? 0) * ((item.unitPrice ?? 0) - (item.discount ?? 0))
              const totalDiff = saleSubtotal - buySubtotal

              return (
                <TableRow>
                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.date}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.time}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='left'
                  >
                    {item.client}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.saleman}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='left'
                  >
                    {item.product}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.paymentType}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.count}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {decimalFormat(item.buyPrice ?? 0)}
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
                    {decimalFormat(item.unitPrice ?? 0)}
                  </TableCell>

                  <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {item.discount}
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
                      onClick={() => {
                        onDelete(item)
                      }} />
                  </TableCell>
                </TableRow>
              )
              // })
            })}
        </TableBody>

      </Table>
    </div>
  );
};

export { BalanceTable };
