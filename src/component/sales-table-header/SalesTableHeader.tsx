import React, { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Grid, Input, Modal } from 'semantic-ui-react';
import './SalesTableHeader.scss';
import { format } from 'date-fns';
import { PaymentTypeEnum } from '../../models/payment-type.enum';


// const paymentType = [
//   {
//     key: '01',
//     text: 'Á Vista',
//     value: 'Á Vista',
//   },
//   {
//     key: '02',
//     text: 'A Prazo',
//     value: 'A Prazo',
//   },
// ]

interface SalesTableHeaderProps {
  // title?: String;
  // placehoder?: String;
  onChangeClient: (string) => void;
  onChangeAddress: (string) => void;
  onChangePaymentType: (PaymentTypeEnum) => void;
}

const SalesTableHeader = ({
  // title = "TextInput",
  // placehoder = "TextInput"
}: SalesTableHeaderProps) => {

  const [dateNow] = useState<string>(format(new Date(), 'dd/MM/yyyy'));

  return (
    <div
      className="grid_content"
    >
      <Grid>

        {/* <Grid.Row
          color='olive'
          className="grid_row"
        >
          <Grid.Column
            width={2}
            color='red'
            textAlign='right'
          >
            <p>Coluna 1</p>
          </Grid.Column>
          <Grid.Column
            width={6}
            color='blue'
          >
            <p>Coluna 2</p>
          </Grid.Column>
          <Grid.Column
            width={2}
            color='red'
          >
            <p>Coluna 3</p>
          </Grid.Column>
          <Grid.Column
            width={3}
            color='blue'
            textAlign='right'
          >
            <p>Coluna 4</p>
          </Grid.Column>
          <Grid.Column
            width={3}
            color='red'
          >
            <p>Coluna 5</p>
          </Grid.Column>
        </Grid.Row> */}

        {/* // */}
        <Grid.Row
          className="grid_row"
        // color='olive'
        >

          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'
          >
            <div className="grid_text">
              Cliente:
            </div>
          </Grid.Column>
          <Grid.Column
            width={6}
          >
            <Input
              // className="modal_input"
              placeholder="Nome do cliente"
              fluid
              onChange={(event) => {
                // setUserName(event.target.value)
              }}
            />
          </Grid.Column>
          <Grid.Column width={2}>

          </Grid.Column>
          <Grid.Column
            width={3}
            textAlign='right'
            verticalAlign='middle'
          >
            <div className="grid_text">
              Tipo de pagamento:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
          >
            <Dropdown
              placeholder='Tipo pgto'
              fluid
              selection
              // options={PaymentTypeEnum}
            />
          </Grid.Column>
        </Grid.Row>

        {/* // */}
        <Grid.Row
          className="grid_row"
        // color='teal'
        >

          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'
          >
            <div className="grid_text">
              Endereço:
            </div>
          </Grid.Column>
          <Grid.Column
            width={6}
          >
            <Input
              // className="modal_input"
              placeholder="Endereço"
              fluid
              onChange={(event) => {
                // setUserName(event.target.value)
              }}
            />
          </Grid.Column>
          <Grid.Column
            width={2}
          >
            {/* <p>Coluna 3</p> */}
          </Grid.Column>
          <Grid.Column
            width={3}
            textAlign='right'
            verticalAlign='middle'
          >
            <div className="grid_text">
              Data:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
            verticalAlign='middle'
          >
            <div className="grid_text">
              {dateNow}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export { SalesTableHeader };
