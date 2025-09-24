import { UserModel, UserProfileEnum, UserStatusEnum } from "../models";
import { Database, formatError } from "./DatabaseClient";

const AuthService = {

    signIn: async (email: string, password: string): Promise<{ userId: string | undefined; error: string | undefined }> => {
        const { data, error } = await Database.auth.signInWithPassword({
            email,
            password,
        });
        return {
            userId: data.user ? data.user.id : undefined,
            error: formatError(error)
        }
    },

    signUp: async (email: string, password: string): Promise<{ userId: string | undefined; error: string | undefined }> => {

        console.log(`signUp:email:`, email)
        console.log(`signUp:password:`, password)
        const { data, error } = await Database.auth.signUp({
            email: email,
            password: password,
        });

        console.log(`signUp:data`, data)
        return {
            userId: data.user ? data.user.id : undefined,
            error: formatError(error)
        }
    },

    update: async (password: string): Promise<{ userId: string | undefined; error: string | undefined }> => {

        console.log(`update:password:`, password)
        const { data, error } = await Database.auth.updateUser({
            password: password,
        });

        console.log(`error:data`, data)
        return {
            userId: data.user ? data.user.id : undefined,
            error: formatError(error)
        }
    },
};

export { AuthService };