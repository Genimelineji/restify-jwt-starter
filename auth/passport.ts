import * as passport from 'passport';
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { appConfig } from '../config';
import * as jwt from 'jsonwebtoken';
import { User } from '../@types/user';

export interface UserAuthToken {
	token: string;
	username: string;
	email: string;
}

export class Passport {

	private static opts: any = {};

	public static initialize(server) {

		server.use(passport.initialize());

		this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
		this.opts.secretOrKey = appConfig.secret;

		passport.use(new JwtStrategy(this.opts, function (jwt_payload, done) {
			return done(null, jwt_payload.data.username);
		}));
	}

	public static signJwt(user: User): UserAuthToken {
		const token = jwt.sign({ data: user }, appConfig.secret, {
			expiresIn: appConfig.jwtExpireDate
		});

		return {
			token: 'JWT ' + token,
			username: user.username,
			email: user.email
		};

	}
}

