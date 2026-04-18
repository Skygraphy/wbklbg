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
	let scrollY = $state(0);

	const parallaxFactor = 0.35;

	$effect(() => {
		function onScroll() {
			scrollY = window.scrollY;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function handleMouseMove(e: MouseEvent) {
		if (!heroEl) return;
		const rect = heroEl.getBoundingClientRect();
		x = ((e.clientX - rect.left) / rect.width) * 100;
		y = ((e.clientY - rect.top) / rect.height) * 100;
		hasPointer = true;
	}

	function handleMouseLeave() {
		hasPointer = false;
		x = 50;
		y = 50;
	}
</script>

<div
	bind:this={heroEl}
	role="banner"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	class="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
>
	<!-- Parallax background image -->
	<img
		src="/images/hero-klosterneuburg.jpg"
		alt=""
		aria-hidden="true"
		class="absolute left-0 w-full object-cover object-center pointer-events-none select-none"
		style="height: 140%; top: -20%; transform: translateY({scrollY * parallaxFactor}px);"
	/>

	<!-- Light cream overlay with subtle spotlight -->
	<div
		class="absolute inset-0 transition-[background] duration-150"
		style="background: radial-gradient(600px circle at {x}% {y}%, rgba(61,43,31,{hasPointer ? 0.55 : 0.80}) 0%, rgba(61,43,31,0.80) 70%);"
	></div>

	<!-- Main content -->
	<div class="relative z-10 w-full section-padding" style="padding-bottom: 7rem;">
		{@render children()}
	</div>

	<!-- Scroll indicator – anchored to hero bottom, outside content wrapper -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
		<span class="text-xs text-white/60">Mehr entdecken</span>
		<svg class="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</div>
