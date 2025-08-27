import { IUser } from "./user.types";
export interface IWallet {
  _id: string;
  userId: string;
  walletId: string;
  balance: number;
  currency: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userInfo?: IUser;
}
