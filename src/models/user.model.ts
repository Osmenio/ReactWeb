import { UserProfileEnum, UserStatusEnum } from ".";

export interface UserModel {
    id: number;
    name: string;
    profile: UserProfileEnum;
    status: UserStatusEnum;
}