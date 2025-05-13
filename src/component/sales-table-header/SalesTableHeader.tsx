import React, { useCallback, useState } from 'react';
import { Dropdown, Grid, Input } from 'semantic-ui-react';
import './SalesTableHeader.scss';
import { format } from 'date-fns';
import { PaymentTypeEnum } from '../../models/payment-type.enum';

const paymentOptions = Object.entries(PaymentTypeEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

interface SalesTableHeaderProps {
  client?: string;
  address?: string;
  paymentType?: PaymentTypeEnum;
  onChangeClient?: (string) => void;
  onChangeAddress?: (string) => void;
  onChangePaymentType?: (PaymentTypeEnum) => void;
}

const SalesTableHeader = ({
  client,
  address,
  paymentType,
  onChangeClient = () => { },
  onChangeAddress = () => { },
  onChangePaymentType = () => { },
}: SalesTableHeaderProps) => {

  const [dateNow] = useState<string>(format(new Date(), 'dd/MM/yyyy'));

    const handleChangeType = useCallback((type: PaymentTypeEnum) => {
      onChangePaymentType(type);
    }, [paymentType])

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
              value={client ?? ""}
              onChange={(event) => {
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
                fluid
                selection
                value={paymentType}
                options={paymentOptions}
                onChange={(_, data) => {
                  const type = data.value as PaymentTypeEnum;
                  handleChangeType(type);
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
              value={address ?? ""}
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
