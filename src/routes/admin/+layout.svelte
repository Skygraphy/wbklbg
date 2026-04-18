<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	const nav = [
		{ href: '/admin',             label: 'Dashboard',       icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ href: '/admin/popup-stands', label: 'Popup-Stände',    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ href: '/admin/promotions',   label: 'Aktionen',        icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
		{ href: '/admin/locations',    label: 'Abholstellen',    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
		{ href: '/admin/orders',       label: 'Bestellungen',    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
	];

	function isActive(href: string) {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	}
</script>

{#if $page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="min-h-screen flex bg-base-200">
		<!-- Sidebar -->
		<aside class="w-56 shrink-0 bg-base-100 border-r border-base-300 flex flex-col">
			<div class="px-5 py-5 border-b border-base-300">
				<span class="font-amatic font-bold text-2xl text-primary">Wimmelbuch</span>
				<p class="text-[10px] text-base-content/40 uppercase tracking-widest mt-0.5">Admin</p>
			</div>

			<nav class="flex-1 py-3 flex flex-col gap-0.5 px-2">
				{#each nav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
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
					<button type="submit" class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-base-content/50 hover:bg-base-200 hover:text-base-content transition-colors">
						<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						Abmelden
					</button>
				</form>
			</div>
		</aside>

		<!-- Main -->
		<main class="flex-1 overflow-auto p-8">
			{@render children()}
		</main>
	</div>
{/if}
