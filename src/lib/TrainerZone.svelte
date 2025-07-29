<script lang="ts">
	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';

	const { trainer = $bindable(), mode } = $props();

	const maxHP = $derived(trainer.stats[2] + 4);
	const maxWill = $derived(trainer.stats[3] + 2);
	const maxConfidence = $derived(trainer.stats[4] + 4);
</script>

{#if mode === 'xl'}
	<div class="flex" style:width="1280px" style:margin="0 auto">
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
		<TrainerStats bind:stats={trainer.stats}></TrainerStats>
		<TrainerSkills bind:skills={trainer.skills} bind:extraSkills={trainer.extraSkills}
		></TrainerSkills>
		<TrainerBag
			bind:badges={trainer.badges}
			bind:potions={trainer.potions}
			bind:bag={trainer.bag}
			bind:notes={trainer.notes}
		></TrainerBag>
	</div>
{:else if mode === 'lg'}
	<div class="flex" style:width="960px" style:margin="0 auto">
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
			<TrainerStats bind:stats={trainer.stats}></TrainerStats>
			<TrainerBag
				bind:badges={trainer.badges}
				bind:potions={trainer.potions}
				bind:bag={trainer.bag}
				bind:notes={trainer.notes}
			></TrainerBag>
		</div>
		<TrainerSkills bind:skills={trainer.skills} bind:extraSkills={trainer.extraSkills}
		></TrainerSkills>
	</div>
{:else if mode === 'md'}
	<div class="flex" style:width="640px" style:margin="0 auto">
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
			<TrainerStats bind:stats={trainer.stats}></TrainerStats>
			<TrainerSkills bind:skills={trainer.skills} bind:extraSkills={trainer.extraSkills}
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
		bind:health={trainer.health}
		bind:confidence={trainer.confidence}
		bind:willPoints={trainer.willPoints}
		{maxHP}
		{maxWill}
		{maxConfidence}
	></TrainerData>
	<TrainerStats bind:stats={trainer.stats}></TrainerStats>
	<TrainerSkills bind:skills={trainer.skills} bind:extraSkills={trainer.extraSkills}
	></TrainerSkills>
	<TrainerBag
		bind:badges={trainer.badges}
		bind:potions={trainer.potions}
		bind:bag={trainer.bag}
		bind:notes={trainer.notes}
	></TrainerBag>
{/if}
