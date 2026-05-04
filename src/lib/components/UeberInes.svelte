<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';

	let portraitFailed = $state(false);

	const career = [
		{
			label: 'Kindheit & Schulzeit',
			text: 'Volksschule Weidling, Klosterneuburger Gymnasium, Tourismusschule MODUL',
			active: true
		},
		{
			label: 'Kreative Ausbildung',
			text: 'Die Graphische Wien – Kolleg für Druck- und Medientechnik',
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
			label: 'Veröffentlichung 2026',
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

	<!-- Bio section: photos + text -->
	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
		<!-- Left: Familienfoto -->
		<div class="flex justify-center">
			<img
				src="/images/Familienfoto.jpg"
				alt="Familie Wohlmuth"
				class="w-3/4 aspect-[3/4] object-cover rounded-bento shadow-lg"
			/>
		</div>

		<!-- Biography text -->
		<div class="flex flex-col gap-5">
			<div>
				<h3 class="font-display text-3xl font-bold text-wim-brown">Ines Wohlmuth</h3>
				<p class="text-primary font-semibold mt-1">Autorin und Illustratorin · Lehrerin · Klosterneuburgerin</p>
			</div>

			<div class="space-y-4 text-base-content/75 leading-relaxed text-sm">
				<p>
					Hinter jedem Bild, jeder Szene und jedem liebevollen Detail steckt ein Mensch mit einer großen
					Portion Kreativität, Geduld – und einer tiefen Verbundenheit zu Klosterneuburg.
				</p>
				<p>
					Geboren hier in Klosterneuburg, aufgewachsen im Ortsteil Weidling – zwischen Wäldern, Wiesen
					und einem Leben voller Natur. Schon als Kind war ich am glücklichsten, wenn ich draußen
					unterwegs war oder drinnen stundenlang zeichnen, basteln und meiner Fantasie freien Lauf
					lassen konnte.
				</p>
				<p>
					Mittlerweile bin ich Mama von bald 3 kleinen Kindern und mitten im Familienalltag, zwischen
					Mittagsschlaf und Gute-Nacht-Geschichte, kam sie – die Idee zum Klosterneuburger
					Wimmelbuch. Ich nutzte jede freie Minute zum Zeichnen – abends, wenn die Kinder schliefen,
					oder wann immer sich eine kleine Pause ergab.
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
