<script>
	import { onMount } from 'svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	import axios from 'axios';
	import { isUserLoggedIn, ch3ckLoggedIn } from '../checkAuth';

	// default value is false
	let alreadyRegistered = false;

	// registeration process
	let registerationFields = {
		name: '',
		phone: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};
	$: registerationFields.passwordConfirm = registerationFields.password;
	const registerHandler = async () => {
		try {
			const data = registerationFields;
			const res = await axios({
				method: 'POST',
				url: 'http://127.0.0.1:3000/api/v1/users/auth/signup',
				data
			});

			if (res.data.status === 'success') {
				notifications.success('Successfully Registered', 1000);
				localStorage.setItem('userLoginData', JSON.stringify(res.data));
				setTimeout(() => {
					notifications.success(
						'Redirecting... (right now where to redirect, please use mouse to move)',
						5000
					);
					setTimeout(() => {
						alreadyRegistered = true;
					}, 2000);
				}, 1000);
			}
			console.log(res);
		} catch (err) {
			console.log('error', err.response.data.message);
			notifications.danger(err.response.data.message, 1500);
		}
	};

	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		if (await ch3ckLoggedIn()) alreadyRegistered = true;
	});
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="flex justify-center items-center w-full p-20 ">
	<div class="{alreadyRegistered ? 'w-full' : 'w-1/2'} bg-white rounded shadow-2xl p-8 m-4">
		{#if !alreadyRegistered}
			<h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
				Registration Form
			</h1>
			<form on:submit|preventDefault={registerHandler}>
				<div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="name">Name</label>
					<input
						class="border py-2 px-3 text-grey-800"
						bind:value={registerationFields.name}
						type="text"
						name="name"
						id="name" />
				</div>
				<!-- <div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="email">Email</label>
					<input
						class="border py-2 px-3 text-grey-800"
						bind:value={registerationFields.email}
						type="email"
						name="email"
						id="email" />
				</div> -->
				<div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="phone">Phone</label>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						bind:value={registerationFields.phone}
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
						bind:value={registerationFields.password} />
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

				<p>Do you still want to create a new account?</p>
				<br />
			</div>
			<div class="flex justify-center ">
				<button
					on:click={() => {
						alreadyRegistered = !alreadyRegistered;
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
