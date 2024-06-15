export const formatCardNumber = (cardNumber: string): string => {
  const cleanedNumber = cardNumber.replace(/\D/g, "");
  const parts = cleanedNumber.match(/.{1,4}/g);
  return parts ? parts.join(" ") : "";
};
