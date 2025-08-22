import { ItemSaleModel, ProductModel, ProductStatusEnum, UserModel, UserProfileEnum, UserStatusEnum } from "."

export const DefaultUserModel: UserModel = {
    id: "0",
    name: "Default",
    login: "",
    // password: "",
    profile: UserProfileEnum.Admin,
    status: UserStatusEnum.Active
}

export const DefaultProductModel: ProductModel = {
    id: 0,
    description: "",
    buyPrice: 0,
    priceOne: 0,
    priceTwo: 0,
    priceThree: 0,
    status: ProductStatusEnum.InStock
}

export const DefaultItemSaleModel: ItemSaleModel = {
    id: 0,
    product: DefaultProductModel,
    buyPrice: 0,
    count: 0,
    unitPrice: 0
}