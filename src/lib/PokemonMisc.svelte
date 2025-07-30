<script lang="ts">
	import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons';
	import { DEFENSIVE_TYPECHART, STATUS, TYPES } from './data';
	import { capitalize } from './utils';

	let {
		item = $bindable(),
		accessory = $bindable(),
		ribbons = $bindable(),

		status = $bindable(),

		notes = $bindable(),

		initiative,
		dodge,
		clash,
		defenses,
		types
	} = $props();

	const calculateWeaknesses = (types: Array<string>): Record<string, number> => {
		const multipliers: Record<string, number> = TYPES.slice(1).reduce(
			(a, v) => ({ ...a, [v.toLocaleLowerCase()]: 1 }),
			{}
		);

		for (const type of types.map((e) => e.toLocaleLowerCase())) {
			if (type === '-') {
				continue;
			}

			for (const incoming of Object.keys(multipliers)) {
				try {
					const mod = DEFENSIVE_TYPECHART[type][incoming];
					multipliers[incoming] *= mod === undefined ? 1 : mod;
				} catch (TypeError) {}
			}
		}

		return multipliers;
	};

	const formatWeaknesses = (multipliers: Record<string, number>): string => {
		const immunities: Array<string> = [];

		const resists: Array<string> = [];
		const doubleResists: Array<string> = [];

		const weaknesses: Array<string> = [];
		const doubleWeaknesses: Array<string> = [];

		for (const [type, mod] of Object.entries(multipliers)) {
			if (mod === 0) {
				immunities.push(type);
			} else if (mod === 0.25) {
				doubleResists.push(type);
			} else if (mod === 0.5) {
				resists.push(type);
			} else if (mod === 2) {
				weaknesses.push(type);
			} else if (mod === 4) {
				doubleWeaknesses.push(type);
			}
		}

		let results = '';
		if (immunities.length > 0) {
			results += `Imunidades: ${immunities.map(capitalize).join(', ')}\n`;
		}
		if (doubleResists.length > 0) {
			results += `Resistências Duplas: ${doubleResists.map(capitalize).join(', ')}\n`;
		}
		if (resists.length > 0) {
			results += `Resistências: ${resists.map(capitalize).join(', ')}\n`;
		}
		if (weaknesses.length > 0) {
			results += `Fraquezas: ${weaknesses.map(capitalize).join(', ')}\n`;
		}
		if (doubleWeaknesses.length > 0) {
			results += `Fraquezas Duplas: ${doubleWeaknesses.map(capitalize).join(', ')}\n`;
		}

		return results;
	};

	const multipliers = $derived(calculateWeaknesses(types));
	const formatted = $derived(formatWeaknesses(multipliers));

	let hidden = $state(false);
</script>

<div class="flex flex-col p-2">
	<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
		<span>Derivados & Misc.</span>
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
				>Iniciativa</span
			>
			<input
				type="text"
				value={initiative}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Evasão</span
			>
			<input
				type="text"
				value={dodge}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Revide</span
			>
			<input
				type="text"
				value={clash}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Defesas</span
			>
			<input
				type="text"
				value={defenses}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Status</span
			>
			<select
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				bind:value={status}
			>
				{#each STATUS as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>

		<hr class="my-3" />

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Item</span
			>
			<input
				type="text"
				bind:value={item}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Acessório</span
			>
			<input
				type="text"
				bind:value={accessory}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Fitas</span
			>
			<input
				type="number"
				bind:value={ribbons}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>

		<hr class="my-3" />
		<p class="mt-0 mb-2 ml-1">Fraquezas e Resistências</p>
		<textarea class="w-full bg-neutral-900 text-zinc-100" rows="5" value={formatted}></textarea>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Observações e Anotações</p>
		<textarea class="w-full bg-neutral-900 text-zinc-100" rows="20" bind:value={notes}></textarea>
	</div>
</div>
