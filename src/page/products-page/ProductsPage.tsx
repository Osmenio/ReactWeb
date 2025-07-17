import React, { useCallback, useEffect, useState } from 'react';
import { ProductModal, ProductsTable, TopPageTitle, UserModal } from '../../component';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import { ListProductsMock } from '../../mock/product.mock';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import "./ProductsPage.scss"
import { ProductModel } from '../../models/product.model';
import { ProductStatusEnum } from '../../models/product-status.enum';

const productStatus = Object.entries(ProductStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const ProductsPage = () => {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProductStatusEnum>();
  const [listProduct, setListProduct] = useState<ProductModel[]>(ListProductsMock);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalSubtitle, setUserModalSubtitle] = useState('');
  const [userModalPositiveBtn, setUserModalPositiveBtn] = useState('');
  const [userModalNegativeBtn, setUserModalNegativeBtn] = useState('');

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalPositiveBtn, setProductModalPositiveBtn] = useState('');
  const [productModalNegativeBtn, setProductModalNegativeBtn] = useState('');

  const [editProduct, setEditProduct] = useState<ProductModel | undefined>();

  const handleFilterProducts = useCallback(() => {
    const list = (search.trim() === "" && !status)
      ? ListProductsMock
      : ListProductsMock.filter(p => {
        const matchDescription = search.trim() === "" || p.description.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !status || p.status === status;
        return matchDescription && matchStatus;
      });
    setListProduct(list)
  }, [search, status]);

  const handleEditProduct = useCallback(() => {
    setProductModalPositiveBtn("Salvar")
    setProductModalNegativeBtn("Cancelar")
    setProductModalOpen(true)
  }, []);

  useEffect(() => {
    handleFilterProducts();
  }, [search, status]);

  return <>
    <TopPageTitle
      title={"Produtos"}
      icon={faBoxesStacked}
    />

    <div
      className="products_header"
    >
      <div>
        <Input
          className="products_search"
          placeholder="Buscar ..."
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        ></Input>

        <Dropdown
          style={{ marginLeft: '10px' }}
          clearable
          placeholder="Situação"
          selection
          options={productStatus}
          onChange={(_, data) => {
            const status = data.value as ProductStatusEnum
            setStatus(status)
          }}
        />

      </div>

      <Button
        className="products_button"
        color='blue'
        onClick={() => {
          setEditProduct(undefined)
          setProductModalPositiveBtn("Salvar")
          setProductModalNegativeBtn("Cancelar")
          setProductModalOpen(true)
        }}
      >
        Adicionar
      </Button>
    </div>

    <div>
      <ProductsTable
        items={listProduct}

        onEdit={(item) => {
          setEditProduct(item)
          handleEditProduct()
        }}
        onDelete={() => {
          setUserModalSubtitle("Deseja deletar esse produto?\nEssa ação não pode ser desfeita.")
          setUserModalPositiveBtn("Deletar")
          setUserModalNegativeBtn("Cancelar")
          setUserModalOpen(true)
        }}
      />
    </div>

    <ProductModal
      open={productModalOpen}
      title={editProduct ? 'Editar produto' : 'Adicionar produto'}
      item={editProduct}
      positiveBtnText={productModalPositiveBtn}
      negativeBtnText={productModalNegativeBtn}
      onPositiveBtn={(item) => {
        console.log(`item`, item)
        setProductModalOpen(false)
      }}
      onNegativeBtn={() => {
        setProductModalOpen(false)
      }}
    />


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

  </>
}

export {
  ProductsPage
}