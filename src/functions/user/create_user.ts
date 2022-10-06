import UserEntity from "../../entities/user_entity";
import { UsersTableManager } from "../../managers";
import { userSqlModelToUserEntity } from "../../utils/sql_model_convector";
import { getUserEntityWhereUuid, getUserSqlModelWhereUuid } from "./get_user";

export const createUserEntity = async (uuid: string): Promise<UserEntity> => {
  await UsersTableManager.create(uuid);

  const user = await getUserSqlModelWhereUuid(uuid);

  return userSqlModelToUserEntity(user!);
};

export const createUserEntityIfNotExist = async (
  userUuid: string
): Promise<{ user: UserEntity; userAlreadyCreated: boolean }> => {
  const user = await getUserEntityWhereUuid(userUuid);

  if (user === null) {
    return {
      userAlreadyCreated: false,
      user: await createUserEntity(userUuid),
    };
  }
  return {
    userAlreadyCreated: true,
    user: user,
  };
};
