import InstrumentList from '../../entities/instrument_list'
import PortfolioItem from '../../entities/portfolio_item'
import portfoliosTableManager from '../../managers/portfolios_table_manager'
import { convertToInvestmentList } from '../../utils/convector'

const getPortfolio = async (
  userUuid: string
): Promise<InstrumentList<PortfolioItem>> => {
  const portfolioItems: PortfolioItem[] = await portfoliosTableManager.get(
    userUuid
  )

  const list = convertToInvestmentList(portfolioItems)

  return list
}

export default getPortfolio
