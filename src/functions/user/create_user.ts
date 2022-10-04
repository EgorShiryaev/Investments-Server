import UserEntity from "../../entities/user_entity";
import { UsersTableManager } from "../../managers";
import { UserSqlModel } from "../../managers/table_managers/users_table_manager";
import { userSqlModelToUserEntity } from "../../utils/sql_model_convector";
import { getUserSqlModelWhereUuid } from "./get_user";

const createUserEntity = async (uuid: string): Promise<UserEntity> => {
  await UsersTableManager.create(uuid);

  const user = await getUserSqlModelWhereUuid(uuid);

  return userSqlModelToUserEntity(user!);
};

export default createUserEntity;
