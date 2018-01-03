import { appConfig } from './config';
import * as restify from 'restify';
import * as errors from 'restify-errors';
import { Passport } from './auth/passport';
import { Users } from './db/index';
import * as passport from 'passport';
import * as jwtDecode from 'jwt-decode';


const server = restify.createServer();

server.use(restify.plugins.bodyParser());
Passport.initialize(server);

server.pre((req, res, next) => {
	console.log(`${req.method} - ${req.url}`);
	return next();
});

server.get('/', (req, res, next) => {
	res.send(501);
	return next();
});

server.post('/login', (req, res, next) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.send(400);
		return next();
	} else {
		const password = req.body.password;
		const username = req.body.username;
		Users.findByUsername(username)
			.then(user => {
				Users.passwordCompare(password, user.password)
					.then(isMatch => {
						if (isMatch) {
							res.send(Passport.signJwt(user));
							return next();
						}
					}).catch((error) => {
						res.send(error);
						return next();
					});
			}).catch((error) => {
				res.send(error);
				return next();
			});
	}
});

server.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.send(req.user);
	return next();
});

server.listen(appConfig.port, () => {
	console.log(`Server is running on port ${appConfig.port}`);
});