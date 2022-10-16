interface InvestmentList<T> {
  shares: T[];
  bonds: T[];
  futures: T[];
  etfs: T[];
  currencies: T[];
}

export default InvestmentList;
