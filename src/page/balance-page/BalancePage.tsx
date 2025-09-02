import { useCallback, useEffect, useState } from 'react';
import { BalanceTable, BalanceTableHeader, InfoModal, LoadingModal, TopPageTitle } from '../../component';
import "./BalancePage.scss"
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { ActionEnum, FilterBalanceModel, PaymentTypeEnum, ProductModel, SaleModel, UserModel } from '../../models';
import { format } from 'date-fns';
import { ProductService, SaleService, UserService } from '../../services';

export interface ItemBalance {
  id: number,
  user: string,
  client: string,
  address: string,
  paymentType: PaymentTypeEnum,
  timestamp: number,
  product: string;
  buyPrice: number;
  count: number;
  unitPrice: number;
  discount: number;
}

const BalancePage = () => {

  const getItemsBalance = (sales: SaleModel[]): ItemBalance[] => {
    return sales.flatMap(sale =>
      sale.itemsSale.map(item => ({
        id: item.id ?? 0,
        user: sale.user.name,
        client: sale.client,
        address: sale.address,
        paymentType: sale.paymentType,
        timestamp: sale.timestamp,
        product: item.product.description,
        buyPrice: item.buyPrice ?? 0,
        count: item.count ?? 0,
        unitPrice: item.unitPrice ?? 0,
        discount: item.discount ?? 0,
      }))).sort((a, b) => a.timestamp - b.timestamp);
  }

  const date = new Date();
  date.setMonth(date.getMonth());
  const endDate = format(date, "yyyy-MM-dd");
  date.setMonth(date.getMonth() - 1);
  const startDate = format(date, "yyyy-MM-dd");

  const [client, setClient] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const [product, setProduct] = useState<ProductModel | undefined>(undefined);
  const [initialDate, setInitialDate] = useState<string>(startDate);
  const [finalDate, setFinalDate] = useState<string>(endDate);
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum | undefined>(undefined);

  const [balanceList, setBalanceList] = useState<ItemBalance[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [listProduct, setListProduct] = useState<ProductModel[]>([]);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalSubtitle, setInfoModalSubtitle] = useState('');
  const [infoModalPositiveBtn, setInfoModalPositiveBtn] = useState('');
  const [infoModalNegativeBtn, setInfoModalNegativeBtn] = useState('');

  const [action, setAction] = useState(ActionEnum.None);
  const [editItemId, setEditItemId] = useState<number | undefined>();

  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    const { users, error } = await UserService.getAllUser();
    if (error) {
      // console.log(`getAllUsers`, error)
      setInfoModalSubtitle(`Falha ao carregar os dados de usuários`)
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setUsers(users)
    }
  };

  const getAllProduts = async () => {
    const { products, error } = await ProductService.getAll();
    if (error) {
      // console.log(`getAllProduts`, error)
      setInfoModalSubtitle(`Falha ao carregar os produtos`)
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setListProduct(products || []);
    }
  };

  const getAllItems = async (filter: FilterBalanceModel) => {
    const { sales, error } = await SaleService.getAllByFilter(filter);
    if (error) {
      // console.log(`getAllItem:error`, error)
      setInfoModalSubtitle(`Falha ao carregar os dados`)
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setBalanceList(getItemsBalance(sales || []));
    }
    setLoading(false)
  };

  const deleteItem = async (itemId: number) => {
    const { error } = await SaleService.softDeleteItem(itemId);
    if (error) {
      // console.log(`getAllItem:error`, error)
      setAction(ActionEnum.None)
      setInfoModalSubtitle(`Falha ao deletar o item da venda`)
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setAction(ActionEnum.None)
      setInfoModalSubtitle(`Item deletado com sucesso`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalNegativeBtn("")
      setInfoModalOpen(true)
    }
    setLoading(false)
    handleSearch()
  };

  const handleSearch = useCallback(() => {
    const filter: FilterBalanceModel = {
      userId: user?.id,
      client: client,
      paymentType: paymentType,
      startDate: new Date(`${initialDate}T00:00`).getTime(),
      endDate: new Date(`${finalDate}T23:59`).getTime(),
      productId: product?.id
    }

    getAllItems(filter)
  }, [balanceList, client, user, product, initialDate, finalDate, paymentType]);

  useEffect(() => {
    setLoading(true)
    getAllUsers()
    getAllProduts()
    handleSearch()
  }, []);

  return <>
    <TopPageTitle
      title={"Balanço"}
      icon={faCalculator}
    />

    <div className="header_margin">
      <BalanceTableHeader
        users={users}
        products={listProduct}
        initialDate={startDate}
        finalDate={endDate}
        onChangeClient={(client) => {
          setClient(client)
        }}
        onChangeUser={(value) => {
          setUser(value)
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
          setLoading(true)
          handleSearch()
        }}
      />
    </div>

    <div className="header_margin">
      <BalanceTable
        items={balanceList}
        onDelete={(item) => {
          setEditItemId(item.id)
          setAction(ActionEnum.Delete)
          setInfoModalSubtitle("Deseja deletar esse item de venda?\nEssa ação não pode ser desfeita.")
          setInfoModalPositiveBtn("Deletar")
          setInfoModalNegativeBtn("Cancelar")
          setInfoModalOpen(true)
        }}
      />
    </div>

    <InfoModal
      open={infoModalOpen}
      title='Atenção'
      subtitle={infoModalSubtitle}
      positiveBtnText={infoModalPositiveBtn}
      negativeBtnText={infoModalNegativeBtn}
      onPositiveBtn={() => {
        setInfoModalOpen(false)
        if (action === ActionEnum.Delete && editItemId) {
          setLoading(true)
          deleteItem(editItemId)
        }
      }}
      onNegativeBtn={() => {
        setInfoModalOpen(false)
      }}
    />

    <LoadingModal
      show={loading}
    />
  </>
}

export { BalancePage }