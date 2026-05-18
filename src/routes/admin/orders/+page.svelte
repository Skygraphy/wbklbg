<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { ContactSubmission } from '$lib/types/contact-submission';
	import DeleteModal from '$lib/ui/DeleteModal.svelte';

	const { data }: { data: PageData } = $props();

	let deleteTarget = $state<{ id: number; name: string } | null>(null);
	let detailTarget = $state<ContactSubmission | null>(null);
	let deleteFormEl: HTMLFormElement;
	let detailDialog: HTMLDialogElement;
	let copied = $state(false);

	async function copyEmail(email: string) {
		await navigator.clipboard.writeText(email);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	$effect(() => {
		if (!detailDialog) return;
		if (detailTarget) detailDialog.showModal(); else detailDialog.close();
	});

	function formatDate(s: string) {
		return new Date(s).toLocaleString('de-AT', {
			day: '2-digit', month: '2-digit', year: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
	}
</script>

<div class="max-w-5xl">
	<div class="mb-6">
		<h1 class="text-2xl font-bold">Bestellungen & Anfragen</h1>
		<p class="text-base-content/50 text-sm mt-0.5">{data.orders.length} Einsendungen</p>
	</div>

	<div class="card bg-base-100 overflow-hidden">
		<div class="overflow-x-auto">
		<table class="table table-sm [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap min-w-[700px]">
			<thead>
				<tr class="border-b border-base-200 text-base-content/60 text-xs uppercase tracking-wide">
					<th>Datum</th>
					<th>Name</th>
					<th>E-Mail</th>
					<th>Betreff</th>
					<th class="w-16">Stk.</th>
					<th>Nachricht</th>
					<th class="w-16"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.orders as order (order.id)}
					<tr class="hover align-top cursor-pointer" role="button" tabindex="0"
				onclick={() => (detailTarget = order)}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); detailTarget = order; } }}>
						<td class="text-sm text-base-content/60 whitespace-nowrap">{formatDate(order.submitted_at)}</td>
						<td class="font-medium">{order.name}</td>
						<td>
							<a href="mailto:{order.email}" class="text-primary hover:underline text-sm"
								onclick={(e) => e.stopPropagation()}>{order.email}</a>
						</td>
						<td class="text-sm text-base-content/60">{order.subject ?? '–'}</td>
						<td class="text-center">{order.qty ?? '–'}</td>
						<td class="text-sm text-base-content/60 max-w-xs truncate">{order.message ?? '–'}</td>
						<td class="text-right">
							<div class="flex items-center justify-end gap-1">
								<button type="button" class="btn btn-ghost btn-xs btn-square" aria-label="Details"
									onclick={(e) => { e.stopPropagation(); detailTarget = order; }}>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								</button>
								<button type="button" class="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10" aria-label="Löschen"
									onclick={(e) => { e.stopPropagation(); deleteTarget = { id: order.id, name: order.name }; }}>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</button>
							</div>
						</td>
					</tr>
				{:else}
					<tr><td colspan="7" class="text-center text-base-content/40 py-8">Noch keine Bestellungen</td></tr>
				{/each}
			</tbody>
		</table>
		</div>
	</div>
</div>

<!-- Detail Modal -->
<dialog bind:this={detailDialog} class="modal" aria-labelledby="order-detail-title" onclose={() => (detailTarget = null)}>
	{#if detailTarget}
		<div class="modal-box max-w-lg">
			<div class="flex items-start justify-between mb-4">
				<div>
					<h3 id="order-detail-title" class="font-bold text-lg">{detailTarget.name}</h3>
					<p class="text-xs text-base-content/40 mt-0.5">{formatDate(detailTarget.submitted_at)}</p>
				</div>
				{#if detailTarget.subject}
					<span class="badge badge-ghost">{detailTarget.subject}</span>
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-3 mb-4">
				<div class="bg-base-200 rounded-xl p-3">
					<div class="text-xs text-base-content/40 uppercase tracking-wide mb-1">E-Mail</div>
					<a href="mailto:{detailTarget.email}" class="text-primary text-sm hover:underline break-all">
						{detailTarget.email}
					</a>
				</div>
				<div class="bg-base-200 rounded-xl p-3">
					<div class="text-xs text-base-content/40 uppercase tracking-wide mb-1">Exemplare</div>
					<div class="text-sm font-medium">{detailTarget.qty ?? '–'}</div>
				</div>
			</div>

			{#if detailTarget.message}
				<div class="bg-base-200 rounded-xl p-3">
					<div class="text-xs text-base-content/40 uppercase tracking-wide mb-2">Nachricht</div>
					<p class="text-sm leading-relaxed whitespace-pre-wrap">{detailTarget.message}</p>
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-3 text-sm text-base-content/40 italic">Keine Nachricht</div>
			{/if}

			<div class="modal-action">
				<form method="dialog"><button class="btn btn-ghost btn-sm">Abbrechen</button></form>
				<button type="button" class="btn btn-error btn-sm"
					onclick={() => { const t = detailTarget; detailDialog.close(); deleteTarget = { id: t!.id, name: t!.name }; }}>
					Löschen
				</button>
				<button type="button" class="btn btn-primary btn-sm" onclick={() => copyEmail(detailTarget!.email)}>
					{#if copied}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
						Kopiert!
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
						E-Mail kopieren
					{/if}
				</button>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop"><button>close</button></form>
	{/if}
</dialog>

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
