import Investment from "./investment";

interface UserPortfolioInvestment {
  investment: Investment;
  quantity: number;
  averagePrice: number;
}

export default UserPortfolioInvestment;
