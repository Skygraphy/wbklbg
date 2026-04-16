<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';

	const career = [
		{
			label: 'Kindheit & Schulzeit',
			text: 'Volksschule Weidling, Klosterneuburger Gymnasium (4 Jahre), Tourismusschule MODUL',
			active: true
		},
		{
			label: 'Kreative Ausbildung',
			text: 'Graphische Wien – Kolleg für Druck- und Medientechnik',
			active: true
		},
		{
			label: 'Herzensberuf',
			text: 'Studium Volksschullehramt – seit 2019 an der VS Hermannstraße',
			active: true
		},
		{
			label: 'Babypause & Wimmelbuch',
			text: 'Entstehung des Klosterneuburger Wimmelbuches in zweijähriger Handarbeit',
			active: true
		},
		{
			label: 'Veröffentlichung 2025',
			text: 'Erste Ausgabe des Wimmelbuch Klosterneuburg erscheint',
			active: false
		}
	];
</script>

<SectionWrapper bg="base-100">
	<div class="mb-12 text-center">
		<h2 class="section-heading">Wer steckt hinter dem Wimmelbuch?</h2>
		<p class="section-subheading">Ein Mensch, eine Stadt, eine Geschichte</p>
	</div>

	<!-- Bio section: photo + text -->
	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
		<!-- Portrait -->
		<div class="flex justify-center">
			<div class="relative">
				<div class="aspect-[3/4] w-full max-w-sm overflow-hidden rounded-bento shadow-lg">
					<img
						src="/images/ines-portrait.jpg"
						alt="Ines Wohlmuth, Autorin des Wimmelbuch Klosterneuburg"
						class="h-full w-full object-cover"
						onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
					/>
					<div
						class="hidden h-full w-full flex-col items-center justify-center bg-base-200 text-base-content/30 min-h-96"
						aria-hidden="true"
					>
						<svg class="h-16 w-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
						<span class="text-sm">Ines Wohlmuth</span>
					</div>
				</div>
				<!-- Decorative badge -->
				<div class="absolute -bottom-4 -right-4 rounded-bento bg-primary p-3 shadow-lg text-primary-content text-center">
					<div class="font-display text-2xl font-bold">2</div>
					<div class="text-xs font-semibold">Jahre<br/>Arbeit</div>
				</div>
			</div>
		</div>

		<!-- Biography text -->
		<div class="flex flex-col gap-5">
			<div>
				<h3 class="font-display text-3xl font-bold text-wim-brown">Ines Wohlmuth</h3>
				<p class="text-primary font-semibold mt-1">Autorin · Lehrerin · Klosterneuburgerin</p>
			</div>

			<div class="space-y-4 text-base-content/75 leading-relaxed text-sm">
				<p>
					Hinter jedem Bild, jeder Szene und jedem liebevollen Detail steckt ein Mensch mit
					einer großen Portion Kreativität, Geduld – und einer tiefen Verbundenheit zu Klosterneuburg.
				</p>
				<p>
					Geboren am 7. Oktober 1993 hier in Klosterneuburg, aufgewachsen im Ortsteil Weidling –
					zwischen Wäldern, Wiesen und einem Leben voller Natur. Schon als Kind war ich am
					glücklichsten, wenn ich draußen unterwegs war oder drinnen stundenlang zeichnen,
					basteln und meiner Fantasie freien Lauf lassen konnte.
				</p>
				<p>
					Kein Wunder also, dass ich mit 7 Jahren zu den Pfadfindern Weidling gegangen bin –
					ein Schritt, der mein Leben bis heute prägt. Ich bin noch immer aktives Mitglied,
					habe dort nicht nur viele Freundschaften fürs Leben geschlossen, sondern auch meinen
					Mann kennengelernt. Wir haben im April 2021 geheiratet, 2022 kam unsere Tochter
					Antonia zur Welt, 2024 folgte unser Sohn Ferdinand.
				</p>
				<p>
					Und mitten im Familienalltag, zwischen Mittagsschlaf und Gute-Nacht-Geschichte,
					kam sie – die Idee zum Klosterneuburger Wimmelbuch. Ich nutzte jede freie Minute
					zum Zeichnen – abends, wenn die Kinder schliefen, oder wann immer sich eine
					kleine Pause ergab.
				</p>
			</div>
		</div>
	</div>

	<!-- Career timeline -->
	<div class="mt-16">
		<h3 class="font-display text-2xl font-semibold text-center mb-8">Mein Weg war bisher vielseitig</h3>

		<div class="max-w-3xl mx-auto">
			<ul class="relative border-l-2 border-base-300 space-y-8 pl-8">
				{#each career as item}
					<li class="relative">
						<div
							class="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2
							       {item.active ? 'bg-primary border-primary' : 'bg-base-100 border-base-300'}"
						>
						</div>
						<div class="rounded-bento bg-base-200 p-4">
							<h4 class="font-display font-semibold text-base {item.active ? 'text-base-content' : 'text-base-content/50'}">
								{item.label}
							</h4>
							<p class="text-sm text-base-content/60 mt-1">{item.text}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<p class="text-center text-base-content/60 text-sm mt-8 max-w-2xl mx-auto italic">
			Zurzeit bin ich in Babypause, aber ich freue mich schon sehr darauf, bald wieder als
			Lehrerin tätig zu sein – mit ganz viel Herz, Begeisterung und vielleicht auch ein paar
			Wimmelbuch-Ideen im Gepäck.
		</p>
	</div>
</SectionWrapper>
