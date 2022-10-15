import DATABASE from '../database'
import DatabaseResponse from '../models/database_response'

const runScript = async (
  sqlScript: string,
  params?: object
): Promise<DatabaseResponse> => {
  console.log(sqlScript, params)

  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, params, function (error) {
        if (error !== null) {
          reject(error)
          return
        }
        resolve({
          success: true,
          rowsChanged: this.changes
        })
      })
    })
  })
}

const readFirst = async <T>(
  sqlScript: string,
  params?: object
): Promise<T | undefined> => {
  console.log(sqlScript, params)

  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.get(sqlScript, params, (error, row) => {
        if (error !== null) {
          reject(error)
          return
        }
        return resolve(row)
      })
    })
  })
}

const readAll = async <T>(sqlScript: string, params?: object): Promise<T[]> => {
  console.log(sqlScript, params)

  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.all(sqlScript, params, (error, rows) => {
        if (error !== null) {
          reject(error)
          return
        }
        return resolve(rows)
      })
    })
  })
}

const databaseManager = {
  runScript,
  readFirst,
  readAll
}

export default databaseManager
