<script lang="ts">
	import SpotlightCursor from '$lib/ui/SpotlightCursor.svelte';
</script>

<SpotlightCursor>
	<!-- Book cover: background decoration -->
	<img
		src="/images/book-cover.png"
		alt="Wimmelbuch Klosterneuburg Cover"
		class="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[55%]
		       select-none object-contain opacity-20 lg:opacity-30"
		aria-hidden="true"
	/>

	<!-- Decorative month pills -->
	<div class="absolute top-8 right-8 hidden flex-wrap gap-2 opacity-40 lg:flex max-w-xs">
		{#each ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'] as month}
			<span class="badge badge-outline badge-sm text-wim-brown-light border-wim-brown-light">
				{month}
			</span>
		{/each}
	</div>

	<!-- Main content -->
	<div class="relative z-10 flex max-w-2xl flex-col gap-6">
		<div class="flex items-center gap-2">
			<span class="badge bg-wim-terracotta text-white border-0 px-3 py-3 text-xs font-semibold uppercase tracking-wider">
				Neu 2025
			</span>
			<span class="text-wim-brown-light text-sm">Handgezeichnet · Klosterneuburg</span>
		</div>

		<h1 class="font-display text-5xl font-bold leading-tight text-wim-brown md:text-6xl lg:text-7xl">
			Klosterneuburg
			<span class="text-primary italic"> wimmelt</span>,
			<br class="hidden sm:block" />
			eine Reise
			<br class="hidden sm:block" />
			rund ums Jahr.
		</h1>

		<p class="text-lg text-wim-brown/70 md:text-xl">
			12 Doppelseiten &middot; 12 Monate &middot; unzählige Entdeckungen
			<br />
			Handgezeichnet mit Liebe von Ines Wohlmuth.
		</p>

		<div class="flex flex-wrap gap-4">
			<a href="#bezug" class="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-shadow">
				Jetzt bestellen
			</a>
			<a href="#buch" class="btn btn-outline btn-lg border-wim-brown text-wim-brown hover:bg-wim-brown hover:text-wim-cream">
				Mehr erfahren
			</a>
		</div>

		<!-- Trust signals -->
		<div class="flex flex-wrap items-center gap-6 pt-2 text-sm text-wim-brown/60">
			<span class="flex items-center gap-1.5">
				<svg class="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
				100% handgezeichnet
			</span>
			<span class="flex items-center gap-1.5">
				<svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				Made in Klosterneuburg
			</span>
			<span class="flex items-center gap-1.5">
				<svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
				</svg>
				2 Jahre Herzensarbeit
			</span>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
		<span class="text-xs text-wim-brown/60">Mehr entdecken</span>
		<svg class="h-5 w-5 text-wim-brown/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</SpotlightCursor>
