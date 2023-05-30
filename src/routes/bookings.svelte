<script>
	import { onMount } from 'svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	import axios from 'axios';
	import { isUserLoggedIn, ch3ckLoggedIn, APICall, USERDATA, USERHEADERS } from '../checkAuth';
	import { indexServices, indexServicesApi } from '../apiCallStore';
	import { goto } from '$app/navigation';
	let bookingData;

	// 🎇 runs one time as soon as app loads
	onMount(async () => {
		// await indexServicesApi();
		if (!(await ch3ckLoggedIn())) {
			goto('/login');
		}
		bookingData = (
			await APICall(`http://127.0.0.1:3000/api/v1/bookings?workshopAllotedTo=${$USERDATA._id}`)
		).data.data.data;
	});

	// workshop to get in booking
	const workshopTakeIn = async (bookingId, data) => {
		refreshButton = true;

		try {
			const res = await axios({
				method: 'PATCH',
				url: `http://127.0.0.1:3000/api/v1/bookings/${bookingId}`,
				data,
				headers: $USERHEADERS
			});

			if (res.data.status === 'success') {
				notifications.success('Success', 2000);
				refreshBookings();
			}
		} catch (err) {
			console.log('error', err.response.data.message);
			notifications.danger(err.response.data.message, 1500);
			refreshButton = false;
		}
	};

	let refreshButton = false;
	const refreshBookings = async () => {
		bookingData = (
			await APICall(`http://127.0.0.1:3000/api/v1/bookings?workshopAllotedTo=${$USERDATA._id}`)
		).data.data.data;
		refreshButton = false;
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!-- Pricing section -->

<section class="w-full pt-16 pb-20 bg-gray-50">
	<div class="px-10 mx-auto text-center max-w-7xl">
		<h2 class="text-5xl font-bold text-blue-600">
			Your <span class="text-gray-800">BOOKINGS</span>
		</h2>
		<p class="mt-3 text-lg text-gray-500 inline-block">
			Please select the services that are near your location.
			<span class="inline-block"
				><button
					class="refresh relative {refreshButton === true ? 'loading' : ''}"
					on:click={() => {
						refreshButton = true;
						refreshBookings();
					}}
					style="bottom:-5px; margin-bottom:10px"
					><svg
						class="icon"
						height="24"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="m23.8995816 10.3992354c0 .1000066-.1004184.1000066-.1004184.2000132 0 0 0 .1000066-.1004184.1000066-.1004184.1000066-.2008369.2000132-.3012553.2000132-.1004184.1000066-.3012552.1000066-.4016736.1000066h-6.0251046c-.6025105 0-1.0041841-.4000264-1.0041841-1.00006592 0-.60003954.4016736-1.00006591 1.0041841-1.00006591h3.5146443l-2.8117154-2.60017136c-.9037657-.90005932-1.9079498-1.50009886-3.0125523-1.90012523-2.0083682-.70004614-4.2175733-.60003954-6.12552305.30001977-2.0083682.90005932-3.41422594 2.50016478-4.11715481 4.5002966-.20083682.50003295-.80334728.80005275-1.30543933.60003954-.50209205-.10000659-.80334728-.70004613-.60251046-1.20007909.90376569-2.60017136 2.71129707-4.60030318 5.12133891-5.70037568 2.41004184-1.20007909 5.12133894-1.30008569 7.63179914-.40002637 1.4058578.50003296 2.7112971 1.30008569 3.7154812 2.40015819l3.0125523 2.70017795v-3.70024386c0-.60003955.4016736-1.00006591 1.0041841-1.00006591s1.0041841.40002636 1.0041841 1.00006591v6.00039545.10000662c0 .1000066 0 .2000132-.1004184.3000197zm-3.1129707 3.7002439c-.5020921-.2000132-1.1046025.1000066-1.3054394.6000396-.4016736 1.1000725-1.0041841 2.200145-1.9079497 3.0001977-1.4058578 1.5000989-3.5146444 2.3001516-5.623431 2.3001516-2.10878662 0-4.11715482-.8000527-5.72384938-2.4001582l-2.81171548-2.6001714h3.51464435c.60251046 0 1.0041841-.4000263 1.0041841-1.0000659 0-.6000395-.40167364-1.0000659-1.0041841-1.0000659h-6.0251046c-.10041841 0-.10041841 0-.20083682 0s-.10041841 0-.20083682 0c0 0-.10041841 0-.10041841.1000066-.10041841 0-.20083682.1000066-.20083682.2000132s0 .1000066-.10041841.1000066c0 .1000066-.10041841.1000066-.10041841.2000132v.2000131.1000066 6.0003955c0 .6000395.40167364 1.0000659 1.0041841 1.0000659s1.0041841-.4000264 1.0041841-1.0000659v-3.7002439l2.91213389 2.8001846c1.80753138 2.0001318 4.31799163 3.0001977 7.02928871 3.0001977 2.7112971 0 5.2217573-1.0000659 7.1297071-2.9001911 1.0041841-1.0000659 1.9079498-2.3001516 2.4100418-3.7002439.1004185-.6000395-.2008368-1.2000791-.7029288-1.3000857z"
							transform="" />
					</svg></button
				></span>
			<br />
		</p>
		<!-- Start Plan -->
		{#if bookingData}
			<!-- This is an example component -->

			<!-- component -->
			<link
				href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
				rel="stylesheet" />
			<div class="flex items-center justify-center  bg-white">
				<div class="col-span-12">
					<div class="overflow-auto lg:overflow-visible">
						<div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1" />
						<table class="table text-gray-400 border-separate space-y-6 text-sm">
							<thead class="bg-blue-500 text-white">
								<tr>
									<th class="p-3">Service</th>
									<th class="p-3 ">Vehicle</th>
									<th class="p-3 ">Location</th>
									<th class="p-3 ">Rate</th>
									<th class="p-3 ">Workshop Assigned</th>
									<th class="p-3 text">Slot</th>
									<th class="p-3 ">Completed</th>
									<th class="p-3 ">Paid</th>
								</tr>
							</thead>
							<tbody>
								{#each bookingData as { service, vehicle, location, workshopAllotedTo, completed, paid, slot, _id }}
									<tr class="bg-blue-200 lg:text-black">
										<td class="p-3 font-medium capitalize">{service.planName}</td>
										<td class="p-3">{vehicle}</td>
										<td class="p-3">{location}</td>
										<td class="p-3 uppercase">{service.rate} INR</td>

										<td class="p-3">
											{#if workshopAllotedTo}
												<span class="bg-green-600 text-gray-50 rounded-md px-2"
													>{workshopAllotedTo.name}</span>
											{:else}
												<span
													on:click={() => workshopTakeIn(_id)}
													class="bg-red-600 text-gray-50 rounded-md px-2 hover:px-3 hover:cursor-pointer hover:bg-red-500 hover:shadow-sm	"
													>Take in</span>
											{/if}
										</td>
										<td class="p-3">
											<span class="bg-green-600 text-gray-50 rounded-md px-2"
												>{new Date(slot.date).toLocaleDateString()}</span>

											<span class="bg-green-600 text-gray-50 rounded-md px-2">{slot.time}</span>
										</td>
										<td class="p-3"
											>{#if completed}
												<span class="bg-green-600 text-gray-50 rounded-md px-2">Completed</span>
											{:else}
												<span
													on:click={() => workshopTakeIn(_id, { completed: true })}
													class="bg-red-600 text-gray-50 rounded-md px-2  hover:cursor-pointer hover:bg-red-500 hover:shadow-sm	"
													>Mark Completed</span>
											{/if}</td>
										<td class="p-3">
											{#if paid}
												<span class="bg-green-600 text-gray-50 rounded-md px-2">Paid</span>
											{:else if completed}
												<span
													on:click={() => workshopTakeIn(_id, { paid: true })}
													class="bg-red-600 text-gray-50 rounded-md px-2 hover:cursor-pointer hover:bg-red-500 hover:shadow-sm	"
													>Mark Paid</span>
											{:else}
												<span class="bg-red-600 text-gray-50 rounded-md px-2 ">Not Paid</span>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{:else}
			<div class=" flex justify-center items-center m-40">
				<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
			</div>
		{/if}

		<!-- End Plan -->
	</div>
</section>
<Toast />

<style>
	@keyframes rotating {
		from {
			-ms-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-ms-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	.refresh {
		background: #fff;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
		padding: 8px;
		border: 0;
		border-radius: 4px;
		width: 40px;
		height: 40px;
		margin: 0 auto;
		display: block;
	}
	.refresh .icon {
		fill: #323232;
	}
	.refresh:hover {
		background: #def4d7;
		cursor: pointer;
	}
	.refresh:active .icon {
		fill: #5ac938;
	}
	.refresh.loading {
		background: #def4d7;
		cursor: wait;
	}
	.refresh.loading .icon {
		fill: #5ac938;
		-webkit-animation: rotating 1.2s linear infinite;
		-moz-animation: rotating 1.2s linear infinite;
		-ms-animation: rotating 1.2s linear infinite;
		-o-animation: rotating 1.2s linear infinite;
		animation: rotating 1.2s linear infinite;
	}
</style>
