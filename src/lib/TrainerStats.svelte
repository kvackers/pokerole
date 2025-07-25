<script lang="ts">
	const { stats = $bindable(), statBudget, socialBudget } = $props();

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

	let spentStat = $derived(stats.slice(0, 4).reduce((acc: number, e: number) => acc + e) - 4);
	let spentSocial = $derived(stats.slice(4).reduce((acc: number, e: number) => acc + e) - 5);
</script>

<div class="flex w-[360px] flex-col p-2">
	<div
		class="rounded-t-lg border border-b-0 border-solid border-zinc-950 px-4 py-2 dark:border-zinc-50"
	>
		Atributos
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-solid border-zinc-950 p-2 dark:border-zinc-50"
	>
		<p class="mt-0 mb-2 ml-1">Pontos a gastar: {statBudget - spentStat}</p>
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

		<p class="mt-0 mb-2 ml-1">Pontos a gastar: {socialBudget - spentSocial}</p>
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
