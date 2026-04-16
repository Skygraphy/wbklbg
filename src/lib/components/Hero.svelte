<script lang="ts">
	import SpotlightCursor from '$lib/ui/SpotlightCursor.svelte';
</script>

<SpotlightCursor>
	<!-- Main content – centered -->
	<div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">

		<!-- Tag line -->
		<div class="flex flex-wrap items-center justify-center gap-2">
			<span class="rounded-full bg-primary/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow">
				Neu 2025
			</span>
			<span class="text-white/70 text-sm">Handgezeichnet · Klosterneuburg</span>
		</div>

		<!-- Headline -->
		<h1 class="leading-[1.1]">
			<span
				class="font-amatic font-bold block tracking-wide text-7xl md:text-8xl lg:text-[7rem] drop-shadow-md"
				style="color: #cd1719;"
			>
				Klosterneuburg
			</span>
			<span class="font-sacramento block -mt-1 text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-md">
				wimmelt
			</span>
			<span class="font-amatic font-bold block tracking-wide mt-1 text-4xl md:text-5xl lg:text-6xl text-white/90 drop-shadow">
				eine Reise rund ums Jahr.
			</span>
		</h1>

		<!-- Sub-headline -->
		<p class="max-w-xl text-base text-white/75 md:text-lg drop-shadow">
			12 Doppelseiten &middot; 12 Monate &middot; unzählige Entdeckungen
			<br />
			Handgezeichnet mit Liebe von Ines Wohlmuth.
		</p>

		<!-- CTA buttons -->
		<div class="flex flex-wrap justify-center gap-4">
			<a href="#bezug" class="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-shadow">
				Jetzt bestellen
			</a>
			<a
				href="#buch"
				class="btn btn-lg border-white/40 bg-white/10 text-white
				       hover:bg-white/20 hover:border-white/60"
			>
				Mehr erfahren
			</a>
		</div>

		<!-- Trust signals -->
		<div class="flex flex-wrap justify-center items-center gap-6 pt-2 text-sm text-white/60">
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
</SpotlightCursor>
