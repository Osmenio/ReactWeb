import { useCallback, useEffect, useState } from 'react';
import { BalanceTable, BalanceTableHeader, TopPageTitle } from '../../component';
import "./BalancePage.scss"
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { PaymentTypeEnum } from '../../models';
import { ListSaleMock } from '../../mock/sale.mock';
import { format } from 'date-fns';

export interface ItemBalance {
  id: number,
  saleman: string,
  client: string,
  address: string,
  paymentType: PaymentTypeEnum,
  date: string,
  time: string,
  timestamp: number,
  product: string;
  buyPrice: number;
  count: number;
  unitPrice: number;
  discount: number;
}

const BalancePage = () => {

  // MOCK
  const getItemsBalance = (): ItemBalance[] => {
    return ListSaleMock.flatMap(sale =>
      sale.itemsSale.map(item => ({
        id: item.id ?? 0,
        saleman: sale.saleman,
        client: sale.client,
        address: sale.address,
        paymentType: sale.paymentType,
        date: sale.date,
        time: sale.time,
        timestamp: sale.timestamp,
        product: item.product ?? "",
        buyPrice: item.buyPrice ?? 0,
        count: item.count ?? 0,
        unitPrice: item.unitPrice ?? 0,
        discount: item.discount ?? 0,
      })))
  }

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const startDate = format(date, "yyyy-MM-dd");
  date.setMonth(date.getMonth() + 4);
  const endDate = format(date, "yyyy-MM-dd");

  const [client, setClient] = useState<string>('');
  const [salesman, setSalesman] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [initialDate, setInitialDate] = useState<string>(startDate);
  const [finalDate, setFinalDate] = useState<string>(endDate);
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum | undefined>(undefined);

  const [balanceList, setBalanceList] = useState<ItemBalance[]>(getItemsBalance());
  const [balanceListFilter, setBalanceListFilter] = useState<ItemBalance[]>([]);

  const handleSearch = useCallback(() => {
    // console.log(`handleSearch::${client}:${salesman}:${product}:${initialDate}:${finalDate}:${paymentType}`)

    const startDate = new Date(`${initialDate}T00:00`).getTime()
    const endDate = new Date(`${finalDate}T23:59`).getTime()
    const list = balanceList.filter(p => {
      const matchClient = client.trim() === "" || p.client.toLowerCase().includes(client.toLowerCase());
      const matchSalesman = !salesman || p.saleman === salesman;
      const matchProduct = product.trim() === "" || p.product?.toLowerCase().includes(product.toLowerCase());
      const matchDate = p.timestamp > startDate && p.timestamp < endDate
      const matchPaymentType = !paymentType || p.paymentType === paymentType;
      return matchClient && matchSalesman && matchProduct && matchDate && matchPaymentType;
    });
    setBalanceListFilter(list)
  }, [balanceList, client, salesman, product, initialDate, finalDate, paymentType]);

  useEffect(() => {
    handleSearch()
  }, []);

  return <>
    <TopPageTitle
      title={"Balanço"}
      icon={faCalculator}
    />

    <div className="header_margin">
      <BalanceTableHeader
        initialDate={startDate}
        finalDate={endDate}
        onChangeClient={(client) => {
          setClient(client)
        }}
        onChangeSalesMan={(salesman) => {
          setSalesman(salesman)
        }}
        onChangeProduct={(product) => {
          setProduct(product)
        }}
        onChangeInitialDate={(date) => {
          setInitialDate(date)
        }}
        onChangeFinalDate={(date) => {
          setFinalDate(date)
        }}
        onChangePaymentType={(type) => {
          setPaymentType(type)
        }}
        onSearch={() => {
          handleSearch()
        }}
      />
    </div>

    <div className="header_margin">
      <BalanceTable
        items={balanceListFilter} />
    </div>
  </>
}

export { BalancePage }