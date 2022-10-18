import { Quotation } from 'tinkoff-invest-api/cjs/generated/common';

const getNano = (nano: number) => {
  return +nano.toString().slice(0, 2) / 100;
};

export const getPrice = (quotation?: Quotation) => {
  if (quotation === undefined) {
    return null;
  }
  return quotation.units + getNano(quotation.nano);
};
