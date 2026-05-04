<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import BentoCard from '$lib/ui/BentoCard.svelte';
	import type { PopupStand } from '$lib/types/popup-stand';
	import type { PickupLocation } from '$lib/types/pickup-location';

	interface Props {
		popupStands: PopupStand[];
		pickupLocations: PickupLocation[];
	}
	const { popupStands, pickupLocations }: Props = $props();

	function parseIcon(icon: string | null): { name: string; color: string } {
		if (icon && icon.includes('|')) {
			const [name, color] = icon.split('|');
			return { name, color: color ?? '#C2714F' };
		}
		return { name: 'store', color: '#C2714F' };
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	function formatDateRange(stand: PopupStand): string {
		if (!stand.date_to) return formatDate(stand.date_from);
		const from = new Date(stand.date_from);
		const to = new Date(stand.date_to);
		if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
			const dayFrom = from.toLocaleDateString('de-AT', { day: 'numeric' });
			return `${dayFrom}–${formatDate(stand.date_to)}`;
		}
		return `${formatDate(stand.date_from)} – ${formatDate(stand.date_to)}`;
	}

	function chipDate(stand: PopupStand): { top: string; bottom: string } {
		const from = new Date(stand.date_from);
		const mo = (d: Date) => d.toLocaleDateString('de-AT', { month: 'short' }).replace('.', '');
		if (!stand.date_to) {
			return { top: String(from.getDate()), bottom: mo(from) };
		}
		const to = new Date(stand.date_to);
		if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
			return { top: `${from.getDate()}–${to.getDate()}`, bottom: mo(from) };
		}
		return { top: `${from.getDate()}. ${mo(from)}`, bottom: `– ${to.getDate()}. ${mo(to)}` };
	}
</script>

