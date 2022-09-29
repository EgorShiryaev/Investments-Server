import Investment from "./investment";

interface UserPortfolioInvestment{
    investment: Investment,
    quantity: number,
    average_price: number,
}

export default UserPortfolioInvestment;