<script lang="ts">
	interface Props {
		id?: string;
		class?: string;
		bg?: 'base-100' | 'base-200' | 'base-300';
		children: import('svelte').Snippet;
	}
	const { id, class: extraClass = '', bg = 'base-100', children }: Props = $props();

	const bgMap = {
		'base-100': 'bg-base-100',
		'base-200': 'bg-base-200',
		'base-300': 'bg-base-300'
	};
</script>

<section {id} class="section-padding w-full {bgMap[bg]} {extraClass}">
	<div class="mx-auto max-w-6xl">
		{@render children()}
	</div>
</section>
