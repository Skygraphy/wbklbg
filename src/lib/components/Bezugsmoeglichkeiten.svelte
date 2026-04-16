<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import BentoCard from '$lib/ui/BentoCard.svelte';
	import type { PopupStand } from '$lib/types/popup-stand';

	interface Props {
		popupStands: PopupStand[];
	}
	const { popupStands }: Props = $props();

	const pickupLocations = [
		{ name: 'Stadtmarketing Klosterneuburg', icon: '🏛️', detail: 'Rathausplatz' },
		{ name: 'Rathaus Klosterneuburg', icon: '🏢', detail: 'Stadtgemeinde' },
		{ name: 'Buchhandlung', icon: '📚', detail: 'In der Innenstadt' },
		{ name: 'Ausgewählte Heurige', icon: '🍷', detail: 'Rund ums Wachau-Gebiet' },
		{ name: 'Gastbetriebe', icon: '🍽️', detail: 'Partnerrestaurants' }
	];

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<SectionWrapper id="bezug" bg="base-100">
	<div class="mb-12 text-center">
		<h2 class="section-heading">So bekommst du das Wimmelbuch</h2>
		<p class="section-subheading">Online bestellen oder direkt in Klosterneuburg abholen</p>
	</div>

	<!-- Bento grid -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
		<!-- Online order tile: col-span-7 -->
		<BentoCard class="lg:col-span-7 flex flex-col gap-5 bg-primary text-primary-content">
			<div class="flex items-center gap-3">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-content/20">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</div>
				<div>
					<h3 class="font-display text-xl font-bold">Online bestellen</h3>
					<p class="text-primary-content/70 text-sm">Bequem von zu Hause</p>
				</div>
			</div>

			<p class="text-primary-content/80 text-sm leading-relaxed">
				Füll einfach das Kontaktformular aus und Ines meldet sich umgehend bei dir.
				Schnell, unkompliziert und direkt vom Verlag.
			</p>

			<div class="flex flex-wrap gap-3 text-sm">
				<div class="flex items-center gap-2 rounded-lg bg-primary-content/15 px-3 py-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Direkt beim Verlag
				</div>
				<div class="flex items-center gap-2 rounded-lg bg-primary-content/15 px-3 py-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Schnelle Lieferung
				</div>
				<div class="flex items-center gap-2 rounded-lg bg-primary-content/15 px-3 py-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Persönliche Widmung möglich
				</div>
			</div>

			<a
				href="#kontakt"
				class="btn bg-primary-content text-primary hover:bg-wim-cream mt-auto self-start"
			>
				Zum Bestellformular
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</BentoCard>

		<!-- Pickup locations tile: col-span-5 -->
		<BentoCard class="lg:col-span-5 flex flex-col gap-4">
			<div class="flex items-center gap-3 mb-1">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<div>
					<h3 class="font-display text-xl font-bold">Direkt abholen</h3>
					<p class="text-base-content/60 text-sm">In Klosterneuburg</p>
				</div>
			</div>

			<ul class="space-y-3">
				{#each pickupLocations as loc}
					<li class="flex items-center gap-3 rounded-xl bg-base-100 p-3 text-sm transition-colors hover:bg-base-300">
						<span class="text-xl shrink-0">{loc.icon}</span>
						<div>
							<div class="font-semibold">{loc.name}</div>
							<div class="text-base-content/50 text-xs">{loc.detail}</div>
						</div>
					</li>
				{/each}
			</ul>
		</BentoCard>

		<!-- Popup stands tile: col-span-12 -->
		<BentoCard class="lg:col-span-12">
			<div class="flex items-center gap-3 mb-6">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
				<div>
					<h3 class="font-display text-xl font-bold">Popup-Stände & Veranstaltungen</h3>
					<p class="text-base-content/60 text-sm">
						Schulen, Kindergärten, öffentliche Events – schau einfach vorbei!
					</p>
				</div>
			</div>

			{#if popupStands.length === 0}
				<div class="rounded-xl bg-base-100 p-6 text-center text-base-content/50 text-sm">
					<div class="text-3xl mb-2">📅</div>
					<p>Aktuelle Termine folgen in Kürze.<br />Schau regelmäßig vorbei oder kontaktiere Ines direkt.</p>
				</div>
			{:else}
				<div class="flex gap-4 overflow-x-auto pb-2 snap-x">
					{#each popupStands as stand}
						<div class="snap-start shrink-0 w-64 rounded-xl bg-base-100 p-4 border border-base-300">
							<div class="badge badge-secondary badge-sm mb-2">{formatDate(stand.date)}</div>
							<div class="font-semibold text-sm">{stand.location}</div>
							{#if stand.description}
								<p class="text-xs text-base-content/60 mt-1">{stand.description}</p>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</BentoCard>
	</div>
</SectionWrapper>
