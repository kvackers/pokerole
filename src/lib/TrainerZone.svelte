<script lang="ts">
	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';
	import { getRank, getAge } from '$lib/utils';

	const { trainer = $bindable(), mode } = $props();

	const maxHP = $derived(trainer.stats[2] + 4);
	const maxWill = $derived(trainer.stats[3] + 2);

	const statBudget = $derived(getAge(trainer.age).statPoints + getRank(trainer.rank).statPoints);
	const socialBudget = $derived(
		getAge(trainer.age).socialPoints + getRank(trainer.rank).socialPoints
	);

	const skillBudget = $derived(getRank(trainer.rank).skillPoints);
	const skillCeiling = $derived(getRank(trainer.rank).skillCeiling);
</script>

{#if mode === 'xl'}
	<div class="flex">
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
{:else if mode === 'lg'}
	<div class="flex">
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
		<div class="flex flex-col">
			<TrainerStats bind:stats={trainer.stats} {statBudget} {socialBudget}></TrainerStats>
			<TrainerBag
				bind:dex={trainer.dex}
				bind:badges={trainer.badges}
				bind:potions={trainer.potions}
				bind:bag={trainer.bag}
				bind:achievements={trainer.achievements}
				bind:notes={trainer.notes}
			></TrainerBag>
		</div>
		<TrainerSkills
			bind:skills={trainer.skills}
			bind:extraSkills={trainer.extraSkills}
			{skillBudget}
			{skillCeiling}
		></TrainerSkills>
	</div>
{:else if mode === 'md'}
	<div class="flex">
		<div class="flex flex-col">
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
			<TrainerBag
				bind:dex={trainer.dex}
				bind:badges={trainer.badges}
				bind:potions={trainer.potions}
				bind:bag={trainer.bag}
				bind:achievements={trainer.achievements}
				bind:notes={trainer.notes}
			></TrainerBag>
		</div>
		<div class="flex flex-col">
			<TrainerStats bind:stats={trainer.stats} {statBudget} {socialBudget}></TrainerStats>
			<TrainerSkills
				bind:skills={trainer.skills}
				bind:extraSkills={trainer.extraSkills}
				{skillBudget}
				{skillCeiling}
			></TrainerSkills>
		</div>
	</div>
{:else}
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
{/if}
