import { PaymentTypeEnum, SaleModel } from "../models"

export const ListSaleMock: SaleModel[] = [
    {
        saleman: "Marcia",
        client: "Cleiton",
        address: "Rua das almas",
        paymentType: PaymentTypeEnum.Pix,
        // date: Date().toLocaleDateString('pt-BR'),
        date: "12/07/2025",
        time: "15:37",
        itemsSale: [{
            product: "Mouse",
            count: 2,
            buyPrice: 3.4,
            unitPrice: 22.3,
            discount: 0,
            subtotal: 4.3,
        }, {
            product: "Teclado",
            count: 1,
            buyPrice: 34.43,
            unitPrice: 43.12,
            discount: 0,
            subtotal: 90.3,
        }],
    }, {
        saleman: "Carlos",
        client: "Maria",
        address: "Av das flores",
        paymentType: PaymentTypeEnum.Debit,
        // date: Date(),
        date: "12/07/2025",
        time: "09:12",
        itemsSale: [{
            product: "Notebook",
            count: 2,
            buyPrice: 567.89,
            unitPrice: 632.3,
            discount: 33,
            subtotal: 4821.3,
        }, {
            product: "Cadeira escritório",
            count: 1,
            buyPrice: 12.12,
            unitPrice: 43.12,
            discount: 0,
            subtotal: 90.3,
        }, {
            product: "Monitor",
            count: 3,
            buyPrice: 77.00,
            unitPrice: 77.23,
            discount: 12,
            subtotal: 436.3,
        }],
    }
]