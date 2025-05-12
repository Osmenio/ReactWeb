import React, { useCallback, useRef, useState } from 'react';
import { SalesTableHeader, TopPageTitle } from '../../component';
import { SalesTable } from '../../component/sales-table/SalesTable';
import { Button } from 'semantic-ui-react';
import "./SalesPage.scss"
import { PaymentTypeEnum } from '../../models/payment-type.enum';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

const SalesPage = () => {

  const salesTableRef = useRef<{ clearList: () => void }>(null);

  // const printRef = useRef<HTMLDivElement>(null);
  const [countLine, setCountLine] = useState<number>(5);

  const [client, setClient] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(PaymentTypeEnum.Cash);

  // const [listProduct, setListProduct] = useState<ItemSale[]>([]);

  const handleCountLine = useCallback((isAdd: boolean) => {
    // console.log(`handleCountLine`)
    if (isAdd) {
      setCountLine(prev => {
        return prev + 1
      })
    } else {
      setCountLine(prev => {
        if (prev > 3)
          return prev - 1
        return prev
      })
    }

    // console.log(`handleCountLine.end:${countLine}`)
  }, [countLine, setCountLine])

  const handleSaveAndPrint = useCallback(() => {
    if (client && address && paymentType) {
      console.log(`handleSaveAndPrint:${client}:${address}:${paymentType}`)
    }
    else {
      console.log(`handleSaveAndPrint:null`)
    }
  }, [client, address, paymentType])

  const handleClearListProduct = () => {
    // setListProduct([]);
    salesTableRef.current?.clearList();
  };

  return <>
    < TopPageTitle
      title={"Vendas"}
      icon={faMoneyBill1Wave} />

    <div className="header_margin">
      <SalesTableHeader
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
        numLine={countLine}
        paymentType={paymentType}
        onChangeItems={(list) => {
          console.log(`onChangeItems:`, list)
        }}
      // listProduct={listProduct}
      // setListProduct={setListProduct}
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
          onClick={() => { handleSaveAndPrint() }}

        >
          Salvar e Imprimir
        </Button>
      </div>
    </div>
  </>
}

export {
  SalesPage
}