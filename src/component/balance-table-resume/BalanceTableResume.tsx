import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './BalanceTableResume.scss';
import { decimalFormat } from '../../utils/format-utils';
import { useEffect, useState } from 'react';
import { SalesResumeModel } from '../../models';

interface BalanceTableResumeProps {
  item: SalesResumeModel;
}

const BalanceTableResume = ({
  item,
}: BalanceTableResumeProps) => {
  return (
    <div>
      <div className="bt_table_content">
        <Table
          celled
        >
          <TableHeader>
            <TableRow
              active
            >
              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Qtd
              </TableHeaderCell>

              {/* <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Valor Compra
              </TableHeaderCell> */}

              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Subtotal Compra
              </TableHeaderCell>
              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Valor Venda
              </TableHeaderCell>
              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Desconto
              </TableHeaderCell>
              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Subtotal Venda
              </TableHeaderCell>
              <TableHeaderCell
                className="bt_table_header_resume"
                textAlign='center'
              >
                Valor Líq.
              </TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {item.totalCount}
              </TableCell>

              {/* <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totalBuy)}
              </TableCell> */}

              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totalSubBuy)}
              </TableCell>

              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totalSale)}
              </TableCell>

              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totaldDiscount)}
              </TableCell>

              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totalSubSale)}
              </TableCell>

              <TableCell
                className="bt_table_cell"
                textAlign='center'
              >
                {decimalFormat(item.totalDiff)}
              </TableCell>


            </TableRow>
          </TableBody>

        </Table>
      </div>
    </div>
  );
};

export { BalanceTableResume };
