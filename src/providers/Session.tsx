import { UserModel } from "../models";

interface Session {
  user?: UserModel;
  expiresAt: number;
  loading: boolean;
}

export type { Session };
