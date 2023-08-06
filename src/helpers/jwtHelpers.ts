import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/jwt.interface';

const createToken = (
  payload: IJwtPayload,
  secret: Secret,
  options: SignOptions,
): string => {
  return jwt.sign(payload, secret, options);
};

const validateToken = (token: string, secret: Secret): IJwtPayload => {
  return jwt.verify(token, secret) as IJwtPayload;
};

export const JwtHelpers = { createToken, validateToken };
