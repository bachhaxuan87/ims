import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@nestjs/jwt';
import { ContextService } from './context.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private appService: ContextService) {}

  async use(req: Request, res: Response, next: Function) {
    try {
      const authorization = req.header('authorization');
      if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(HttpStatus.FORBIDDEN).send('missing token');
        return;
      }
      const token = authorization.split('Bearer ')[1];
      this.jwtService.verify(token);

      const claims = jwt_decode(token) as any;
      this.appService.company_id = claims.company_id;
      return next();
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).send(error.message);
      return;
    }
  }
}
