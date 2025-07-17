import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'a8f$2k!9d@1z#4x%7q^0b&3n*6m(5l)8j',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
} 