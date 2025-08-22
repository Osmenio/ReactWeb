import { UserModel, UserProfileEnum, UserStatusEnum } from "../models";
import { Database, formatError } from "./DatabaseClient";

const UserService = {

    getAllUser: async (): Promise<{ users: UserModel[], error: string | undefined }> => {
        const { data, error } = await Database
            .from("User").select("*")

        // console.log(`getAllUser:`, error)
        return {
            users: data ?? [],
            // error: error?.message
            // error: error?.details && error?.message
            //     ? `${error.details}: ${error.message}`
            //     : error?.details || error?.message || undefined
            error: formatError(error)
        };
    },

    getUser: async (login: string, pwd: string): Promise<{ user: UserModel | undefined; error: string | undefined }> => {
        const { data, error } = await Database
            .from("User")
            .select("*")
            .eq("login", login)
            .eq("password", pwd)
            .single();

        // console.log(`getUser:`, error)
        return {
            user: data ? {
                id: data.id,
                name: data.name,
                login: data.login,
                // password: data.password,
                profile: data.profile as UserProfileEnum,
                status: data.status as UserStatusEnum,
            } : undefined,
            error: formatError(error)
        };
    },

    getUserById: async (userId: string): Promise<{ user: UserModel | undefined; error: string | undefined }> => {
        const { data, error } = await Database
            .from("User")
            .select("*")
            .eq("id", userId)
            .single();

        // console.log(`getUser:`, error)
        return {
            user: data ? {
                id: data.id,
                name: data.name,
                login: data.login,
                // password: data.password,
                profile: data.profile as UserProfileEnum,
                status: data.status as UserStatusEnum,
            } : undefined,
            error: formatError(error)
        };
    },

    updateUser: async (user: UserModel): Promise<{ user: UserModel | undefined; error: string | undefined }> => {
        const { data, error } = await Database
            .from("User")
            .update({
                "name": user.name,
                "login": user.login,
                // "password": user.password,
                "profile": user.profile,
                "status": user.status,
            })
            .eq("id", user.id)
            .select("*")
            .single()

        // console.log(`updateUser:`, error)
        return {
            user: data ? {
                id: data.id,
                name: data.name,
                login: data.login,
                // password: data.password,
                profile: data.profile as UserProfileEnum,
                status: data.status as UserStatusEnum,
            } : undefined,
            error: error?.details && error?.message
                ? `${error.details}: ${error.message}`
                : error?.details || error?.message || undefined
        };
    },

    addUser: async (user: UserModel): Promise<string | undefined> => {
        const newUser = {
            id: user.id,
            name: user.name,
            login: user.login,
            // password: user.password,
            profile: user.profile,
            status: user.status,
        }
        // console.log(`addUser:user`, user)
        // console.log(`addUser:newUser`, newUser)
        const { error } = await Database
            .from("User")
            .insert([newUser])
            .single();

        // console.log(`addUser:error`, error)
        return formatError(error)
    },
};

export { UserService };