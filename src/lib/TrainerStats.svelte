<script lang="ts">
	import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons';

	const { stats = $bindable() } = $props();

	const statNames = [
		'Força',
		'Destreza',
		'Vitalidade',
		'Intuição',
		'Durão',
		'Maneiro',
		'Lindo',
		'Esperto',
		'Fofo'
	];

	let hidden = $state(false);
</script>

<div class="flex w-[360px] flex-col p-2">
	<div
		class="flex justify-between rounded-t-lg border border-solid border-zinc-950 px-4 py-2 dark:border-zinc-50"
	>
		<span>Atributos</span>
		{#if hidden}
			<button onclick={() => (hidden = false)}><AngleDownOutline></AngleDownOutline></button>
		{:else}
			<button onclick={() => (hidden = true)}><AngleUpOutline></AngleUpOutline></button>
		{/if}
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-t-0 border-solid border-zinc-950 p-2 dark:border-zinc-50"
		style:display={hidden ? 'none' : 'block'}
	>
		{#each statNames.slice(0, 4) as stat, index}
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>{stat}</span
				>
				<input
					type="number"
					bind:value={stats[index]}
					class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				/>
				<span
					class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>/ 5
				</span>
			</div>
		{/each}

		<hr class="my-3" />

		{#each statNames.slice(4) as stat, index}
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>{stat}</span
				>
				<input
					type="number"
					bind:value={stats[4 + index]}
					class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				/>
				<span
					class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>/ 5
				</span>
			</div>
		{/each}
	</div>
</div>
