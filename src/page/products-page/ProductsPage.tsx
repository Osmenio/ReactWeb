import { useCallback, useEffect, useState } from 'react';
import { InfoModal, ProductModal, ProductsTable, TopPageTitle } from '../../component';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import "./ProductsPage.scss"
import { ProductModel } from '../../models/ProductModel';
import { useSessionContext } from '../../providers';
import { ActionEnum, ProductStatusEnum, UserProfileEnum } from '../../models';
import { ProductService } from '../../services';

const productStatus = Object.entries(ProductStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const ProductsPage = () => {
  const { session } = useSessionContext();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProductStatusEnum>();
  const [listProduct, setListProduct] = useState<ProductModel[]>([]);
  const [listProductFilter, setListProductFilter] = useState<ProductModel[]>([]);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalSubtitle, setInfoModalSubtitle] = useState('');
  const [infoModalPositiveBtn, setInfoModalPositiveBtn] = useState('');
  const [infoModalNegativeBtn, setInfoModalNegativeBtn] = useState('');

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalPositiveBtn, setProductModalPositiveBtn] = useState('');
  const [productModalNegativeBtn, setProductModalNegativeBtn] = useState('');

  const [editProduct, setEditProduct] = useState<ProductModel | undefined>();
  const [action, setAction] = useState(ActionEnum.None);

  const handleFilterProducts = useCallback(() => {
    const list = (search.trim() === "" && !status)
      ? listProduct
      : listProduct.filter(p => {
        const matchDescription = search.trim() === "" || p.description.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !status || p.status === status;
        return matchDescription && matchStatus;
      });
    setListProductFilter(list)
  }, [listProduct, search, status]);

  const handleEditProduct = useCallback(() => {
    setProductModalPositiveBtn("Salvar")
    setProductModalNegativeBtn("Cancelar")
    setProductModalOpen(true)
  }, []);

  const getAllProduts = async () => {
    const { products, error } = await ProductService.getAll();
    if (error) {
      console.log(`getAllProduts`, error)
      setAction(ActionEnum.None)
      setInfoModalSubtitle(`Falha ao carregar os produtos`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    } else {
      setListProduct(products || []);
      setListProductFilter(products || []);
    }
  };

  const addProduct = async (product: ProductModel) => {
    const error = await ProductService.add(product);
    if (error) {
      console.log(`addProduct`, error)
      setAction(ActionEnum.None)
      setInfoModalSubtitle(`Falha ao salvar o produto`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    }
    getAllProduts()
  };

  const updateProduct = async (product: ProductModel) => {
    const { error } = await ProductService.update(product);
    if (error) {
      console.log(`updateProduct:`, error)
      setAction(ActionEnum.None)
      setInfoModalSubtitle(`Falha ao atualizar o produto`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    }
    getAllProduts()
  };

  useEffect(() => {
    handleFilterProducts();
  }, [search, status]);


  useEffect(() => {
    getAllProduts();
  }, []);

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

      {session.user?.profile === UserProfileEnum.Admin &&
        <Button
          className="products_button"
          color='blue'
          onClick={() => {
            setAction(ActionEnum.Add)
            setEditProduct(undefined)
            setProductModalPositiveBtn("Salvar")
            setProductModalNegativeBtn("Cancelar")
            setProductModalOpen(true)
          }}
        >
          Adicionar
        </Button>

      }
    </div>

    <div>
      <ProductsTable
        items={listProductFilter}
        onEdit={(item) => {
          setAction(ActionEnum.Update)
          setEditProduct(item)
          handleEditProduct()
        }}
        onDelete={() => {
          setInfoModalSubtitle("Deseja deletar esse produto?\nEssa ação não pode ser desfeita.")
          setInfoModalPositiveBtn("Deletar")
          setInfoModalNegativeBtn("Cancelar")
          setInfoModalOpen(true)
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
        if (action === ActionEnum.Add) {
          addProduct(item)
        } else {
          updateProduct(item)
        }
      }}
      onNegativeBtn={() => {
        setProductModalOpen(false)
      }}
    />


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
  </>
}

export { ProductsPage }