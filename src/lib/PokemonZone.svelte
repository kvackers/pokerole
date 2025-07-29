<script lang="ts">
	import PokemonData from './PokemonData.svelte';
	import PokemonSkills from './PokemonSkills.svelte';
	import PokemonStats from './PokemonStats.svelte';

	const { mode, currentPokemon = $bindable(), pokemonList = $bindable() } = $props();

	const pokemon = $derived(pokemonList[currentPokemon]);
</script>

<div class="flex" style:margin="0 auto">
	<PokemonData
		bind:image={pokemon.image}
		bind:name={pokemon.name}
		bind:ability={pokemon.ability}
		bind:species={pokemon.species}
		bind:health={pokemon.health}
		bind:confidence={pokemon.confidence}
		bind:willPoints={pokemon.willPoints}
		bind:types={pokemon.types}
		bind:evoTime={pokemon.evoTime}
		bind:wins={pokemon.wins}
		bind:training={pokemon.training}
		bind:happiness={pokemon.happiness}
		bind:loyalty={pokemon.loyalty}
	></PokemonData>
	<PokemonStats bind:stats={pokemon.stats}></PokemonStats>
	<PokemonSkills bind:skills={pokemon.skills} bind:extraSkills={pokemon.extraSkills}
	></PokemonSkills>
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
