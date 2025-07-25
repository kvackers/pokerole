<script lang="ts">
	import { DEFAULT_IMAGE } from '$lib/data';

	import TrainerBag from '$lib/TrainerBag.svelte';
	import TrainerData from '$lib/TrainerData.svelte';
	import TrainerSkills from '$lib/TrainerSkills.svelte';
	import TrainerStats from '$lib/TrainerStats.svelte';

	let trainer = $state({
		image: DEFAULT_IMAGE,
		name: '',
		concept: '',
		money: 1500,

		nature: 'Firme',
		rank: 'Zero',

		health: 0,
		confidence: 0,
		willPoints: 0
	});

	$effect(() => {
		console.log($state.snapshot(trainer));
	});
	/* {
                health: { type: "integer", minimum: 0 },
                nature: { type: "string" },
                rank: { type: "string" },
                confidence: { type: "integer", minimum: 0 },
                willPoints: { type: "integer", minimum: 0 },
                stats: { type: "array", minItems: 9, items: { type: "integer", minimum: 1 } },
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
	></TrainerData>
	<TrainerStats></TrainerStats>
	<TrainerSkills></TrainerSkills>
	<TrainerBag></TrainerBag>
</div>
