<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="max-w-7xl mx-auto">
	<Nav />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
