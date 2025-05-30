export type Transaction = {
  id?: number;
  sender: string | null;
  receiver: string | null;
  amount: number | null;
  status: Transaction_status;
  created_at?: Date;
  updated_at?: Date;
};

export type Transaction_status = 'sent' | 'received' | 'payed';

export const TRANSACTION_STATUS = {
  SENT: 'sent',
  RECEIVED: 'received',
  PAYED: 'payed',
};
