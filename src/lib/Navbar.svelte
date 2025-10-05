<script lang="ts">
	import { Button } from 'flowbite-svelte';

	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';

	import { getWidth } from './utils';

	let { mode, badges, displayTrainer = $bindable(), save = $bindable() } = $props();

	const width = $derived(getWidth(mode));
</script>

<nav
	class="flex justify-between px-4"
	style:width={mode === 'sm' ? '100%' : width}
	style:margin="0 auto;"
>
	<Button
		class={mode === 'sm' ? 'w-full' : ''}
		color="dark"
		onclick={() => (displayTrainer = !displayTrainer)}
		>{displayTrainer ? 'Pokémon' : 'Treinador'}</Button
	>
	{#if mode !== 'sm'}
		<div>
			<HomebrewButton {badges} {mode}></HomebrewButton>
			<ExportButton
				trainer={save.trainer}
				currentPokemon={save.currentPokemon}
				pokemonList={save.pokemonList}
			></ExportButton>
			<ImportButton
				bind:trainer={save.trainer}
				bind:currentPokemon={save.currentPokemon}
				bind:pokemonList={save.pokemonList}
			></ImportButton>
			<DeleteButton bind:save></DeleteButton>
		</div>
	{/if}
</nav>
