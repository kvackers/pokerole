<script lang="ts">
	import { DEFAULT_IMAGE, DEX, TYPES, type Pokemon } from './data';

	import { Alert } from 'flowbite-svelte';
	import { AngleDownOutline, AngleUpOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { capitalize, sort } from './utils';

	let {
		image = $bindable(),
		name = $bindable(),
		species = $bindable(),
		ability = $bindable(),

		health = $bindable(),
		confidence = $bindable(),
		willPoints = $bindable(),

		types = $bindable(),
		teratype = $bindable(),
		evoTime = $bindable(),
		wins = $bindable(),
		training = $bindable(),
		happiness = $bindable(),
		loyalty = $bindable(),

		maxHP,
		maxWill,
		maxConfidence,
		changeSpecies
	} = $props();

	const promptImageURL = () => {
		let url = prompt('Insira o link para a imagem, por favor:');
		if (url === null || !url) {
			return;
		}

		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			url = 'http://' + url;
		}

		image = url;
	};

	let hidden = $state(false);
</script>

<div class="flex w-[360px] flex-col p-2">
	<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
		<span>Dados Pessoais</span>
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
		<button onclick={promptImageURL}
			><img
				src={image}
				alt="Ditto transformado em um bloco, sorrindo"
				style="max-width: 320px; margin: 0 auto;"
			/></button
		>
		{#if image === DEFAULT_IMAGE}
			<Alert border dismissable class="mt-2" color="yellow">
				{#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
				<span class="font-medium">Clique na imagem para mudar ela!</span>
			</Alert>
		{/if}

		<div class="mt-2 flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Apelido</span
			>
			<input
				type="text"
				bind:value={name}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Espécie</span
			>
			<select
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				bind:value={species}
				onchange={changeSpecies}
			>
				{#each sort(Object.entries(DEX)) as [species, _]}
					<option value={species}>{capitalize(species)}</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Habilidade</span
			>
			<input
				type="text"
				bind:value={ability}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>PV</span
			>
			<input
				type="number"
				bind:value={health}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ {maxHP}
			</span>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Confiança</span
			>
			<input
				type="number"
				bind:value={confidence}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ {maxConfidence}
			</span>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Vontade</span
			>
			<input
				type="number"
				bind:value={willPoints}
				class="w-full border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-50 bg-zinc-700"
				>/ {maxWill}
			</span>
		</div>

		<hr class="my-3" />

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Tipos</span
			>
			<select class="w-full border-zinc-50 bg-zinc-800 text-zinc-100" bind:value={types[0]}>
				{#each TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
			<select
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				bind:value={types[1]}
			>
				{#each TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Teratipo</span
			>
			<select
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				bind:value={teratype}
			>
				{#each TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Evolução</span
			>
			<input
				type="text"
				bind:value={evoTime}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Vitórias</span
			>
			<input
				type="text"
				bind:value={wins}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Treinos</span
			>
			<input
				type="text"
				bind:value={training}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Felicidade</span
			>
			<input
				type="text"
				bind:value={happiness}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
				>Lealdade</span
			>
			<input
				type="text"
				bind:value={loyalty}
				class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
			/>
		</div>
	</div>
</div>
