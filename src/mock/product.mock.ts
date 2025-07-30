import { ProductStatusEnum } from "../models/ProductStatusEnum"
import { ProductModel } from "../models/ProductModel"

export const ListProductsMock: ProductModel[] = [
    {
        id: 1,
        description: "Mouse",
        buyPrice: 1.34,
        priceOne: 11.34,
        priceTwo: 111.34,
        priceThree: 1111.34,
        status: ProductStatusEnum.InStock
    },{
        id: 2,
        description: "Teclado mecânico",
        buyPrice: 2.53,
        priceOne: 22.53,
        priceTwo: 222.53,
        priceThree: 2222.53,
        status: ProductStatusEnum.OutOfStock
    },{
        id: 3,
        description: "Monitor ultrawide",
        buyPrice: 3.68,
        priceOne: 33.68,
        priceTwo: 333.68,
        priceThree: 3333.68,
        status: ProductStatusEnum.InStock
    },{
        id: 4,
        description: "Notebook",
        buyPrice: 4.17,
        priceOne: 44.17,
        priceTwo: 444.17,
        priceThree: 4444.17,
        status: ProductStatusEnum.OutOfStock
    },{
        id: 5,
        description: "Cadeira escritório",
        buyPrice: 5.93,
        priceOne: 55.93,
        priceTwo: 555.93,
        priceThree: 5555.93,
        status: ProductStatusEnum.InStock
    },
]