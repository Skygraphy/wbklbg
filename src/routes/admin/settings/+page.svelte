<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let standardPrice = $state(data.standardPrice);
	let orderPrefillMessage = $state(data.orderPrefillMessage);
	let promotionMessage = $state(data.promotionMessage);
	let promotionInquiryMessage = $state(data.promotionInquiryMessage);
	let impressumName = $state(data.impressumName);
	let impressumAddress = $state(data.impressumAddress);
	let impressumEmail = $state(data.impressumEmail);
	let impressumBusiness = $state(data.impressumBusiness);
	let contactEmail = $state(data.contactEmail);
	let contactIsbn = $state(data.contactIsbn);
	let maintenanceMode = $state(data.maintenanceMode);
</script>

<div class="max-w-2xl">
	<div class="mb-8">
		<h1 class="text-2xl font-bold">Einstellungen</h1>
		<p class="text-base-content/50 text-sm mt-0.5">Allgemeine Website-Einstellungen</p>
	</div>

	<!-- Wartungsmodus -->
	<div class="card bg-base-100 mb-6">
		<div class="card-body flex-row items-center justify-between gap-4 py-4">
			<div>
				<h2 class="font-semibold text-sm">Wartungsmodus</h2>
				<p class="text-xs text-base-content/50 mt-0.5">
					Besucher werden auf die Wartungsseite weitergeleitet. Der Adminbereich bleibt zugänglich.
				</p>
			</div>
			<form
				method="POST"
				action="?/toggleMaintenance"
				use:enhance={() => async ({ update }) => { await update({ reset: false }); }}
			>
				<input type="hidden" name="maintenance_mode" value="" />
				<input
					type="checkbox"
					class="toggle toggle-error"
					checked={maintenanceMode}
					onchange={(e) => {
						maintenanceMode = e.currentTarget.checked;
						const form = e.currentTarget.form!;
						(form.elements.namedItem('maintenance_mode') as HTMLInputElement).value =
							e.currentTarget.checked ? 'true' : 'false';
						form.requestSubmit();
					}}
				/>
			</form>
		</div>
		{#if maintenanceMode}
			<div class="px-6 pb-4">
				<div class="flex items-center gap-2 rounded-lg bg-error/10 border border-error/20 px-3 py-2 text-xs text-error font-medium">
					<svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Wartungsmodus ist aktiv – Besucher sehen die Wartungsseite.
				</div>
			</div>
		{/if}
	</div>

	{#if form?.error}
		<div class="alert alert-error rounded-xl text-sm mb-4">{form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success rounded-xl text-sm mb-4">Einstellungen gespeichert.</div>
	{/if}

	<div class="card bg-base-100">
		<div class="card-body gap-8">
			<form method="POST" action="?/save" use:enhance={() => async ({ update }) => { await update({ reset: false }); }} class="flex flex-col gap-8">

				<!-- Preis -->
				<div class="flex flex-col gap-1.5">
					<label class="text-sm font-semibold" for="standard_price">Standardpreis pro Buch (€)</label>
					<p class="text-xs text-base-content/50">Wird im Preise-Bereich angezeigt und als Basis für die Ersparnis-Berechnung bei Aktionen verwendet.</p>
					<label class="input input-bordered flex items-center gap-2 w-40 mt-1">
						<input
							id="standard_price"
							name="standard_price"
							type="number"
							min="0.01"
							step="0.01"
							bind:value={standardPrice}
							required
							class="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
						<span class="text-base-content/40 text-sm shrink-0">€</span>
					</label>
				</div>

				<div class="divider my-0"></div>

				<!-- Textkonserve: Standardbestellung -->
				<div class="flex flex-col gap-1.5">
					<label class="text-sm font-semibold" for="order_prefill_message">Textkonserve – Standardbestellung</label>
					<p class="text-xs text-base-content/50">
						Wird automatisch in das Nachrichtenfeld eingefügt, wenn jemand auf einen Bestellbutton klickt.
					</p>
					<textarea
						id="order_prefill_message"
						name="order_prefill_message"
						rows="4"
						class="textarea textarea-bordered resize-none mt-1 text-sm"
						bind:value={orderPrefillMessage}
					></textarea>
				</div>

				<div class="divider my-0"></div>

				<!-- Textkonserve: Aktion -->
				<div class="flex flex-col gap-1.5">
					<label class="text-sm font-semibold" for="promotion_message">Textkonserve – Aktion - Bestellung über Button</label>
					<p class="text-xs text-base-content/50">
						Wird automatisch in das Nachrichtenfeld eingefügt, wenn jemand auf einen Aktionsbutton klickt.
					</p>
					<textarea
						id="promotion_message"
						name="promotion_message"
						rows="4"
						class="textarea textarea-bordered resize-none mt-1 text-sm"
						bind:value={promotionMessage}
					></textarea>
				</div>

				<div class="divider my-0"></div>

				<!-- Textkonserve: Aktion - Generelle Anfrage -->
				<div class="flex flex-col gap-1.5">
					<label class="text-sm font-semibold" for="promotion_inquiry_message">Textkonserve – Aktion - Generelle Anfrage</label>
					<p class="text-xs text-base-content/50">
						Wird automatisch in das Nachrichtenfeld eingefügt, wenn jemand eine Anfrage über eine Aktion schickt.
					</p>
					<textarea
						id="promotion_inquiry_message"
						name="promotion_inquiry_message"
						rows="4"
						class="textarea textarea-bordered resize-none mt-1 text-sm"
						bind:value={promotionInquiryMessage}
					></textarea>
				</div>

				<div class="divider my-0"></div>

				<!-- Kontaktbereich -->
				<div class="flex flex-col gap-4">
					<div>
						<h2 class="text-sm font-semibold">Kontaktbereich</h2>
						<p class="text-xs text-base-content/50 mt-0.5">Wird im Kontaktbereich der Website angezeigt.</p>
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="contact_email">E-Mail-Adresse</label>
						<input id="contact_email" name="contact_email" type="email"
							class="input input-bordered input-sm" bind:value={contactEmail} />
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="contact_isbn">ISBN</label>
						<input id="contact_isbn" name="contact_isbn" type="text"
							class="input input-bordered input-sm" placeholder="z. B. 978-3-86680-192-9" bind:value={contactIsbn} />
					</div>
				</div>

				<div class="divider my-0"></div>

				<!-- Impressum -->
				<div class="flex flex-col gap-4">
					<div>
						<h2 class="text-sm font-semibold">Impressum</h2>
						<p class="text-xs text-base-content/50 mt-0.5">Wird auf der öffentlichen Impressum-Seite angezeigt.</p>
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="impressum_name">Name</label>
						<input id="impressum_name" name="impressum_name" type="text"
							class="input input-bordered input-sm" bind:value={impressumName} />
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="impressum_address">Adresse</label>
						<textarea id="impressum_address" name="impressum_address" rows="3"
							class="textarea textarea-bordered textarea-sm resize-none"
							bind:value={impressumAddress}></textarea>
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="impressum_email">E-Mail</label>
						<input id="impressum_email" name="impressum_email" type="email"
							class="input input-bordered input-sm" bind:value={impressumEmail} />
					</div>
					<div class="flex flex-col gap-1.5">
						<label class="text-xs font-semibold text-base-content/60" for="impressum_business">Unternehmensgegenstand</label>
						<input id="impressum_business" name="impressum_business" type="text"
							class="input input-bordered input-sm" bind:value={impressumBusiness} />
					</div>
				</div>

				<div>
					<button type="submit" class="btn btn-primary btn-sm">Speichern</button>
				</div>
			</form>
		</div>
	</div>
</div>
