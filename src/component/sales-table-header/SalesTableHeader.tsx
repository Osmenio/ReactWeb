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

// Á Vista, A Prazo,

const paymentOptions = Object.entries(PaymentTypeEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: key,
}));

interface SalesTableHeaderProps {
  onChangeClient?: (string) => void;
  onChangeAddress?: (string) => void;
  onChangePaymentType?: (PaymentTypeEnum) => void;
}

const SalesTableHeader = ({
  onChangeClient = () => { },
  onChangeAddress = () => { },
  onChangePaymentType = () => { },
}: SalesTableHeaderProps) => {

  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>();
  const [dateNow] = useState<string>(format(new Date(), 'dd/MM/yyyy'));

  return (
    <div className="grid_content">
      <Grid>
        <Grid.Row className="grid_row" >
          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="grid_text">
              Cliente:
            </div>
          </Grid.Column>
          <Grid.Column
            width={6}>
            <Input
              className="input_print"
              placeholder="Nome do cliente"
              fluid
              onChange={(event) => {
                // setUserName(event.target.value)
                onChangeClient(event.target.value)
              }}
            />
          </Grid.Column>
          <Grid.Column width={2}>

          </Grid.Column>
          <Grid.Column
            width={3}
            textAlign='right'
            verticalAlign='middle'>
            <div className="grid_text">
              Tipo de pgto:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}>
            <div className="no_print">
              <Dropdown
                placeholder='Tipo pgto'
                fluid
                selection
                options={paymentOptions}
                onChange={(_, data) => {
                  const type = PaymentTypeEnum[data.value as keyof typeof PaymentTypeEnum];
                  setPaymentType(type)
                  onChangePaymentType(type);
                }}
              />
            </div>
            <div className="print">
              {paymentType}
            </div>
          </Grid.Column>
        </Grid.Row>

        {/* // */}
        <Grid.Row className="grid_row">

          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="grid_text">
              Endereço:
            </div>
          </Grid.Column>
          <Grid.Column
            width={6}>
            <Input
              className="input_print"
              placeholder="Endereço"
              fluid
              onChange={(event) => {
                onChangeAddress(event.target.value)
              }}
            />
          </Grid.Column>
          <Grid.Column
            width={2}>
          </Grid.Column>
          <Grid.Column
            width={3}
            textAlign='right'
            verticalAlign='middle'>
            <div className="grid_text">
              Data:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
            verticalAlign='middle'>
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
