import * as passport from 'passport';
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { appConfig } from '../config';
import * as jwt from 'jsonwebtoken';
import { User } from '../db/index';

export class Passport {

	private static opts: any = {};

	public static initialize(server) {

		server.use(passport.initialize());

		this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
		this.opts.secretOrKey = appConfig.secret;

		passport.use(new JwtStrategy(this.opts, function (jwt_payload, done) {
			return done(null, jwt_payload);
		}));
	}

	public static signJwt(user: User): {} {
		/* return new Promise((resolve, reject) => {
			let userData = {
				username: user.username,
				email: user.email
			};

			const token = jwt.sign({ data: user }, appConfig.secret, {
				expiresIn: '7d'
			});

			const result = {
				token: 'JWT ' + token,
				username: user.username,
				email: user.email
			};

			resolve(result);
		}); */

		const token = jwt.sign({ data: user }, appConfig.secret, {
			expiresIn: '7d'
		});

		return {
			token: 'JWT ' + token,
			username: user.username,
			email: user.email
		};

	}
}

