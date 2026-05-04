<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import DeleteModal from '$lib/ui/DeleteModal.svelte';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
	let addDateFrom = $state('');
	let editDateFrom = $state('');
	let iconAddName = $state('tent');
	let iconAddColor = $state('#7C9E7A');
	let iconEditName = $state('tent');
	let iconEditColor = $state('#7C9E7A');
	let deleteTarget = $state<{ id: number; name: string } | null>(null);
	let deleteFormEl: HTMLFormElement;
	let addError = $state('');
	let editError = $state('');

	const FA_ICONS = [
		{ name: 'tent',              label: 'Zelt/Marktstand' },
		{ name: 'store',             label: 'Stand/Verkaufsstand' },
		{ name: 'star',              label: 'Fest/Veranstaltung' },
		{ name: 'calendar-days',     label: 'Termin/Event' },
		{ name: 'ticket',            label: 'Eintrittspflichtige Veranstaltung' },
		{ name: 'book-open',         label: 'Lesung/Buchpräsentation' },
		{ name: 'music',             label: 'Konzert/Musikveranstaltung' },
		{ name: 'palette',           label: 'Kunstmarkt/Ausstellung' },
		{ name: 'seedling',          label: 'Gartenmarkt/Naturmarkt' },
		{ name: 'tree',              label: 'Waldmarkt/Outdoor' },
		{ name: 'sun',               label: 'Sommerfest' },
		{ name: 'snowflake',         label: 'Wintermarkt/Weihnachtsmarkt' },
		{ name: 'gift',              label: 'Weihnachtsmarkt/Geschenkmarkt' },
		{ name: 'graduation-cap',    label: 'Schulveranstaltung' },
		{ name: 'church',            label: 'Kirchenveranstaltung' },
		{ name: 'people-group',      label: 'Gemeindefest/Vereinsfest' },
		{ name: 'child',             label: 'Kinderveranstaltung' },
		{ name: 'building',          label: 'Messe/Ausstellung' },
		{ name: 'utensils',          label: 'Gastro-Veranstaltung' },
		{ name: 'map-pin',           label: 'Sonstiger Standort' },
		{ name: 'bullhorn',          label: 'Ankündigung/Promotion' },
		{ name: 'trophy',            label: 'Wettbewerb/Preisverleihung' },
	];

	const THEME_COLORS = [
		{ hex: '#7C9E7A', label: 'Sage' },
		{ hex: '#C2714F', label: 'Terracotta' },
		{ hex: '#D97706', label: 'Amber' },
		{ hex: '#3D2B1F', label: 'Braun' },
		{ hex: '#6B4C38', label: 'Hellbraun' },
		{ hex: '#FDE68A', label: 'Amber hell' },
		{ hex: '#F4A87C', label: 'Terracotta hell' },
		{ hex: '#B8D4B6', label: 'Sage hell' },
		{ hex: '#EDD9BA', label: 'Beige' },
		{ hex: '#E8C87A', label: 'Goldgelb' },
		{ hex: '#A5C8A3', label: 'Hellgrün' },
		{ hex: '#D4B896', label: 'Sand' },
		{ hex: '#F0C8B0', label: 'Lachs' },
		{ hex: '#C8A88C', label: 'Caramel' },
		{ hex: '#9BC4BA', label: 'Mintgrün' },
	];

	function parseIcon(icon: string | null): { name: string; color: string } {
		if (icon && icon.includes('|')) {
			const [name, color] = icon.split('|');
			return { name, color: color ?? '#7C9E7A' };
		}
		return { name: 'tent', color: '#7C9E7A' };
	}

	function validateDates(dateFrom: string, dateTo: string): string {
		if (dateTo && dateTo < dateFrom) return 'Das Bis-Datum muss >= Von-Datum sein.';
		return '';
	}

	function formatDate(d: string): string {
		return new Date(d).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
	}
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
				{#if addError}
					<div class="alert alert-error rounded-xl text-xs py-2">{addError}</div>
				{/if}
				<form method="POST" action="?/create"
					use:enhance={({ formData, cancel }) => {
						const err = validateDates(formData.get('date_from') as string, formData.get('date_to') as string);
						if (err) { addError = err; cancel(); return; }
						addError = '';
						return async ({ update }) => { await update(); showAdd = false; addDateFrom = ''; iconAddName = 'tent'; iconAddColor = '#7C9E7A'; };
					}}
					class="grid grid-cols-2 gap-3">
					<input type="hidden" name="icon" value="{iconAddName}|{iconAddColor}" />
					<!-- Icon picker -->
					<div class="col-span-2 overflow-hidden">
						<div class="flex gap-3 overflow-x-auto px-1 py-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-base-200 [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
							{#each FA_ICONS as icon}
								<button type="button"
									class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors {iconAddName === icon.name ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-base-200'}"
									onclick={() => iconAddName = icon.name}
									title={icon.label}>
									<i class="fa-solid fa-{icon.name} text-lg" style="color: {iconAddColor}"></i>
								</button>
							{/each}
						</div>
					</div>
					<!-- Color picker -->
					<div class="col-span-2 overflow-hidden">
						<div class="flex gap-3 overflow-x-auto px-1 py-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-base-200 [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
							{#each THEME_COLORS as c}
								<button type="button"
									class="w-7 h-7 rounded-full border-2 transition-all shrink-0 {iconAddColor === c.hex ? 'border-base-content scale-110' : 'border-transparent hover:scale-105'}"
									style="background: {c.hex}"
									onclick={() => iconAddColor = c.hex}
									title={c.label}></button>
							{/each}
						</div>
					</div>
					<input name="name" placeholder="Name *" required class="input input-bordered input-sm col-span-2" />
					<label class="flex flex-col gap-1">
						<span class="text-xs text-base-content/50 font-medium">Von *</span>
						<input name="date_from" type="date" required
							class="input input-bordered input-sm"
							oninput={(e) => (addDateFrom = (e.target as HTMLInputElement).value)} />
					</label>
					<label class="flex flex-col gap-1">
						<span class="text-xs text-base-content/50 font-medium">Bis (leer = nur dieser Tag)</span>
						<input name="date_to" type="date"
							class="input input-bordered input-sm"
							min={addDateFrom} />
					</label>
					<input name="address" placeholder="Adresse" class="input input-bordered input-sm col-span-2" />
					<textarea name="note" placeholder="Bemerkung (HTML möglich)" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none"></textarea>
					<div class="col-span-2 flex gap-2">
						<button type="submit" class="btn btn-primary btn-sm">Speichern</button>
						<button type="button" class="btn btn-ghost btn-sm" onclick={() => { showAdd = false; addError = ''; }}>Abbrechen</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Table -->
	<div class="card bg-base-100 overflow-hidden">
		<table class="table table-sm [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap">
			<thead>
				<tr class="border-b border-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th class="w-8"></th>
					<th>Aktiv</th>
					<th class="w-10">Icon</th>
					<th>Von</th>
					<th>Bis</th>
					<th>Name</th>
					<th>Adresse</th>
					<th class="w-24"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.stands as stand, i (stand.id)}
					{#if editing === stand.id}
						<tr class="bg-primary/5">
							<td colspan="8" class="py-3 px-4">
								{#if editError}
									<div class="alert alert-error rounded-xl text-xs py-2 mb-2">{editError}</div>
								{/if}
								<form method="POST" action="?/update"
									use:enhance={({ formData, cancel }) => {
										const err = validateDates(formData.get('date_from') as string, formData.get('date_to') as string);
										if (err) { editError = err; cancel(); return; }
										editError = '';
										return async ({ update }) => { await update(); editing = null; editDateFrom = ''; };
									}}
									class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={stand.id} />
									<input type="hidden" name="active" value={stand.active} />
									<input type="hidden" name="icon" value="{iconEditName}|{iconEditColor}" />
									<!-- Icon picker -->
									<div class="col-span-2 overflow-hidden">
										<div class="flex gap-3 overflow-x-auto px-1 py-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-base-200 [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
											{#each FA_ICONS as icon}
												<button type="button"
													class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors {iconEditName === icon.name ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-base-200'}"
													onclick={() => iconEditName = icon.name}
													title={icon.label}>
													<i class="fa-solid fa-{icon.name} text-lg" style="color: {iconEditColor}"></i>
												</button>
											{/each}
										</div>
									</div>
									<!-- Color picker -->
									<div class="col-span-2 overflow-hidden">
										<div class="flex gap-3 overflow-x-auto px-1 py-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-base-200 [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
											{#each THEME_COLORS as c}
												<button type="button"
													class="w-7 h-7 rounded-full border-2 transition-all shrink-0 {iconEditColor === c.hex ? 'border-base-content scale-110' : 'border-transparent hover:scale-105'}"
													style="background: {c.hex}"
													onclick={() => iconEditColor = c.hex}
													title={c.label}></button>
											{/each}
										</div>
									</div>
									<input name="name" value={stand.name} required class="input input-bordered input-sm col-span-2" />
									<label class="flex flex-col gap-1">
										<span class="text-xs text-base-content/50 font-medium">Von *</span>
										<input name="date_from" type="date" value={stand.date_from} required
											class="input input-bordered input-sm"
											oninput={(e) => (editDateFrom = (e.target as HTMLInputElement).value)} />
									</label>
									<label class="flex flex-col gap-1">
										<span class="text-xs text-base-content/50 font-medium">Bis (leer = nur dieser Tag)</span>
										<input name="date_to" type="date" value={stand.date_to ?? ''}
											class="input input-bordered input-sm"
											min={editDateFrom || stand.date_from} />
									</label>
									<input name="address" value={stand.address ?? ''} placeholder="Adresse" class="input input-bordered input-sm col-span-2" />
									<textarea name="note" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none" placeholder="Bemerkung (HTML möglich)">{stand.note ?? ''}</textarea>
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => { editing = null; editError = ''; }}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						{@const ic = parseIcon(stand.icon)}
						<tr class="{stand.active ? 'hover:bg-base-200' : 'bg-base-200 text-base-content/40 hover:bg-base-300'} transition-colors">
							<td class="px-1">
								<div class="flex flex-col items-center gap-0">
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={stand.id} />
										<input type="hidden" name="idB" value={data.stands[i - 1]?.id} />
										<button type="submit" aria-label="Nach oben"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === 0}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
											</svg>
										</button>
									</form>
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={stand.id} />
										<input type="hidden" name="idB" value={data.stands[i + 1]?.id} />
										<button type="submit" aria-label="Nach unten"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === data.stands.length - 1}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</button>
									</form>
								</div>
							</td>
							<td class="align-middle">
								<form method="POST" action="?/toggle" use:enhance class="flex items-center">
									<input type="hidden" name="id" value={stand.id} />
									<input type="hidden" name="active" value={!stand.active} />
									<input type="checkbox" class="toggle toggle-primary toggle-sm"
										checked={stand.active}
										onchange={(e) => { (e.currentTarget.closest('form') as HTMLFormElement).requestSubmit(); }} />
								</form>
							</td>
							<td>
								<span class="flex items-center justify-center w-8 h-8 rounded-lg bg-base-200">
									<i class="fa-solid fa-{ic.name} text-base" style="color: {ic.color}"></i>
								</span>
							</td>
							<td class="text-sm text-base-content/60">{formatDate(stand.date_from)}</td>
							<td class="text-sm text-base-content/60">{stand.date_to ? formatDate(stand.date_to) : '–'}</td>
							<td class="font-medium">
								<span>{stand.name}</span>
								{#if stand.note}
									<span class="ml-1 text-base-content/30" title={stand.note}>
										<svg xmlns="http://www.w3.org/2000/svg" class="inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
										</svg>
									</span>
								{/if}
							</td>
							<td class="text-base-content/60 text-sm">{stand.address ?? '–'}</td>
							<td class="text-right">
								<div class="flex items-center justify-end gap-1">
									<button type="button" class="btn btn-ghost btn-xs btn-square" aria-label="Bearbeiten"
										onclick={() => { editing = stand.id; editDateFrom = stand.date_from; const p = parseIcon(stand.icon); iconEditName = p.name; iconEditColor = p.color; }}>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</button>
									<button type="button" class="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10" aria-label="Löschen"
										onclick={() => (deleteTarget = { id: stand.id, name: stand.name })}>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</div>
							</td>
						</tr>
					{/if}
				{:else}
					<tr><td colspan="8" class="text-center text-base-content/40 py-8">Keine Einträge</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<form method="POST" action="?/delete" bind:this={deleteFormEl}
	use:enhance={() => async ({ update }) => { deleteTarget = null; await update(); }}>
	<input type="hidden" name="id" value={deleteTarget?.id ?? ''} />
</form>

<DeleteModal
	open={deleteTarget !== null}
	itemName={deleteTarget?.name}
	onconfirm={() => deleteFormEl.requestSubmit()}
	onclose={() => (deleteTarget = null)}
/>
