import React, { useCallback, useRef, useState } from 'react';
import { SalesTableHeader, TextInput, TopPageTitle } from '../../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import { SalesTable } from '../../component/sales-table/SalesTable';
import { Button } from 'semantic-ui-react';
import "./SalesPage.scss"

const SalesPage = () => {

  const printRef = useRef<HTMLDivElement>(null);
  const [countLine, setCountLine] = useState<number>(5);

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

  return <>
    < TopPageTitle
      title={"Vendas"}
      icon={faChartColumn} />

    <div className="header_margin">
      <SalesTableHeader />
    </div>

    <div>
      <SalesTable
        numLine={countLine}
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
          onClick={() => { }}
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
          onClick={() => { }}

        >
          Imprimir e Salvar
        </Button>
      </div>
    </div>
  </>
}

export {
  SalesPage
}