<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { AngleDownOutline, AngleUpOutline, CirclePlusSolid } from 'flowbite-svelte-icons';

	let {
		badges = $bindable(),
		potions = $bindable(),
		bag = $bindable(),
		notes = $bindable()
	} = $props();

	const trimExtra = (event: any) => {
		const input: string = event.target.value;
		if (input.trim().length === 0) {
			bag = bag.filter((e: any) => e.item.trim().length > 0);
		}
	};

	let hidden = $state(false);
</script>

<div class="flex w-[360px] flex-col p-2">
	<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
		<span>Bolsa & Misc.</span>
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
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Insígnias</span
			>
			<input
				type="number"
				bind:value={badges}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Poções</p>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Normal</span
			>
			<input
				type="number"
				bind:value={potions[0]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span class="input-group-text border border-x-0 border-zinc-50 bg-zinc-700">uds</span>
			<input
				type="number"
				bind:value={potions[1]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ 2</span
			>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Super</span
			>
			<input
				type="number"
				bind:value={potions[2]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span class="input-group-text border border-x-0 border-zinc-50 bg-zinc-700">uds</span>
			<input
				type="number"
				bind:value={potions[3]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ 4</span
			>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Híper</span
			>
			<input
				type="number"
				bind:value={potions[4]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span class="input-group-text border border-x-0 border-zinc-50 bg-zinc-700">uds</span>
			<input
				type="number"
				bind:value={potions[5]}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ 14</span
			>
		</div>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Bolsa</p>
		{#each bag as _, index}
			<div class="flex">
				<input
					type="text"
					bind:value={bag[index].item}
					onchange={trimExtra}
					class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				/>
				<input
					type="number"
					bind:value={bag[index].count}
					class="w-[50px] rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
		{/each}
		<Button class="mt-2 w-full" color="green" onclick={() => bag.push({ item: '???', count: 0 })}>
			<CirclePlusSolid class="me-2 h-5 w-5" /> Adicionar Item
		</Button>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Observações e Anotações</p>
		<textarea class="w-full bg-neutral-900 text-zinc-100" rows="20" bind:value={notes}></textarea>
	</div>
</div>
