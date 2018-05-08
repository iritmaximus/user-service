import * as express from 'express';
import ServiceResponse from './ServiceResponse';
import { stringToServiceToken, ServiceToken } from '../token/Token';

interface IASRequest extends express.Request {
  authorization: ServiceToken;
}


export function authorize(req: IASRequest, res: express.Response, next: express.NextFunction) {
  let token = req.headers['authorization'];
  if (!token || !token.toString().startsWith('Bearer ')) {
    return res.status(401).json(new ServiceResponse(null, 'Unauthorized'));
  } else {
    try {
      req.authorization = stringToServiceToken(token.slice(7).toString())
      return next();
    } catch (e) {
      return res.status(500).json(new ServiceResponse(null, e.message));
    }
  }
}

export function loadToken(req: IASRequest, res: express.Response, next: express.NextFunction) {
  let token = req.headers['authorization'];
  if (token && token.toString().startsWith('Bearer ')) {
    try {
      req.authorization = stringToServiceToken(token.slice(7).toString())
      return next();
    } catch (e) {
      return res.status(500).json(new ServiceResponse(null, e.message));
    }
  }

  let splittedToken = req.header('cookie').split('token=');
  if (splittedToken.length > 1) {
    try {
      req.authorization = stringToServiceToken(splittedToken[1]);
      return next();
    } catch (e) {
      return res.status(500).json(new ServiceResponse(null, e.message));
    }
  }
  next();
}