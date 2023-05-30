<script>
	import { onMount } from 'svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	import axios from 'axios';
	import { isUserLoggedIn, ch3ckLoggedIn, APICall, USERDATA } from '../checkAuth';
	import { goto } from '$app/navigation';
	let userData;
	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		if ((await ch3ckLoggedIn()) === undefined) goto('/login');
		userData = (await APICall('http://127.0.0.1:3000/api/v1/users/auth/me')).data.data.data;
	});
	// $: console.log(userData);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<!-- Pricing section -->
<section class="w-full pt-16 pb-20 bg-gray-50">
	<div class="px-10 mx-auto text-center max-w-7xl">
		<h2 class="text-5xl font-bold text-blue-600">
			{$USERDATA?.name?.toUpperCase()}'s <span class="text-gray-800">Profile</span>
		</h2>
		<p class="mt-3 text-lg text-gray-500">Your Data is in our system is as follows</p>

		<!-- Start Plan -->

		{#if userData}
			<div class="text-left">
				<p><b>Name:</b> {userData.name}</p>
				<p><b>Email:</b> {userData.email || 'no data'}</p>
				<p><b>Username:</b> {userData.username || 'no data'}</p>
				<p><b>Phone:</b> {userData.phone || 'no data'}</p>
				<p>
					<b>Registered:</b>
					{new Date(userData.createdAt).toLocaleDateString()} at {new Date(
						userData.createdAt
					).toLocaleTimeString()}
				</p>
			</div>
		{:else}
			<div class=" flex justify-center items-center m-40">
				<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
			</div>
		{/if}

		<!-- End Plan -->
	</div>
</section>
