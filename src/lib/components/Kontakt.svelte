<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';

	type Status = 'idle' | 'sending' | 'success' | 'error';

	let qrFailed = $state(false);

	let status = $state<Status>('idle');
	let errorMessage = $state('');

	let formData = $state({
		name: '',
		email: '',
		qty: '1' as '1' | '3',
		message: '',
		website: '' // honeypot
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (formData.website) return; // honeypot triggered

		status = 'sending';
		errorMessage = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					qty: formData.qty,
					message: formData.message
				})
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.message ?? 'Ein Fehler ist aufgetreten.');
			}

			status = 'success';
			formData = { name: '', email: '', qty: '1', message: '', website: '' };
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.';
		}
	}
</script>

<SectionWrapper id="kontakt" bg="base-200">
	<div class="mb-12 text-center">
		<h2 class="section-heading">Kontakt & Bestellung</h2>
		<p class="section-subheading">Ich freue mich auf deine Nachricht!</p>
	</div>

	<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
		<!-- Left: Contact info -->
		<div class="flex flex-col gap-6">
			<div>
				<h3 class="font-display text-2xl font-bold text-wim-brown">Ines Wohlmuth</h3>
				<p class="text-base-content/60 text-sm mt-1">Autorin des Wimmelbuch Klosterneuburg</p>
			</div>

			<div class="space-y-4">
				<a
					href="mailto:kontakt@wimmelbuch-klosterneuburg.at"
					class="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
				>
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-100 group-hover:bg-primary/10 transition-colors">
						<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<div class="font-semibold">E-Mail</div>
						<div class="text-base-content/60">kontakt@wimmelbuch-klosterneuburg.at</div>
					</div>
				</a>

				<a
					href="tel:+43XXXXXXXXXX"
					class="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
				>
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-100 group-hover:bg-primary/10 transition-colors">
						<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
					</div>
					<div>
						<div class="font-semibold">Telefon</div>
						<div class="text-base-content/60">Auf Anfrage</div>
					</div>
				</a>

				<div class="flex items-center gap-3 text-sm">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-100">
						<svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<div>
						<div class="font-semibold">ISBN</div>
						<div class="text-base-content/60">Folgt bei Veröffentlichung</div>
					</div>
				</div>
			</div>

			<!-- QR Code placeholder -->
			<div class="flex items-start gap-4">
				<div class="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-base-100 p-2 shadow-sm">
					{#if !qrFailed}
						<img
							src="/images/qr-code.png"
							alt="QR-Code zur Bestellseite"
							class="h-full w-full object-contain"
							onerror={() => (qrFailed = true)}
						/>
					{:else}
						<div
							class="flex h-full w-full flex-col items-center justify-center text-base-content/30 text-xs text-center"
							aria-hidden="true"
						>
							<svg class="h-8 w-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
									d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
							</svg>
							QR-Code
						</div>
					{/if}
				</div>
				<div class="text-sm text-base-content/60">
					<p class="font-semibold text-base-content/80 mb-1">QR-Code scannen</p>
					<p>Direkt zur Bestellseite von wimmelbuch-klosterneuburg.at</p>
				</div>
			</div>

			<!-- Facebook link -->
			<a
				href="https://www.facebook.com/WimmelbuchKlosterneuburg"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-outline gap-2 w-fit border-wim-brown text-wim-brown hover:bg-wim-brown hover:text-wim-cream"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
				</svg>
				Facebook
			</a>
		</div>

		<!-- Right: Contact form -->
		<div class="card bg-base-100 shadow-md">
			<div class="card-body gap-4">
				<h3 class="font-display text-xl font-bold">Bestellung & Anfragen</h3>

				{#if status === 'success'}
					<div class="alert alert-success rounded-xl">
						<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<h4 class="font-semibold">Vielen Dank für deine Bestellung!</h4>
							<p class="text-sm">Ines wird sich so schnell wie möglich bei dir melden.</p>
						</div>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="flex flex-col gap-4" novalidate>
						<!-- Honeypot field (hidden from users) -->
						<div class="hidden" aria-hidden="true">
							<label for="website">Website</label>
							<input
								id="website"
								name="website"
								type="text"
								tabindex="-1"
								autocomplete="off"
								bind:value={formData.website}
							/>
						</div>

						<div class="form-control">
							<label class="label pb-1" for="name">
								<span class="label-text font-semibold">Name <span class="text-error">*</span></span>
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								class="input input-bordered"
								placeholder="Dein Name"
								bind:value={formData.name}
							/>
						</div>

						<div class="form-control">
							<label class="label pb-1" for="email">
								<span class="label-text font-semibold">E-Mail <span class="text-error">*</span></span>
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								class="input input-bordered"
								placeholder="deine@email.at"
								bind:value={formData.email}
							/>
						</div>

						<div class="form-control">
							<label class="label pb-1" for="qty">
								<span class="label-text font-semibold">Anzahl Exemplare <span class="text-error">*</span></span>
							</label>
							<select id="qty" name="qty" class="select select-bordered" bind:value={formData.qty}>
								<option value="1">1 Exemplar – € 39</option>
								<option value="3">3 Exemplare – € 109 (Sparset)</option>
							</select>
						</div>

						<div class="form-control">
							<label class="label pb-1" for="message">
								<span class="label-text font-semibold">Nachricht <span class="text-base-content/40 font-normal">(optional)</span></span>
							</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								class="textarea textarea-bordered resize-none"
								placeholder="Lieferadresse, Widmungswunsch, Fragen ..."
								bind:value={formData.message}
							></textarea>
						</div>

						{#if status === 'error'}
							<div class="alert alert-error rounded-xl text-sm">
								<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								{errorMessage}
							</div>
						{/if}

						<button
							type="submit"
							class="btn btn-primary mt-2"
							disabled={status === 'sending'}
						>
							{#if status === 'sending'}
								<span class="loading loading-spinner loading-sm"></span>
								Wird gesendet ...
							{:else}
								Bestellung absenden
							{/if}
						</button>

						<p class="text-xs text-base-content/40 text-center">
							Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.
						</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
</SectionWrapper>
