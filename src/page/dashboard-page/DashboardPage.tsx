import { useCallback, useEffect, useState } from 'react';
import { LoadingModal, TopPageTitle } from '../../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import './DashboardPage.scss';
import { ProductByMonthChart, SalesByDayChart, SalesByMonthChart, SalesMonthByPaymentChart, SalesMonthByUserChart } from '../../charts';
import { ChartService } from '../../services/ChartService';
import { } from '../../charts/SalesByMonthChart';
import { ProductByMonthModel, SalesByDayModel, SalesByMonthModel, SalesMonthByPaymentModel, SalesMonthByUserModel } from '../../models/ChartModels';
import { format } from 'date-fns';

const DashboardPage = () => {

  const [salesByMonth, setSalesByMonth] = useState<SalesByMonthModel[]>([]);

  const [salesByDay, setSalesByDay] = useState<SalesByDayModel[]>([]);
  const [monthYearSalesByDay, setMonthYearSalesByDay] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [salesByUser, setSalesByUser] = useState<SalesMonthByUserModel[]>([]);
  const [monthYearSalesByUser, setMonthYearSalesByUser] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [salesByPayment, setSalesByPayment] = useState<SalesMonthByPaymentModel[]>([]);
  const [monthYearSalesByPayment, setMonthYearSalesByPayment] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [productByMonth, setProductByMonth] = useState<ProductByMonthModel[]>([]);
  const [monthYearProductByMonth, setMonthYearProductByMonth] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [loading, setLoading] = useState(false);

  // const getAllItems = async () => {
  //   const { sales, error } = await SaleService.getAll();
  //   if (error) {
  //     console.log(`getAllItem:error`, error)
  //   } else {
  //     // console.log(`getAllItem:`, sales)
  //     setSales(sales || []);
  //   }
  //   setLoading(false)
  // };

  const getSalesByMonth = async () => {
    const { data, error } = await ChartService.getSalesByMonth();
    if (error) {
      console.log(`getSalesByMonth:error`, error)
    } else {
      // console.log(`getSalesByMonth:`, data)
      setSalesByMonth(data || []);
    }
    setLoading(false)
  };
  // };

  const getSalesByDay = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;
    // console.log(`getSalesByDay:`, formatted)

    const { data, error } = await ChartService.getSalesByDay(formatted);
    if (error) {
      console.log(`getSalesByDay:error`, error)
    } else {
      // console.log(`getSalesByDay:`, data)
      setSalesByDay(data || []);
    }
    setLoading(false)
  };

  const getSalesByUser = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;
    // console.log(`getSalesByUser:`, formatted)

    const { data, error } = await ChartService.getSalesByUser(formatted);
    if (error) {
      console.log(`getSalesByUser:error`, error)
    } else {
      setSalesByUser(data || []);
    }
    setLoading(false)
  };

  const getSalesByPayment = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;
    // console.log(`getSalesByPayment:`, formatted)

    const { data, error } = await ChartService.getSalesByPayment(formatted);
    if (error) {
      console.log(`getSalesByPayment:error`, error)
    } else {
      setSalesByPayment(data || []);
    }
    setLoading(false)
  };

  const getProductByMonth = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;
    // console.log(`getProductByMonth:`, formatted)

    const { data, error } = await ChartService.getProductsByMonth(formatted);
    if (error) {
      console.log(`getProductByMonth:error`, error)
    } else {
      setProductByMonth(data || []);
    }
    setLoading(false)
  };

  const handleChangeSalesByDay = useCallback((date: string) => {
    setMonthYearSalesByDay(date);
    getSalesByDay(date)
  }, []);

  const handleChangeSalesByUser = useCallback((date: string) => {
    setMonthYearSalesByUser(date);
    getSalesByUser(date)
  }, []);

  const handleChangeSalesByPayment = useCallback((date: string) => {
    setMonthYearSalesByPayment(date);
    getSalesByPayment(date)
  }, []);

  const handleChangeProductByMonth = useCallback((date: string) => {
    setMonthYearProductByMonth(date);
    getProductByMonth(date)
  }, []);

  useEffect(() => {
    // console.log(`DashboardPage.useEffect`)
    setLoading(true)
    getSalesByMonth()
    getSalesByDay(monthYearSalesByDay)
    getSalesByUser(monthYearSalesByUser)
    getSalesByPayment(monthYearSalesByPayment)
    getProductByMonth(monthYearProductByMonth)
  }, []);

  return <>
    <TopPageTitle
      title={"Dashboard"}
      icon={faChartColumn}
    />

    <div
      className="dash_container"
    >

      <SalesByMonthChart
        title='Vendas por mês (últimos 12 meses)'
        items={salesByMonth}
      />
      <h1 />

      <SalesByDayChart
        title='Vendas por dia'
        monthYear={monthYearSalesByDay}
        items={salesByDay}
        onChangeMonthYear={handleChangeSalesByDay}
      />
      <h1 />

      <SalesMonthByUserChart
        title='Vendas por vendedor'
        monthYear={monthYearSalesByUser}
        items={salesByUser}
        onChangeMonthYear={handleChangeSalesByUser}
      />
      <h1 />
      <div
        style={{ display: 'flex', gap: '30px' }}
      >

        <SalesMonthByPaymentChart
          title='Vendas por tipo de pagamento'
          monthYear={monthYearSalesByPayment}
          items={salesByPayment}
          onChangeMonthYear={handleChangeSalesByPayment}
        />

        {/* <SalesMonthByPaymentChart
          title='Vendas por tipo de pagamento'
          monthYear={monthYearSalesByPayment}
          items={salesByPayment}
          onChangeMonthYear={handleChangeSalesByPayment}
          /> */}
      </div>
      <h1 />
      <ProductByMonthChart
        title='Produtos mais vendidos'
        monthYear={monthYearProductByMonth}
        items={productByMonth}
        onChangeMonthYear={handleChangeProductByMonth}
      />
    </div>

    <LoadingModal
      show={loading}
    />
  </>
}

export { DashboardPage }