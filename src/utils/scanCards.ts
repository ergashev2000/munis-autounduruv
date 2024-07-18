import { CardType } from "../enums/cardType";

export const scanCard = (cardNumber: string): CardType => {
  const uzcardRegex = /^(8600|5614|5440)/;
  const humoRegex = /^(9860|6262|4073)/;

  if (uzcardRegex.test(cardNumber)) {
    return CardType.UZCARD;
  } else if (humoRegex.test(cardNumber)) {
    return CardType.HUMO;
  } else {
    return CardType.UNKNOWN;
  }
};
