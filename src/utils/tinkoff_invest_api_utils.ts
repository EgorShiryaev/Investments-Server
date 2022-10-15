import { Quotation } from 'tinkoff-invest-api/cjs/generated/common'

export const getPrice = (quotation?: Quotation): number | null => {
  if (quotation === undefined) {
    return null
  }
  return quotation.units + quotation.nano
}
