<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';

	import { DEFAULT_TRAINER } from '$lib/data';
	import { getMode } from '$lib/utils';

	import TrainerZone from '$lib/TrainerZone.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';

	let trainer = $state({ ...DEFAULT_TRAINER });

	let currentPokemon = $state(0);
	let pokemon = $state([]);

	$effect(() => {
		console.log($state.snapshot(trainer));
	});

	$effect(() => {
		console.log($state.snapshot(currentPokemon), $state.snapshot(pokemon));
	});

	let mode = $derived(getMode(innerWidth.current));
	let displayTrainer = $state(true);
</script>

<div
	class="min-h-screen p-2 dark:bg-zinc-800 dark:text-zinc-100"
	style:font-family="'Roboto Condensed', sans-serif;"
>
	<Navbar {mode} bind:displayTrainer bind:trainer></Navbar>
	{#if displayTrainer}
		<TrainerZone bind:trainer {mode}></TrainerZone>
	{/if}
	{#if mode === 'sm'}
		<Footer bind:trainer></Footer>
	{/if}
</div>
