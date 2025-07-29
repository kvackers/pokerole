<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { AngleDownOutline, AngleUpOutline, CirclePlusSolid } from 'flowbite-svelte-icons';
	import { STATUS } from './data';

	let {
		item = $bindable(),
		accessory = $bindable(),
		ribbons = $bindable(),

		status = $bindable(),

		notes = $bindable(),

		initiative,
		dodge,
		clash,
		defenses
	} = $props();

	let hidden = $state(false);
</script>

<div class="flex w-[360px] flex-col p-2">
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

		<p class="mt-0 mb-2 ml-1">Observações e Anotações</p>
		<textarea class="w-full bg-neutral-900 text-zinc-100" rows="20" bind:value={notes}></textarea>
	</div>
</div>
