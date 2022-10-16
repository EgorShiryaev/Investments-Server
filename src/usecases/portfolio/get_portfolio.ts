import InstrumentList from '../../entities/instrument_list'
import PortfolioItem from '../../entities/portfolio_item'
import portfoliosTableManager from '../../managers/portfolios_table_manager'
import { convertToInvestmentList } from '../../utils/convector'
import getInstument from '../instrument/get_instrument'

const getPortfolio = async (
  userUuid: string
): Promise<InstrumentList<PortfolioItem>> => {
  const records = await portfoliosTableManager.getAll(userUuid)

  const instruments = await Promise.all(
    records.map(async (v) => await getInstument(v.instrumentFigi))
  )

  const list = convertToInvestmentList(instruments)

  return list
}

export default getPortfolio
