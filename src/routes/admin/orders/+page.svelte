<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();

	function formatDate(s: string) {
		return new Date(s).toLocaleString('de-AT', {
			day: '2-digit', month: '2-digit', year: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
	}
</script>

<div class="max-w-4xl">
	<div class="mb-6">
		<h1 class="text-2xl font-bold">Bestellungen & Anfragen</h1>
		<p class="text-base-content/50 text-sm mt-0.5">{data.orders.length} Einsendungen</p>
	</div>

	<div class="card bg-base-100 overflow-hidden">
		<table class="table table-sm">
			<thead>
				<tr class="bg-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th>Datum</th>
					<th>Name</th>
					<th>E-Mail</th>
					<th class="w-16">Stk.</th>
					<th>Nachricht</th>
				</tr>
			</thead>
			<tbody>
				{#each data.orders as order (order.id)}
					<tr class="hover align-top">
						<td class="text-sm font-mono whitespace-nowrap text-base-content/60">{formatDate(order.submitted_at)}</td>
						<td class="font-medium">{order.name}</td>
						<td>
							<a href="mailto:{order.email}" class="text-primary hover:underline text-sm">{order.email}</a>
						</td>
						<td class="text-center">{order.qty ?? '–'}</td>
						<td class="text-sm text-base-content/60 max-w-xs truncate">{order.message ?? '–'}</td>
					</tr>
				{:else}
					<tr><td colspan="5" class="text-center text-base-content/40 py-8">Noch keine Bestellungen</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
