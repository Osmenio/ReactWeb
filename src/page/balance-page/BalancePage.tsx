import { useCallback, useState } from 'react';
import { BalanceTable, BalanceTableHeader, TopPageTitle } from '../../component';
import "./BalancePage.scss"
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { PaymentTypeEnum } from '../../models';
import { ListSaleMock } from '../../mock/sale.mock';

export interface ItemBalance {
  id: number,
  saleman: string,
  client: string,
  address: string,
  paymentType: PaymentTypeEnum,
  date: string,
  time: string,
  product: string;
  buyPrice: number;
  count: number;
  unitPrice: number;
  discount: number;
  // subtotal: number;
}

const BalancePage = () => {

  const getItemsBalance = (): ItemBalance[] => {
    return ListSaleMock.flatMap(sale =>
      sale.itemsSale.map(item => ({
        id: item.id ?? 0,
        saleman: sale.saleman ?? "",
        client: sale.client ?? "",
        address: sale.address ?? "",
        paymentType: sale.paymentType ?? PaymentTypeEnum.Pix,
        date: sale.date ?? "",
        time: sale.time ?? "",
        product: item.product ?? "",
        buyPrice: item.buyPrice ?? 0,
        count: item.count ?? 0,
        unitPrice: item.unitPrice ?? 0,
        discount: item.discount ?? 0,
        // subtotal: item.subtotal ?? 0,
      })))
  }
  const [client, setClient] = useState<string>('');
  const [salesman, setSalesman] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [initialDate, setInitialDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [finalDate, setFinalDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum | undefined>(undefined);

  // const [salesList, setSalesList] = useState<SaleModel[]>(ListSaleMock);
  const [balanceList, setBalanceList] = useState<ItemBalance[]>(getItemsBalance());
  const [balanceListFilter, setBalanceListFilter] = useState<ItemBalance[]>(getItemsBalance());


  const handleSearch = useCallback(() => {
    console.log(`handleSearch::${client}:${salesman}:${product}:${initialDate}:${finalDate}:${paymentType}`)

    const list = (client.trim() === "" && !salesman && product.trim() === "" && !paymentType)
      ? balanceList
      : balanceList.filter(p => {
        const matchClient = client.trim() === "" || p.client.toLowerCase().includes(client.toLowerCase());
        const matchSalesman = !salesman || p.saleman === salesman;
        // const matchProduct = product.trim() === "" || p.itemsSale.find(i => i.product?.toLowerCase().includes(product.toLowerCase()));
        const matchProduct = product.trim() === "" || p.product?.toLowerCase().includes(product.toLowerCase());
        const matchPaymentType = !paymentType || p.paymentType === paymentType;
        return matchClient && matchSalesman && matchProduct && matchPaymentType;
      });
    setBalanceListFilter(list)


  }, [balanceList, client, salesman, product, initialDate, finalDate, paymentType]);

  // useEffect(() => {
  //   handleFilterProducts();
  // }, [search, status]);

  return <>
    <TopPageTitle
      title={"Balanço"}
      icon={faCalculator}
    />

    <div className="header_margin">
      <BalanceTableHeader
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