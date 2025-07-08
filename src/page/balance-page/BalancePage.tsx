import { useCallback, useState } from 'react';
import { BalanceTable, BalanceTableHeader, TopPageTitle } from '../../component';
import "./BalancePage.scss"
import { ProductStatusEnum } from '../../models/product-status.enum';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { PaymentTypeEnum, SaleModel } from '../../models';
import { ListSaleMock } from '../../mock/sale.mock';

const productStatus = Object.entries(ProductStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const BalancePage = () => {

  const [client, setClient] = useState<string>('');
  const [salesman, setSalesman] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [initialDate, setInitialDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [finalDate, setFinalDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum | undefined>(undefined);

  const [salesList, setSalesList] = useState<SaleModel[]>(ListSaleMock);

  // const [search, setSearch] = useState("");
  // const [status, setStatus] = useState<ProductStatusEnum>();
  // const [listProduct, setListProduct] = useState<ProductModel[]>(ListProductsMock);

  // const [userModalOpen, setUserModalOpen] = useState(false);
  // const [userModalSubtitle, setUserModalSubtitle] = useState('');
  // const [userModalPositiveBtn, setUserModalPositiveBtn] = useState('');
  // const [userModalNegativeBtn, setUserModalNegativeBtn] = useState('');

  // const [productModalOpen, setProductModalOpen] = useState(false);
  // const [productModalPositiveBtn, setProductModalPositiveBtn] = useState('');
  // const [productModalNegativeBtn, setProductModalNegativeBtn] = useState('');

  // const [editProduct, setEditProduct] = useState<ProductModel | undefined>();

  // const handleFilterProducts = useCallback(() => {
  //   const list = (search.trim() === "" && !status)
  //     ? ListProductsMock
  //     : ListProductsMock.filter(p => {
  //       const matchDescription = search.trim() === "" || p.description.toLowerCase().includes(search.toLowerCase());
  //       const matchStatus = !status || p.status === status;
  //       return matchDescription && matchStatus;
  //     });
  //   setListProduct(list)
  // }, [search, status]);

  const handleSearch = useCallback(() => {
    console.log(`handleSearch::${client}:${salesman}:${product}:${initialDate}:${finalDate}:${paymentType}`)

    const list = (client.trim() === "" && !salesman && product.trim() === "" && !paymentType)
      ? ListSaleMock
      : ListSaleMock.filter(p => {
        const matchClient = client.trim() === "" || p.client.toLowerCase().includes(client.toLowerCase());
        const matchSalesman = !salesman || p.saleman === salesman;
        const matchProduct = product.trim() === "" || p.itemsSale.find(i => i.product?.toLowerCase().includes(product.toLowerCase()));
        const matchPaymentType = !paymentType || p.paymentType === paymentType;
        return matchClient && matchSalesman && matchProduct && matchPaymentType;
      });
    setSalesList(list)


  }, [client, salesman, product, initialDate, finalDate, paymentType]);

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
        items={salesList} />
    </div>
  </>
}

export {
  BalancePage
}