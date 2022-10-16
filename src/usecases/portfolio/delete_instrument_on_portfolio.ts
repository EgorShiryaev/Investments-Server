import portfoliosTableManager from '../../managers/portfolios_table_manager'
import DatabaseResponse from '../../models/database_response'
import getPortfolioItem from './get_portfolio_item'

const deleteInstrumentOnPortfolio = async (
  userUuid: string,
  instrumentFigi: string
): Promise<DatabaseResponse> => {
  await getPortfolioItem(userUuid, instrumentFigi)

  return await portfoliosTableManager.remove(userUuid, instrumentFigi)
}

export default deleteInstrumentOnPortfolio
