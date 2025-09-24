import { Button } from 'semantic-ui-react';
import { UserModel, ProductModel, SaleModel, PaymentTypeEnum, ItemSaleModel } from '../models';
import { useCallback, useEffect, useState } from 'react';
import { ProductService, UserService, SaleService } from '../services';

const clients = [
  "Maria Santa",
  "João Magno",
  "Carlos Main",
  "Ana Clara",
  "Beatriz Paiva",
  "Pedro Calvo",
  "Tiago Silva",
  "Manoela Costa",
  "Marcelo Domingos",
  "Tino Pascal",
];
const addresses = [
  "Rua das Flores, 123",
  "Av. Paulista, 1000",
  "Rua A, 45",
  "Rua B, 88",
  "Av. Brasil, 900",
  "Rua Pedro Pereira, 321",
  "Rua Algusta Campos, 34",
  "Av. Sampaio Core, 78",
  "Av. Dom Luna, 910",
];

/**
 * Gera vendas randômicas
 */
function generateMockSales(
  users: UserModel[],
  products: ProductModel[],
  // numDays: number = 7, // quantidade de dias de histórico
  // salesPerDay: number = 5 // vendas por dia
  numSales: number = 100 // número total de vendas que deseja gerar
): SaleModel[] {

  console.log(`users`, users)
  console.log(`products`, products)

  let saleId = 1;
  let itemId = 1;
  const sales: SaleModel[] = [];
  const startDate = new Date("2025-01-01T00:00:00").getTime();
  const endDate = new Date("2025-01-31T23:59:59").getTime();

  // for (let d = 0; d < numDays; d++) {

  for (let s = 0; s < numSales; s++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const paymentType = Object.values(PaymentTypeEnum)[
      Math.floor(Math.random() * 3)
    ];
    // const date = new Date();
    // date.setDate(date.getDate() - d);
    // date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const randomTimestamp =
      startDate + Math.floor(Math.random() * (endDate - startDate));

    // Gera itens da venda
    const numItems = Math.floor(Math.random() * 4) + 1; // entre 1 e 4 produtos
    const chosenProducts = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, numItems);

    const itemsSale: ItemSaleModel[] = chosenProducts.map((p) => {
      const count = Math.floor(Math.random() * 3) + 1; // entre 1 e 3 unidades
      const unitPrice =
        paymentType === PaymentTypeEnum.Pix
          ? p.priceOne
          : paymentType === PaymentTypeEnum.Debit
            ? p.priceTwo
            : p.priceThree;

      const discount = Math.random() < 0.2 ? Math.floor(Math.random() * 30) : undefined; // até 30 de desconto em 20% dos casos

      return {
        id: itemId++,
        product: p,
        buyPrice: p.buyPrice,
        count,
        unitPrice,
        discount,
      };
    });

    sales.push({
      id: saleId++,
      user: randomUser,
      client: clients[Math.floor(Math.random() * clients.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)],
      paymentType,
      timestamp: randomTimestamp,
      itemsSale,
    });
  }
  // }

  return sales;
}
const MockPage = () => {

  const [listProduct, setListProduct] = useState<ProductModel[]>([]);
  const [listUser, setListUser] = useState<UserModel[]>([]);

  const getAllProduts = async () => {
    const { products, error } = await ProductService.getAll();
    if (error) {
      console.log(`getAllProduts`, error)
    } else {
      console.log(`getAllProduts`, products)
      setListProduct(products || []);
    }
  };

  const getAllUsers = useCallback(async () => {
    const { users, error } = await UserService.getAllUser();
    if (error) {
      console.log(`getAllUsers`, error)
    } else {
      console.log(`getAllUsers`, users)
      const list = filterAdm(users.sort((a, b) => a.name.localeCompare(b.name)))
      setListUser(list || []);
    }
  }, []);

  const saveSale = async (sale: SaleModel) => {
    const error = await SaleService.add(sale);
    if (error) {
      console.log(`saveSale`, error)
    } else {
      console.log(`saveSale OK`)
    }
  };

  const handleOnClick = useCallback(() => {

    const mockSales = generateMockSales(listUser, listProduct, 15000);
    console.log(`mockSales`, mockSales)

    mockSales.forEach(item => {
      saveSale(item)
    })

  }, [listUser, listProduct]);

  const filterAdm = (users: UserModel[]) => {
    return users.filter(p => p.name !== "Adm")
  }

  useEffect(() => {
    console.log(`useEffect`)
    getAllProduts()
    getAllUsers();
  }, []);




  return (
    <>
      <Button
        className="products_button"
        color='blue'
        onClick={() => {
          handleOnClick()
        }}
      >
        Adicionar
      </Button>
    </>
  )
}

export { MockPage }