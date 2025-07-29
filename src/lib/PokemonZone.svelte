<script lang="ts">
	import PokemonData from './PokemonData.svelte';

	const { mode, currentPokemon = $bindable(), pokemonList = $bindable() } = $props();

	const pokemon = $derived(pokemonList[currentPokemon]);
</script>

<div class="flex" style:margin="0 auto">
	<PokemonData
		image={pokemon.image}
		name={pokemon.name}
		ability={pokemon.ability}
		species={pokemon.species}
		health={pokemon.health}
		confidence={pokemon.confidence}
		willPoints={pokemon.willPoints}
		types={pokemon.types}
		evoTime={pokemon.evoTime}
		wins={pokemon.wins}
		training={pokemon.training}
		happiness={pokemon.happiness}
		loyalty={pokemon.loyalty}
	></PokemonData>
</div>

<!-- {#if mode === 'xl'}
	<div class="flex" style:width="1280px" style:margin="0 auto">
		<PokemonData image={pokemon.image}></PokemonData>
	</div>
{:else if mode === 'lg'}
	<div class="flex" style:width="960px" style:margin="0 auto">
		<PokemonData image={pokemon.image}></PokemonData>
	</div>
{:else if mode === 'md'}
	<div class="flex" style:width="640px" style:margin="0 auto">
		<PokemonData image={pokemon.image}></PokemonData>
	</div>
{:else}
	<PokemonData image={pokemon.image}></PokemonData>
{/if} -->
