


export default class HttpException extends Error {

  statusCode: number
  message: string
  err: string | null


  constructor(statusCode: number, message: string, err?: string) {

    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.err = err || null;

  }
}