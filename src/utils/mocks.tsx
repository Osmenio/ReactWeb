


// const [listProduct, setListProduct] = useState<ProductModel[]>([]);
// const [listUser, setListUser] = useState<UserModel[]>([]);

// // const saveProduct = async (product: ProductModel) => {
// //   const error = await ProductService.add(product);
// //   if (error) {
// //     console.log(`addProduct`, error)
// //   } else {
// //     console.log(`addProduct OK`)
// //   }
// // };

// const getAllProduts = async () => {
//   const { products, error } = await ProductService.getAll();
//   if (error) {
//     console.log(`getAllProduts`, error)
//   } else {
//     console.log(`getAllProduts`, products)
//     setListProduct(products || []);
//   }
// };

// const getAllUsers = useCallback(async () => {
//   const { users, error } = await UserService.getAllUser();
//   if (error) {
//     console.log(`getAllUsers`, error)
//   } else {
//     console.log(`getAllUsers`, users)
//     const list = filterAdm(users.sort((a, b) => a.name.localeCompare(b.name)))
//     setListUser(list || []);
//   }
// }, []);

// const saveSale = async (sale: SaleModel) => {
//   const error = await SaleService.add(sale);
//   if (error) {
//     console.log(`saveSale`, error)
//   } else {
//     console.log(`saveSale OK`)
//   }
// };

// const handleOnClick = useCallback(() => {

//   const mockSales = generateMockSales(listUser, listProduct, 200);
//   console.log(`mockSales`, mockSales)

//   // mockSales.forEach(item => {
//   //   saveSale(item)
//   // })

// }, [listUser, listProduct]);

// const filterAdm = (users: UserModel[]) => {
//   return users.filter(p => p.name !== "Adm")
// }

// useEffect(() => {
//   console.log(`useEffect`)
//   getAllProduts()
//   getAllUsers();
// }, []);




// const productsMock: ProductModel[] = [
//   {
//     id: 1,
//     description: "Smartphone Samsung Galaxy A54",
//     buyPrice: 1400,
//     priceOne: 1899,
//     priceTwo: 1955,
//     priceThree: 2050,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 2,
//     description: "Notebook Dell Inspiron 15",
//     buyPrice: 2800,
//     priceOne: 3599,
//     priceTwo: 3705,
//     priceThree: 3890,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 3,
//     description: "Smart TV LG 50'' 4K",
//     buyPrice: 2000,
//     priceOne: 2699,
//     priceTwo: 2780,
//     priceThree: 2915,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 4,
//     description: "Fone Bluetooth JBL Tune 510BT",
//     buyPrice: 200,
//     priceOne: 349,
//     priceTwo: 360,
//     priceThree: 378,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 5,
//     description: "Console PlayStation 5",
//     buyPrice: 3600,
//     priceOne: 4499,
//     priceTwo: 4635,
//     priceThree: 4855,
//     status: ProductStatusEnum.OutOfStock,
//   },
//   {
//     id: 6,
//     description: "Mouse Gamer Logitech G203",
//     buyPrice: 80,
//     priceOne: 149,
//     priceTwo: 154,
//     priceThree: 161,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 7,
//     description: "Teclado Mecânico Redragon Kumara",
//     buyPrice: 120,
//     priceOne: 229,
//     priceTwo: 236,
//     priceThree: 247,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 8,
//     description: "Monitor Gamer Acer 24'' Full HD",
//     buyPrice: 650,
//     priceOne: 999,
//     priceTwo: 1029,
//     priceThree: 1079,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 9,
//     description: "Tablet Samsung Galaxy Tab A8",
//     buyPrice: 900,
//     priceOne: 1349,
//     priceTwo: 1390,
//     priceThree: 1455,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 10,
//     description: "Câmera GoPro Hero 11",
//     buyPrice: 1600,
//     priceOne: 2499,
//     priceTwo: 2575,
//     priceThree: 2695,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 11,
//     description: "Impressora Multifuncional HP Ink Tank",
//     buyPrice: 700,
//     priceOne: 1149,
//     priceTwo: 1185,
//     priceThree: 1240,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 12,
//     description: "Caixa de Som JBL Charge 5",
//     buyPrice: 500,
//     priceOne: 899,
//     priceTwo: 926,
//     priceThree: 971,
//     status: ProductStatusEnum.OutOfStock,
//   },
//   {
//     id: 13,
//     description: "Headset HyperX Cloud Stinger",
//     buyPrice: 250,
//     priceOne: 429,
//     priceTwo: 442,
//     priceThree: 463,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 14,
//     description: "Placa de Vídeo RTX 3060 12GB",
//     buyPrice: 2100,
//     priceOne: 2999,
//     priceTwo: 3089,
//     priceThree: 3235,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 15,
//     description: "HD Externo Seagate 2TB",
//     buyPrice: 280,
//     priceOne: 499,
//     priceTwo: 514,
//     priceThree: 539,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 16,
//     description: "SSD Kingston NV2 1TB NVMe",
//     buyPrice: 250,
//     priceOne: 399,
//     priceTwo: 411,
//     priceThree: 430,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 17,
//     description: "Drone DJI Mini 3",
//     buyPrice: 3200,
//     priceOne: 4399,
//     priceTwo: 4530,
//     priceThree: 4755,
//     status: ProductStatusEnum.OutOfStock,
//   },
//   {
//     id: 18,
//     description: "Kindle Paperwhite 11ª Geração",
//     buyPrice: 350,
//     priceOne: 699,
//     priceTwo: 720,
//     priceThree: 755,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 19,
//     description: "Projetor Epson PowerLite",
//     buyPrice: 1600,
//     priceOne: 2499,
//     priceTwo: 2575,
//     priceThree: 2695,
//     status: ProductStatusEnum.InStock,
//   },
//   {
//     id: 20,
//     description: "Apple iPad 9ª Geração 64GB",
//     buyPrice: 2200,
//     priceOne: 3099,
//     priceTwo: 3190,
//     priceThree: 3345,
//     status: ProductStatusEnum.InStock,
//   },
// ];

