<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import BentoCard from '$lib/ui/BentoCard.svelte';

	let failedImages = $state(new Set<number>());

	function onImageError(index: number) {
		failedImages = new Set([...failedImages, index]);
	}

	const steps = [
		{
			title: 'Stadtspaziergang & Recherche',
			description:
				'Mit Notizbuch und Kamera durch Klosterneuburg: Motive suchen, Stimmungen einfangen, Besonderheiten des jeweiligen Monats dokumentieren.',
			image: '/images/creation-steps/step-1.jpg'
		},
		{
			title: 'Skizzen & Komposition',
			description:
				'Aus unzähligen Eindrücken entsteht eine erste Rohskizze. Wo stehen die Figuren? Welche Details erzählen die Geschichte des Monats?',
			image: '/images/creation-steps/step-2.jpg'
		},
		{
			title: 'Feinzeichnung mit Tusche',
			description:
				'Jede Linie wird mit dem Tuschepin präzise nachgezogen. Dieser Schritt erfordert ruhige Hände und absolute Konzentration.',
			image: '/images/creation-steps/step-3.jpg'
		},
		{
			title: 'Kolorierung mit Aquarell',
			description:
				'Mit Aquarellfarben werden die Szenen zum Leben erweckt. Die warmen, leuchtenden Farbtöne geben dem Buch seinen unverkennbaren Charakter.',
			image: '/images/creation-steps/step-4.jpg'
		},
		{
			title: 'Details & Wimmelfiguren',
			description:
				'Jetzt kommen die versteckten Details: kleine Figuren, lustige Szenen, lokale Anspielungen – all die Dinge, die man erst beim zweiten Hinsehen entdeckt.',
			image: '/images/creation-steps/step-5.jpg'
		},
		{
			title: 'Scan & Druckvorbereitung',
			description:
				'Das fertige Original wird hochaufgelöst eingescannt und für den professionellen Druck optimiert – Farben, Format und Druckdaten werden abgestimmt.',
			image: '/images/creation-steps/step-6.jpg'
		},
		{
			title: 'Testdruck & Korrektur',
			description:
				'Ein erster Testdruck zeigt, ob die Farben und Details stimmen. Kleinste Korrekturen werden vorgenommen, bis alles perfekt ist.',
			image: '/images/creation-steps/step-7.jpg'
		},
		{
			title: 'Druckfreigabe & Buchbindung',
			description:
				'Nach finaler Freigabe geht das Buch in den Druck. Hochwertige Materialien und professionelle Buchbindung sorgen für ein langlebiges Ergebnis.',
			image: '/images/creation-steps/step-8.jpg'
		},
		{
			title: 'Auslieferung & Freude',
			description:
				'Das fertige Buch ist da! Der schönste Moment: wenn die ersten Leserinnen und Leser eintauchen und alle versteckten Details entdecken.',
			image: '/images/creation-steps/step-9.jpg'
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
				<div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-base-300">
					{#if !failedImages.has(i)}
						<img
							src={step.image}
							alt={step.title}
							class="h-full w-full object-cover"
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

				<p class="text-sm text-base-content/70 leading-relaxed flex-1">{step.description}</p>
			</BentoCard>
		{/each}
	</div>
</SectionWrapper>
