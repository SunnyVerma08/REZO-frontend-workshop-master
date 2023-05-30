<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from './notifications.js';

	export let themes = {
		danger: 'red',
		success: 'green',
		warning: 'orange',
		info: 'skyblue',
		default: 'indigo'
	};
</script>

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div animate:flip class="toast" in:fly={{ y: 30 }} out:fly={{ y: -30 }}>
			<div class=" text-center py-4 lg:px-4">
				<div
					class="p-2 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
					style="background: {themes[notification.type]};"
					role="alert">
					<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
						>{notification.type}</span>
					<span class="font-semibold mr-2 text-xl text-white text-left flex-auto"
						>{notification.message}</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
	}

	.toast {
		flex: 0 0 auto;
		margin-bottom: 10px;
	}

	/* .content {
		padding: 10px;
		display: block;
		color: white;
		font-weight: 500;
	} */
</style>
