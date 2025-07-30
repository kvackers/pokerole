<script lang="ts">
	import AddPokemonButton from './AddPokemonButton.svelte';
	import DeletePokemonButton from './DeletePokemonButton.svelte';
	import { capitalize, getWidth } from './utils';

	let { mode, currentPokemon = $bindable(), pokemonList = $bindable() } = $props();

	const width = $derived(getWidth(mode));
</script>

{#if mode !== 'sm' && mode !== 'md'}
	<div class="flex justify-between px-4 pt-2" style:width style:margin="0 auto">
		<select
			class="w-xl rounded-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			bind:value={currentPokemon}
		>
			{#each pokemonList as { name, species }, index (name + species + index)}
				<option value={index}>{name.length === 0 ? '???' : name} - {capitalize(species)}</option>
			{/each}
		</select>
		<div>
			<AddPokemonButton bind:currentPokemon bind:pokemonList></AddPokemonButton>
			<DeletePokemonButton bind:currentPokemon bind:pokemonList></DeletePokemonButton>
		</div>
	</div>
{:else}
	<div class="w-[360px] px-4 py-2">
		<select
			class="w-xl rounded-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			style:width="100%"
			style:margin="0 auto"
			bind:value={currentPokemon}
		>
			{#each pokemonList as { name, species }, index (name + species + index)}
				<option value={index}>{name.length === 0 ? '???' : name} - {capitalize(species)}</option>
			{/each}
		</select>
	</div>
	<div class="flex px-4">
		<AddPokemonButton full bind:currentPokemon bind:pokemonList></AddPokemonButton>
		<DeletePokemonButton full bind:currentPokemon bind:pokemonList></DeletePokemonButton>
	</div>
{/if}
