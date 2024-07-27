export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) {
    return "";
  }
  const regex = /^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/;
  const matches = phoneNumber.match(regex);

  if (matches) {
    const [, countryCode, operatorCode, , secondPart, thirdPart] = matches;
    return `${countryCode} (${operatorCode}) *** ${secondPart} ${thirdPart}`;
  }

  return phoneNumber;
};
