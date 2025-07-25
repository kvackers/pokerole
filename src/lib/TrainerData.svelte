<script lang="ts">
	import { DEFAULT_IMAGE, NATURES, RANKS } from './data';

	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { getNature, getRank } from './utils';

	let {
		image = $bindable(),
		name = $bindable(),
		concept = $bindable(),
		money = $bindable(),

		nature = $bindable(),
		rank = $bindable(),

		health = $bindable(),
		confidence = $bindable(),
		willPoints = $bindable()
	} = $props();

	const natureObject = $derived(getNature(nature));
	const rankObject = $derived(getRank(rank));

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
</script>

<div class="box-content flex w-[360px] flex-col p-2">
	<div
		class="rounded-t-lg border border-b-0 border-solid border-zinc-950 px-4 py-2 dark:border-zinc-50"
	>
		Dados Pessoais
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-solid border-zinc-950 p-2 dark:border-zinc-50"
	>
		<button onclick={promptImageURL}
			><img
				src={image}
				alt="Ditto transformado em um bloco, sorrindo"
				style="max-width: 340px; margin: 0 auto;"
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
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Nome</span
			>
			<input
				type="text"
				bind:value={name}
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Conceito</span
			>
			<input
				type="text"
				bind:value={concept}
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="mb-2 flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>₽</span
			>
			<input
				type="number"
				bind:value={money}
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Natureza</span
			>
			<select
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				bind:value={nature}
			>
				{#each NATURES as { nature }}
					<option value={nature}>{nature}</option>
				{/each}
			</select>
		</div>
		<div class="mb-2 flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Rank</span
			>
			<select
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
				bind:value={rank}
			>
				{#each RANKS as { rank }}
					<option value={rank}>{rank}</option>
				{/each}
			</select>
			<span
				class="flex min-w-[50px] items-center justify-center rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			>
				<img
					src={rankObject.icon}
					style:display="inline-block"
					style:max-width="24px"
					style:max-height="24px"
					style:margin="0 auto"
					alt="Ícone de Rank"
				/>
			</span>
		</div>

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>PV</span
			>
			<input
				type="number"
				bind:value={health}
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/
			</span>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Confiança</span
			>
			<input
				type="number"
				bind:value={confidence}
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/ {natureObject.maxConfidence}
			</span>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Vontade</span
			>
			<input
				type="number"
				bind:value={willPoints}
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
	</div>
</div>
