export type CallSettings = {
  name: string;
  type: string;
  minPaymentDate: number;
  minDebtorMonths: number;
  minCurrentDebt: number;
  sendMonday: boolean;
  sendTuesday: boolean;
  sendWednesday: boolean;
  sendThursday: boolean;
  sendFriday: boolean;
  sendSaturday: boolean;
  sendSunday: boolean;
  startHours: string;
  endHours: string;
  audioId: string;
  [key: string]: string | number | boolean;
}
