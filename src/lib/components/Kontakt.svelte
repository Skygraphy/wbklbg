<script lang="ts">
	import SectionWrapper from '$lib/ui/SectionWrapper.svelte';
	import { contactPrefill } from '$lib/stores/contact-prefill';

	const QTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

	type Status = 'idle' | 'sending' | 'success' | 'error';

	const { contactEmail = 'kontakt@wimmelbuch-klosterneuburg.at', contactIsbn = '' }: {
		contactEmail?: string;
		contactIsbn?: string;
	} = $props();

	let status = $state<Status>('idle');
	let errorMessage = $state('');
	let formData = $state({
		name: '',
		email: '',
		subject: '',
		qty: '',
		message: '',
		website: ''
	});

	$effect(() => {
		const prefill = $contactPrefill;
		if (prefill) {
			formData.subject = prefill.subject;
			formData.qty = prefill.qty;
			formData.message = prefill.message;
			contactPrefill.set(null);
		}
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
					subject: formData.subject,
					qty: formData.qty,
					message: formData.message
				})
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.message ?? 'Ein Fehler ist aufgetreten.');
			}

			status = 'success';
			formData = { name: '', email: '', subject: '', qty: '', message: '', website: '' };
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.';
		}
	}
</script>

<SectionWrapper id="kontakt" bg="base-200">
	<div class="mb-12 text-center">
		<h2 class="section-heading">Kontakt & Bestellung – Oder einfach so!</h2>
		<p class="section-subheading">Ich freue mich auf deine Nachricht!</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2">
		<!-- Left: Contact info -->
		<div class="flex flex-col gap-6">
			<div>
				<h3 class="font-display text-2xl font-bold text-wim-brown">Ines Wohlmuth</h3>
				<p class="text-base-content/60 text-sm mt-1">Autorin des Wimmelbuch Klosterneuburg</p>
			</div>

			<div class="space-y-4">
				<a
					href="mailto:{contactEmail}"
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
						<div class="text-base-content/60">{contactEmail}</div>
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
						<div class="text-base-content/60">{contactIsbn || 'Folgt bei Veröffentlichung'}</div>
					</div>
				</div>
			</div>

			<!-- Social buttons -->
			<div class="flex flex-wrap gap-3">
				<a
					href="https://www.instagram.com/wimmelbuch_klosterneuburg"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline gap-2 w-fit border-wim-brown text-wim-brown opacity-40"
					aria-disabled="true"
					tabindex="-1"
					onclick={(e) => e.preventDefault()}
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
					</svg>
					Instagram
				</a>
				<a
					href="https://www.facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline gap-2 w-fit border-wim-brown text-wim-brown opacity-40"
					aria-disabled="true"
					tabindex="-1"
					onclick={(e) => e.preventDefault()}
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
					Facebook
				</a>
			</div>
		</div>

		<!-- Right: Contact form -->
		<div class="card bg-base-100 shadow-md">
			<div class="card-body gap-4">
				<h3 class="font-display text-xl font-bold">Bestellung & Anfragen</h3>

				{#if status === 'success'}
					<div class="flex flex-col gap-4">
						<div class="alert alert-success rounded-xl">
							<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<h4 class="font-semibold">Vielen Dank für deine Bestellung!</h4>
								<p class="text-sm">Ines wird sich so schnell wie möglich bei dir melden.</p>
							</div>
						</div>
						<button
							type="button"
							class="text-sm text-primary hover:underline self-start"
							onclick={() => (status = 'idle')}
						>
							Weitere Anfrage stellen
						</button>
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
							<label class="label pb-1" for="subject">
								<span class="label-text font-semibold">Betreff <span class="text-error">*</span></span>
							</label>
							<select id="subject" name="subject" class="select select-bordered" required bind:value={formData.subject}>
								<option value="" disabled>– bitte wählen –</option>
								<option value="Anfrage">Anfrage</option>
								<option value="Reservierung">Reservierung</option>
								<option value="Bestellung">Bestellung</option>
								<option value="Anderes">Anderes</option>
							</select>
						</div>

						<div class="form-control">
							<label class="label pb-1" for="qty">
								<span class="label-text font-semibold">Anzahl Exemplare <span class="text-base-content/40 font-normal">(optional)</span></span>
							</label>
							<select id="qty" name="qty" class="select select-bordered" bind:value={formData.qty}>
								<option value="">– bitte wählen –</option>
								{#each QTY_OPTIONS as n}
									<option value={String(n)}>{n} {n === 1 ? 'Exemplar' : 'Exemplare'}</option>
								{/each}
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
								Absenden
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
