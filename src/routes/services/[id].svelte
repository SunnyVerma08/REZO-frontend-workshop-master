<script context="module">
	import { indexServicesApiData } from '../../apiCallStore';

	export async function load(ctx) {
		let id = ctx.page.params.id;
		const service = await indexServicesApiData(id);
		return service;
	}
</script>

<script>
	import { notifications } from '../../components/notifications.js';
	import Toast from '../../components/Toast.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { USERDATA, USERHEADERS, ch3ckLoggedIn } from '../../checkAuth';
	import { planServices } from '../../apiCallStore';
	import { goto } from '$app/navigation';

	// console.log($planServices);
	// Get Current Date
	const DATE = (daysToAdd) => {
		if (daysToAdd)
			return new Date(new Date().getTime() + daysToAdd * 24 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 10);
		return new Date().toISOString().slice(0, 10);
	};
	// default value is false
	let alreadyBooked = false;

	// booking process
	let bookingFields = {
		service: '',
		location: '',
		vehicle: '',
		slot: {
			date: DATE(),
			time: '10:00'
		}
	};
	$: bookingFields.service = $planServices[0]._id;
	const bookingHandler = async () => {
		try {
			const data = bookingFields;
			const res = await axios({
				method: 'POST',
				url: 'http://127.0.0.1:3000/api/v1/bookings',
				data,
				headers: $USERHEADERS
			});

			if (res.data.status === 'success') {
				notifications.success('Successfully Booked', 1000);
			}
			console.log(res);
			setTimeout(() => {
				goto('/bookings');
			}, 1000);
		} catch (err) {
			console.log('error', err.response.data.message);
			notifications.danger(err.response.data.message, 1500);
		}
	};

	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		await ch3ckLoggedIn();
		//  alreadyBooked = true;
	});
</script>

<svelte:head>
	<title>Rezo - {$planServices[0].planName}</title>
</svelte:head>
<div class="flex flex-col">
	<h1 class="text-2xl  my-8 uppercase">Plan : {$planServices[0].planName}</h1>
	<hr />
	<h1 class="text-xl  uppercase">Rate : {$planServices[0].rate}</h1>
	{#each $planServices[0].dataPoints as item}
		<p style="margin-top:10px" class="text-xl  uppercase">
			<span
				style="position: relative;
            top: -3px;">👉</span>
			{item}
		</p>
	{/each}
</div>
<div class="flex justify-center">
	<div class="{alreadyBooked ? 'w-full' : 'w-1/2'} flex-row  bg-white rounded shadow-2xl p-8 m-4">
		{#if !alreadyBooked}
			<h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
				Book Your Service
			</h1>
			<form on:submit|preventDefault={bookingHandler}>
				<div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="location">Location</label>
					<input
						class="border py-2 px-3 text-grey-800"
						bind:value={bookingFields.location}
						type="text"
						location="location"
						id="location" />
				</div>
				<div class="flex flex-col mb-4">
					<label class="mb-2 font-bold text-lg text-gray-900" for="vehicle">Vehicle</label>
					<input
						class="border py-2 px-3 text-grey-800"
						type="text"
						bind:value={bookingFields.vehicle}
						name="vehicle"
						id="vehicle" />
				</div>

				<div class="flex flex-col mb-4 content-between">
					<div class="flex flex-row justify-around">
						<p class="mb-2 font-bold text-lg text-gray-900">Slot Date :</p>
						<input
							class="border py-2 px-3 text-grey-800"
							type="date"
							id="start"
							name="trip-start"
							bind:value={bookingFields.slot.date}
							min={DATE()}
							max={DATE(30)} />
					</div>
					<div class="flex flex-row justify-around">
						<p class="mb-2 font-bold text-lg text-gray-900">Slot Time :</p>
						<input
							class="border py-2 px-3 text-grey-800"
							type="Time"
							id="start"
							name="trip-start"
							bind:value={bookingFields.slot.time}
							min="09:00"
							max="18:00" />
					</div>
					<br />
					<button
						class="bg-yellow-500 hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded transition-all items-center"
						type="submit">Submit</button>
				</div>
			</form>
		{:else}
			<div class="text-center text-xl">
				<br />
				<p>You are already authenticated and Booked user!!</p>

				<p>Do you still want to create a new account?</p>
				<br />
			</div>
			<div class="flex justify-center ">
				<button
					on:click={() => {
						alreadyBooked = !alreadyBooked;
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
