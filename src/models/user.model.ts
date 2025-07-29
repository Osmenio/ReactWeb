import { UserProfileEnum, UserStatusEnum } from ".";

export interface UserModel {
    id: number;
    name: string;
    login: string;
    password: string;
    profile: UserProfileEnum;
    status: UserStatusEnum;
}