import { useCallback, useEffect, useState } from 'react';
import { LoadingModal, TopPageTitle } from '../../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import './DashboardPage.scss';
import { ProductBestSellingByMonthChart, ProductByMonthChart, SalesByDayChart, SalesByMonthChart, SalesMonthByPaymentChart, SalesMonthByUserChart } from '../../charts';
import { ChartService } from '../../services/ChartService';
import { } from '../../charts/SalesByMonthChart';
import { ProductBestSellingByMonthModel, ProductByMonthModel, SalesByDayModel, SalesByMonthModel, SalesMonthByPaymentModel, SalesMonthByUserModel } from '../../models/ChartModels';
import { format } from 'date-fns';
import { ProductService } from '../../services';
import { ProductModel } from '../../models';

const DashboardPage = () => {

  const [salesByMonth, setSalesByMonth] = useState<SalesByMonthModel[]>([]);

  const [salesByDay, setSalesByDay] = useState<SalesByDayModel[]>([]);
  const [monthYearSalesByDay, setMonthYearSalesByDay] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [salesByUser, setSalesByUser] = useState<SalesMonthByUserModel[]>([]);
  const [monthYearSalesByUser, setMonthYearSalesByUser] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [salesByPayment, setSalesByPayment] = useState<SalesMonthByPaymentModel[]>([]);
  const [monthYearSalesByPayment, setMonthYearSalesByPayment] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [productBestByMonth, setProductBestByMonth] = useState<ProductBestSellingByMonthModel[]>([]);
  const [monthYearProductBestByMonth, setMonthYearProductBestByMonth] = useState<string>(format(new Date(), 'MM/yyyy'));

  const [listProduct, setListProduct] = useState<ProductModel[]>([]);
  const [productByMonth, setProductByMonth] = useState<ProductByMonthModel[]>([]);
  const [selectedProductByMonth, setSelectedProductByMonth] = useState<ProductModel>();

  const [loading, setLoading] = useState(false);

  const getAllProduts = useCallback(async (page: number = 1) => {
    const { products, error } = await ProductService.getAll();
    if (error) {
      console.log(`getAllProduts`, error)
    } else {
      setListProduct(products || []);
      let selected = products && products[0]
      setSelectedProductByMonth(selected);
      getProductByMonth(selected)
    }
    setLoading(false)
  }, []);

  const getSalesByMonth = async () => {
    const { data, error } = await ChartService.getSalesByMonth();
    if (error) {
      console.log(`getSalesByMonth:error`, error)
    } else {
      setSalesByMonth(data || []);
    }
    setLoading(false)
  };
  // };

  const getSalesByDay = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;

    const { data, error } = await ChartService.getSalesByDay(formatted);
    if (error) {
      console.log(`getSalesByDay:error`, error)
    } else {
      setSalesByDay(data || []);
    }
    setLoading(false)
  };

  const getSalesByUser = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;

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

    const { data, error } = await ChartService.getSalesByPayment(formatted);
    if (error) {
      console.log(`getSalesByPayment:error`, error)
    } else {
      setSalesByPayment(data || []);
    }
    setLoading(false)
  };

  const getProductBestSellingByMonth = async (date: string) => {
    const [month, year] = date.split("/");
    const formatted = `${year}-${month}`;

    const { data, error } = await ChartService.getProductsBestSellingByMonth(formatted);
    if (error) {
      console.log(`getProductBestSellingByMonth:error`, error)
    } else {
      setProductBestByMonth(data || []);
    }
    setLoading(false)
  };

  const getProductByMonth = async (product: ProductModel) => {
    const { data, error } = await ChartService.getProductsByMonth(product.id);
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

  const handleChangeProductBestSellingByMonth = useCallback((date: string) => {
    setMonthYearProductBestByMonth(date);
    getProductBestSellingByMonth(date)
  }, []);

  const handleChangeProductByMonth = useCallback((selected: ProductModel) => {
    setSelectedProductByMonth(selected);
    getProductByMonth(selected)
  }, []);

  useEffect(() => {
    setLoading(true)
    getAllProduts()
    getSalesByMonth()
    getSalesByDay(monthYearSalesByDay)
    getSalesByUser(monthYearSalesByUser)
    getSalesByPayment(monthYearSalesByPayment)
    getProductBestSellingByMonth(monthYearProductBestByMonth)
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
      </div>

      <h1 />
      <ProductBestSellingByMonthChart
        title='Produtos mais vendidos'
        monthYear={monthYearProductBestByMonth}
        items={productBestByMonth.slice(0, 10)}
        onChangeMonthYear={handleChangeProductBestSellingByMonth}
      />

      <h1 />
      <ProductByMonthChart
        title='Vendas por mês (últimos 12 meses)'
        selected={selectedProductByMonth}
        products={listProduct}
        items={productByMonth}
        onChangeProduct={handleChangeProductByMonth}
      />
    </div>

    <LoadingModal
      show={loading}
    />
  </>
}

export { DashboardPage }