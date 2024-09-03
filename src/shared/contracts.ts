export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export class ErrorResponse extends Error {
  status: number
  data: any

  constructor(status: number, data: any) {
    super()
    this.status = status
    this.data = data
  }
}

export const errorResponse = (status: number, data: any) =>
  new ErrorResponse(status, data)

export class BadRequestResponse extends ErrorResponse {
  constructor(data: any) {
    super(HttpStatus.BAD_REQUEST, data)
  }
}

export const badRequestResponse = (error: { message: string }) =>
  new BadRequestResponse(error.message)

export class UnauthorizedRequestResponse extends ErrorResponse {
  constructor(data: any) {
    super(HttpStatus.UNAUTHORIZED, data)
  }
}

export const unauthorizedResponse = (error: { message: string }) =>
  new UnauthorizedRequestResponse(error.message)

export class InternalServerErrorException extends ErrorResponse {
  constructor(data: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, data)
  }
}

export const internalServerErrorResponse = (error: { message: string }) =>
  new InternalServerErrorException(error.message)

export class ForbiddenException extends ErrorResponse {
  constructor(data: any) {
    super(HttpStatus.FORBIDDEN, data)
  }
}

export const forbiddenResponse = (error: { message: string }) =>
  new ForbiddenException(error.message)

export class HttpResponse<T = any> {
  status: number
  data: T

  constructor(status: number, data: T) {
    this.status = status
    this.data = data
  }
}

export function responseSuccess<T = any>(data: T): HttpResponse<T> {
  return new HttpResponse(HttpStatus.OK, data)
}
