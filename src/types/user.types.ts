export interface IUserEditableFields {
  phone: string;
  password: string;
  name: string;
  email?: string;
  userName?: string;
  picture?: string;
  nidNumber?: string;
  address?: string;
}








export interface IAuth {
  provider: string;
  providerId: string;
}

export interface IWallet {
  walletId: string;
  userId: string;
  balance: number;
  currency: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: "USER" | "ADMIN" | "AGENT";
  status: "ACTIVE" | "BLOCKED" | "PENDING" | "SUSPENDED";
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  auths: IAuth[];
  wallet: IWallet;
}