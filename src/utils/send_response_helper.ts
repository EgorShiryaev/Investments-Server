import { Request, Response } from 'express'
import {
  ITEM_IS_EXISTS_ERRORS,
  ITEM_NOT_FOUND_ERRORS,
  USER_UUID_HEADER_NOT_FOUND
} from '../constants/errors'
import {
  ITEM_IS_EXISTS_STATUS,
  ITEM_NOT_FOUND_STATUS,
  PARAMETER_NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS
} from '../constants/response_statuses'
import {
  checkPortfolioRequestBodyParametersIsNotExists,
  checkSearchInvestmentQueryParametersIsNotExist,
  checkUserRequestBodyParametersIsNotExist
} from './check_request_parameters'
import { generateUserBodyParametersErrorMessage } from './generate_error_message'
import { getUserUuidHeader, parseToJson } from './request_parameter_parser'

const sendResponse = (
  response: Response,
  status: number,
  body: object
): void => {
  response.header('content-type', 'application/json')
  response.status(status).send(parseToJson(body))
}

export const sendErrorResponse = (response: Response, error: Error): void => {
  const send = (statusCode: number): void => {
    sendResponse(response, statusCode, { message: error.message })
  }

  const { message } = error
  if (ITEM_NOT_FOUND_ERRORS.includes(message)) {
    send(ITEM_NOT_FOUND_STATUS)
  } else if (ITEM_IS_EXISTS_ERRORS.includes(message)) {
    send(ITEM_IS_EXISTS_STATUS)
  } else if (message.includes('not found')) {
    send(PARAMETER_NOT_FOUND_STATUS)
  } else {
    send(SERVER_ERROR_STATUS)
  }
}

export const sendSuccessResponse = (response: Response, body: object): void => {
  sendResponse(response, SUCCESS_STATUS, body)
}

export const getUserUuidElseSendErrorResponse = (
  request: Request,
  response: Response
): string | null => {
  const userUuid = getUserUuidHeader(request.headers)

  if (userUuid === null) {
    sendErrorResponse(response, Error(USER_UUID_HEADER_NOT_FOUND))
  }

  return userUuid
}

export const getUserBodyParametersElseSendErrorResponse = (
  request: Request,
  response: Response
): { name: string | null, surname: string | null } | null => {
  const { name, surname } = request.body

  const requestParametersIsNotExist = checkUserRequestBodyParametersIsNotExist(
    name,
    surname
  )

  if (requestParametersIsNotExist) {
    sendErrorResponse(
      response,
      Error(generateUserBodyParametersErrorMessage(name, surname))
    )
    return null
  }
  return { name, surname }
}

export const getSearchInvestmentQueryParametersElseSendErrorResponse = (
  request: Request,
  response: Response
): { query: string } | null => {
  const { query } = request.query

  const isNotExists = checkSearchInvestmentQueryParametersIsNotExist(
    query as string | undefined
  )

  if (isNotExists) {
    sendErrorResponse(response, Error("Parameter 'query' not found"))
    return null
  }

  return {
    query: (typeof query === 'string' ? query : (query as string[])[0]).trim()
  }
}

export const getPortfolioParametersElseSendErrorRequest = (
  request: Request,
  response: Response
): { investmentFigi: string } | null => {
  const { investmentFigi } = request.body

  const isNotExists =
    checkPortfolioRequestBodyParametersIsNotExists(investmentFigi)

  if (isNotExists) {
    sendErrorResponse(response, Error("Parameter 'investmentFigi' not found"))
    return null
  }

  return {
    investmentFigi
  }
}
