<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';

	import { DEFAULT_SAVE } from '$lib/data';
	import { getMode, clone } from '$lib/utils';

	import TrainerZone from '$lib/TrainerZone.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import PokemonZone from '$lib/PokemonZone.svelte';
	import { tryLoadSave } from '$lib/save';

	let save = $state(tryLoadSave(clone(DEFAULT_SAVE)));

	let trainer = $derived(save.trainer);
	let currentPokemon = $derived(save.currentPokemon);
	let pokemonList = $derived(save.pokemonList);

	$effect(() => {
		localStorage.setItem('database', JSON.stringify(save, null, 2));
	});

	let mode = $derived(getMode(innerWidth.current));
	let displayTrainer = $state(true);
</script>

<div
	class="min-h-screen bg-zinc-800 p-2 text-zinc-100"
	style:font-family="'Roboto Condensed', sans-serif;"
>
	<Navbar {mode} bind:displayTrainer bind:save></Navbar>
	{#if displayTrainer}
		<TrainerZone bind:trainer {mode}></TrainerZone>
	{:else}
		<PokemonZone bind:currentPokemon bind:pokemonList {mode}></PokemonZone>
	{/if}
	{#if mode === 'sm'}
		<Footer bind:save></Footer>
	{/if}
</div>
