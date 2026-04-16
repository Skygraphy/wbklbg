<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import BentoCard from '$lib/ui/BentoCard.svelte';

	const features = [
		{
			title: 'Handgezeichnet – kein Pixel Digitales',
			description:
				'Jede einzelne Szene wurde liebevoll von Hand gezeichnet, ganz ohne digitale Tricks oder Bearbeitungsprogramme. Mit Stift, Papier und viel Geduld ist ein einzigartiges Bild von Klosterneuburg entstanden, wie du es noch nie gesehen hast.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
			</svg>`
		},
		{
			title: 'Echtes Klosterneuburg-Wissen',
			description:
				'Weil ich, die Autorin, hier zu Hause bin. Als gebürtige Klosterneuburgerin kenne ich die Stadt mit all ihren Ecken, Geschichten und Geheimnissen. Ob legendäre Veranstaltungen, versteckte Lieblingsplätze oder Details, die man erst auf den zweiten Blick entdeckt – alles hat seinen Platz gefunden.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
			</svg>`
		},
		{
			title: 'Ein echtes Herzensprojekt',
			description:
				'Dieses Buch ist kein Produkt „von der Stange" – es ist ein echtes Herzensprojekt. Entstanden in zweijähriger Arbeit, geschaffen in den stillen Stunden, während die Kinder schliefen. Jede Seite erzählt eine Geschichte, jedes Detail wurde mit Leidenschaft und Liebe gestaltet.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
			</svg>`
		}
	];
</script>

<SectionWrapper id="buch" bg="base-100">
	<div class="mb-12 text-center">
		<h2 class="section-heading">Was macht das Wimmelbuch so besonders?</h2>
		<p class="section-subheading">Ein Buch mit Seele – für Kinder, Eltern und alle, die Klosterneuburg lieben</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each features as feature, i}
			<BentoCard class="flex flex-col gap-4 {i === 1 ? 'md:mt-6' : ''}">
				<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
					{@html feature.icon}
				</div>
				<h3 class="font-display text-xl font-semibold">{feature.title}</h3>
				<p class="text-base-content/70 leading-relaxed text-sm flex-1">{feature.description}</p>
			</BentoCard>
		{/each}
	</div>

	<!-- 12 months visual -->
	<div class="mt-16">
		<h3 class="section-heading text-center mb-2">12 Monate – 12 besondere Momente</h3>
		<p class="section-subheading text-center mb-8">Das ganze Jahr über gibt es in Klosterneuburg etwas zu entdecken</p>
		<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
			{#each [
				{
					name: 'Wintertag',
					img: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Faschingsumzug',
					img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Ostermarkt',
					img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Entenrennen',
					img: 'https://images.unsplash.com/photo-1609771655165-0ae96b5dff9f?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Mittelalterfest',
					img: 'https://images.unsplash.com/photo-1533662635785-535b68c57a64?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Feuerwehrheuriger',
					img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'ISTA',
					img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Sommertag',
					img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Schulbeginn',
					img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Weinhügelwandertag',
					img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Leopoldimarkt',
					img: 'https://images.unsplash.com/photo-1467354292059-97b534d14cf6?w=400&h=400&fit=crop&auto=format&q=80'
				},
				{
					name: 'Adventmarkt',
					img: 'https://images.unsplash.com/photo-1482852152279-8dfc77c0d48f?w=400&h=400&fit=crop&auto=format&q=80'
				}
			] as event}
				<div class="group relative overflow-hidden rounded-bento cursor-default">
					<img
						src={event.img}
						alt={event.name}
						class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
					<div class="relative flex aspect-square items-end justify-center p-2">
						<span class="text-white text-xs font-bold leading-tight drop-shadow-md text-center">{event.name}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</SectionWrapper>
