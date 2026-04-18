<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
</script>

<div class="max-w-5xl">
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-2xl font-bold">Aktionen & Preise</h1>
			<p class="text-base-content/50 text-sm mt-0.5">{data.promotions.length} Einträge</p>
		</div>
		<button class="btn btn-primary btn-sm" onclick={() => (showAdd = !showAdd)}>+ Neu</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error rounded-xl text-sm mb-4">{form.error}</div>
	{/if}

	<!-- Add form -->
	{#if showAdd}
		<div class="card bg-base-100 border border-primary/30 mb-6">
			<div class="card-body gap-3">
				<h3 class="font-semibold">Neue Aktion</h3>
				<form method="POST" action="?/create" use:enhance class="grid grid-cols-2 gap-3">
					<input name="icon" placeholder="Icon (Emoji)" class="input input-bordered input-sm" value="🎁" />
					<input name="name" placeholder="Name *" required class="input input-bordered input-sm" />
					<div class="flex flex-col gap-1">
						<label class="text-xs text-base-content/50">Gültig von *</label>
						<input name="valid_from" type="date" required class="input input-bordered input-sm" />
					</div>
					<div class="flex flex-col gap-1">
						<label class="text-xs text-base-content/50">Gültig bis *</label>
						<input name="valid_to" type="date" required class="input input-bordered input-sm" />
					</div>
					<div class="col-span-2 grid grid-cols-3 gap-2">
						{#each [1,2,3] as n}
							<div class="flex gap-1">
								<input name="price{n}_qty" placeholder="Menge (z.B. 3 Stk.)" class="input input-bordered input-sm w-1/2" />
								<input name="price{n}_amt" type="number" step="0.01" placeholder="Betrag €" class="input input-bordered input-sm w-1/2" />
							</div>
						{/each}
					</div>
					<div class="col-span-2 flex gap-2">
						<button type="submit" class="btn btn-primary btn-sm">Speichern</button>
						<button type="button" class="btn btn-ghost btn-sm" onclick={() => (showAdd = false)}>Abbrechen</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Table -->
	<div class="card bg-base-100 overflow-hidden">
		<table class="table table-sm">
			<thead>
				<tr class="bg-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th class="w-10">Aktiv</th>
					<th>Name</th>
					<th>Zeitraum</th>
					<th>Preise</th>
					<th class="w-28"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.promotions as promo (promo.id)}
					{#if editing === promo.id}
						<tr class="bg-primary/5">
							<td colspan="5" class="py-3 px-4">
								<form method="POST" action="?/update" use:enhance class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={promo.id} />
									<input type="hidden" name="active" value={String(promo.active)} />
									<input name="icon" value={promo.icon} placeholder="Icon" class="input input-bordered input-sm" />
									<input name="name" value={promo.name} required class="input input-bordered input-sm" />
									<input name="valid_from" type="date" value={promo.valid_from} required class="input input-bordered input-sm" />
									<input name="valid_to" type="date" value={promo.valid_to} required class="input input-bordered input-sm" />
									<div class="col-span-2 grid grid-cols-3 gap-2">
										{#each [1,2,3] as n}
											<div class="flex gap-1">
												<input name="price{n}_qty" value={promo[`price${n}_qty`] ?? ''} placeholder="Menge" class="input input-bordered input-sm w-1/2" />
												<input name="price{n}_amt" type="number" step="0.01" value={promo[`price${n}_amt`] ?? ''} placeholder="€" class="input input-bordered input-sm w-1/2" />
											</div>
										{/each}
									</div>
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => (editing = null)}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						<tr class="hover {!promo.active ? 'opacity-50' : ''}">
							<td>
								<form method="POST" action="?/toggle" use:enhance>
									<input type="hidden" name="id" value={promo.id} />
									<input type="hidden" name="active" value={String(!promo.active)} />
									<input type="checkbox" class="toggle toggle-primary toggle-sm" checked={promo.active}
										onchange={(e) => { e.currentTarget.form?.requestSubmit(); }} />
								</form>
							</td>
							<td>
								<span class="mr-1">{promo.icon}</span>
								<span class="font-medium">{promo.name}</span>
							</td>
							<td class="text-sm text-base-content/60 font-mono">{promo.valid_from} → {promo.valid_to}</td>
							<td class="text-sm text-base-content/60">
								{#if promo.price1_qty}
									<span class="badge badge-sm badge-ghost">{promo.price1_qty} / {promo.price1_amt} €</span>
								{/if}
								{#if promo.price2_qty}
									<span class="badge badge-sm badge-ghost">{promo.price2_qty} / {promo.price2_amt} €</span>
								{/if}
								{#if promo.price3_qty}
									<span class="badge badge-sm badge-ghost">{promo.price3_qty} / {promo.price3_amt} €</span>
								{/if}
							</td>
							<td>
								<div class="flex gap-1 justify-end">
									<button class="btn btn-ghost btn-xs" onclick={() => (editing = promo.id)}>Bearbeiten</button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={promo.id} />
										<button type="submit" class="btn btn-ghost btn-xs text-error"
											onclick={(e) => { if (!confirm('Löschen?')) e.preventDefault(); }}>
											Löschen
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/if}
				{:else}
					<tr><td colspan="5" class="text-center text-base-content/40 py-8">Keine Einträge</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
