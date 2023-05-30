<script>
	import { onMount } from 'svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	import axios from 'axios';
	import { isUserLoggedIn, ch3ckLoggedIn, USERDATA } from '../checkAuth';
	import { goto } from '$app/navigation';

	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		ch3ckLoggedIn();
	});

	// let userData = [];
	// $: userData = $isUserLoggedIn.data;
	// $: console.log(userData);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<!-- Pricing section -->
<section class="w-full pt-16 pb-20 bg-gray-50">
	<div class="px-10 mx-auto text-center max-w-7xl">
		<h2 class="text-5xl font-bold text-blue-600">
			{$USERDATA?.name?.toUpperCase()}'s <span class="text-gray-800">Settings</span>
		</h2>
		<p class="mt-3 text-lg text-gray-500">Page is under development</p>

		<!-- Start Plan -->

		<!-- {#if userData !== undefined} -->
		<!-- <div class="text-left">
				<p><b>Name:</b> {userData.name}</p>
				<p><b>Email:</b> {userData.email}</p>
				<p><b>Username:</b> {userData.username}</p>
				<p>
					<b>Registered:</b>
					{new Date(userData.createdAt).toLocaleDateString()} at {new Date(
						userData.createdAt
					).toLocaleTimeString()}
				</p>
			</div> -->
		<!-- {:else} -->
		<div class=" flex justify-center items-center m-40">
			<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
		</div>
		<button on:click={() => goto('/')}><h1 class="text-3xl">Go Home</h1></button>
		<!-- {/if} -->

		<!-- End Plan -->
	</div>
</section>
