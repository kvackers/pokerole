<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';

	let { save = $bindable() } = $props();
</script>

<HomebrewButton full mode="sm"></HomebrewButton>
<ExportButton
	full
	trainer={save.trainer}
	currentPokemon={save.currentPokemon}
	pokemonList={save.pokemonList}
></ExportButton>
<ImportButton
	full
	bind:trainer={save.trainer}
	bind:currentPokemon={save.currentPokemon}
	bind:pokemonList={save.pokemonList}
></ImportButton>
<DeleteButton full bind:save></DeleteButton>
