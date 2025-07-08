import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Grid, Input } from 'semantic-ui-react';
import './BalanceTableHeader.scss';
import { format } from 'date-fns';
import { PaymentTypeEnum } from '../../models/payment-type.enum';

const SALESMAN_MOCK = ["Carlos", "Ingrid", "Roberto", "Marcia"]
const salesmanOptions = Object.entries(SALESMAN_MOCK).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const paymentOptions = Object.entries(PaymentTypeEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

interface BalanceTableHeaderProps {
  onChangeClient?: (string) => void;
  onChangeSalesMan?: (string) => void;
  onChangeProduct?: (string) => void;
  onChangeInitialDate?: (string) => void;
  onChangeFinalDate?: (string) => void;
  onChangePaymentType?: (PaymentTypeEnum) => void;
  onSearch?: () => void;
}

const BalanceTableHeader = ({
  onChangeClient = () => { },
  onChangeSalesMan = () => { },
  onChangeProduct = () => { },
  onChangeInitialDate = () => { },
  onChangeFinalDate = () => { },
  onChangePaymentType = () => { },
  onSearch = () => { },
}: BalanceTableHeaderProps) => {

  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [errorDate, setErrorDate] = useState('');

  const handleChangeDates = useCallback(() => {

    console.log(`handleChangeDates::${startDate}:${endDate}`)
    if (startDate > endDate) {
      setErrorDate('Data inicial maior que data final')
    } else {
      onChangeInitialDate(startDate)
      onChangeFinalDate(endDate)
    }
  }, [startDate, endDate])

  useEffect(() => {
    handleChangeDates();
  }, [startDate, endDate]);

  return (
    <div className="bth_grid_content">
      <Grid>

        {/* <Grid.Row className="bth_grid_row" >
          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Cliente:
            </div>
          </Grid.Column>

          <Grid.Column
            width={6}>
            <Input
              placeholder="Nome do cliente"
              fluid
              onChange={(event) => {
                onChangeClient(event.target.value)
              }}
            />
          </Grid.Column>

          <Grid.Column
            width={1}
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Período:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
            verticalAlign='middle'>
            <Input
              className="bth_grid_input_date"
              type='date'
              value={startDate}
              onChange={(event) => {
                setErrorDate("")
                setStartDate(event.target.value)
              }}
            />
          </Grid.Column>
          <Grid.Column
            width={1}
            color='red'
            textAlign='center'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              à
            </div>
          </Grid.Column>

          <Grid.Column
            width={3}
            verticalAlign='middle'>

            <Input
              className="bth_grid_input_date"
              type='date'
              value={endDate}
              onChange={(event) => {
                setErrorDate("")
                setEndDate(event.target.value)
              }}
            />
          </Grid.Column>
        </Grid.Row> */}



        <Grid.Row className="bth_grid_row" >
          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Cliente:
            </div>
          </Grid.Column>

          <Grid.Column
            width={6}>
            <Input
              placeholder="Nome do cliente"
              fluid
              onChange={(event) => {
                onChangeClient(event.target.value)
              }}
            />
          </Grid.Column>

          {/* // */}
          <Grid.Column width={1} />
          <Grid.Column
            width={7}
            verticalAlign='middle'>
            <div className="bth_grid_date">
              <div className="bth_grid_text">
                Período:
              </div>
              <Input
                className="bth_grid_input_date"
                type='date'
                value={startDate}
                onChange={(event) => {
                  setErrorDate("")
                  setStartDate(event.target.value)
                }}
              />
              <div className="bth_grid_text">
                à
              </div>
              <Input
                className="bth_grid_input_date"
                type='date'
                value={endDate}
                onChange={(event) => {
                  setErrorDate("")
                  setEndDate(event.target.value)
                }}
              />
            </div>
            {errorDate && <div style={{ color: 'red', marginLeft: '15px' }}>
              {errorDate}
            </div>}
          </Grid.Column>
        </Grid.Row>

        {/* // */}
        <Grid.Row className="bth_grid_row">

          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Vendedor:
            </div>
          </Grid.Column>
          <Grid.Column
            width={4}>
            <Dropdown
              fluid
              selection
              clearable
              placeholder='Vendedor'
              options={salesmanOptions}
              onChange={(_, data) => {
                const type = data.value
                onChangeSalesMan(type);
              }}
            />
          </Grid.Column>
          <Grid.Column width={4} />

          <Grid.Column
            width={3}
            textAlign='right'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Tipo de pgto:
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}>
            <Dropdown
              fluid
              selection
              clearable
              placeholder='Selecionar'
              options={paymentOptions}
              onChange={(_, data) => {
                const type = data.value as PaymentTypeEnum;
                onChangePaymentType(type)
              }}
            />
          </Grid.Column>
        </Grid.Row>

        {/* // */}
        <Grid.Row className="bth_grid_row">

          <Grid.Column
            width={2}
            textAlign='right'
            verticalAlign='middle'>
            <div className="bth_grid_text">
              Produto:
            </div>
          </Grid.Column>

          <Grid.Column
            width={6}>
            <Input
              placeholder="Produto"
              fluid
              onChange={(event) => {
                onChangeProduct(event.target.value)
              }}
            />
          </Grid.Column>

          <Grid.Column
            width={5}>
          </Grid.Column>

          <Grid.Column
            width={3}
            verticalAlign='middle'>
            <Button
              className="bth_button_size"
              color='blue'
              onClick={() => {
                onSearch()
              }}
            >
              Buscar
            </Button>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </div>
  );
};

export { BalanceTableHeader };
