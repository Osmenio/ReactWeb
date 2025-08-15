import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InfoModal, LoadingModal, SalesTableHeader, TopPageTitle } from '../../component';
import { SalesTable } from '../../component/sales-table/SalesTable';
import { Button } from 'semantic-ui-react';
import "./SalesPage.scss"
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { ItemSaleModel, PaymentTypeEnum, ProductModel, SaleModel } from '../../models';
import { ProductService, SaleService } from '../../services';
import { useSessionContext } from '../../providers';

const SalesPage = () => {

  const salesTableRef = useRef<{
    clearList: () => void,
    updateNumLines: (isAdd: boolean) => void
  }>(null);

  const { session } = useSessionContext();

  const [client, setClient] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(PaymentTypeEnum.Debit);
  const [listItems, setListItems] = useState<ItemSaleModel[]>([]);

  const [listProduct, setListProduct] = useState<ProductModel[]>([]);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalSubtitle, setInfoModalSubtitle] = useState('');
  const [infoModalPositiveBtn, setInfoModalPositiveBtn] = useState('');
  const [infoModalNegativeBtn, setInfoModalNegativeBtn] = useState('');

  const [loading, setLoading] = useState(false);

  const getAllProduts = async () => {
    const { products, error } = await ProductService.getAllInStock();
    if (error) {
      console.log(`getAllProduts`, error)
      setInfoModalSubtitle(`Falha ao carregar os produtos`)
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setListProduct(products || []);
    }
    setLoading(false)
  };

  const saveSale = async () => {
    if (session.user) {
      const sale: SaleModel = {
        id: 0,
        user: session.user,
        client: client,
        address: address,
        paymentType: paymentType,
        timestamp: Date.now(),
        itemsSale: listItems
      }
      const error = await SaleService.add(sale);
      if (error) {
        console.log(`saveSale`, error)
        setInfoModalSubtitle(`Falha ao processar a venda`)
        setInfoModalPositiveBtn("")
        setInfoModalNegativeBtn("Ok")
        setInfoModalOpen(true)
      } else {
        handleClearListProduct()
        setInfoModalSubtitle("Venda processada com sucesso")
        setInfoModalPositiveBtn("Ok")
        setInfoModalNegativeBtn("")
        setInfoModalOpen(true)
      }
    } else {
      handleClearListProduct()
      setInfoModalSubtitle("Usuário não logado - ISSO TA ERRADO")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
    }
    setLoading(false)
  };

  const handleCountLine = useCallback((isAdd: boolean) => {
    salesTableRef.current?.updateNumLines(isAdd);
  }, []);

  const handleSaveAndPrint = useCallback(() => {

    if (!client) {
      setInfoModalSubtitle("Por favor, preencha o nome do cliente")
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
      return
    }

    if (!address) {
      setInfoModalSubtitle("Por favor, preencha o endereço")
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
      return
    }

    if (!isValidListItems()) {
      setInfoModalSubtitle("Por favor, preencha os itens na lista corretamente")
      setInfoModalPositiveBtn("")
      setInfoModalNegativeBtn("Ok")
      setInfoModalOpen(true)
      return
    }

    //
    setLoading(true)
    saveSale()
  }, [client, address, paymentType, listItems])

  const handleClearListProduct = useCallback(() => {
    setClient("");
    setAddress("");
    setPaymentType(PaymentTypeEnum.Debit);
    salesTableRef.current?.clearList();
  }, []);

  const isValidListItems = useCallback(() => {
    const invalidList = listItems.some(item => item.product && (!item.count || item.count === 0))
    const validList = listItems.some(item => item.product && item.count && item.count !== 0)
    return !invalidList && validList
  }, [listItems]);

  useEffect(() => {
    setLoading(true)
    getAllProduts();
  }, []);

  return <>
    < TopPageTitle
      title={"Vendas"}
      icon={faMoneyBill1Wave} />

    <div className="header_margin">
      <SalesTableHeader
        client={client}
        address={address}
        paymentType={paymentType}
        onChangeClient={(client) => {
          setClient(client)
        }}
        onChangeAddress={(addr) => {
          setAddress(addr)
        }}
        onChangePaymentType={(type) => {
          setPaymentType(type)
        }}
      />
    </div>

    <div>
      <SalesTable
        ref={salesTableRef}
        products={listProduct}
        paymentType={paymentType}
        onChangeItems={(list) => {
          setListItems(list)
        }}
      />
    </div>

    <div className="footer_content no_print">

      <div className="footer_buttons">
        <Button
          className="button_size_small"
          onClick={() => { handleCountLine(false) }}
        >
          -
        </Button>
        Linhas
        <Button
          className="button_size_small"
          onClick={() => { handleCountLine(true) }}
        >
          +
        </Button>
      </div>
      <div className="footer_buttons">
        <Button
          className="button_size"
          color='red'
          onClick={() => { handleClearListProduct() }}
        >
          Limpar
        </Button>
        <Button
          className="button_size"
          onClick={() => window.print()}
        >
          Imprimir
        </Button>
        <Button
          className="button_size"
          color='blue'
          onClick={() => {
            handleSaveAndPrint()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>

    <InfoModal
      open={infoModalOpen}
      title='Atenção'
      subtitle={infoModalSubtitle}
      positiveBtnText={infoModalPositiveBtn}
      negativeBtnText={infoModalNegativeBtn}
      onPositiveBtn={() => {
        setInfoModalOpen(false)
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

export {
  SalesPage
}