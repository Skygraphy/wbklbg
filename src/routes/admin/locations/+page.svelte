<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
</script>

<div class="max-w-3xl">
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-2xl font-bold">Abholstellen</h1>
			<p class="text-base-content/50 text-sm mt-0.5">{data.locations.length} Einträge</p>
		</div>
		<button class="btn btn-primary btn-sm" onclick={() => (showAdd = !showAdd)}>+ Neu</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error rounded-xl text-sm mb-4">{form.error}</div>
	{/if}

	{#if showAdd}
		<div class="card bg-base-100 border border-primary/30 mb-6">
			<div class="card-body gap-3">
				<h3 class="font-semibold">Neue Abholstelle</h3>
				<form method="POST" action="?/create" use:enhance class="grid grid-cols-2 gap-3">
					<input name="name" placeholder="Name *" required class="input input-bordered input-sm col-span-2" />
					<input name="address" placeholder="Adresse" class="input input-bordered input-sm" />
					<input name="phone" placeholder="Telefon" class="input input-bordered input-sm" />
					<input name="email" type="email" placeholder="E-Mail" class="input input-bordered input-sm col-span-2" />
					<div class="col-span-2 flex gap-2">
						<button type="submit" class="btn btn-primary btn-sm">Speichern</button>
						<button type="button" class="btn btn-ghost btn-sm" onclick={() => (showAdd = false)}>Abbrechen</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<div class="card bg-base-100 overflow-hidden">
		<table class="table table-sm">
			<thead>
				<tr class="bg-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th>Name</th>
					<th>Adresse</th>
					<th>Kontakt</th>
					<th class="w-28"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.locations as loc (loc.id)}
					{#if editing === loc.id}
						<tr class="bg-primary/5">
							<td colspan="4" class="py-3 px-4">
								<form method="POST" action="?/update" use:enhance class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={loc.id} />
									<input name="name" value={loc.name} required class="input input-bordered input-sm col-span-2" />
									<input name="address" value={loc.address ?? ''} placeholder="Adresse" class="input input-bordered input-sm" />
									<input name="phone" value={loc.phone ?? ''} placeholder="Telefon" class="input input-bordered input-sm" />
									<input name="email" type="email" value={loc.email ?? ''} placeholder="E-Mail" class="input input-bordered input-sm col-span-2" />
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => (editing = null)}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						<tr class="hover">
							<td class="font-medium">{loc.name}</td>
							<td class="text-sm text-base-content/60">{loc.address ?? '–'}</td>
							<td class="text-sm text-base-content/60">
								{#if loc.email}<div>{loc.email}</div>{/if}
								{#if loc.phone}<div>{loc.phone}</div>{/if}
								{#if !loc.email && !loc.phone}–{/if}
							</td>
							<td>
								<div class="flex gap-1 justify-end">
									<button class="btn btn-ghost btn-xs" onclick={() => (editing = loc.id)}>Bearbeiten</button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={loc.id} />
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
					<tr><td colspan="4" class="text-center text-base-content/40 py-8">Keine Einträge</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
