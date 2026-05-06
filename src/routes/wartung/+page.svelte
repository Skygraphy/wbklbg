<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Wartungsarbeiten – Wimmelbuch Klosterneuburg</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-wim-cream px-6 text-center">
	<!-- Title like Hero -->
	<h1 class="leading-[1.05] mb-8">
		<span class="font-amatic font-bold block tracking-wide text-7xl sm:text-8xl drop-shadow-sm" style="color: #cd1719;">
			Klosterneuburg
		</span>
		<span class="font-sacramento block -mt-1 text-7xl sm:text-8xl drop-shadow-sm" style="color: #5c3a1e;">
			wimmelt
		</span>
	</h1>

	<!-- Wrench icon -->
	<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-wim-brown/10 mb-6">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-wim-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
			<path stroke-linecap="round" stroke-linejoin="round"
				d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
		</svg>
	</div>

	<p class="font-amatic font-bold text-3xl sm:text-4xl mb-3" style="color: #cd1719;">
		Gleich sind wir zurück!
	</p>

	<p class="text-wim-brown/70 text-base max-w-sm leading-relaxed mb-8">
		Wir arbeiten gerade an der Website und sind bald wieder für dich da.
		Bei dringenden Anfragen erreichst du Ines direkt per E-Mail.
	</p>

	<!-- Highlighted contact email -->
	<p class="font-semibold text-wim-brown text-lg tracking-wide">
		{data.contactEmail}
	</p>

	<p class="mt-12 text-wim-brown/30 text-xs">
		© {new Date().getFullYear()} Wimmelbuch Klosterneuburg · Ines Wohlmuth
	</p>
</div>
