import * as Promise from 'bluebird';
import { User } from '../@types/user';

export class Users {
	private static db: User[] = [
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

	public static findByUsername(username): Promise<User> {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < this.db.length; i++) {
				if (this.db[i].username == username) {
					resolve(this.db[i]);
				}
			}
			reject(`Username: '${username}' not found in database`);
		});
	}

	public static passwordCompare(passsword, userPassword): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (passsword === userPassword) {
				resolve(true);
			} else {
				reject('passwords does not match!');
			}
		});
	}
}