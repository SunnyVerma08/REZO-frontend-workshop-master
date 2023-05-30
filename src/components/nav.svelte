<script>
	import { isUserLoggedIn } from '../checkAuth';
	import { page } from '$app/stores';
	let profilePopup = false;
	import { goto } from '$app/navigation';

	// $: console.log($isUserLoggedIn?.data?.active);

	const handleKeydown = (event) => {
		profilePopup = false;
	};

	const active = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium';
	const inactive =
		'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

	const url = {
		home: '/',
		register: '/register',
		about: '/about',
		login: '/login'
	};

	function clickOutside(element, callbackFunction) {
		function onClick(event) {
			if (!element.contains(event.target)) {
				callbackFunction();
			}
		}

		document.body.addEventListener('click', onClick);

		return {
			update(newCallbackFunction) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	}
	let showModal = false;
	// $: console.log(showModal);
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
	<div class=" mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false">
					<span class="sr-only">Open main menu</span>
					<!--
			  Icon when menu is closed.
  
			  Heroicon name: outline/menu
  
			  Menu open: "hidden", Menu closed: "block"
			-->
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16" />
					</svg>
					<!--
			  Icon when menu is open.
  
			  Heroicon name: outline/x
  
			  Menu open: "block", Menu closed: "hidden"
			-->
					<svg
						class="hidden h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center align-middle">
					<h1 class="lg:block text-white text-2xl h-8 w-auto">R E Z O</h1>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href={url.home}
							class={$page.path === url.home ? active : inactive}
							aria-current="page">Home</a>

						<a href={url.about} class={$page.path === url.about ? active : inactive}>About</a>

						<a href={url.register} class={$page.path === url.register ? active : inactive}
							>Register</a>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
				{#if $isUserLoggedIn === true}
					<button
						type="button"
						class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
						<span class="sr-only">View notifications</span>
						<!-- Heroicon name: outline/bell -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
					</button>
					<div class="ml-3 relative">
						<div>
							<button
								type="button"
								class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
								id="user-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								on:click={(event) => {
									showModal = true;
									// console.log('clicked inside');
									event.stopPropagation();
								}}
								use:clickOutside={() => {
									// console.log('clicked outside');
									showModal = false;
								}}>
								<span class="sr-only">Open user menu</span>
								<img
									class="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="" />
							</button>
						</div>

						<div
							style="{showModal !== true ? 'display:none' : 'display:block'};"
							class="origin-top-right hover:border-2  absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1">
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<a
								on:click={() => {
									showModal = false;
									goto('/profile');
								}}
								href="/profile"
								class="block px-4 py-2 text-sm text-gray-700 bg-white hover:text-yellow-500 hover:font-bold transition-all"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your Profile</a
							><a
								on:click={() => {
									showModal = false;
									goto('/bookings');
								}}
								href="/bookings"
								class="block px-4 py-2 text-sm text-gray-700 bg-white hover:text-yellow-500 hover:font-bold transition-all"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your Bookings</a>
							<a
								on:click={() => {
									showModal = false;
									goto('/settings');
								}}
								href="/settings"
								class="block px-4 py-2 text-sm text-gray-700 bg-white hover:text-yellow-500 hover:font-bold transition-all"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-1">Settings</a>
							<a
								href="/"
								on:click={() => {
									localStorage.setItem('userLoginData', JSON.stringify({}));
									$isUserLoggedIn = false;
									showModal = false;
									goto('/');
								}}
								class="block px-4 py-2 text-sm text-gray-700 bg-white hover:text-yellow-500 hover:font-bold transition-all"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-2">Sign out</a>
						</div>
					</div>
				{:else}
					<!-- Log in -->
					<div class="ml-3 relative">
						<div>
							<a href={url.login} class={$page.path === url.login ? active : inactive}>Log In</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a
				href="/"
				class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
				aria-current="page">Dashboard</a>

			<a
				href="/"
				class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
				>Team</a>

			<a
				href="/"
				class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
				>Projects</a>

			<a
				href="/"
				class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
				>Calendar</a>
		</div>
	</div>
</nav>
