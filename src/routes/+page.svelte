<script lang="ts">
	import { DEFAULT_TRAINER } from '$lib/data';
	import TrainerZone from '$lib/TrainerZone.svelte';

	let trainer = $state({ ...DEFAULT_TRAINER });
	$effect(() => {
		console.log($state.snapshot(trainer));
	});
</script>

<div
	class="flex min-h-screen p-2 dark:bg-zinc-800 dark:text-zinc-100"
	style="font-family: 'Roboto Condensed', sans-serif;"
>
	<TrainerZone bind:trainer></TrainerZone>
</div>
