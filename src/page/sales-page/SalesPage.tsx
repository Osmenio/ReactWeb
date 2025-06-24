import React, { useCallback, useRef, useState } from 'react';
import { SalesTableHeader, TopPageTitle } from '../../component';
import { SalesTable } from '../../component/sales-table/SalesTable';
import { Button } from 'semantic-ui-react';
import "./SalesPage.scss"
import { PaymentTypeEnum } from '../../models/payment-type.enum';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { ItemSaleModel } from '../../models';
import { UserModal, UserModalProps } from '../../component/user-modal/UserModal';

const SalesPage = () => {

  const salesTableRef = useRef<{
    clearList: () => void,
    updateNumLines: (isAdd: boolean) => void
  }>(null);

  const [client, setClient] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(PaymentTypeEnum.Cash);
  const [listItems, setListItems] = useState<ItemSaleModel[]>([]);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalSubtitle, setUserModalSubtitle] = useState('');
  const [userModalPositiveBtn, setUserModalPositiveBtn] = useState('');
  const [userModalNegativeBtn, setUserModalNegativeBtn] = useState('');

  const handleCountLine = useCallback((isAdd: boolean) => {
    salesTableRef.current?.updateNumLines(isAdd);
  }, []);

  const handleSaveAndPrint = useCallback(() => {

    if (!client) {
      setUserModalSubtitle("Por favor, preencha o nome do cliente")
      setUserModalPositiveBtn("")
      setUserModalNegativeBtn("Ok")
      setUserModalOpen(true)
      return
    }

    if (!address) {
      setUserModalSubtitle("Por favor, preencha o endereço")
      setUserModalPositiveBtn("")
      setUserModalNegativeBtn("Ok")
      setUserModalOpen(true)
      return
    }

    if (!isValidListItems()) {
      setUserModalSubtitle("Por favor, preencha os itens na lista corretamente")
      setUserModalPositiveBtn("")
      setUserModalNegativeBtn("Ok")
      setUserModalOpen(true)
      return
    }

    //
    handleClearListProduct()
    setUserModalSubtitle("Vendas processadas com sucesso")
    setUserModalPositiveBtn("Ok")
    setUserModalNegativeBtn("")
    setUserModalOpen(true)

  }, [client, address, paymentType, listItems])

  const handleClearListProduct = useCallback(() => {
    setClient("");
    setAddress("");
    setPaymentType(PaymentTypeEnum.Cash);
    salesTableRef.current?.clearList();
  }, []);

  const isValidListItems = useCallback(() => {
    console.log(`isValidListItems:`, listItems)
    // listItems.forEach(item => {
    //   if (item.product && item.count && item.count == 0) {
    //     return false
    //   }
    // })
    // return true

    const invalidList = listItems.some(item => item.product && (!item.count || item.count === 0))
    const validList = listItems.some(item => item.product && item.count && item.count !== 0)
    return !invalidList && validList
  }, [listItems]);

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
        // numLine={countLine}
        paymentType={paymentType}
        onChangeItems={(list) => {
          // console.log(`onChangeItems:`, list)
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
            // setUserModalOpen(true)
          }}

        >
          Salvar e Imprimir
        </Button>
      </div>
    </div>

    <UserModal
      open={userModalOpen}
      title='Atenção'
      subtitle={userModalSubtitle}
      positiveBtnText={userModalPositiveBtn}
      negativeBtnText={userModalNegativeBtn}
      // neutralBtnText='Neutro'
      onPositiveBtn={() => {
        setUserModalOpen(false)
      }}
      onNegativeBtn={() => {
        setUserModalOpen(false)
      }}
    // onNeutralBtn={() => {
    //   setUserModalOpen(false)
    // }}
    />

    {/* <UserModal
      {...userModalProps}
    /> */}
  </>
}

export {
  SalesPage
}