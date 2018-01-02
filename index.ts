import { appConfig } from './config';
import * as restify from 'restify';
import * as errors from 'restify-errors';
import * as passport from 'passport';
import Strategy from 'passport-jwt';
import ExtractJwt from 'passport-jwt';
import * as jwt from 'jsonwebtoken';


const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.pre((req, res, next) => {
	console.log(`${req.method} - ${req.url}`);
	return next();
});

server.get('/', (req, res, next) => {
	res.send();
	return next();
});

server.listen(appConfig.port, () => {
	console.log(`Server is running on port ${appConfig.port}`);
});