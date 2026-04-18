<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/ui/ThemeToggle.svelte';

	let { children } = $props();
</script>

<ThemeToggle />
{@render children()}
