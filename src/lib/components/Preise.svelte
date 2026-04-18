<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import type { Promotion } from '$lib/types/promotion';

	interface Props {
		promotions: Promotion[];
	}
	const { promotions }: Props = $props();

	const STANDARD_PRICE = 39;

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('de-AT', { day: 'numeric', month: 'long' });
	}

	function priceOptions(p: Promotion) {
		return [
			p.price1_qty && p.price1_amt != null ? { qty: p.price1_qty, amt: parseFloat(String(p.price1_amt)) } : null,
			p.price2_qty && p.price2_amt != null ? { qty: p.price2_qty, amt: parseFloat(String(p.price2_amt)) } : null,
			p.price3_qty && p.price3_amt != null ? { qty: p.price3_qty, amt: parseFloat(String(p.price3_amt)) } : null,
		].filter(Boolean) as { qty: string; amt: number }[];
	}

	function savings(amt: number, qty: string): number | null {
		const n = parseInt(qty);
		if (isNaN(n) || n < 1) return null;
		return Math.round(n * STANDARD_PRICE - amt);
	}
</script>

<SectionWrapper id="preise" bg="base-200">
	<div class="text-center mb-12">
		<h2 class="section-heading">Preise</h2>
		<p class="section-subheading">Direkt bei Ines bestellen – schnell und unkompliziert</p>
	</div>

	<div class="max-w-5xl mx-auto">

		<!-- Standardpreis – prominent -->
		<div class="bg-primary text-primary-content rounded-bento shadow-xl p-10 flex flex-col sm:flex-row items-center gap-8 mb-8">
			<div class="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
				<div class="text-xs font-bold tracking-widest uppercase opacity-60 mb-1">Standardpreis</div>
				<div class="font-bold text-7xl leading-none">{STANDARD_PRICE} €</div>
				<div class="text-sm opacity-70 mt-2">pro Exemplar · inkl. persönlicher Widmung</div>
			</div>
			<ul class="flex-1 space-y-2 text-sm opacity-85">
				<li class="flex items-center gap-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Hardcover, 12 Doppelseiten
				</li>
				<li class="flex items-center gap-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					100 % handgezeichnet von Ines Wohlmuth
				</li>
				<li class="flex items-center gap-2">
					<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Direkt vom Verlag – schnelle Lieferung
				</li>
			</ul>
			<a href="#kontakt" class="btn bg-primary-content text-primary hover:bg-wim-cream shrink-0 btn-lg shadow">
				Jetzt bestellen
			</a>
		</div>

		<!-- Aktive Aktionen – dezent -->
		{#if promotions.length > 0}
		<div class="flex flex-col gap-4">
			{#each promotions as promo}
			{@const options = priceOptions(promo)}
			<div class="rounded-bento border border-base-300 bg-base-100 p-5">
				<div class="flex flex-wrap items-center justify-between gap-3 mb-4">
					<div class="flex items-center gap-2">
						<span class="text-2xl leading-none">{promo.icon}</span>
						<div>
							<span class="text-[10px] font-bold uppercase tracking-widest text-base-content/40">Sonderaktion · </span>
							<span class="text-[10px] font-semibold text-base-content/40">bis {formatDate(promo.valid_to)}</span>
							<div class="text-sm font-bold text-base-content">{promo.name}</div>
						</div>
					</div>
					<a href="#kontakt" class="btn btn-sm btn-outline btn-primary">Anfragen</a>
				</div>
				<div class="flex flex-wrap gap-3">
					{#each options as opt}
					{@const saved = savings(opt.amt, opt.qty)}
					<div class="flex items-baseline gap-2 bg-base-200 rounded-xl px-4 py-2">
						<span class="text-xs text-base-content/50 font-medium">{opt.qty}</span>
						<span class="text-lg font-bold text-base-content">{opt.amt % 1 === 0 ? opt.amt.toFixed(0) : opt.amt.toFixed(2)} €</span>
						{#if saved && saved > 0}
							<span class="text-[10px] text-secondary font-semibold">–{saved} €</span>
						{/if}
					</div>
					{/each}
				</div>
			</div>
			{/each}
		</div>
		{/if}

		<!-- Geschenk-Callout -->
		<div class="mt-10 rounded-bento bg-base-100 p-6 border border-base-300">
			<div class="flex items-start gap-4">
				<span class="text-3xl shrink-0">🎁</span>
				<div>
					<h4 class="font-display text-lg font-semibold mb-1">Das perfekte Geschenk für jeden Anlass</h4>
					<p class="text-base-content/70 text-sm leading-relaxed">
						Ob als Geschenk zu diversen Anlässen – Geburtstag, Weihnachten, Zeugnis,
						Kindergarten- oder Schulabschluss – oder einfach als liebevolle Überraschung.
						Das Wimmelbuch sorgt garantiert für leuchtende Augen. Gleich vorbeischauen
						und eintauchen in die bunte Welt unserer schönen Stadt!
					</p>
				</div>
			</div>
		</div>

	</div>
</SectionWrapper>
