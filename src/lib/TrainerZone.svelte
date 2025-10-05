<script lang="ts">
	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';
	import { RANKS } from './data';
	import { getWidth } from './utils';

	const { trainer = $bindable(), mode } = $props();

	const rank = $derived(
		typeof trainer.badges !== 'number'
			? RANKS[0]
			: RANKS[
					trainer.badges >= 0 && trainer.badges < RANKS.length ? trainer.badges : RANKS.length - 1
				]
	);

	const maxHP = $derived(trainer.stats[2] + 4);
	const maxWill = $derived(trainer.stats[3] + 2);
	const maxConfidence = $derived(trainer.stats[4] + 4 + rank.numberMoves);

	const statPoints = $derived(rank.attributesTotal);
	const socialPoints = $derived(rank.socialTotal);

	const skillPoints = $derived(rank.skillPointsTotal);
	const skillLimit = $derived(rank.skillLimit);

	const width = $derived(getWidth(mode));
</script>

{#if mode === 'xl'}
	<div class="flex" style:width style:margin="0 auto">
		<TrainerData
			bind:image={trainer.image}
			bind:name={trainer.name}
			bind:concept={trainer.concept}
			bind:money={trainer.money}
			bind:nature={trainer.nature}
			bind:health={trainer.health}
			bind:confidence={trainer.confidence}
			bind:willPoints={trainer.willPoints}
			{maxHP}
			{maxWill}
			{maxConfidence}
		></TrainerData>
		<TrainerStats bind:stats={trainer.stats} {statPoints} {socialPoints}></TrainerStats>
		{statPoints}
		{socialPoints}
		<TrainerSkills
			bind:skills={trainer.skills}
			bind:extraSkills={trainer.extraSkills}
			{skillPoints}
			{skillLimit}
		></TrainerSkills>
		<TrainerBag
			bind:badges={trainer.badges}
			bind:potions={trainer.potions}
			bind:bag={trainer.bag}
			bind:notes={trainer.notes}
		></TrainerBag>
	</div>
{:else if mode === 'lg'}
	<div class="flex" style:width style:margin="0 auto">
		<TrainerData
			bind:image={trainer.image}
			bind:name={trainer.name}
			bind:concept={trainer.concept}
			bind:money={trainer.money}
			bind:nature={trainer.nature}
			bind:health={trainer.health}
			bind:confidence={trainer.confidence}
			bind:willPoints={trainer.willPoints}
			{maxHP}
			{maxWill}
			{maxConfidence}
		></TrainerData>
		<div class="flex flex-col">
			<TrainerStats bind:stats={trainer.stats} {statPoints} {socialPoints}></TrainerStats>
			<TrainerBag
				bind:badges={trainer.badges}
				bind:potions={trainer.potions}
				bind:bag={trainer.bag}
				bind:notes={trainer.notes}
			></TrainerBag>
		</div>
		<TrainerSkills
			bind:skills={trainer.skills}
			bind:extraSkills={trainer.extraSkills}
			{skillPoints}
			{skillLimit}
		></TrainerSkills>
	</div>
{:else if mode === 'md'}
	<div class="flex" style:width style:margin="0 auto">
		<div class="flex flex-col">
			<TrainerData
				bind:image={trainer.image}
				bind:name={trainer.name}
				bind:concept={trainer.concept}
				bind:money={trainer.money}
				bind:nature={trainer.nature}
				bind:health={trainer.health}
				bind:confidence={trainer.confidence}
				bind:willPoints={trainer.willPoints}
				{maxHP}
				{maxWill}
				{maxConfidence}
			></TrainerData>
			<TrainerBag
				bind:badges={trainer.badges}
				bind:potions={trainer.potions}
				bind:bag={trainer.bag}
				bind:notes={trainer.notes}
			></TrainerBag>
		</div>
		<div class="flex flex-col">
			<TrainerStats bind:stats={trainer.stats} {statPoints} {socialPoints}></TrainerStats>
			<TrainerSkills
				bind:skills={trainer.skills}
				bind:extraSkills={trainer.extraSkills}
				{skillPoints}
				{skillLimit}
			></TrainerSkills>
		</div>
	</div>
{:else}
	<div style:width style:margin="0 auto">
		<TrainerData
			bind:image={trainer.image}
			bind:name={trainer.name}
			bind:concept={trainer.concept}
			bind:money={trainer.money}
			bind:nature={trainer.nature}
			bind:health={trainer.health}
			bind:confidence={trainer.confidence}
			bind:willPoints={trainer.willPoints}
			{maxHP}
			{maxWill}
			{maxConfidence}
		></TrainerData>
		<TrainerStats bind:stats={trainer.stats} {statPoints} {socialPoints}></TrainerStats>
		<TrainerSkills
			bind:skills={trainer.skills}
			bind:extraSkills={trainer.extraSkills}
			{skillPoints}
			{skillLimit}
		></TrainerSkills>
		<TrainerBag
			bind:badges={trainer.badges}
			bind:potions={trainer.potions}
			bind:bag={trainer.bag}
			bind:notes={trainer.notes}
		></TrainerBag>
	</div>
{/if}
