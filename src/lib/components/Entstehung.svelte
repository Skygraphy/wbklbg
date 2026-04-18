<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import BentoCard from '$lib/ui/BentoCard.svelte';

	let failedImages = $state(new Set<number>());

	function onImageError(index: number) {
		failedImages = new Set([...failedImages, index]);
	}

	const steps = [
		{
			title: 'Alles beginnt vor Ort',
			description:
				'Ich habe jede Veranstaltung und jeden Ort persönlich besucht – mit der Kamera im Anschlag. Menschen in Bewegung, liebevolle Details, Gebäude, die die Stimmung einfangen – alles wurde dokumentiert.',
			image: '/images/making_off/01_vor_ort.jpg'
		},
		{
			title: 'Die erste Skizze entsteht',
			description:
				'Mit Bleistift plane ich das Bild – was kommt wohin, welche Szenen sollen unbedingt hinein?',
			image: '/images/making_off/02_die_erste_skizze_entsteht.JPG'
		},
		{
			title: 'Fotos sortieren und ausdrucken',
			description:
				'Am Computer werden die besten Fotos ausgewählt, angepasst und in der passenden Größe ausgedruckt.',
			image: '/images/making_off/03_fotos_sortieren_und_ausdrucken.JPG'
		},
		{
			title: 'Zeichnen mit dem Lightpad',
			description:
				'Jetzt beginnt die eigentliche Magie. Mit Bleistift zeichne ich Schicht für Schicht das große Ganze. Dabei wird viel radiert, ergänzt und neu gedacht.',
			image: '/images/making_off/04_zeichnen_mit_dem_lightpad.JPG'
		},
		{
			title: 'Geduldsspiel Outlines',
			description:
				'Mit einem hauchdünnen schwarzen Stift werden alle Linien sauber nachgezogen – jeder Strich zählt.',
			image: '/images/making_off/05_geduldspiel_outlines.JPG'
		},
		{
			title: 'Farbe bringt Leben',
			description:
				'Mit intensiven Alkoholmarkern erwecke ich das Bild zum Leben. Die Farben leuchten, Schatten geben Tiefe – aber wehe, sie verlaufen! Das erfordert Fingerspitzengefühl.',
			image: '/images/making_off/06_farbe_bringt_leben.JPG'
		},
		{
			title: 'Rätseln erlaubt',
			description:
				'Um noch mehr Entdeckungslust zu wecken, habe ich spannende Quizfragen rund um das Bild eingebaut.',
			image: '/images/making_off/07_raetseln_erlaubt.jpg'
		},
		{
			title: 'Probedruck und Feinschliff',
			description:
				'Ein erster Testdruck zeigt, wo noch etwas verbessert werden muss – Farben, Schriften, Details.',
			image: '/images/making_off/08_probedruck_und_feinschliff.JPG'
		},
		{
			title: 'Ein Traum wird wahr',
			description:
				'Nach über 1,5 Jahren halte ich mein erstes eigenes Wimmelbuch in den Händen. Es gab Momente, in denen ich fast aufgeben wollte – aber ich wusste: <strong class="text-primary">Diese Arbeit lohnt sich.</strong>',
			image: '/images/making_off/09_ein_traum_wird_wahr.jpg',
			objectPosition: 'center bottom'
		}
	];
</script>

<SectionWrapper bg="base-200">
	<div class="mb-12 text-center">
		<h2 class="section-heading">Wie ein Wimmelbuch entsteht</h2>
		<p class="section-subheading">Vom ersten Foto bis zum fertigen Buch</p>
		<p class="mt-4 max-w-2xl mx-auto text-base-content/60 text-sm leading-relaxed">
			Hinter diesem Wimmelbuch steckt mehr als nur Kreativität – es steckt Leidenschaft,
			Geduld und monatelange Handarbeit. Wusstest du, dass ein einziges Bild fast
			einen Monat Arbeit bedeutet?
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each steps as step, i}
			<BentoCard class="flex flex-col gap-4">
				<div class="flex items-center gap-3 mb-1">
					<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold">
						{i + 1}
					</span>
					<h3 class="font-display text-base font-semibold leading-tight">{step.title}</h3>
				</div>

				<!-- Image placeholder / real image -->
				<div class="aspect-square w-full overflow-hidden rounded-xl bg-base-300">
					{#if !failedImages.has(i)}
						<img
							src={step.image}
							alt={step.title}
							class="h-full w-full object-cover"
							style="object-position: {step.objectPosition ?? 'center'}"
							onerror={() => onImageError(i)}
						/>
					{:else}
						<div
							class="flex h-full w-full flex-col items-center justify-center bg-base-300 text-base-content/30"
							aria-hidden="true"
						>
							<svg class="h-10 w-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span class="text-xs">Bild folgt</span>
						</div>
					{/if}
				</div>

				<p class="text-sm text-base-content/70 leading-relaxed flex-1 whitespace-pre-line">{@html step.description}</p>
			</BentoCard>
		{/each}
	</div>
</SectionWrapper>
