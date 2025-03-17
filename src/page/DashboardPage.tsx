import React from 'react';
import { TopPageTitle } from '../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';

const DashboardPage = () => <>
  <TopPageTitle
    title={"Dashboard"}
    icon={faChartColumn}
  />
  <p>
    Dashboard page
  </p>

  {/* <Link to="/" className="top_header_product">
    <div className="top_header_product_title">NOME DA EMPRESA</div>
    <div className="top_header_product_subtitle">PORTAL DO LICENCIADO</div>
  </Link> */}
</>

export {
  DashboardPage
}