<script lang="ts">
	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';
	import { getRank, getAge } from '$lib/utils';

	const { trainer = $bindable() } = $props();

	const maxHP = $derived(trainer.stats[2] + 4);
	const maxWill = $derived(trainer.stats[3] + 2);

	const statBudget = $derived(getAge(trainer.age).statPoints + getRank(trainer.rank).statPoints);
	const socialBudget = $derived(
		getAge(trainer.age).socialPoints + getRank(trainer.rank).socialPoints
	);

	const skillBudget = $derived(getRank(trainer.rank).skillPoints);
	const skillCeiling = $derived(getRank(trainer.rank).skillCeiling);
</script>

<div
	class="flex min-h-screen p-2 dark:bg-zinc-800 dark:text-zinc-100"
	style="font-family: 'Roboto Condensed', sans-serif;"
>
	<TrainerData
		bind:image={trainer.image}
		bind:name={trainer.name}
		bind:concept={trainer.concept}
		bind:money={trainer.money}
		bind:nature={trainer.nature}
		bind:rank={trainer.rank}
		bind:health={trainer.health}
		bind:confidence={trainer.confidence}
		bind:willPoints={trainer.willPoints}
		bind:age={trainer.age}
		{maxHP}
		{maxWill}
	></TrainerData>
	<TrainerStats bind:stats={trainer.stats} {statBudget} {socialBudget}></TrainerStats>
	<TrainerSkills
		bind:skills={trainer.skills}
		bind:extraSkills={trainer.extraSkills}
		{skillBudget}
		{skillCeiling}
	></TrainerSkills>
	<TrainerBag
		bind:dex={trainer.dex}
		bind:badges={trainer.badges}
		bind:potions={trainer.potions}
		bind:bag={trainer.bag}
		bind:achievements={trainer.achievements}
		bind:notes={trainer.notes}
	></TrainerBag>
</div>
