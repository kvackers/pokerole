<script lang="ts">
	import { TYPES } from '$lib/data';
	import { Button } from 'flowbite-svelte';

	let gender = $state(1);
	let ability = $state(1);

	let teratype = $state('-');
	let wins = $state('');
	let raises = $state('');

	let shiny = $state(false);
	let alt = $state(false);

	const roll = () => {
		gender = (1 + Math.random() * 8) | 0;
		ability = (Math.random() * 2) | 0;

		teratype = TYPES[(1 + Math.random() * 17) | 0];

		shiny = ((Math.random() * 100) | 0) === 0;
		alt = ((Math.random() * 25) | 0) === 0;

		// 1d4 - 2 / 1d4 / 1d6 / 1d8
		let rolls = [
			((Math.random() * 4) | 0) - 2,
			(Math.random() * 4) | 0,
			(Math.random() * 6) | 0,
			(Math.random() * 8) | 0
		].map((e) => (e < 0 ? 0 : e));
		rolls.sort();

		wins = rolls.join(' / ');

		// 1d4 - 3 / 1d6 - 3 / 1d8 - 3 / 1d6 / 1d8
		rolls = [
			((Math.random() * 4) | 0) - 3,
			((Math.random() * 6) | 0) - 3,
			((Math.random() * 8) | 0) - 3,
			(Math.random() * 6) | 0,
			(Math.random() * 8) | 0
		].map((e) => (e < 0 ? 0 : e));
		rolls.sort();

		raises = rolls.join(' / ');
	};
</script>

<div
	class="min-h-screen bg-zinc-800 p-2 text-zinc-100"
	style:font-family="'Roboto Condensed', sans-serif;"
>
	<div class="w-[360px]" style:margin="0 auto">
		<div class="flex justify-between rounded-t-lg border border-solid border-zinc-50 px-4 py-2">
			<span>Aleatório</span>
		</div>
		<div
			class="flex w-[360px] flex-col rounded-b-lg border border-t-0 border-solid border-zinc-50 p-2"
		>
			<Button class="w-full" color="green" onclick={roll}>Rolar</Button>

			<hr class="my-3" />

			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Gênero</span
				>
				<input
					type="text"
					value={gender + ' / 8'}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>

			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Habilidade</span
				>
				<input
					type="text"
					value={ability}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>

			<hr class="my-3" />

			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Shiny</span
				>
				<input
					type="text"
					value={shiny ? 'Sim' : 'Não'}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Alt</span
				>
				<input
					type="text"
					value={alt ? 'Sim' : 'Não'}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>

			<hr class="my-3" />

			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Teratipo</span
				>
				<input
					type="text"
					value={teratype}
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
					value={wins}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>
			<div class="flex">
				<span
					class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
					>Aumentos</span
				>
				<input
					type="text"
					value={raises}
					class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
				/>
			</div>

			<hr class="my-3" />

			<p><b>Vitórias</b>: 1d4 - 2 / 1d4 / 1d6 / 1d8</p>
			<p><b>Aumentos</b>: 1d4 - 3 / 1d6 - 3 / 1d8 - 3 / 1d6 / 1d8</p>
		</div>
	</div>
</div>
