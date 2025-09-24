import { Modal, Button, Input, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import './ProductModal.scss';
import { useCallback, useEffect, useState } from 'react';
import { ProductStatusEnum } from '../../models/ProductStatusEnum';
import { ProductModel } from '../../models';
import { decimalFormat, decimalFormatMask } from '../../utils/format-utils';

interface DecimalInputProps {
  value: number;
  error: string
  onChange?: (value: number) => void;
}

const DecimalInput = ({
  value,
  error,
  onChange = () => { },
}: DecimalInputProps) => {
  return (
    <div>
      <Input
        className="product_modal_input"
        fluid
        value={decimalFormat(value)}
        onChange={(event) => {
          let value = event.target.value.replace(/\D/g, "")
          const numeric = parseFloat(value) / 100;
          let input = isNaN(numeric) ? 0 : numeric;
          onChange(input);
        }}
      />
      {error.trim() !== "" && <div style={{ color: 'red' }}>
        {error}
      </div>}
    </div>
  )
}

const productStatus = Object.entries(ProductStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

interface ProductModalProps {
  open: boolean;
  title: string;
  item?: ProductModel;
  positiveBtnText?: string;
  negativeBtnText?: string;
  onPositiveBtn?: (product: ProductModel) => void;
  onNegativeBtn?: () => void;
}

const ProductModal = ({
  open,
  title,
  item,
  positiveBtnText,
  negativeBtnText,
  onPositiveBtn = () => { },
  onNegativeBtn = () => { },
}: ProductModalProps) => {

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProductStatusEnum | undefined>();
  const [buyPrice, setBuyPrice] = useState(0);
  const [priceOne, setPriceOne] = useState(0);
  const [priceTwo, setPriceTwo] = useState(0);
  const [priceThree, setPriceThree] = useState(0);

  const [errorDescription, setErrorDescription] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [errorBuyPrice, setErrorBuyPrice] = useState("");
  const [errorPriceOne, setErrorPriceOne] = useState("");
  const [errorPriceTwo, setErrorPriceTwo] = useState("");
  const [errorPriceThree, setErrorPriceThree] = useState("");

  useEffect(() => {
    if (open) {
      setDescription(item?.description?.trim() || "");
      setStatus(item?.status || undefined)
      setBuyPrice(item?.buyPrice ?? 0)
      setPriceOne(item?.priceOne ?? 0)
      setPriceTwo(item?.priceTwo ?? 0)
      setPriceThree(item?.priceThree ?? 0)
    }
  }, [open]);

  const handleSave = useCallback(() => {
    if (isValidFields()) {
      onPositiveBtn({
        ...(item?.id ? { id: item.id } : { id: 0 }),
        description: description,
        buyPrice: buyPrice,
        priceOne: priceOne,
        priceTwo: priceTwo,
        priceThree: priceThree,
        status: status as ProductStatusEnum,
      })
      cleanAll()
    }
  }, [description, status, buyPrice, priceOne, priceTwo, priceThree]);

  const isValidFields = useCallback(() => {
    const error = "Campo obrigatório"
    let isValid = true

    if (description.trim() === "") {
      setErrorDescription(error)
      isValid = false
    }
    if (status === undefined) {
      setErrorStatus(error)
      isValid = false
    }
    if (buyPrice === 0) {
      setErrorBuyPrice(error)
      isValid = false
    }
    return isValid;
  }, [description, status, buyPrice, priceOne, priceTwo, priceThree]);

  const cleanAll = () => {
    setDescription("")
    setStatus(undefined)
    setBuyPrice(0)
    setPriceOne(0)
    setPriceTwo(0)
    setPriceThree(0)

    setErrorDescription("")
    setErrorStatus("")
    setErrorBuyPrice("")
    setErrorPriceOne("")
    setErrorPriceTwo("")
    setErrorPriceThree("")
  };

  const getStatusColor = (status: ProductStatusEnum): string => {
    switch (status) {
      case ProductStatusEnum.InStock: return 'green';
      case ProductStatusEnum.OutOfStock: return 'red';
      default: return 'inherit';
    }
  };

  return (
    <Modal
      open={open}
      className='product_modal'
    >
      <div className="product_modal_container">
        <div className="product_modal_title">
          {title}
        </div>

        <div>
          <div>
            Produto
          </div>
          <Input
            style={{ marginTop: '5px' }}
            fluid
            value={description}
            error={errorDescription.trim() !== ""}
            placeholder="Descrição"
            onChange={(event) => {
              setDescription(event.target.value)
              setErrorDescription("")
            }}
          />
          {errorDescription.trim() !== "" && <div style={{ color: 'red' }}>
            {errorDescription}
          </div>}

          <div style={{ marginTop: '20px' }}>
            Situação
          </div>
          <Dropdown
            style={{ marginTop: '5px', color: getStatusColor(status ?? ProductStatusEnum.InStock) }}
            placeholder="Situação"
            error={errorStatus.trim() !== ""}
            selection
            value={status}
            options={productStatus}
            onChange={(_, data) => {
              console.log(`onChange::${data.value}`)
              const status = data.value as ProductStatusEnum
              setStatus(status)
              setErrorStatus("")
            }}
          >
            <DropdownMenu>
              <DropdownItem
                value={ProductStatusEnum.InStock}
                style={{ color: 'green' }}
                text={ProductStatusEnum.InStock}
                onClick={() => {
                  setStatus(ProductStatusEnum.InStock)
                }}
              />
              <DropdownItem
                value={ProductStatusEnum.OutOfStock}
                style={{ color: 'red' }}
                text={ProductStatusEnum.OutOfStock}
                onClick={() => {
                  setStatus(ProductStatusEnum.OutOfStock)
                }}
              />
            </DropdownMenu>
          </Dropdown>
          {errorStatus.trim() !== "" && <div style={{ color: 'red' }}>
            {errorStatus}
          </div>}
        </div>

        <div className="product_modal_grid">
          <div style={{ flex: 1 }}>
            <div >
              Valor de Compra
            </div>
            <div>
              <DecimalInput
                value={buyPrice}
                error={errorBuyPrice}
                onChange={(value) => {
                  setBuyPrice(value)
                  setErrorBuyPrice("")
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div>
              Valor Pix
            </div>
            <DecimalInput
              value={priceOne}
              error={errorPriceOne}
              onChange={(value) => {
                setPriceOne(value)
                setErrorPriceOne("")
              }}
            />
          </div>
        </div>

        <div className="product_modal_grid">
          <div style={{ flex: 1 }}>
            <div >
              Valor Débito
            </div>
            <div >
              <DecimalInput
                value={priceTwo}
                error={errorPriceTwo}
                onChange={(value) => {
                  setPriceTwo(value)
                  setErrorPriceTwo("")
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div>
              Valor Crédito
            </div>
            <DecimalInput
              value={priceThree}
              error={errorPriceThree}
              onChange={(value) => {
                setPriceThree(value)
                setErrorPriceThree("")
              }}
            />
          </div>
        </div>
      </div>

      <div className="product_footer_buttons">
        {negativeBtnText && <Button
          className="product_button_size"
          color='red'
          onClick={() => {
            cleanAll()
            onNegativeBtn()
          }}
        >
          {negativeBtnText}
        </Button>}

        {positiveBtnText && <Button
          className="product_button_size"
          color='blue'
          onClick={() => {
            handleSave()
          }}
        >
          {positiveBtnText}
        </Button>}
      </div>
    </Modal>
  );
};

export { ProductModal };