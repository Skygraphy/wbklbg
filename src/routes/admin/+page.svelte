<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();

	const stats = [
		{ label: 'Popup-Stände',  value: data.counts.stands,     href: '/admin/popup-stands', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ label: 'Aktionen',      value: `${data.counts.promotionsActive} / ${data.counts.promotions}`, href: '/admin/promotions', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', sub: 'aktiv / gesamt' },
		{ label: 'Abholstellen',  value: data.counts.locations,  href: '/admin/locations',    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
		{ label: 'Bestellungen',  value: data.counts.orders,     href: '/admin/orders',       icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
	];

	function formatDate(s: string) {
		return new Date(s).toLocaleString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="max-w-4xl">
	<div class="mb-8">
		<h1 class="text-2xl font-bold">Dashboard</h1>
		<p class="text-base-content/50 text-sm mt-0.5">Willkommen im Wimmelbuch Admin-Bereich</p>
	</div>

	<!-- Stat cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
		{#each stats as stat}
			<a href={stat.href} class="card bg-base-100 hover:shadow-md transition-shadow">
				<div class="card-body p-5 gap-2">
					<div class="flex items-center justify-between">
						<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d={stat.icon} />
						</svg>
					</div>
					<div class="text-3xl font-bold">{stat.value}</div>
					<div class="text-sm text-base-content/50">{stat.label}</div>
					{#if stat.sub}<div class="text-xs text-base-content/30">{stat.sub}</div>{/if}
				</div>
			</a>
		{/each}
	</div>

	<!-- Recent orders -->
	{#if data.recentOrders.length > 0}
		<div>
			<div class="flex items-center justify-between mb-3">
				<h2 class="font-semibold">Letzte Bestellungen</h2>
				<a href="/admin/orders" class="text-sm text-primary hover:underline">Alle anzeigen →</a>
			</div>
			<div class="card bg-base-100 overflow-hidden">
				<table class="table table-sm">
					<tbody>
						{#each data.recentOrders as order}
							<tr class="hover">
								<td class="text-xs text-base-content/40 font-mono">{formatDate(order.submitted_at)}</td>
								<td class="font-medium">{order.name}</td>
								<td><a href="mailto:{order.email}" class="text-primary text-sm hover:underline">{order.email}</a></td>
								<td class="text-center text-sm">{order.qty ?? '–'} Stk.</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
