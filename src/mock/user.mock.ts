import { UserModel, UserProfileEnum, UserStatusEnum } from "../models"

export const ListUserMock: UserModel[] = [
    {
        id: 1,
        name: "Thais",
        profile: UserProfileEnum.Admin,
        status: UserStatusEnum.Active
    },{
        id: 2,
        name: "Pedro",
        profile: UserProfileEnum.Sales,
        status: UserStatusEnum.Active
    },{
        id: 3,
        name: "Vanessa",
        profile: UserProfileEnum.Sales,
        status: UserStatusEnum.FirstAccess
    },{
        id: 4,
        name: "Felipe",
        profile: UserProfileEnum.Sales,
        status: UserStatusEnum.Inactive
    },
]