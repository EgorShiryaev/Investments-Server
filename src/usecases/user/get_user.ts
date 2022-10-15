import { USER_NOT_FOUND } from '../../constants/errors'
import User from '../../entities/user'
import usersTableManager from '../../managers/users_table_manager'

const getUser = async (uuid: string): Promise<User> => {
  const user = await usersTableManager.get(uuid)
  if (user === undefined) {
    throw Error(USER_NOT_FOUND)
  }
  return user
}

export default getUser
