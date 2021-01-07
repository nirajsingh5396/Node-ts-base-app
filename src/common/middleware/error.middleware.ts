import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";


export const errorHandler = (
  exception: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const statusCode = exception.statusCode || 500;

  const message = exception.message || "It's not you. It's us. We are having some problems.";

  res.status(statusCode).send(message);


}