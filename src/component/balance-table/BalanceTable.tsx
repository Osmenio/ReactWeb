import { Checkbox, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './BalanceTable.scss';
import { decimalFormat } from '../../utils/format-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ItemBalanceModel } from '../../models';

interface BalanceTableProps {
  items: ItemBalanceModel[];
  onDelete?: (item: ItemBalanceModel) => void;
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

  const [clientEnable, setClientEnable] = useState(false);
  const [userEnable, setUserEnable] = useState(false);
  const [paymentTypeEnable, setPaymentTypeEnable] = useState(false);
  const [countEnable, setCountEnable] = useState(false);
  const [buyPriceEnable, setBuyPriceEnable] = useState(false);
  const [totalBuyEnable, setTotalBuyEnable] = useState(false);

  useEffect(() => {
    let totalCount = 0
    let totalBuy = 0
    let totalSubBuy = 0
    let totalSale = 0
    let totaldDiscount = 0
    let totalSubSale = 0
    items.forEach(item => {
      totalCount += item.count
      totalBuy += item.buyPrice
      totalSubBuy += (item.count * item.buyPrice)
      totalSale += item.unitPrice
      totaldDiscount += item.discount
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
    <div>
      <div className="bt_check">
        Exibir:
        <Checkbox
          label='Cliente'
          checked={clientEnable}
          onChange={(e, data) => setClientEnable(data.checked ?? false)}
        />
        <Checkbox
          label='Vendedor'
          checked={userEnable}
          onChange={(e, data) => setUserEnable(data.checked ?? false)}
        />
        <Checkbox
          label='Tipo de pgto'
          checked={paymentTypeEnable}
          onChange={(e, data) => setPaymentTypeEnable(data.checked ?? false)}
        />
        <Checkbox
          label='Quantidade'
          checked={countEnable}
          onChange={(e, data) => setCountEnable(data.checked ?? false)}
        />
        <Checkbox
          label='Valor de Compra'
          checked={buyPriceEnable}
          onChange={(e, data) => setBuyPriceEnable(data.checked ?? false)}
        />
        <Checkbox
          label='Subtotal de Compra'
          checked={totalBuyEnable}
          onChange={(e, data) => setTotalBuyEnable(data.checked ?? false)}
        />
      </div>

      <div
      // className="bt_table_content"
      >
        <Table
          // className="bt_table"
          celled
        >

          {/* <TableHeader>
            <TableRow
              active
            >
              <TableHeaderCell
                className="bt_table_header_resume"
                // colSpan="3"
                textAlign='center'
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
          </TableHeader> */}

          <TableHeader>
            <TableRow>
              <TableHeaderCell
                width={2}
                textAlign='center'
              >
                Data
              </TableHeaderCell>

              {/* <TableHeaderCell
              textAlign='center'
              width={1}
            >
              Hora
            </TableHeaderCell> */}

              {clientEnable && <TableHeaderCell
                width={2}
                textAlign='center'
              >
                Cliente
              </TableHeaderCell>}

              {userEnable && <TableHeaderCell
                width={2}
                textAlign='center'
              >
                Vendedor
              </TableHeaderCell>}

              <TableHeaderCell
                width={3}
                textAlign='center'
              >
                Produto
              </TableHeaderCell>

              {paymentTypeEnable && <TableHeaderCell
                width={1}
                textAlign='center'
              >
                Pgto
              </TableHeaderCell>}

              {countEnable && <TableHeaderCell
                width={1}
                textAlign='center'
              >
                Qtd
              </TableHeaderCell>}

              {buyPriceEnable && <TableHeaderCell
                width={1}
                textAlign='center'
              >
                <>
                  Valor <br /> Compra
                </>
              </TableHeaderCell>}

              {totalBuyEnable && <TableHeaderCell
                width={1}
                textAlign='center'
              >
                <>
                  Subtotal <br /> Compra
                </>
              </TableHeaderCell>}

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
              items?.map((item, index) => {
                const buySubtotal = (item.count ?? 0) * (item.buyPrice ?? 0)
                const saleSubtotal = (item.count ?? 0) * ((item.unitPrice ?? 0) - (item.discount ?? 0))
                const totalDiff = saleSubtotal - buySubtotal

                return (
                  <TableRow>
                    <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}
                      {/* {`${format(new Date(item.timestamp), 'dd/MM/yyyy')}\n
                    ${format(new Date(item.timestamp), 'HH:mm')}`} */}
                    </TableCell>

                    {/* <TableCell
                    className="bt_table_cell"
                    textAlign='center'
                  >
                    {format(new Date(item.timestamp), 'HH:mm')}
                  </TableCell> */}

                    {clientEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='left'
                    >
                      {item.client}
                    </TableCell>}

                    {userEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {item.user}
                    </TableCell>}

                    <TableCell
                      className="bt_table_cell"
                      textAlign='left'
                    >
                      {item.product}
                    </TableCell>

                    {paymentTypeEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {item.paymentType}
                    </TableCell>}

                    {countEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {item.count}
                    </TableCell>}

                    {buyPriceEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {decimalFormat(item.buyPrice ?? 0)}
                    </TableCell>}

                    {totalBuyEnable && <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {decimalFormat(buySubtotal)}
                    </TableCell>}

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
                      {item.discount > 0 ? decimalFormat(item.discount) : "-"}
                    </TableCell>

                    <TableCell
                      className="bt_table_cell"
                      textAlign='center'
                    >
                      {decimalFormat(saleSubtotal)}
                    </TableCell>

                    <TableCell
                      // className="bt_table_cell"
                      className={totalDiff > 0 ? "bt_table_cell" : "bt_table_cell_red"}
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
    </div>
  );
};

export { BalanceTable };
