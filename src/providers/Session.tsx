import { UserModel } from "../models";

interface Session {
  user?: UserModel;
  expiresAt: number;
}

export type { Session };
