import { PORTFOLIO_ITEM_IS_EXISTS } from '../../constants/errors'
import portfoliosTableManager from '../../managers/portfolios_table_manager'
import DatabaseResponse from '../../models/database_response'
import getPortfolioItem from './get_portfolio_item'

const addInstrumentOnPortfolio = async (
  userUuid: string,
  instrumentFigi: string
): Promise<DatabaseResponse> => {
  const portfolioItem = await getPortfolioItem(userUuid, instrumentFigi)
    .then((v) => v)
    .catch(() => null)

  if (portfolioItem !== null) {
    throw Error(PORTFOLIO_ITEM_IS_EXISTS)
  }

  return await portfoliosTableManager.add(userUuid, instrumentFigi)
}

export default addInstrumentOnPortfolio
