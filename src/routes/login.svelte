<script>
	import { onMount } from 'svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	import axios from 'axios';
	import { isUserLoggedIn, ch3ckLoggedIn } from '../checkAuth';
	import { goto } from '$app/navigation';

	// default value is false
	let alreadyLoggedin = false;

	// registeration process
	let loginFields = {
		phone: '',
		password: ''
	};
	const LoginHandler = async () => {
		try {
			const data = loginFields;
			const res = await axios({
				method: 'POST',
				url: 'http://127.0.0.1:3000/api/v1/users/auth/login',
				data
			});
			console.log(res.data);
			if (res.data.status === 'success' && res.data.data.user.role === 'workshop') {
				notifications.success('Successfully Logged In', 1000);

				$isUserLoggedIn = true;
				localStorage.setItem('userLoginData', JSON.stringify(res.data));

				setTimeout(() => {
					alreadyLoggedin = true;
					goto('/profile');
				}, 1000);
			} else {
				notifications.danger('You are not workshop owner account', 1500);
			}
		} catch (err) {
			console.log('error', err.response.data.message);
			notifications.danger(err.response.data.message, 1500);
		}
	};

	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		if (await ch3ckLoggedIn()) {
			alreadyLoggedin = true;
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Login | REZO</title>
</svelte:head>

<div class="flex justify-center items-center w-full p-20 ">
	<div class="{alreadyLoggedin ? 'w-full' : 'w-1/2'} bg-white rounded shadow-2xl p-8 m-4">
		{#if !alreadyLoggedin}
			<h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Login WORKSHOP</h1>
			<form on:submit|preventDefault={LoginHandler}>
				<div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="phone">Phone</label>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						bind:value={loginFields.phone}
						name="phone"
						id="phone" />
				</div>

				<div class="flex flex-col mb-4 content-between">
					<label class="mb-2 font-bold text-lg text-gray-900" for="password">Password</label>
					<input
						class="border py-2 px-3 text-grey-800"
						type="password"
						name="password"
						id="password"
						bind:value={loginFields.password} />
					<br />
					<button
						class="bg-yellow-500 hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded transition-all items-center"
						type="submit">Submit</button>
				</div>
			</form>
		{:else}
			<div class="text-center text-xl">
				<br />
				<p>You are already authenticated and registered user!!</p>

				<p>
					Ehhh if you are here, you must be playing with urls or its my mistake (developer's) wana
					login again??
				</p>
				<br />
			</div>
			<div class="flex justify-center ">
				<button
					on:click={() => {
						alreadyLoggedin = !alreadyLoggedin;
						notifications.info('Loading...', 1000);
					}}
					class="bg-yellow-500 hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded transition-all items-center">
					Create New Account
				</button>
			</div>
		{/if}
	</div>
</div>
<Toast />
