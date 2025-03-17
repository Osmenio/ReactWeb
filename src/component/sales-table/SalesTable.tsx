import React, { useRef, useState } from 'react';
import { Button, Input, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './SalesTable.scss';

const SalesTable = ({
  // open,
  // onClick = () => { },
}) => {

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
              Descrição
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
          {[...Array(5)].map((relacionado, i) => (
            <TableRow
              key={i}
            >
              <TableCell
                textAlign='center'
              >
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                // onChange={(event) => {
                // }}
                ></Input>
              </TableCell>
              <TableCell>
                <Input
                  fluid
                  transparent
                // onChange={(event) => {
                // }}
                ></Input>
              </TableCell>
              <TableCell textAlign='center' >3</TableCell>
              <TableCell textAlign='center' >
                <Input
                  className="table_input_align"
                  fluid
                  transparent
                // onChange={(event) => {
                // }}
                ></Input>
              </TableCell>
              <TableCell textAlign='center' >3</TableCell>
            </TableRow>
          ))}
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

