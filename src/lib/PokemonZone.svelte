<script lang="ts">
	import { DEX } from './data';
	import PokemonAttacks from './PokemonAttacks.svelte';
	import PokemonData from './PokemonData.svelte';
	import PokemonMisc from './PokemonMisc.svelte';
	import PokemonSelect from './PokemonSelect.svelte';
	import PokemonSkills from './PokemonSkills.svelte';
	import PokemonStats from './PokemonStats.svelte';
	import { getWidth } from './utils';

	let { mode, currentPokemon = $bindable(), pokemonList = $bindable() } = $props();

	const pokemon = $derived(pokemonList[currentPokemon]);

	const changeSpecies = (e: any) => {
		const newSpecies = e.target.value;
		const dexEntry = DEX[newSpecies];
		if (dexEntry === undefined) {
			return;
		}

		pokemon.evoTime = dexEntry.evoTime;
		pokemon.types = dexEntry.types;

		pokemon.stats.splice(
			0,
			5,
			dexEntry.baseSTR,
			dexEntry.baseDEX,
			dexEntry.baseVIT,
			dexEntry.baseINS,
			dexEntry.baseSPC
		);
	};

	const dexEntry = $derived(DEX[pokemon.species]);

	const maxHP = $derived(pokemon.stats[2] + dexEntry.baseHP);
	const maxWill = $derived(pokemon.stats[3] + 2);
	const maxConfidence = $derived(pokemon.stats[4] + 4);

	const initiative = $derived(`1d6 + ${pokemon.stats[1]}`);
	const dodge = $derived(pokemon.stats[1] + pokemon.skills[3]);
	const clash = $derived(
		`${pokemon.stats[0] + pokemon.skills[2]} / ${pokemon.stats[4] + pokemon.skills[2]}`
	);
	const defenses = $derived(`${pokemon.stats[2]} / ${pokemon.stats[3]}`);

	const width = $derived(getWidth(mode));
</script>

