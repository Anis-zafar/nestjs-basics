import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AnotherMiddleware implements NestMiddleware {
  cleanToken: string;
  decode: any;
  valid: any;
  jwt: any;
  constructor(private readonly jwtserv: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.write(
        JSON.stringify({
          msg: 'Authorization is required',
        }),
      );
      res.end();
    } else {
      const token = req.headers['authorization'];
      // console.log(token);

      if (!token) throw new UnauthorizedException();
      try {
        this.cleanToken = token.replace('Bearer', '').trim();
        this.decode = this.jwtserv.decode(this.cleanToken);
        // console.log(this.cleanToken);
        // console.log(this.decode);

        verify(this.cleanToken, 'secretkey');
        // console.log(validated);
        req.user = this.decode;
        next();
      } catch (error) {
        throw new HttpException('in valid authorization', HttpStatus.FORBIDDEN);
      }
    }
  }
}
