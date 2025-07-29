<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';

	import { DEFAULT_POKEMON, DEFAULT_TRAINER } from '$lib/data';
	import { getMode } from '$lib/utils';

	import TrainerZone from '$lib/TrainerZone.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import PokemonZone from '$lib/PokemonZone.svelte';

	let trainer = $state({ ...DEFAULT_TRAINER });

	let currentPokemon = $state(0);
	let pokemonList = $state([{ ...DEFAULT_POKEMON }]);

	$effect(() => {
		console.log($state.snapshot(trainer));
	});

	$effect(() => {
		console.log($state.snapshot(currentPokemon), $state.snapshot(pokemonList));
	});

	let mode = $derived(getMode(innerWidth.current));
	let displayTrainer = $state(false);
</script>

<div
	class="min-h-screen bg-zinc-800 p-2 text-zinc-100"
	style:font-family="'Roboto Condensed', sans-serif;"
>
	<Navbar {mode} bind:displayTrainer bind:trainer bind:currentPokemon bind:pokemonList></Navbar>
	{#if displayTrainer}
		<TrainerZone bind:trainer {mode}></TrainerZone>
	{:else}
		<PokemonZone bind:currentPokemon bind:pokemonList {mode}></PokemonZone>
	{/if}
	{#if mode === 'sm'}
		<Footer bind:trainer bind:currentPokemon bind:pokemonList></Footer>
	{/if}
</div>