<PokemonSelect {mode} bind:currentPokemon bind:pokemonList></PokemonSelect>
{#if mode === 'xl'}
	<div class="flex" style:width style:margin="0 auto">
		<PokemonData
			bind:image={pokemon.image}
			bind:name={pokemon.name}
			bind:ability={pokemon.ability}
			bind:species={pokemon.species}
			bind:health={pokemon.health}
			bind:confidence={pokemon.confidence}
			bind:willPoints={pokemon.willPoints}
			bind:types={pokemon.types}
			bind:teratype={pokemon.teratype}
			bind:evoTime={pokemon.evoTime}
			bind:wins={pokemon.wins}
			bind:training={pokemon.training}
			bind:happiness={pokemon.happiness}
			bind:loyalty={pokemon.loyalty}
			{maxHP}
			{maxWill}
			{maxConfidence}
			{changeSpecies}
		></PokemonData>
		<div class="flex flex-col">
			<PokemonStats bind:stats={pokemon.stats} {dexEntry}></PokemonStats>
			<PokemonMisc
				bind:item={pokemon.item}
				bind:accessory={pokemon.accessory}
				bind:ribbons={pokemon.ribbons}
				bind:status={pokemon.status}
				bind:notes={pokemon.notes}
				{initiative}
				{dodge}
				{clash}
				{defenses}
				types={pokemon.types}
			></PokemonMisc>
		</div>
		<PokemonSkills bind:skills={pokemon.skills} bind:extraSkills={pokemon.extraSkills}
		></PokemonSkills>
		<PokemonAttacks bind:attacks={pokemon.attacks}></PokemonAttacks>
	</div>
{:else if mode === 'lg'}
	<div class="flex" style:width style:margin="0 auto">
		<PokemonData
			bind:image={pokemon.image}
			bind:name={pokemon.name}
			bind:ability={pokemon.ability}
			bind:species={pokemon.species}
			bind:health={pokemon.health}
			bind:confidence={pokemon.confidence}
			bind:willPoints={pokemon.willPoints}
			bind:types={pokemon.types}
			bind:teratype={pokemon.teratype}
			bind:evoTime={pokemon.evoTime}
			bind:wins={pokemon.wins}
			bind:training={pokemon.training}
			bind:happiness={pokemon.happiness}
			bind:loyalty={pokemon.loyalty}
			{maxHP}
			{maxWill}
			{maxConfidence}
			{changeSpecies}
		></PokemonData>
		<div class="flex flex-col">
			<PokemonStats bind:stats={pokemon.stats} {dexEntry}></PokemonStats>
			<PokemonSkills bind:skills={pokemon.skills} bind:extraSkills={pokemon.extraSkills}
			></PokemonSkills>
			<PokemonMisc
				bind:item={pokemon.item}
				bind:accessory={pokemon.accessory}
				bind:ribbons={pokemon.ribbons}
				bind:status={pokemon.status}
				bind:notes={pokemon.notes}
				{initiative}
				{dodge}
				{clash}
				{defenses}
				types={pokemon.types}
			></PokemonMisc>
		</div>
		<PokemonAttacks bind:attacks={pokemon.attacks}></PokemonAttacks>
	</div>
{:else if mode === 'md'}
	<div class="flex" style:width style:margin="0 auto">
		<div class="flex flex-col">
			<PokemonData
				bind:image={pokemon.image}
				bind:name={pokemon.name}
				bind:ability={pokemon.ability}
				bind:species={pokemon.species}
				bind:health={pokemon.health}
				bind:confidence={pokemon.confidence}
				bind:willPoints={pokemon.willPoints}
				bind:types={pokemon.types}
				bind:teratype={pokemon.teratype}
				bind:evoTime={pokemon.evoTime}
				bind:wins={pokemon.wins}
				bind:training={pokemon.training}
				bind:happiness={pokemon.happiness}
				bind:loyalty={pokemon.loyalty}
				{maxHP}
				{maxWill}
				{maxConfidence}
				{changeSpecies}
			></PokemonData>
			<PokemonMisc
				bind:item={pokemon.item}
				bind:accessory={pokemon.accessory}
				bind:ribbons={pokemon.ribbons}
				bind:status={pokemon.status}
				bind:notes={pokemon.notes}
				{initiative}
				{dodge}
				{clash}
				{defenses}
				types={pokemon.types}
			></PokemonMisc>
			<PokemonAttacks bind:attacks={pokemon.attacks}></PokemonAttacks>
		</div>
		<div class="flex flex-col">
			<PokemonStats bind:stats={pokemon.stats} {dexEntry}></PokemonStats>
			<PokemonSkills bind:skills={pokemon.skills} bind:extraSkills={pokemon.extraSkills}
			></PokemonSkills>
		</div>
	</div>
{:else}
	<PokemonData
		bind:image={pokemon.image}
		bind:name={pokemon.name}
		bind:ability={pokemon.ability}
		bind:species={pokemon.species}
		bind:health={pokemon.health}
		bind:confidence={pokemon.confidence}
		bind:willPoints={pokemon.willPoints}
		bind:types={pokemon.types}
		bind:teratype={pokemon.teratype}
		bind:evoTime={pokemon.evoTime}
		bind:wins={pokemon.wins}
		bind:training={pokemon.training}
		bind:happiness={pokemon.happiness}
		bind:loyalty={pokemon.loyalty}
		{maxHP}
		{maxWill}
		{maxConfidence}
		{changeSpecies}
	></PokemonData>
	<PokemonStats bind:stats={pokemon.stats} {dexEntry}></PokemonStats>
	<PokemonMisc
		bind:item={pokemon.item}
		bind:accessory={pokemon.accessory}
		bind:ribbons={pokemon.ribbons}
		bind:status={pokemon.status}
		bind:notes={pokemon.notes}
		{initiative}
		{dodge}
		{clash}
		{defenses}
		types={pokemon.types}
	></PokemonMisc>
	<PokemonSkills bind:skills={pokemon.skills} bind:extraSkills={pokemon.extraSkills}
	></PokemonSkills>
	<PokemonAttacks bind:attacks={pokemon.attacks}></PokemonAttacks>
{/if}
