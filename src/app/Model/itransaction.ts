export interface ITransaction {
  id: number;
  walletId: number;
  wallet: IWallet
  transactionType: string;
  amount: number;
  transactionDate: string;
}

export interface IWallet {
  walletId: number;
  balance: number;
  ownerId: string;
  user: any;
  ownerType: string;
}

export interface IPaymentData {
  price: number;
  userID: string;
  walletMobileNumber?: number;
}
