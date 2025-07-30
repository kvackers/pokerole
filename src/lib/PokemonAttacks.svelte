<script lang="ts">
	import {
		AngleDownOutline,
		AngleUpOutline,
		CirclePlusSolid,
		TrashBinOutline
	} from 'flowbite-svelte-icons';
	import { TYPES } from './data';
	import { Alert, Button } from 'flowbite-svelte';

	let { attacks = $bindable() } = $props();

	let hidden = $state(false);

	const addAttack = () => {
		attacks.push({ name: '', type: '-', damage: '', acc: '', effect: '' });
	};

	const removeAttack = (index: number) => {
		const confirmation = confirm('Deseja deletar o golpe? Essa ação não pode ser revertida.');
		if (!confirmation) {
			return;
		}

		attacks.splice(index, 1);
	};
</script>

<div class="flex flex-col p-2">
	<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
		<span>Golpes</span>
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
		<Alert border dismissable class="my-2" color="yellow">
			<span class="font-medium">O número máximo de Golpes é igual à <b>Intuição</b>.</span>
		</Alert>
		{#each attacks as _, index}
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Ataque</span
				>
				<input
					type="text"
					bind:value={attacks[index].name}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Tipos</span
				>
				<select
					class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
					bind:value={attacks[index].type}
				>
					{#each TYPES as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
				<Button class="w-[20px] rounded-l-none" color="red" onclick={() => removeAttack(index)}>
					<TrashBinOutline class="me-2 h-5 w-5" />
				</Button>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Dano</span
				>
				<input
					type="text"
					bind:value={attacks[index].damage}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Acurácia</span
				>
				<input
					type="text"
					bind:value={attacks[index].acc}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
			<textarea
				class="w-full rounded-lg bg-neutral-900 text-zinc-100"
				rows="3"
				bind:value={attacks[index].effect}
			></textarea>

			{#if index !== attacks.length - 1}
				<hr class="my-3" />
			{/if}
		{/each}
		<Button class="mt-2 w-full" color="green" onclick={addAttack}>
			<CirclePlusSolid class="me-2 h-5 w-5" /> Adicionar Ataque
		</Button>
	</div>
</div>
