<script lang="ts">
	type Mode = 'light' | 'dark' | 'os';

	let mode = $state<Mode>('os');

	function applyTheme(m: Mode) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const useDark = m === 'dark' || (m === 'os' && prefersDark);
		document.documentElement.setAttribute(
			'data-theme',
			useDark ? 'wimmelbuch-dark' : 'wimmelbuch'
		);
	}

	function setMode(m: Mode) {
		mode = m;
		localStorage.setItem('theme-mode', m);
		applyTheme(m);
	}

	$effect(() => {
		const saved = localStorage.getItem('theme-mode') as Mode | null;
		mode = saved ?? 'os';
		applyTheme(mode);

		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => { if (mode === 'os') applyTheme('os'); };
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});
</script>

<div class="fixed top-4 right-4 z-50 flex items-center gap-0.5 rounded-full bg-base-200/80 backdrop-blur-sm border border-base-300 p-1 shadow-md">
	<!-- Light -->
	<button
		onclick={() => setMode('light')}
		class="rounded-full p-2 transition-colors {mode === 'light' ? 'bg-primary text-primary-content' : 'text-base-content/50 hover:text-base-content'}"
		title="Hellmodus"
		aria-label="Hellmodus"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="4"/>
			<path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
		</svg>
	</button>

	<!-- Dark -->
	<button
		onclick={() => setMode('dark')}
		class="rounded-full p-2 transition-colors {mode === 'dark' ? 'bg-primary text-primary-content' : 'text-base-content/50 hover:text-base-content'}"
		title="Dunkelmodus"
		aria-label="Dunkelmodus"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
		</svg>
	</button>

	<!-- OS -->
	<button
		onclick={() => setMode('os')}
		class="rounded-full p-2 transition-colors {mode === 'os' ? 'bg-primary text-primary-content' : 'text-base-content/50 hover:text-base-content'}"
		title="Systemeinstellung"
		aria-label="Systemeinstellung"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<rect x="2" y="3" width="20" height="14" rx="2"/>
			<path stroke-linecap="round" d="M8 21h8M12 17v4"/>
		</svg>
	</button>
</div>
