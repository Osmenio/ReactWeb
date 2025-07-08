import { PaymentTypeEnum, SaleModel } from "../models"

// export const ListSaleMock: SaleModel[] = [
//     {
//         saleman: "Marcia",
//         client: "Cleiton",
//         address: "Rua das almas",
//         paymentType: PaymentTypeEnum.Pix,
//         // date: Date().toLocaleDateString('pt-BR'),
//         date: "12/07/2025",
//         time: "15:37",
//         itemsSale: [{
//             product: "Mouse",
//             count: 2,
//             buyPrice: 3.4,
//             unitPrice: 22.3,
//             discount: 0,
//             subtotal: 4.3,
//         }, {
//             product: "Teclado",
//             count: 1,
//             buyPrice: 34.43,
//             unitPrice: 43.12,
//             discount: 0,
//             subtotal: 90.3,
//         }],
//     }, {
//         saleman: "Carlos",
//         client: "Maria",
//         address: "Av das flores",
//         paymentType: PaymentTypeEnum.Debit,
//         // date: Date(),
//         date: "12/07/2025",
//         time: "09:12",
//         itemsSale: [{
//             product: "Notebook",
//             count: 2,
//             buyPrice: 567.89,
//             unitPrice: 632.3,
//             discount: 33,
//             subtotal: 4821.3,
//         }, {
//             product: "Cadeira escritório",
//             count: 1,
//             buyPrice: 12.12,
//             unitPrice: 43.12,
//             discount: 0,
//             subtotal: 90.3,
//         }, {
//             product: "Monitor",
//             count: 3,
//             buyPrice: 77.00,
//             unitPrice: 77.23,
//             discount: 12,
//             subtotal: 436.3,
//         }],
//     }
// ]



