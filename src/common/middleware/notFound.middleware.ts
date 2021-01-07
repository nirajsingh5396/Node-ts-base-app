import { Request, Response, NextFunction } from "express";
import { IException } from "../exception/exception.interaface";
import HttpException from "../exception/http.exception";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const exception: IException =
  {
    message: "Resource not found",
    statusCode: 404
  }


  response.status(404).send(exception);
};