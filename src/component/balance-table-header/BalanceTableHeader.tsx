import { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Grid, Input } from 'semantic-ui-react';
import './BalanceTableHeader.scss';
import { format } from 'date-fns';
import { PaymentTypeEnum, ProductModel, UserModel } from '../../models';

const SALESMAN_MOCK = ["Carlos", "Ingrid", "Roberto", "Marcia"]
// const salesmanOptions = Object.entries(SALESMAN_MOCK).map(([key, value]) => ({
//   key: key,
//   text: value,
//   value: value,
// }));

const paymentOptions = Object.entries(PaymentTypeEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

interface BalanceTableHeaderProps {
  users: UserModel[];
  products: ProductModel[];
  initialDate?: string,
  finalDate?: string,
  onChangeClient?: (value: string) => void;
  onChangeUser?: (value?: UserModel) => void;
  onChangeProduct?: (value?: ProductModel) => void;
  onChangeInitialDate?: (value: string) => void;
  onChangeFinalDate?: (value: string) => void;
  onChangePaymentType?: (type: PaymentTypeEnum) => void;
  onSearch?: () => void;
}

const BalanceTableHeader = ({
  users,
  products,
  initialDate,
  finalDate,
  onChangeClient = () => { },
  onChangeUser = () => { },
  onChangeProduct = () => { },
  onChangeInitialDate = () => { },
  onChangeFinalDate = () => { },
  onChangePaymentType = () => { },
  onSearch = () => { },
}: BalanceTableHeaderProps) => {

  const dateNow = format(new Date(), "yyyy-MM-dd");

  const [startDate, setStartDate] = useState(initialDate ?? dateNow);
  const [endDate, setEndDate] = useState(finalDate ?? dateNow);
  const [errorDate, setErrorDate] = useState('');

  const usersOptions = Object.entries(users).map(([key, value]) => ({
    // key: key,
    key: value.id,
    text: value.name,
    value: value.id,
  }));

  const productsOptions = Object.entries(products).map(([key, value]) => ({
    // key: key,
    key: value.id,
    text: value.description,
    value: value.id,
  }));
  // console.log(`usersOptions`, usersOptions)

  const handleChangeDates = useCallback(() => {
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
              options={usersOptions}
              onChange={(_, data) => {
                const user = users.find(p => p.id === data.value)
                onChangeUser(user);
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
            <Dropdown
              fluid
              selection
              clearable
              search
              placeholder='Prduto'
              options={productsOptions}
              onChange={(_, data) => {
                const product = products.find(p => p.id === data.value)
                onChangeProduct(product);
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
