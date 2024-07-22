export type CallSettings = {
  name: string;
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
  whiteCallAudio: string;
  whiteYellowCallAudio: string;
  yellowCallAudio: string;
  redCallAudio: string;
  blackCallAudio: string;
}
