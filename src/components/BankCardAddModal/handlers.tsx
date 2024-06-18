import { formatCardNumber } from "@utils/formatCardNumber";

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 11 }, (_, i) => ({
  value: (currentYear + i).toString().slice(-2),
  label: (currentYear + i).toString(),
}));

export const months = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString().padStart(2, "0"),
  label: (i + 1).toString().padStart(2, "0"),
}));

export const applyZeroMasking = (cardNumber: string): string => {
  const maxCardLength = 16;
  const numbersOnly = cardNumber.replace(/\D/g, "");
  const paddedNumber = numbersOnly.padEnd(maxCardLength, "0");
  return formatCardNumber(paddedNumber);
};
