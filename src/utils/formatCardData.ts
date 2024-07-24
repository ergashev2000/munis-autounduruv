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
  const paddedNumber = numbersOnly.padEnd(maxCardLength, "#");
  return formatCardNumber(paddedNumber);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  const numberWithoutCountryCode = cleanedNumber.startsWith("998")
    ? cleanedNumber.slice(3)
    : cleanedNumber;
  const match = numberWithoutCountryCode.match(/(\d{2})(\d{3})(\d{2})(\d{2})/);
  return match
    ? `+998 (${match[1]}) ${match[2]} ${match[3]} ${match[4]}`
    : phoneNumber;
};

export const formatPhone = (num: string): string => {
  const cleanedNumber = num.replace(/[^\d]/g, "");
  return cleanedNumber;
};
