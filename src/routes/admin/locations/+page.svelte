<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import DeleteModal from '$lib/ui/DeleteModal.svelte';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
	let iconAddName = $state('store');
	let iconAddColor = $state('#C2714F');
	let iconEditName = $state('store');
	let iconEditColor = $state('#C2714F');
	let deleteTarget = $state<{ id: number; name: string } | null>(null);
	let deleteFormEl: HTMLFormElement;

	const FA_ICONS = [
		{ name: 'store',             label: 'Laden/Geschäft' },
		{ name: 'book',              label: 'Buchhandlung' },
		{ name: 'utensils',          label: 'Restaurant/Gastronomie' },
		{ name: 'wine-glass',        label: 'Buschenschenke/Weingut' },
		{ name: 'mug-hot',           label: 'Kaffeehaus/Café' },
		{ name: 'cake-candles',      label: 'Konditorei/Bäckerei' },
		{ name: 'building',          label: 'Betrieb/Institution' },
		{ name: 'building-columns',  label: 'Gemeindeamt/Behörde' },
		{ name: 'church',            label: 'Kirchengemeinde' },
		{ name: 'graduation-cap',    label: 'Schule/Bildungseinrichtung' },
		{ name: 'landmark',          label: 'Sehenswürdigkeit' },
		{ name: 'house',             label: 'Privatperson' },
		{ name: 'city',              label: 'Gemeinde/Stadt' },
		{ name: 'map-pin',           label: 'Standort allgemein' },
		{ name: 'palette',           label: 'Galerie/Atelier' },
		{ name: 'music',             label: 'Musikschule' },
		{ name: 'leaf',              label: 'Naturladen/Bio' },
		{ name: 'newspaper',         label: 'Kiosk/Zeitung' },
		{ name: 'scissors',          label: 'Friseur/Dienstleister' },
		{ name: 'people-group',      label: 'Verein/Gemeinschaft' },
		{ name: 'child',             label: 'Kinderladen/Spielzeug' },
		{ name: 'basketball',        label: 'Sportverein' },
	];

	const THEME_COLORS = [
		{ hex: '#C2714F', label: 'Terracotta' },
		{ hex: '#D97706', label: 'Amber' },
		{ hex: '#7C9E7A', label: 'Sage' },
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
			return { name, color: color ?? '#C2714F' };
		}
		return { name: 'store', color: '#C2714F' };
	}
</script>

<div class="max-w-4xl">
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
				<form method="POST" action="?/create"
					use:enhance={() => async ({ result, update }) => { await update(); if (result.type !== 'failure') { showAdd = false; iconAddName = 'store'; iconAddColor = '#C2714F'; } }}
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
					<input name="address" placeholder="Adresse" class="input input-bordered input-sm" />
					<input name="phone" placeholder="Telefon" class="input input-bordered input-sm" />
					<input name="email" type="email" placeholder="E-Mail" class="input input-bordered input-sm col-span-2" />
					<textarea name="note" placeholder="Bemerkung (HTML möglich)" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none"></textarea>
					<div class="col-span-2 flex gap-2">
						<button type="submit" class="btn btn-primary btn-sm">Speichern</button>
						<button type="button" class="btn btn-ghost btn-sm" onclick={() => (showAdd = false)}>Abbrechen</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<div class="card bg-base-100 overflow-hidden">
		<div class="overflow-x-auto">
		<table class="table table-sm [&_th]:whitespace-nowrap min-w-[520px]">
			<thead>
				<tr class="border-b border-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th class="w-8"></th>
					<th class="w-10">Aktiv</th>
					<th class="w-10">Icon</th>
					<th>Name</th>
					<th>Adresse</th>
					<th>Kontakt</th>
					<th class="w-20"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.locations as loc, i (loc.id)}
					{#if editing === loc.id}
						<tr class="bg-primary/5">
							<td colspan="7" class="py-3 px-4">
								<form method="POST" action="?/update" use:enhance={() => async ({ update }) => { await update(); editing = null; }} class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={loc.id} />
									<input type="hidden" name="active" value={loc.active} />
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
									<input name="name" value={loc.name} required class="input input-bordered input-sm col-span-2" />
									<input name="address" value={loc.address ?? ''} placeholder="Adresse" class="input input-bordered input-sm" />
									<input name="phone" value={loc.phone ?? ''} placeholder="Telefon" class="input input-bordered input-sm" />
									<input name="email" type="email" value={loc.email ?? ''} placeholder="E-Mail" class="input input-bordered input-sm col-span-2" />
									<textarea name="note" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none" placeholder="Bemerkung (HTML möglich)">{loc.note ?? ''}</textarea>
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => (editing = null)}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						{@const ic = parseIcon(loc.icon)}
						<tr class="{loc.active ? 'hover:bg-base-200' : 'bg-base-200 text-base-content/40 hover:bg-base-300'} transition-colors">
							<td class="px-1">
								<div class="flex flex-col items-center gap-0">
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={loc.id} />
										<input type="hidden" name="idB" value={data.locations[i - 1]?.id} />
										<button type="submit" aria-label="Nach oben"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === 0}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
											</svg>
										</button>
									</form>
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={loc.id} />
										<input type="hidden" name="idB" value={data.locations[i + 1]?.id} />
										<button type="submit" aria-label="Nach unten"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === data.locations.length - 1}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</button>
									</form>
								</div>
							</td>
							<td class="align-middle">
								<form method="POST" action="?/toggle" use:enhance class="flex items-center">
									<input type="hidden" name="id" value={loc.id} />
									<input type="hidden" name="active" value={!loc.active} />
									<input type="checkbox" class="toggle toggle-primary toggle-sm"
										checked={loc.active}
										onchange={(e) => { (e.currentTarget.closest('form') as HTMLFormElement).requestSubmit(); }} />
								</form>
							</td>
							<td>
								<span class="flex items-center justify-center w-8 h-8 rounded-lg bg-base-200">
									<i class="fa-solid fa-{ic.name} text-base" style="color: {ic.color}"></i>
								</span>
							</td>
							<td class="font-medium">{loc.name}</td>
							<td class="text-sm text-base-content/60">{loc.address ?? '–'}</td>
							<td class="text-sm text-base-content/60">
								{#if loc.email}<div>{loc.email}</div>{/if}
								{#if loc.phone}<div>{loc.phone}</div>{/if}
								{#if !loc.email && !loc.phone}–{/if}
							</td>
							<td class="text-right">
								<div class="flex items-center justify-end gap-1">
									<button type="button" class="btn btn-ghost btn-xs btn-square" aria-label="Bearbeiten"
										onclick={() => { editing = loc.id; const p = parseIcon(loc.icon); iconEditName = p.name; iconEditColor = p.color; }}>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</button>
									<button type="button" class="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10" aria-label="Löschen"
										onclick={() => (deleteTarget = { id: loc.id, name: loc.name })}>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</div>
							</td>
						</tr>
					{/if}
				{:else}
					<tr><td colspan="7" class="text-center text-base-content/40 py-8">Keine Einträge</td></tr>
				{/each}
			</tbody>
		</table>
		</div>
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
