<script lang="ts">
	import { DEFAULT_IMAGE } from '$lib/data';

	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';
	import { getRank } from '$lib/utils';

	let trainer = $state({
		image: DEFAULT_IMAGE,
		name: '',
		concept: '',
		money: 1500,

		nature: 'Firme',
		rank: 'Zero',

		health: 0,
		confidence: 0,
		willPoints: 0,

		stats: Array.from({ length: 9 }, () => 1)
	});

	const maxHP = $derived(trainer.stats[2] + 4);
	const maxWill = $derived(trainer.stats[3] + 2);

	const statBudget = $derived(getRank(trainer.rank).statPoints);
	const socialBudget = $derived(getRank(trainer.rank).socialPoints);

	$effect(() => {
		console.log($state.snapshot(trainer));
	});
	/* {
                skills: { type: "array", minItems: 20, items: { type: "integer", minimum: 0 } },
                extraSkillNames: { type: "array", minItems: 4, items: { type: "string" } },
                dex: { type: "array", minItems: 2, items: { type: "integer", minimum: 0 } },
                badges: { type: "array", minItems: 8, items: { type: "string" } },
                potions: { type: "array", minItems: 6, items: { type: "integer", minimum: 0 } },
                bag: {
                    type: "array", minItems: 20, items: { anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }] }
                },
                achieved: { type: "array", minItems: 5, items: { type: "boolean" } },
                achievements: { type: "array", minItems: 5, items: { type: "string" } },
                notes: { type: "string" }
            } */
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
		{maxHP}
		{maxWill}
	></TrainerData>
	<TrainerStats bind:stats={trainer.stats} {statBudget} {socialBudget}></TrainerStats>
	<TrainerSkills></TrainerSkills>
	<TrainerBag></TrainerBag>
</div>
