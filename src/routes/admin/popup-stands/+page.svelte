<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
</script>

<div class="max-w-4xl">
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-2xl font-bold">Popup-Stände</h1>
			<p class="text-base-content/50 text-sm mt-0.5">{data.stands.length} Einträge</p>
		</div>
		<button class="btn btn-primary btn-sm" onclick={() => (showAdd = !showAdd)}>
			+ Neu
		</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error rounded-xl text-sm mb-4">{form.error}</div>
	{/if}

	<!-- Add form -->
	{#if showAdd}
		<div class="card bg-base-100 border border-primary/30 mb-6">
			<div class="card-body gap-3">
				<h3 class="font-semibold">Neuer Termin</h3>
				<form method="POST" action="?/create" use:enhance class="grid grid-cols-2 gap-3">
					<input name="name" placeholder="Name *" required class="input input-bordered input-sm col-span-2" />
					<input name="date" type="date" required class="input input-bordered input-sm" />
					<input name="address" placeholder="Adresse" class="input input-bordered input-sm" />
					<textarea name="note" placeholder="Bemerkung (HTML möglich)" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none"></textarea>
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
					<th>Datum</th>
					<th>Name</th>
					<th>Adresse</th>
					<th class="w-24"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.stands as stand (stand.id)}
					{#if editing === stand.id}
						<tr class="bg-primary/5">
							<td colspan="4" class="py-3 px-4">
								<form method="POST" action="?/update" use:enhance class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={stand.id} />
									<input name="date" type="date" value={stand.date} required class="input input-bordered input-sm" />
									<input name="name" value={stand.name} required class="input input-bordered input-sm" />
									<input name="address" value={stand.address ?? ''} placeholder="Adresse" class="input input-bordered input-sm col-span-2" />
									<textarea name="note" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none" placeholder="Bemerkung (HTML möglich)">{stand.note ?? ''}</textarea>
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => (editing = null)}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						<tr class="hover">
							<td class="font-mono text-sm">{stand.date}</td>
							<td class="font-medium">{stand.name}</td>
							<td class="text-base-content/60 text-sm">{stand.address ?? '–'}</td>
							<td>
								<div class="flex gap-1 justify-end">
									<button class="btn btn-ghost btn-xs" onclick={() => (editing = stand.id)}>Bearbeiten</button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={stand.id} />
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
