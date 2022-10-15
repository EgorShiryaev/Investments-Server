import User from '../entities/user'

export const getUserWithOutUuid = (user: User): User & { uuid: undefined } => ({
  ...user,
  // @ts-expect-error
  uuid: undefined
})
