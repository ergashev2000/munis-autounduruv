export interface ContractDataI {
  key: string;
  name: string;
  contractCount: number;
  currentDebt: number;
  withheldAmount: number;
  remainingBalance: number;
}

export interface SmsDataI {
  key: string;
  name: string;
  sentMessages: number;
  receivedMessages: number;
  pendingMessages: number;
}

export interface CallDataI {
  key: string;
  name: string;
  totalCalls: number;
  missedCalls: number;
  answeredCalls: number;
}


export type BankCardTypes = {
  id?: string;
  contractId: string;
  cardNumber: string;
  expireDate: string;
  userPhone: string;
  pinfl: string;
};

