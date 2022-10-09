import CurrencyEntity from "./currency_entity";

interface InvestmentEntity {
  ticker: string;
  title: string;
  currency: CurrencyEntity;
}

export default InvestmentEntity;
