import { writable } from 'svelte/store';
import axios from 'axios';

export const isUserLoggedIn = writable({});
export const USERDATA = writable({});
export const USERHEADERS = writable({});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ch3ckLoggedIn = async () => {
	// 1) Get login data from localStorage
	const userLoginData = JSON.parse(localStorage.getItem('userLoginData'));

	// 2) Check Login Data with API call
	if (userLoginData && userLoginData.token) {
		// 2) a) define headers
		const headers = {
			Authorization: `Bearer ${userLoginData.token}`
		};
		USERHEADERS.set(headers);
		// b) Call API with headers
		try {
			const res = await axios({
				url: 'http://127.0.0.1:3000/api/v1/users/auth/me',
				headers
			});

			if (res.data.status === 'success' && res.data.data.data.role === 'workshop') {
				isUserLoggedIn.set(true);
				USERDATA.set(res.data.data.data);
				return true;
			}
			console.log(res);
		} catch (err) {
			console.log('error', err.response.data.message);
		}
	}
};

export const APICall = async (url) => {
	// 1) Get login data from localStorage
	const userLoginData = JSON.parse(localStorage.getItem('userLoginData'));

	if (userLoginData && userLoginData.token) {
		// 2) a) define headers
		const headers = {
			Authorization: `Bearer ${userLoginData.token}`
		};

		// b) Call API with headers
		try {
			const res = await axios({
				url,
				headers
			});

			if (res.data.status === 'success') {
				return res;
			}
			console.log(res);
		} catch (err) {
			console.log('error', err.response.data.message);
			return err;
		}
	}
	return -1;
};