// const clients = [
//     "Maria Santa",
//     "João Magno",
//     "Carlos Main",
//     "Ana Clara",
//     "Beatriz Paiva",
//     "Pedro Calvo",
//     "Tiago Silva",
//     "Manoela Costa",
//     "Marcelo Domingos",
//     "Tino Pascal",
// ];
// const addresses = [
//     "Rua das Flores, 123",
//     "Av. Paulista, 1000",
//     "Rua A, 45",
//     "Rua B, 88",
//     "Av. Brasil, 900",
//     "Rua Pedro Pereira, 321",
//     "Rua Algusta Campos, 34",
//     "Av. Sampaio Core, 78",
//     "Av. Dom Luna, 910",
// ];

// /**
//  * Gera vendas randômicas
//  */
// function generateMockSales(
//     users: UserModel[],
//     products: ProductModel[],
//     // numDays: number = 7, // quantidade de dias de histórico
//     // salesPerDay: number = 5 // vendas por dia
//     numSales: number = 100 // número total de vendas que deseja gerar
// ): SaleModel[] {

//     console.log(`users`, users)
//     console.log(`products`, products)

//     let saleId = 1;
//     let itemId = 1;
//     const sales: SaleModel[] = [];
//     const startDate = new Date("2025-01-01T00:00:00").getTime();
//     const endDate = new Date("2025-12-31T23:59:59").getTime();

//     // for (let d = 0; d < numDays; d++) {

//     for (let s = 0; s < numSales; s++) {
//         const randomUser = users[Math.floor(Math.random() * users.length)];
//         const paymentType = Object.values(PaymentTypeEnum)[
//             Math.floor(Math.random() * 3)
//         ];
//         // const date = new Date();
//         // date.setDate(date.getDate() - d);
//         // date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
//         const randomTimestamp =
//             startDate + Math.floor(Math.random() * (endDate - startDate));

//         // Gera itens da venda
//         const numItems = Math.floor(Math.random() * 4) + 1; // entre 1 e 4 produtos
//         const chosenProducts = [...products]
//             .sort(() => 0.5 - Math.random())
//             .slice(0, numItems);

//         const itemsSale: ItemSaleModel[] = chosenProducts.map((p) => {
//             const count = Math.floor(Math.random() * 3) + 1; // entre 1 e 3 unidades
//             const unitPrice =
//                 paymentType === PaymentTypeEnum.Pix
//                     ? p.priceOne
//                     : paymentType === PaymentTypeEnum.Debit
//                         ? p.priceTwo
//                         : p.priceThree;

//             const discount = Math.random() < 0.2 ? Math.floor(Math.random() * 30) : undefined; // até 30 de desconto em 20% dos casos

//             return {
//                 id: itemId++,
//                 product: p,
//                 buyPrice: p.buyPrice,
//                 count,
//                 unitPrice,
//                 discount,
//             };
//         });

//         sales.push({
//             id: saleId++,
//             user: randomUser,
//             client: clients[Math.floor(Math.random() * clients.length)],
//             address: addresses[Math.floor(Math.random() * addresses.length)],
//             paymentType,
//             timestamp: randomTimestamp,
//             itemsSale,
//         });
//     }
//     // }

//     return sales;
// }