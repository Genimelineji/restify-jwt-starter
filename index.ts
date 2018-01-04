import { appConfig } from './config';
import * as restify from 'restify';
import * as errors from 'restify-errors';
import { Passport } from './auth/passport';
import { Users } from './db/users';
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
	//res.send();
	return next(new errors.ForbiddenError());
});

server.post('/login', (req, res, next) => {
	if (!req.body || !req.body.username || !req.body.password) {
		return next(new errors.MissingParameterError('Username or Password missing!'));
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
						return next(new errors.InvalidCredentialsError(error));
					});
			}).catch((error) => {
				return next(new errors.InvalidCredentialsError(error));
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