export const ListSaleMock: SaleModel[] = [
    {
        saleman: "Marcia",
        client: "Cleiton",
        address: "Rua das Almas",
        paymentType: PaymentTypeEnum.Pix,
        date: "12/07/2025",
        time: "15:37",
        itemsSale: [
            { product: "Mouse", count: 2, buyPrice: 10, unitPrice: 25, discount: 0, subtotal: 50 },
            { product: "Teclado", count: 1, buyPrice: 20, unitPrice: 45, discount: 5, subtotal: 40 },
        ],
    },
    {
        saleman: "Carlos",
        client: "Fernanda",
        address: "Av. Brasil, 123",
        paymentType: PaymentTypeEnum.Credit,
        date: "10/07/2025",
        time: "11:12",
        itemsSale: [
            { product: "Monitor 24", count: 1, buyPrice: 450, unitPrice: 700, discount: 50, subtotal: 650 },
            { product: "Cabo HDMI", count: 3, buyPrice: 8, unitPrice: 15, discount: 0, subtotal: 45 },
        ],
    },
    {
        saleman: "Juliana",
        client: "Rafael",
        address: "Rua do Comércio, 789",
        paymentType: PaymentTypeEnum.Debit,
        date: "09/07/2025",
        time: "16:50",
        itemsSale: [
            { product: "Notebook", count: 1, buyPrice: 2800, unitPrice: 3500, discount: 100, subtotal: 3400 },
            { product: "Mochila para Notebook", count: 1, buyPrice: 60, unitPrice: 120, discount: 20, subtotal: 100 },
            { product: "Mouse sem fio", count: 1, buyPrice: 15, unitPrice: 35, discount: 0, subtotal: 35 },
        ],
    },
    {
        saleman: "Eduardo",
        client: "Tatiane",
        address: "Praça Central, 55",
        paymentType: PaymentTypeEnum.Debit,
        date: "08/07/2025",
        time: "13:20",
        itemsSale: [
            { product: "Impressora", count: 1, buyPrice: 400, unitPrice: 600, discount: 0, subtotal: 600 },
            { product: "Papel A4 (500 folhas)", count: 2, buyPrice: 20, unitPrice: 35, discount: 5, subtotal: 65 },
        ],
    },
    {
        saleman: "Fernanda",
        client: "Roberto",
        address: "Alameda das Palmeiras, 99",
        paymentType: PaymentTypeEnum.Pix,
        date: "07/07/2025",
        time: "10:05",
        itemsSale: [
            { product: "Webcam HD", count: 1, buyPrice: 60, unitPrice: 100, discount: 10, subtotal: 90 },
        ],
    },
    {
        saleman: "Paula",
        client: "Luciano",
        address: "Rua Projetada, 12",
        paymentType: PaymentTypeEnum.Credit,
        date: "06/07/2025",
        time: "09:40",
        itemsSale: [
            { product: "Hub USB", count: 2, buyPrice: 15, unitPrice: 30, discount: 0, subtotal: 60 },
            { product: "Cabo de Rede", count: 3, buyPrice: 10, unitPrice: 25, discount: 5, subtotal: 60 },
        ],
    },
    {
        saleman: "Lucas",
        client: "Jéssica",
        address: "Av. Dom Pedro II",
        paymentType: PaymentTypeEnum.Credit,
        date: "05/07/2025",
        time: "14:25",
        itemsSale: [
            { product: "HD 1TB", count: 1, buyPrice: 180, unitPrice: 250, discount: 20, subtotal: 230 },
        ],
    },
    {
        saleman: "Joana",
        client: "Thiago",
        address: "Rua Verde, 88",
        paymentType: PaymentTypeEnum.Debit,
        date: "04/07/2025",
        time: "17:10",
        itemsSale: [
            { product: "Fonte 500W", count: 1, buyPrice: 120, unitPrice: 180, discount: 10, subtotal: 170 },
        ],
    },
    {
        saleman: "Márcio",
        client: "Ana Paula",
        address: "Rua das Flores, 44",
        paymentType: PaymentTypeEnum.Pix,
        date: "03/07/2025",
        time: "12:00",
        itemsSale: [
            { product: "Cadeira Gamer", count: 1, buyPrice: 700, unitPrice: 900, discount: 50, subtotal: 850 },
        ],
    },
    {
        saleman: "Tatiane",
        client: "Ricardo",
        address: "Rua do Sol, 32",
        paymentType: PaymentTypeEnum.Credit,
        date: "02/07/2025",
        time: "18:15",
        itemsSale: [
            { product: "Mesa digitalizadora", count: 1, buyPrice: 200, unitPrice: 350, discount: 0, subtotal: 350 },
        ],
    },
    {
        saleman: "Henrique",
        client: "Juliana",
        address: "Av. Norte, 300",
        paymentType: PaymentTypeEnum.Credit,
        date: "01/07/2025",
        time: "08:45",
        itemsSale: [
            { product: "Pendrive 64GB", count: 2, buyPrice: 25, unitPrice: 50, discount: 5, subtotal: 90 },
        ],
    },
    {
        saleman: "Beatriz",
        client: "Luiz",
        address: "Rua do Mercado",
        paymentType: PaymentTypeEnum.Debit,
        date: "30/06/2025",
        time: "11:05",
        itemsSale: [
            { product: "Estabilizador", count: 1, buyPrice: 120, unitPrice: 200, discount: 10, subtotal: 190 },
        ],
    },
    {
        saleman: "Vitor",
        client: "Larissa",
        address: "Rua 10",
        paymentType: PaymentTypeEnum.Pix,
        date: "29/06/2025",
        time: "13:25",
        itemsSale: [
            { product: "SSD 512GB", count: 1, buyPrice: 300, unitPrice: 420, discount: 20, subtotal: 400 },
        ],
    },
    {
        saleman: "Aline",
        client: "Marcos",
        address: "Rua Central",
        paymentType: PaymentTypeEnum.Credit,
        date: "28/06/2025",
        time: "16:00",
        itemsSale: [
            { product: "Switch 8 portas", count: 1, buyPrice: 90, unitPrice: 150, discount: 10, subtotal: 140 },
        ],
    },
    {
        saleman: "Danilo",
        client: "Fábio",
        address: "Rua da Torre",
        paymentType: PaymentTypeEnum.Debit,
        date: "27/06/2025",
        time: "15:10",
        itemsSale: [
            { product: "Webcam Full HD", count: 1, buyPrice: 80, unitPrice: 120, discount: 0, subtotal: 120 },
        ],
    },
    {
        saleman: "Priscila",
        client: "Camila",
        address: "Av. Largo da Paz",
        paymentType: PaymentTypeEnum.Debit,
        date: "26/06/2025",
        time: "09:30",
        itemsSale: [
            { product: "Scanner", count: 1, buyPrice: 300, unitPrice: 450, discount: 0, subtotal: 450 },
        ],
    },
    {
        saleman: "Leandro",
        client: "João",
        address: "Rua das Laranjeiras",
        paymentType: PaymentTypeEnum.Credit,
        date: "25/06/2025",
        time: "11:50",
        itemsSale: [
            { product: "Cooler CPU", count: 1, buyPrice: 50, unitPrice: 90, discount: 10, subtotal: 80 },
        ],
    },
    {
        saleman: "Renata",
        client: "Diego",
        address: "Travessa Sul",
        paymentType: PaymentTypeEnum.Debit,
        date: "24/06/2025",
        time: "14:00",
        itemsSale: [
            { product: "Placa-mãe", count: 1, buyPrice: 500, unitPrice: 750, discount: 50, subtotal: 700 },
        ],
    },
    {
        saleman: "Luciana",
        client: "Helena",
        address: "Rua Esperança",
        paymentType: PaymentTypeEnum.Debit,
        date: "23/06/2025",
        time: "17:20",
        itemsSale: [
            { product: "Adaptador USB-C", count: 2, buyPrice: 15, unitPrice: 30, discount: 0, subtotal: 60 },
        ],
    },
    {
        saleman: "Fernando",
        client: "Isabela",
        address: "Rua 25 de Março",
        paymentType: PaymentTypeEnum.Pix,
        date: "22/06/2025",
        time: "10:45",
        itemsSale: [
            { product: "Cabo Lightning", count: 3, buyPrice: 10, unitPrice: 25, discount: 5, subtotal: 60 },
        ],
    },
];
