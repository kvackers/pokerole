<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';

	let { trainer = $bindable(), currentPokemon = $bindable(), pokemonList = $bindable() } = $props();
</script>

<HomebrewButton full mode="sm"></HomebrewButton>
<ExportButton full {trainer} {currentPokemon} {pokemonList}></ExportButton>
<ImportButton full mode="sm" {trainer}></ImportButton>
<DeleteButton full bind:trainer></DeleteButton>
