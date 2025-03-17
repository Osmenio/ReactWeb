import React from 'react';
import { Link, Navigate } from "react-router-dom"
import { TopPageTitle } from '../component';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';

const ProductsPage = () => <>
  <TopPageTitle
    title={"Produtos"}
    icon={faBoxesStacked}
  />

  <p>
    Products page
  </p>

</>

export {
  ProductsPage
}