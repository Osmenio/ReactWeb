import React, { useCallback, useEffect, useState } from 'react';
import { TopPageTitle } from '../component';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import { Button } from 'semantic-ui-react';
import { ItemSaleModel, PaymentTypeEnum, ProductModel, ProductStatusEnum, SaleModel, UserModel } from '../models';
import { ProductService, SaleService, UserService } from '../services';

const DashboardPage = () => {

  return <>
    <TopPageTitle
      title={"Dashboard"}
      icon={faChartColumn}
    />
    <p>
      Dashboard page
    </p>

    {/* <Button
      className="modal_btn"
      onClick={handleOnClick}
      color="blue">
      Entrar
    </Button> */}
  </>
}
export {
  DashboardPage
}