<SectionWrapper id="bezug" bg="base-100">
	<div class="mb-12 text-center">
		<h2 class="section-heading">So bekommst du das Wimmelbuch</h2>
		<p class="section-subheading">Online bestellen oder direkt in Klosterneuburg abholen</p>
		<div class="flex flex-col sm:flex-row justify-center gap-6 mt-8 mx-auto max-w-xs">
			<img
				src="/images/Wimmelbuch_Deckblatt.jpg"
				alt="Wimmelbuch Klosterneuburg – Deckblatt"
				class="flex-1 rounded-bento shadow-xl"
			/>
			<img
				src="/images/Wimmelbuch_Rückseite.jpg"
				alt="Wimmelbuch Klosterneuburg – Rückseite"
				class="flex-1 rounded-bento shadow-xl"
			/>
		</div>
	</div>

	<!-- Bento grid -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
		<!-- Online order tile: col-span-12 -->
		<BentoCard class="lg:col-span-12 flex flex-col lg:flex-row lg:items-center gap-6 bg-primary text-primary-content">
			<!-- Left: icon + heading + description + badges -->
			<div class="flex flex-col gap-4 flex-1">
				<div class="flex items-center gap-3">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-content/20 shrink-0">
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
			</div>

			<!-- Right: CTA button -->
			<a
				href="#kontakt"
				class="btn bg-primary-content text-primary hover:bg-wim-cream shrink-0"
			>
				Zum Bestellformular
			</a>
		</BentoCard>

		<!-- Pickup locations tile: col-span-12 -->
		<BentoCard class="lg:col-span-12 bg-accent/5">
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
				<div class="flex items-center gap-3">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-content shrink-0">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</div>
					<div>
						<h3 class="font-display text-xl font-bold">Direkt abholen</h3>
						<p class="text-base-content/60 text-sm">In Klosterneuburg erhältlich</p>
					</div>
				</div>
				{#if pickupLocations.length > 0}
					<span class="badge badge-accent badge-lg self-start sm:self-auto shrink-0">
						{pickupLocations.length} {pickupLocations.length === 1 ? 'Abholstelle' : 'Abholstellen'}
					</span>
				{/if}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{#each pickupLocations as loc}
					{@const ic = parseIcon(loc.icon)}
					<div class="rounded-xl bg-base-100 border border-base-200 p-4 flex gap-3 hover:border-accent/40 transition-colors">
						<span class="flex items-center justify-center bg-accent/10 rounded-lg w-12 h-12 shrink-0">
							<i class="fa-solid fa-{ic.name} text-xl" style="color: {ic.color}"></i>
						</span>
						<div class="min-w-0">
							<div class="font-semibold text-sm leading-snug">{loc.name}</div>
							{#if loc.address}
								<div class="text-xs text-base-content/50 mt-0.5">{loc.address}</div>
							{/if}
							{#if loc.email}
								<a href="mailto:{loc.email}" class="text-primary text-xs hover:underline truncate block mt-0.5">{loc.email}</a>
							{/if}
							{#if loc.phone}
								<a href="tel:{loc.phone}" class="text-base-content/50 text-xs hover:underline block">{loc.phone}</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</BentoCard>

		<!-- Popup stands tile: col-span-12 -->
		<BentoCard class="lg:col-span-12 bg-secondary/5">
			<!-- Header -->
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
				<div class="flex items-center gap-3">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-content shrink-0">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h3 class="font-display text-xl font-bold">Popup-Stände & Veranstaltungen</h3>
						<p class="text-base-content/60 text-sm">Persönlich treffen – Buch kaufen – mit Ines plaudern!</p>
					</div>
				</div>
				{#if popupStands.length > 0}
					<span class="badge badge-secondary badge-lg self-start sm:self-auto shrink-0">
						{popupStands.length} {popupStands.length === 1 ? 'Termin' : 'Termine'}
					</span>
				{/if}
			</div>

			{#if popupStands.length === 0}
				<div class="rounded-xl bg-base-100 p-8 text-center text-base-content/50">
					<svg class="h-10 w-10 mx-auto mb-3 text-base-content/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<p class="text-sm font-medium">Aktuelle Termine folgen in Kürze.</p>
					<p class="text-xs mt-1">Schau regelmäßig vorbei oder kontaktiere Ines direkt.</p>
				</div>
			{:else}
				{@const [next, ...rest] = popupStands}
				{@const nextChip = chipDate(next)}

				<!-- Featured: next event -->
				{@const nextIc = parseIcon(next.icon)}
				<div class="rounded-2xl bg-secondary text-secondary-content p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
					<div class="flex items-center gap-4 sm:gap-5">
						<div class="flex flex-col items-center justify-center bg-secondary-content/20 rounded-xl w-16 h-16 shrink-0 text-center">
							<span class="text-2xl font-bold leading-none">{nextChip.top}</span>
							<span class="text-[11px] uppercase tracking-widest opacity-80 mt-0.5">{nextChip.bottom}</span>
						</div>
						<div class="flex-1 min-w-0">
							<div class="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Nächster Termin</div>
							<div class="font-display text-xl font-bold leading-tight">
								<i class="fa-solid fa-{nextIc.name} mr-1.5 text-base opacity-70"></i>{next.name}
							</div>
							{#if next.address}
								<div class="text-secondary-content/70 text-sm mt-0.5">{next.address}</div>
							{/if}
							{#if next.note}
								<p class="text-secondary-content/70 text-xs mt-2 leading-relaxed">{@html next.note}</p>
							{/if}
						</div>
					</div>
					{#if next.date_to}
						<div class="sm:ml-auto sm:self-center text-xs text-secondary-content/60 shrink-0">
							{formatDateRange(next)}
						</div>
					{/if}
				</div>

				<!-- Remaining events -->
				{#if rest.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each rest as stand}
							{@const chip = chipDate(stand)}
							{@const ic = parseIcon(stand.icon)}
							<div class="rounded-xl bg-base-100 border border-base-200 p-4 flex gap-3 hover:border-secondary/40 transition-colors">
								<div class="flex flex-col items-center justify-center bg-secondary/10 rounded-lg w-14 h-14 shrink-0 text-secondary text-center">
									<span class="text-sm font-bold leading-none">{chip.top}</span>
									<span class="text-[9px] uppercase tracking-wide mt-0.5">{chip.bottom}</span>
								</div>
								<div class="min-w-0">
									<div class="font-semibold text-sm leading-snug">
										<i class="fa-solid fa-{ic.name} mr-1 text-xs" style="color: {ic.color}"></i>{stand.name}
									</div>
									{#if stand.address}
										<div class="text-xs text-base-content/50 mt-0.5">{stand.address}</div>
									{/if}
									{#if stand.note}
										<p class="text-xs text-base-content/60 mt-1 leading-relaxed">{@html stand.note}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{/if}
		</BentoCard>
	</div>
</SectionWrapper>
