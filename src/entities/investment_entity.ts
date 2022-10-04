import CurrencyEntity from "./currency_entity";

interface InvestmentEntity {
  prefix: string;
  title: string;
  currency: CurrencyEntity;
}

export default InvestmentEntity;
