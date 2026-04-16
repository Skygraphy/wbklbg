<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';

	const tiers = [
		{
			qty: '1 Exemplar',
			price: '€ 39',
			highlight: false,
			badge: null,
			note: 'Ideal als persönliches Geschenk',
			items: ['1 Wimmelbuch Klosterneuburg', 'Hardcover, 12 Doppelseiten', 'Handgezeichnet']
		},
		{
			qty: '3 Exemplare',
			price: '€ 109',
			highlight: true,
			badge: 'Sparset',
			note: 'Perfekt für Familie & Freunde',
			items: ['3 Wimmelbücher Klosterneuburg', 'Spare € 8 gegenüber Einzelkauf', 'Ideal als Mehrfachgeschenk']
		}
	];
</script>

<SectionWrapper id="preise" bg="base-200">
	<div class="text-center mb-12">
		<h2 class="section-heading">Preise</h2>
		<p class="section-subheading">Direkt bei Ines bestellen – schnell und unkompliziert</p>
	</div>

	<div class="flex flex-col sm:flex-row justify-center items-stretch gap-6 max-w-2xl mx-auto">
		{#each tiers as tier}
			<div
				class="card flex-1 relative shadow-md transition-transform duration-200
				       {tier.highlight
						? 'bg-primary text-primary-content scale-105 shadow-lg'
						: 'bg-base-100'}"
			>
				{#if tier.badge}
					<div class="absolute -top-3 left-1/2 -translate-x-1/2">
						<span class="badge bg-secondary text-white border-0 px-4 py-3 text-sm font-semibold shadow">
							{tier.badge}
						</span>
					</div>
				{/if}
				<div class="card-body items-center text-center pt-10">
					<h3 class="font-display text-xl font-semibold">{tier.qty}</h3>
					<div class="my-4">
						<span class="font-display text-5xl font-bold">{tier.price}</span>
					</div>
					<p class="text-sm opacity-75 mb-4">{tier.note}</p>
					<ul class="space-y-2 text-sm mb-6 w-full">
						{#each tier.items as item}
							<li class="flex items-center gap-2">
								<svg class="h-4 w-4 shrink-0 {tier.highlight ? 'text-primary-content' : 'text-primary'}"
									fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
								</svg>
								{item}
							</li>
						{/each}
					</ul>
					<a
						href="#kontakt"
						class="btn w-full
						       {tier.highlight
								? 'bg-primary-content text-primary hover:bg-wim-cream'
								: 'btn-primary'}"
					>
						Jetzt bestellen
					</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Gift occasions callout -->
	<div class="mt-12 rounded-bento bg-base-100 p-6 max-w-3xl mx-auto border border-base-300">
		<div class="flex items-start gap-4">
			<span class="text-3xl shrink-0">🎁</span>
			<div>
				<h4 class="font-display text-lg font-semibold mb-1">Das perfekte Geschenk für jeden Anlass</h4>
				<p class="text-base-content/70 text-sm leading-relaxed">
					Ob als Geschenk zu diversen Anlässen – Geburtstag, Weihnachten, Zeugnis,
					Kindergarten- oder Schulabschluss – oder einfach als liebevolle Überraschung:
					Das Wimmelbuch sorgt garantiert für leuchtende Augen. Gleich vorbeischauen
					und eintauchen in die bunte Welt unserer schönen Stadt!
				</p>
			</div>
		</div>
	</div>
</SectionWrapper>
