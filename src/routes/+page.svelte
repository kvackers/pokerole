<script lang="ts">
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';
</script>

<div
	class="flex min-h-screen p-2 dark:bg-zinc-800 dark:text-zinc-100"
	style="font-family: 'Roboto Condensed', sans-serif;"
>
	<TrainerData></TrainerData>
	<TrainerStats></TrainerStats>
</div>
