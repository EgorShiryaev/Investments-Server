import { INSTRUMENT_IS_FAVORITE } from '../constants/errors';
import AddFavoriteInstrumentsParameters from '../interfaces/methods_parameters/add_favorite_instruments_parameters';
import FavoriteInstrumentsTableManager from '../managers/favorite_intruments_table_manager';
import checkUserIsExists from './chech_user_is_exists';
import checkInstrumentIsExists from './check_instrument_is_exists';

const addToFavoriteInstruments = async (
  params: AddFavoriteInstrumentsParameters
) => {
  await checkUserIsExists(params.userUuid);

  await checkInstrumentIsExists(params.instrumentFigi);

  const instrument = await FavoriteInstrumentsTableManager.get(
    params.userUuid,
    params.instrumentFigi
  );

  if (instrument){
    throw Error(INSTRUMENT_IS_FAVORITE);
  }

  return FavoriteInstrumentsTableManager.add(
    params.userUuid,
    params.instrumentFigi
  );
};

export default addToFavoriteInstruments;
