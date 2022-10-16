import { PORTFOLIO_ITEM_NOT_FOUND } from '../../constants/errors'
import PortfolioItem from '../../entities/portfolio_item'
import portfoliosTableManager from '../../managers/portfolios_table_manager'

const getPortfolioItem = async (
  userUuid: string,
  instrumentFigi: string
): Promise<PortfolioItem> => {
  const item = await portfoliosTableManager.get(userUuid, instrumentFigi)
  if (item === undefined) {
    throw Error(PORTFOLIO_ITEM_NOT_FOUND)
  }
  return item
}

export default getPortfolioItem
