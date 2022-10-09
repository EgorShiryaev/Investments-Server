import { UserEntity } from "../../entities";
import { UsersTableManager } from "../../managers";
import { UserSqlModel } from "../../models";
import { userSqlModelToUserEntity } from "../../utils/sql_model_convector";

const getUserSqlModel = async (where: string): Promise<UserSqlModel | null> => {
  const rows = await UsersTableManager.get(where);

  return rows.length ? rows[0] : null;
};

export const getUserSqlModelWhereUuid = (
  uuid: string
): Promise<UserSqlModel | null> => {
  return getUserSqlModel(`uuid = ${uuid}`);
};

export const getUserEntityWhereUuid = async (
  uuid: string
): Promise<UserEntity | null> => {
  const model = await getUserSqlModelWhereUuid(uuid);
  return model && userSqlModelToUserEntity(model);
};
