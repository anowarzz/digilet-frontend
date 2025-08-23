export interface ITransaction {
  _id: string;
  transactionType: string;
  transactionId: string;
  initiatedBy: string;
  fromWallet: string;
  toWallet: string;
  status: string;
  amount: number;
  fee: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
