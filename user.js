const Promise = require("bluebird");

let db = [
	{
		username: 'george',
		password: '1234',
		email: 'gg.arjevnishvili@gmail.com'
	},
	{
		username: 'george_1',
		password: '12345',
		email: 'gg.arjevnishvili_1@gmail.com'
	},
	{
		username: 'george_2',
		password: '123456',
		email: 'gg.arjevnishvili_2@gmail.com'
	}
];

function User() {

}

User.prototype.findByUsername = (username) => {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < db.length; i++) {
			if (db[i].username == username) {
				resolve(db[i]);
			}
		}
		reject(`Username: '${username}' not found in database`);
	});
}

User.prototype.passwordCompare = (passsword, userPassword) => {
	return new Promise((resolve, reject) => {
		if (passsword === userPassword) {
			resolve(true);
		} else {
			reject('passwords does not match!');
		}
	});
}

module.exports = new User();