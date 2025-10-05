<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { AngleDownOutline, AngleUpOutline, CirclePlusSolid } from 'flowbite-svelte-icons';

	let { skills = $bindable(), extraSkills = $bindable(), skillPoints, skillLimit } = $props();

	const skillNames = [
		'Luta',
		'Canalizar',
		'Revidar',
		'Esquiva',
		'Alerta',
		'Atletismo',
		'Natureza',
		'Furtivo',
		'Charme',
		'Etiqueta',
		'Intimidar',
		'Performar'
	];

	const trimExtra = (event: any) => {
		const input: string = event.target.value;
		if (input.trim().length === 0) {
			extraSkills = extraSkills.filter((e: any) => e.name.trim().length > 0);
		}
	};

	const skillTotal = $derived(
		(skills as Array<number>).reduce((a, e) => a + e) +
			extraSkills
				.map(({ value }: { value: number }) => value)
				.reduce((a: number, e: number) => a + e, 0)
	);

	let hidden = $state(false);
</script>

<div class="flex flex-col p-2">
	<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
		<span>Perícias</span>
		{#if hidden}
			<button onclick={() => (hidden = false)}><AngleDownOutline></AngleDownOutline></button>
		{:else}
			<button onclick={() => (hidden = true)}><AngleUpOutline></AngleUpOutline></button>
		{/if}
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-t-0 border-solid border-zinc-50 p-2"
		style:display={hidden ? 'none' : 'block'}
	>
		<p class="mb-2 pl-1 text-sm">Aumentos feitos: {skillTotal} / {skillPoints}</p>
		{#each skillNames as skill, index}
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>{skill}</span
				>
				<input
					type="number"
					bind:value={skills[index]}
					class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
				<span
					class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
					>/ {skillLimit}
				</span>
			</div>
			{#if index % 4 === 3}
				<hr class="my-3" />
			{/if}
		{/each}

		{#each extraSkills as _, index}
			<div class="flex">
				<input
					type="text"
					bind:value={extraSkills[index].name}
					onchange={trimExtra}
					class="input-group-text w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				/>
				<input
					type="number"
					bind:value={extraSkills[index].value}
					class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
				<span
					class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
					>/ {skillLimit}
				</span>
			</div>
		{/each}

		<Button
			class="mt-2 w-full"
			color="green"
			onclick={() => extraSkills.push({ name: '???', value: 0 })}
		>
			<CirclePlusSolid class="me-2 h-5 w-5" /> Adicionar Perícia
		</Button>
	</div>
</div>
