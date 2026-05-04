<script lang="ts">
	interface Props {
		open: boolean;
		itemName?: string;
		onconfirm: () => void;
		onclose: () => void;
	}
	const { open, itemName, onconfirm, onclose }: Props = $props();

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (!dialog) return;
		if (open) dialog.showModal(); else dialog.close();
	});
</script>

<dialog bind:this={dialog} class="modal" onclose={onclose}>
	<div class="modal-box max-w-sm">
		<h3 class="font-bold text-base mb-2">Eintrag löschen</h3>
		<p class="text-sm text-base-content/70">
			{#if itemName}
				Soll <span class="font-semibold text-base-content">„{itemName}"</span> wirklich gelöscht werden?
			{:else}
				Soll dieser Eintrag wirklich gelöscht werden?
			{/if}
			<br />Diese Aktion kann nicht rückgängig gemacht werden.
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-ghost btn-sm">Abbrechen</button>
			</form>
			<button class="btn btn-error btn-sm" onclick={onconfirm}>Löschen</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
