import { USER_NOT_FOUND } from '../../constants/errors'
import usersTableManager from '../../managers/users_table_manager'
import DatabaseResponse from '../../models/database_response'

const deleteUser = async (uuid: string): Promise<DatabaseResponse> => {
  const result = await usersTableManager.remove(uuid)

  if (result.rowsChanged === 0) {
    throw Error(USER_NOT_FOUND)
  }

  return result
}

export default deleteUser
