<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	let sidebarOpen = $state(false);

	const nav = [
		{ href: '/admin',              label: 'Dashboard',       icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ href: '/admin/popup-stands', label: 'Popup-Stände',    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ href: '/admin/promotions',   label: 'Aktionen',        icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
		{ href: '/admin/locations',    label: 'Abholstellen',    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
		{ href: '/admin/orders',       label: 'Bestellungen',    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
		{ href: '/admin/settings',     label: 'Einstellungen',   icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
	];

	function isActive(href: string) {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	}

	$effect(() => {
		// Close sidebar on navigation
		sidebarOpen = false;
	});
</script>

{#if $page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="min-h-screen flex bg-base-200">

		<!-- Mobile overlay backdrop -->
		{#if sidebarOpen}
			<div
				class="fixed inset-0 z-20 bg-black/40 md:hidden"
				role="button"
				tabindex="-1"
				aria-label="Menü schließen"
				onclick={() => (sidebarOpen = false)}
				onkeydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
			></div>
		{/if}

		<!-- Sidebar -->
		<aside class="
			fixed inset-y-0 left-0 z-30 w-64 bg-base-100 border-r border-base-300 flex flex-col
			transition-transform duration-200
			{sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
			md:relative md:translate-x-0 md:w-56 md:shrink-0
		">
			<div class="px-5 py-5 border-b border-base-300 flex items-center justify-between">
				<div>
					<span class="font-amatic font-bold text-2xl text-primary">Wimmelbuch</span>
					<p class="text-[10px] text-base-content/40 uppercase tracking-widest mt-0.5">Admin</p>
				</div>
				<!-- Close button on mobile -->
				<button
					class="md:hidden btn btn-ghost btn-sm btn-square"
					onclick={() => (sidebarOpen = false)}
					aria-label="Menü schließen"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<nav class="flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-y-auto">
				{#each nav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
						       {isActive(item.href)
						         ? 'bg-primary text-primary-content'
						         : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}"
					>
						<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
						</svg>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="px-2 py-3 border-t border-base-300">
				<form method="POST" action="/admin/logout">
					<button type="submit" class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-base-content/50 hover:bg-base-200 hover:text-base-content transition-colors">
						<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						Abmelden
					</button>
				</form>
			</div>
		</aside>

		<!-- Main area -->
		<div class="flex-1 flex flex-col min-w-0">

			<!-- Mobile top bar -->
			<header class="md:hidden sticky top-0 z-10 bg-base-100 border-b border-base-300 flex items-center gap-3 px-4 py-3">
				<button
					class="btn btn-ghost btn-sm btn-square"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Menü öffnen"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<span class="font-amatic font-bold text-xl text-primary">Wimmelbuch</span>
				<span class="text-[10px] text-base-content/40 uppercase tracking-widest">Admin</span>
			</header>

			<!-- Page content -->
			<main class="flex-1 overflow-auto p-4 md:p-8">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
