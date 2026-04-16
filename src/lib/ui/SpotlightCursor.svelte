<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();

	let x = $state(50);
	let y = $state(50);
	let heroEl: HTMLDivElement;
	let hasPointer = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!heroEl) return;
		const rect = heroEl.getBoundingClientRect();
		x = ((e.clientX - rect.left) / rect.width) * 100;
		y = ((e.clientY - rect.top) / rect.height) * 100;
		hasPointer = true;
	}

	function handleMouseLeave() {
		hasPointer = false;
	}
</script>

<div
	bind:this={heroEl}
	role="banner"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	class="relative min-h-[92vh] overflow-hidden flex items-center section-padding"
	style="background:
		{hasPointer
			? `radial-gradient(700px circle at ${x}% ${y}%, rgba(253,246,236,0.22) 0%, transparent 75%),`
			: ''}
		linear-gradient(135deg, #F5E8D3 0%, #EDD9BA 60%, #F0E0C8 100%);"
>
	{@render children()}
</div>
