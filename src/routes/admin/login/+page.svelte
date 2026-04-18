<script lang="ts">
	import type { ActionData } from './$types';
	const { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	<div class="card bg-base-100 shadow-xl w-full max-w-sm">
		<div class="card-body gap-6">
			<div class="text-center">
				<h1 class="font-amatic font-bold text-4xl text-primary">Wimmelbuch</h1>
				<p class="text-base-content/60 text-sm mt-1">Admin-Bereich</p>
			</div>

			{#if form?.error}
				<div class="alert alert-error rounded-xl text-sm py-2">
					{form.error}
				</div>
			{/if}

			<form method="POST" class="flex flex-col gap-4">
				<div class="form-control">
					<label class="label pb-1" for="password">
						<span class="label-text font-semibold">Passwort</span>
					</label>
					<input
						id="password"
						name="password"
						type="password"
						class="input input-bordered"
						placeholder="••••••••"
						required
						autofocus
					/>
				</div>
				<button type="submit" class="btn btn-primary">Anmelden</button>
			</form>
		</div>
	</div>
</div>
