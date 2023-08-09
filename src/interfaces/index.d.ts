/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { IJwtPayload } from './jwt.interface';

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload | null;
    }
  }
}
