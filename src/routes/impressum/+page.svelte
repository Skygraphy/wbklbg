<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Impressum – Wimmelbuch Klosterneuburg</title>
</svelte:head>

<main class="min-h-screen bg-base-100">
	<div class="max-w-2xl mx-auto px-6 py-16">
		<a href="/" class="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors mb-10">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			Zurück zur Startseite
		</a>

		<h1 class="font-display text-3xl font-bold mb-10">Impressum</h1>

		<section class="mb-8">
			<h2 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-3">Medieninhaberin & Herausgeberin</h2>
			<p class="text-base-content leading-relaxed whitespace-pre-line">
				{data.name}{data.address ? '\n' + data.address : ''}
			</p>
		</section>

		{#if data.email}
			<section class="mb-8">
				<h2 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-3">Kontakt</h2>
				<p class="text-base-content">
					<a href="mailto:{data.email}" class="text-primary hover:underline">{data.email}</a>
				</p>
			</section>
		{/if}

		{#if data.business}
			<section class="mb-8">
				<h2 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-3">Unternehmensgegenstand</h2>
				<p class="text-base-content">{data.business}</p>
			</section>
		{/if}

		<section class="mb-8">
			<h2 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-3">Grundlegende Richtung</h2>
			<p class="text-base-content/70 text-sm leading-relaxed">
				Diese Website informiert über das Wimmelbuch Klosterneuburg – Eine Reise rund ums Jahr –
				und bietet die Möglichkeit zur Kontaktaufnahme für Bestellungen und Anfragen.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-3">Haftungsausschluss</h2>
			<p class="text-base-content/70 text-sm leading-relaxed">
				Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
				externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
				verantwortlich.
			</p>
		</section>
	</div>
</main>
