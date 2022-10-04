import UserEntity from "../../entities/user_entity";
import { UsersTableManager } from "../../managers";
import { UserSqlModel } from "../../managers/table_managers/users_table_manager";
import { userSqlModelToUserEntity } from "../../utils/sql_model_convector";

const getUserSqlModel = async (where: string): Promise<UserSqlModel | null> => {
  const rows = await UsersTableManager.get(where);

  if (rows.length) {
    const user = rows[0];
    return user;
  }
  return null;
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
