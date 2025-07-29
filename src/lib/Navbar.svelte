<script lang="ts">
	import HomebrewButton from './HomebrewButton.svelte';
	import { getWidth } from './utils';

	const { mode, trainer = $bindable() } = $props();

	const width = $derived(getWidth(mode));
</script>

<nav class="flex justify-between px-4" style:width style:margin="0 auto;">
	<button>Pokémon</button>
	{#if mode !== 'sm'}
		<div>
			<HomebrewButton {mode}></HomebrewButton>
			<button>Exportar Save</button>
			<button>Importar Save</button>
		</div>
	{/if}
</nav>
