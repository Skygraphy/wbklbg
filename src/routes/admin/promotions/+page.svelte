<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import DeleteModal from '$lib/ui/DeleteModal.svelte';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state<number | null>(null);
	let showAdd = $state(false);
	let iconAddName = $state('tag');
	let iconAddColor = $state('#D97706');
	let deleteTarget = $state<{ id: number; name: string } | null>(null);
	let deleteFormEl: HTMLFormElement;
	let iconEditName = $state('tag');
	let iconEditColor = $state('#D97706');

	const FA_ICONS = [
		{ name: 'tag',                  label: 'Preisschild' },
		{ name: 'gift',                 label: 'Geschenk' },
		{ name: 'star',                 label: 'Stern' },
		{ name: 'heart',                label: 'Herz' },
		{ name: 'fire',                 label: 'Feuer' },
		{ name: 'bolt',                 label: 'Blitz' },
		{ name: 'percent',              label: 'Prozent' },
		{ name: 'ribbon',               label: 'Schleife' },
		{ name: 'crown',                label: 'Krone' },
		{ name: 'gem',                  label: 'Edelstein' },
		{ name: 'trophy',               label: 'Trophäe' },
		{ name: 'medal',                label: 'Medaille' },
		{ name: 'award',                label: 'Auszeichnung' },
		{ name: 'thumbs-up',            label: 'Daumen hoch' },
		{ name: 'handshake',            label: 'Handschlag' },
		{ name: 'bag-shopping',         label: 'Einkaufstasche' },
		{ name: 'cart-shopping',        label: 'Warenkorb' },
		{ name: 'box-open',             label: 'Paket' },
		{ name: 'ticket',               label: 'Ticket' },
		{ name: 'bell',                 label: 'Glocke' },
		{ name: 'wand-magic-sparkles',  label: 'Zauberstab' },
		{ name: 'piggy-bank',           label: 'Sparschwein' },
		{ name: 'coins',                label: 'Münzen' },
		{ name: 'money-bill-wave',      label: 'Geldschein' },
		{ name: 'credit-card',          label: 'Kreditkarte' },
		{ name: 'calendar-check',       label: 'Kalender' },
		{ name: 'calendar-days',        label: 'Kalenderblatt' },
		{ name: 'clock',                label: 'Uhr' },
		{ name: 'hourglass-half',       label: 'Sanduhr' },
		{ name: 'rocket',               label: 'Rakete' },
		{ name: 'bullhorn',             label: 'Megafon' },
		{ name: 'newspaper',            label: 'Zeitung' },
		{ name: 'paper-plane',          label: 'Papierflieger' },
		{ name: 'circle-check',         label: 'Häkchen' },
		{ name: 'hand-holding-heart',   label: 'Herz in Hand' },
		{ name: 'hand-holding-dollar',  label: 'Geld in Hand' },
		{ name: 'seedling',             label: 'Pflanze' },
		{ name: 'leaf',                 label: 'Blatt' },
		{ name: 'sun',                  label: 'Sonne' },
		{ name: 'snowflake',            label: 'Schneeflocke' },
		{ name: 'music',                label: 'Musik' },
		{ name: 'book',                 label: 'Buch' },
		{ name: 'palette',              label: 'Palette' },
		{ name: 'feather',              label: 'Feder' },
		{ name: 'lightbulb',            label: 'Glühbirne' },
		{ name: 'magnifying-glass',     label: 'Lupe' },
		{ name: 'truck-fast',           label: 'Lieferung' },
		{ name: 'house',                label: 'Haus' },
		{ name: 'map-pin',              label: 'Standort' },
		{ name: 'share-nodes',          label: 'Teilen' },
	];

	const THEME_COLORS = [
		{ hex: '#D97706', label: 'Amber' },
		{ hex: '#C2714F', label: 'Terracotta' },
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

	let addValidFrom = $state('');
	let editValidFrom = $state('');
	let addError = $state('');
	let editError = $state('');

	const QTY_MAP: Record<string, number> = { '1 Buch': 1, '3 Bücher': 3, '5 Bücher': 5, '10 Bücher': 10 };

	function validateForm(formData: FormData): string | null {
		const from = formData.get('valid_from') as string;
		const to = formData.get('valid_to') as string;
		if (from && to && to < from)
			return 'Das Bis-Datum muss gleich oder nach dem Von-Datum liegen.';

		const filled = [1, 2, 3]
			.map(n => ({
				qty: QTY_MAP[formData.get(`price${n}_qty`) as string] ?? 0,
				amt: parseFloat(formData.get(`price${n}_amt`) as string)
			}))
			.filter(o => o.qty > 0 && !isNaN(o.amt) && o.amt > 0)
			.sort((a, b) => a.qty - b.qty);

		for (let i = 1; i < filled.length; i++) {
			const prev = filled[i - 1];
			const curr = filled[i];
			if (curr.amt / curr.qty >= prev.amt / prev.qty)
				return `Bei ${curr.qty} Büchern muss der Preis pro Buch niedriger sein als bei ${prev.qty === 1 ? '1 Buch' : prev.qty + ' Büchern'}.`;
		}
		return null;
	}

	function parseIcon(icon: string): { name: string; color: string } {
		if (icon.includes('|')) {
			const [name, color] = icon.split('|');
			return { name, color: color ?? '#e74c3c' };
		}
		return { name: 'tag', color: '#e74c3c' };
	}

	function fmt(d: string) {
		return new Date(d).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
	}
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
				<form method="POST" action="?/create" use:enhance={({ formData, cancel }) => {
						const err = validateForm(formData);
						if (err) { addError = err; cancel(); return; }
						addError = '';
						return async ({ update }) => { await update(); showAdd = false; iconAddName = 'tag'; iconAddColor = '#D97706'; };
					}} class="grid grid-cols-2 gap-3">
					<input type="hidden" name="icon" value="{iconAddName}|{iconAddColor}" />
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
					<div class="flex flex-col gap-1">
						<label class="text-xs text-base-content/50">Gültig von *</label>
						<input name="valid_from" type="date" required class="input input-bordered input-sm"
							oninput={(e) => addValidFrom = e.currentTarget.value} />
					</div>
					<div class="flex flex-col gap-1">
						<label class="text-xs text-base-content/50">Gültig bis *</label>
						<input name="valid_to" type="date" required class="input input-bordered input-sm"
							min={addValidFrom} />
					</div>
					<div class="col-span-2 grid grid-cols-3 gap-2">
						{#each [1,2,3] as n}
							<div class="flex gap-1">
								<select name="price{n}_qty" class="select select-bordered select-sm w-1/2">
									<option value="">–</option>
									<option value="1 Buch">1 Buch</option>
									<option value="3 Bücher">3 Bücher</option>
									<option value="5 Bücher">5 Bücher</option>
									<option value="10 Bücher">10 Bücher</option>
								</select>
								<label class="input input-bordered input-sm w-1/2 flex items-center gap-1">
									<input name="price{n}_amt" type="number" step="0.01" min="0.01" placeholder="0,00"
										class="currency w-full" />
									<span class="text-base-content/40 text-xs shrink-0">€</span>
								</label>
							</div>
						{/each}
					</div>
					<textarea name="note" placeholder="Bemerkung (HTML möglich)" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none"></textarea>
					{#if addError}
						<p class="col-span-2 text-error text-xs">{addError}</p>
					{/if}
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
		<div class="overflow-x-auto">
		<table class="table table-sm [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap min-w-[560px]">
			<thead>
				<tr class="border-b border-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th class="w-8"></th>
					<th class="w-10">Aktiv</th>
					<th>Name</th>
					<th>Von</th>
					<th>Bis</th>
					<th>Preise</th>
					<th class="w-8"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.promotions as promo, i (promo.id)}
					{#if editing === promo.id}
						<tr class="bg-primary/5">
							<td colspan="7" class="py-3 px-4">
								<form method="POST" action="?/update" use:enhance={({ formData, cancel }) => {
										const err = validateForm(formData);
										if (err) { editError = err; cancel(); return; }
										editError = '';
										return async ({ update }) => { await update(); editing = null; };
									}} class="grid grid-cols-2 gap-2">
									<input type="hidden" name="id" value={promo.id} />
									<input type="hidden" name="active" value={String(promo.active)} />
									<input type="hidden" name="icon" value="{iconEditName}|{iconEditColor}" />
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
									<input name="name" value={promo.name} required class="input input-bordered input-sm col-span-2" />
									<input name="valid_from" type="date" value={promo.valid_from} required class="input input-bordered input-sm"
										oninput={(e) => editValidFrom = e.currentTarget.value} />
									<input name="valid_to" type="date" value={promo.valid_to} required class="input input-bordered input-sm"
										min={editValidFrom || promo.valid_from} />
									<div class="col-span-2 grid grid-cols-3 gap-2">
										{#each [1,2,3] as n}
											{@const p = promo as unknown as Record<string, unknown>}
											<div class="flex gap-1">
												<select name="price{n}_qty" class="select select-bordered select-sm w-1/2">
													<option value="">–</option>
													<option value="1 Buch" selected={p[`price${n}_qty`] === '1 Buch'}>1 Buch</option>
													<option value="3 Bücher" selected={p[`price${n}_qty`] === '3 Bücher'}>3 Bücher</option>
													<option value="5 Bücher" selected={p[`price${n}_qty`] === '5 Bücher'}>5 Bücher</option>
													<option value="10 Bücher" selected={p[`price${n}_qty`] === '10 Bücher'}>10 Bücher</option>
												</select>
												<label class="input input-bordered input-sm w-1/2 flex items-center gap-1">
													<input name="price{n}_amt" type="number" step="0.01" min="0.01" placeholder="0,00"
														value={p[`price${n}_amt`] ?? ''}
														class="currency w-full" />
													<span class="text-base-content/40 text-xs shrink-0">€</span>
												</label>
											</div>
										{/each}
									</div>
									<textarea name="note" rows="2" class="textarea textarea-bordered textarea-sm col-span-2 resize-none" placeholder="Bemerkung (HTML möglich)">{promo.note ?? ''}</textarea>
									{#if editError}
										<p class="col-span-2 text-error text-xs">{editError}</p>
									{/if}
									<div class="col-span-2 flex gap-2">
										<button type="submit" class="btn btn-primary btn-xs">Speichern</button>
										<button type="button" class="btn btn-ghost btn-xs" onclick={() => { editing = null; editError = ''; }}>Abbrechen</button>
									</div>
								</form>
							</td>
						</tr>
					{:else}
						{@const ic = parseIcon(promo.icon)}
						<tr class="{promo.active ? 'hover:bg-base-200' : 'bg-base-200 text-base-content/40 hover:bg-base-300'} {promo.note ? 'has-note' : ''}">
							<td class="px-1">
								<div class="flex flex-col items-center gap-0">
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={promo.id} />
										<input type="hidden" name="idB" value={data.promotions[i - 1]?.id} />
										<button type="submit" aria-label="Nach oben"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === 0}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
											</svg>
										</button>
									</form>
									<form method="POST" action="?/reorder" use:enhance>
										<input type="hidden" name="idA" value={promo.id} />
										<input type="hidden" name="idB" value={data.promotions[i + 1]?.id} />
										<button type="submit" aria-label="Nach unten"
											class="p-0.5 rounded text-base-content/40 hover:text-base-content/70 disabled:opacity-25 transition-colors"
											disabled={i === data.promotions.length - 1}>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</button>
									</form>
								</div>
							</td>
							<td class="align-middle">
								<form method="POST" action="?/toggle" use:enhance class="flex items-center">
									<input type="hidden" name="id" value={promo.id} />
									<input type="hidden" name="active" value={String(!promo.active)} />
									<input type="checkbox" class="toggle toggle-primary toggle-sm" checked={promo.active}
										onchange={(e) => { e.currentTarget.form?.requestSubmit(); }} />
								</form>
							</td>
							<td>
								<i class="fa-solid fa-{ic.name} mr-1.5" style="color: {ic.color}"></i>
								<span class="font-medium">{promo.name}</span>
							</td>
							<td class="text-sm text-base-content/60">{fmt(promo.valid_from)}</td>
							<td class="text-sm text-base-content/60">{fmt(promo.valid_to)}</td>
							<td class="text-sm text-base-content/60">
								{#if promo.price1_qty}
									<span class="badge badge-sm badge-ghost whitespace-nowrap">{promo.price1_qty} um {promo.price1_amt} €</span>
								{/if}
								{#if promo.price2_qty}
									<span class="badge badge-sm badge-ghost whitespace-nowrap">{promo.price2_qty} um {promo.price2_amt} €</span>
								{/if}
								{#if promo.price3_qty}
									<span class="badge badge-sm badge-ghost whitespace-nowrap">{promo.price3_qty} um {promo.price3_amt} €</span>
								{/if}
								{#if promo.note}
									<div class="text-xs text-base-content/50 mt-1">{promo.note}</div>
								{/if}
							</td>
							<td class="text-right">
								<div class="flex items-center justify-end gap-1">
									<button type="button" class="btn btn-ghost btn-xs btn-square" aria-label="Bearbeiten"
										onclick={() => { editing = promo.id; const p = parseIcon(promo.icon); iconEditName = p.name; iconEditColor = p.color; editValidFrom = promo.valid_from; }}>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</button>
									<button type="button" class="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10" aria-label="Löschen"
										onclick={() => (deleteTarget = { id: promo.id, name: promo.name })}>
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

<style>
	tr.has-note > td { vertical-align: top; }
	input.currency { appearance: textfield; background: transparent; outline: none; }
	input.currency::-webkit-outer-spin-button,
	input.currency::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
</style>
