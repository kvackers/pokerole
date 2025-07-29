<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';

	import { DEFAULT_TRAINER } from '$lib/data';
	import { getMode } from '$lib/utils';

	import TrainerZone from '$lib/TrainerZone.svelte';
	import Navbar from '$lib/Navbar.svelte';

	let trainer = $state({ ...DEFAULT_TRAINER });
	$effect(() => {
		console.log($state.snapshot(trainer));
	});

	let mode = $derived(getMode(innerWidth.current));
</script>

<div
	class="min-h-screen p-2 dark:bg-zinc-800 dark:text-zinc-100"
	style:font-family="'Roboto Condensed', sans-serif;"
>
	<Navbar {mode} {trainer}></Navbar>
	<TrainerZone bind:trainer {mode}></TrainerZone>
</div>
