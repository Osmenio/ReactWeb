import React, { useRef } from 'react';
import { TextInput, TopPageTitle } from '../../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import { SalesTable } from '../../component/sales-table/SalesTable';
import { Button } from 'semantic-ui-react';
import "./SalesPage.scss"

const SalesPage = () => {
  const printRef = useRef<HTMLDivElement>(null);

  return <>
    < TopPageTitle
      title={"Vendas"}
      icon={faChartColumn} />

      <TextInput>
        
      </TextInput>

    <div>
      <SalesTable>

      </SalesTable>
    </div>

    <div className="footer_buttons no_print">
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
  </>
}

export {
  SalesPage
}