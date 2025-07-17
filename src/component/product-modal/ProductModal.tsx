import { Modal, Button, Input, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react';
import './ProductModal.scss';
import { useCallback, useEffect, useState } from 'react';
import { ProductStatusEnum } from '../../models/product-status.enum';
import { ProductModel } from '../../models';
import { decimalFormat } from '../../utils/format-utils';

interface DecimalInputProps {
  value: string;
  error: string
  onChange?: (string) => void;
}
const DecimalInput = ({
  value,
  error,
  onChange = () => { },
}: DecimalInputProps) => {
  return (
    <div>

      <Input
        error={error.trim() !== ""}
        className="product_modal_input"
        fluid
        placeholder="0,00"
        value={value}
        onKeyDown={(event) => {
          const { key, currentTarget } = event;
          const value = currentTarget.value;

          const isNumber = /^[0-9]$/.test(key);
          const isComma = key === ',';
          const hasComma = value.includes(',');
          const isBackspace = key === 'Backspace';
          const decimalPart = value.split(',')[1] ?? '';
          const tooManyDecimals = hasComma && decimalPart.length >= 2;

          if (!isBackspace && ((!isNumber && !isComma) || (isComma && hasComma) || tooManyDecimals)) {
            event.preventDefault();
          }
        }}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        onBlur={(event) => {
          const value = parseFloat(event.target.value.replace(',', '.'));
          if (!isNaN(value)) {
            onChange(value.toFixed(2).replace('.', ','))
          }
        }}
      ></Input>
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
  color: 'red',
}));

interface ProductModalProps {
  open: boolean;
  title: string;
  item?: ProductModel;
  positiveBtnText?: string;
  negativeBtnText?: string;
  onPositiveBtn?: (ProductModel) => void;
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
  const [buyPrice, setBuyPrice] = useState("");
  const [priceOne, setPriceOne] = useState("");
  const [priceTwo, setPriceTwo] = useState("");
  const [priceThree, setPriceThree] = useState("");

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
      setBuyPrice(item?.buyPrice && decimalFormat(item?.buyPrice) || "")
      setPriceOne(item?.priceOne && decimalFormat(item?.priceOne) || "")
      setPriceTwo(item?.priceTwo && decimalFormat(item?.priceTwo) || "")
      setPriceThree(item?.priceThree && decimalFormat(item?.priceThree) || "")
    }
  }, [open]);

  // console.log(`ProductModal::${description}:${status}:${buyPrice}:${priceOne}:${priceTwo}:${priceThree}`)
  // console.log(`ProductModal::${item?.description}:${item?.status}:${item?.buyPrice}:${item?.priceOne}:${item?.priceTwo}:${item?.priceThree}`)
  const handleSave = useCallback(() => {
    if (isValidFields()) {
      onPositiveBtn({
        description,
        buyPrice,
        priceOne,
        priceTwo,
        priceThree,
        status,
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
    if (buyPrice.trim() === "") {
      setErrorBuyPrice(error)
      isValid = false
    }
    if (priceOne.trim() === "") {
      setErrorPriceOne(error)
      isValid = false
    }
    if (priceTwo.trim() === "") {
      setErrorPriceTwo(error)
      isValid = false
    }
    if (priceThree.trim() === "") {
      setErrorPriceThree(error)
      isValid = false
    }

    return isValid;
  }, [description, status, buyPrice, priceOne, priceTwo, priceThree]);


  const cleanAll = () => {
    setDescription("")
    setStatus(undefined)
    setBuyPrice("")
    setPriceOne("")
    setPriceTwo("")
    setPriceThree("")

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
            Produto:
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
            Situação:
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
              Valor de Compra:
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
              Valor Pix:
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
              Valor Débito:
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
              Valor Crédito:
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
