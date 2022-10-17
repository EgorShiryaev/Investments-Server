import { USER_NOT_FOUND } from '../constants/errors';
import PortfolioTableManager from '../managers/portfolio_table_manager';
import UserTableManager from '../managers/user_table_manager';
import { convertToInvestmentList } from '../utils/convector';
import getInstument from './instrument/get_instrument';

const getUserPortfolio = async (userUuid: string) => {
	const user = await UserTableManager.getWhereUuid(userUuid);

	if (user === undefined) {
		throw Error(USER_NOT_FOUND);
	}

	const records = await PortfolioTableManager.getAll(userUuid);

	const instruments = await Promise.all(
		records.map((v) => getInstument(v.instrumentFigi))
	);

	return convertToInvestmentList(instruments);
};

export default getUserPortfolio;