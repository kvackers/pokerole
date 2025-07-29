<script lang="ts">
	import { Button } from 'flowbite-svelte';

	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';

	import { getWidth } from './utils';

	let {
		mode,
		displayTrainer = $bindable(),
		trainer = $bindable(),
		currentPokemon = $bindable(),
		pokemonList = $bindable()
	} = $props();

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
			<HomebrewButton {mode}></HomebrewButton>
			<ExportButton {trainer} {currentPokemon} {pokemonList}></ExportButton>
			<ImportButton bind:trainer bind:currentPokemon bind:pokemonList></ImportButton>
			<DeleteButton bind:trainer></DeleteButton>
		</div>
	{/if}
</nav>
