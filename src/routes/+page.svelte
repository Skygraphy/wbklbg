<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Bezugsmoeglichkeiten from '$lib/components/Bezugsmoeglichkeiten.svelte';
	import Preise from '$lib/components/Preise.svelte';
	import Besonderheiten from '$lib/components/Besonderheiten.svelte';
	import Entstehung from '$lib/components/Entstehung.svelte';
	import UeberInes from '$lib/components/UeberInes.svelte';
	import Kontakt from '$lib/components/Kontakt.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Wimmelbuch Klosterneuburg – Eine Reise rund ums Jahr</title>
</svelte:head>

<main>
	<Hero standardPrice={data.standardPrice} orderPrefillMessage={data.orderPrefillMessage} />
	<Bezugsmoeglichkeiten popupStands={data.popupStands} pickupLocations={data.pickupLocations} standardPrice={data.standardPrice} orderPrefillMessage={data.orderPrefillMessage} />
	<Preise promotions={data.promotions} standardPrice={data.standardPrice} orderPrefillMessage={data.orderPrefillMessage} promotionMessage={data.promotionMessage} promotionInquiryMessage={data.promotionInquiryMessage} />
	<Besonderheiten />
	<Entstehung />
	<UeberInes />
	<Kontakt contactEmail={data.contactEmail} contactIsbn={data.contactIsbn} />
</main>

<!-- Footer -->
<footer class="bg-wim-brown text-wim-cream py-10 px-6 text-center">
	<p class="font-display text-lg font-semibold mb-1">Wimmelbuch Klosterneuburg</p>
	<p class="text-wim-cream/60 text-sm mb-4">
		© {new Date().getFullYear()} Ines Wohlmuth · wimmelbuch-klosterneuburg.at
	</p>
	<div class="flex justify-center gap-6 text-sm text-wim-cream/50">
		<a href="mailto:{data.contactEmail}" class="hover:text-wim-cream transition-colors">
			{data.contactEmail}
		</a>
		<a href="/impressum" class="hover:text-wim-cream transition-colors">Impressum</a>
	</div>
</footer>
