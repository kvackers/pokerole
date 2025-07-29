<script lang="ts">
	import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons';
	import { TYPES } from './data';

	let { attacks = $bindable() } = $props();

	let hidden = $state(false);
</script>

<div class="flex w-[360px] flex-col p-2">
	<div
		class="flex justify-between rounded-t-lg border border-solid border-zinc-950 px-4 py-2 dark:border-zinc-50"
	>
		<span>Ataques</span>
		{#if hidden}
			<button onclick={() => (hidden = false)}><AngleDownOutline></AngleDownOutline></button>
		{:else}
			<button onclick={() => (hidden = true)}><AngleUpOutline></AngleUpOutline></button>
		{/if}
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-t-0 border-solid border-zinc-950 p-2 dark:border-zinc-50"
		style:display={hidden ? 'none' : 'block'}
	>
		{#each attacks as _, index}
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>Ataque</span
				>
				<input
					type="text"
					bind:value={attacks[index].name}
					class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>Tipos</span
				>
				<select
					class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
					bind:value={attacks[index].type}
				>
					{#each TYPES as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>Dano</span
				>
				<input
					type="text"
					bind:value={attacks[index].damage}
					class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
					>Acurácia</span
				>
				<input
					type="text"
					bind:value={attacks[index].acc}
					class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				/>
			</div>
			<textarea
				class="w-full rounded-lg dark:bg-neutral-900 dark:text-zinc-100"
				rows="3"
				bind:value={attacks[index].effect}
			></textarea>

			{#if index !== 4}
				<hr class="my-3" />
			{/if}
		{/each}
	</div>
</div>
