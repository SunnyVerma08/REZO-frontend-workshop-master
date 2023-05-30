/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { writable } from 'svelte/store';
import axios from 'axios';

export const indexServices = writable({});
export const planServices = writable({});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const indexServicesApi = async () => {
	try {
		const res = await axios({
			url: 'http://127.0.0.1:3000/api/v1/services'
		});

		if (res.data.status === 'success') {
			indexServices.set(res.data.data.data);
			return true;
		}
		console.log(res);
	} catch (err) {
		// console.log('error', err.response.data.message);
	}
};

export const indexServicesApiData = async (data) => {
	try {
		const res = await axios({
			url: `http://127.0.0.1:3000/api/v1/services?planName=${data}`
		});

		if (res.data.status === 'success') {
			planServices.set(res.data.data.data);
			return true;
		}
		console.log(res);
	} catch (err) {
		// console.log('error', err.response.data.message);
	}
};
