import { UserProfileEnum, UserStatusEnum } from ".";

export interface UserModel {
    id: string;
    name: string;
    login: string;
    password: string;
    profile: UserProfileEnum;
    status: UserStatusEnum;
}