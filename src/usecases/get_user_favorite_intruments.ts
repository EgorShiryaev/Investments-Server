import FavoriteInstrumentsTableManager from '../managers/favorite_intruments_table_manager';
import { convertToInvestmentList } from '../utils/convector';
import checkUserIsExists from './chech_user_is_exists';
import getInstument from './instrument/get_instrument';

const getUserFavoriteIntruments = async (userUuid: string) => {
  await checkUserIsExists(userUuid);

  const records = await FavoriteInstrumentsTableManager.getAll(userUuid);

  const instruments = await Promise.all(
    records.map((v) => getInstument(v.instrumentFigi))
  );

  instruments.sort((a, b) => a.title.localeCompare(b.title));

  return convertToInvestmentList(instruments);
};

export default getUserFavoriteIntruments;
