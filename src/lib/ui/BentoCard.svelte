<script lang="ts">
	interface Props {
		class?: string;
		children: import('svelte').Snippet;
	}
	const { class: extraClass = '', children }: Props = $props();
</script>

<div
	class="rounded-bento bg-base-200 p-6 shadow-sm transition-all duration-200
	       hover:-translate-y-1 hover:shadow-md {extraClass}"
>
	{@render children()}
</div>
