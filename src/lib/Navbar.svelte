<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';
	import { getWidth } from './utils';

	let { mode, trainer = $bindable() } = $props();

	const width = $derived(getWidth(mode));
</script>

<nav class="flex justify-between px-4" style:width style:margin="0 auto;">
	<button>Pokémon</button>
	{#if mode !== 'sm'}
		<div>
			<HomebrewButton {mode}></HomebrewButton>
			<ExportButton {mode} {trainer}></ExportButton>
			<ImportButton {mode} {trainer}></ImportButton>
			<DeleteButton bind:trainer></DeleteButton>
		</div>
	{/if}
</nav>
