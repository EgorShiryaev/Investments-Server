import AuthParameters from '../interfaces/methods_parameters/auth_parameters';
import RegistrationParameters from '../interfaces/methods_parameters/registration_parameters';
import SearchInstrumnentsParameters from '../interfaces/methods_parameters/search_instrumnents_parameters';
import FavoriteInstrumentsParameters from '../interfaces/methods_parameters/favorite_intruments_parameters';
import AddFavoriteInstrumentsParameters from '../interfaces/methods_parameters/add_favorite_instruments_parameters';
import DeleteFavoriteInstrumentsParameters from '../interfaces/methods_parameters/delete_favorite_instruments_parameters';

const generateNotFoundParametersDescription = (array: (string | false)[]) => {
  return array
    .filter((v) => v !== false)
    .map((v) => `Parameter ${v} not found`);
};

const generateErrors = (fields: (string | false)[]) => {
  const errors = generateNotFoundParametersDescription(fields);
  return errors.length ? errors : null;
};

export const checkRegistrationParameters = (params: RegistrationParameters) => {
  const fields = [!params.email && 'email', !params.password && 'password'];
  return generateErrors(fields);
};

export const checkAuthParameters = (params: AuthParameters) => {
  const fields = [!params.email && 'email', !params.password && 'password'];
  return generateErrors(fields);
};

export const checkFavoriteInstrumentsParameters = (
  params: FavoriteInstrumentsParameters
) => {
  const fields = [!params.userUuid && 'userUuid'];
  return generateErrors(fields);
};

export const checkAddFavoriteInstrumentsParameters = (
  params: AddFavoriteInstrumentsParameters
) => {
  const fields = [
    !params.userUuid && 'userUuid',
    !params.instrumentFigi && 'instrumentFigi',
  ];
  return generateErrors(fields);
};

export const checkDeleteFavoriteInstrumentsParameters = (
  params: DeleteFavoriteInstrumentsParameters
) => {
  const fields = [
    !params.userUuid && 'userUuid',
    !params.instrumentFigi && 'instrumentFigi',
  ];
  return generateErrors(fields);
};

export const checkSearchInstrumnentsParameters = (
  params: SearchInstrumnentsParameters
) => {
  const fields = [params.query === '' && 'query'];
  return generateErrors(fields);
};
