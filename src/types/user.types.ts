import type { IWallet } from "./wallet.type";

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

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: "USER" | "ADMIN" | "AGENT";
  status: "ACTIVE" | "BLOCKED" | "PENDING" | "SUSPENDED";
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  auths: IAuth[];
  wallet: IWallet;
}

// Define the update user data type
export interface IUpdateUserData {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  userName?: string | null;
  nidNumber?: string | null;
  address?: string | null;
}
