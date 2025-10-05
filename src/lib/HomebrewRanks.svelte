<script lang="ts">
	import { RANKS } from './data';

	const { trainerBadges } = $props();

	let badges = $state(trainerBadges);
	let object = $derived(RANKS[+badges < RANKS.length ? +badges : RANKS.length - 1]);

	let formatMoves = (moves: Array<[string, number]>) => {
		if (moves.length === 1) {
			return `do rank <img class="inline-block" src="../${moves[0][0]}.png" />${moves[0][0] == 'premier' ? '' : 'e abaixo'}`;
		} else if (moves.length > 1) {
			let result = `do rank <img class="inline-block" src="../${moves[0][0]}.png" />${moves[0][0] == 'premier' ? '' : 'e abaixo'}, `;

			let count = moves[1][1];
			let secondary = moves[1][0];
			result += `e ${count} do rank <img class="inline-block" src="../${secondary}.png" />`;

			return result;
		} else {
			console.error('Something went wrong. Expected moves to have at least one entry');
			return 'ERRO';
		}
	};
</script>

<div class="flex flex-col px-3 py-1">
	<div class="flex w-[360px]">
		<span
			class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-50 bg-zinc-700"
			>Insígnias</span
		>
		<input
			type="number"
			min="0"
			max="13"
			bind:value={badges}
			class="w-full rounded-r-lg border-zinc-50 bg-zinc-800 text-zinc-100"
		/>
	</div>

	<div class="my-2">
		<p>
			Nesse rank você ganhou <b>{object.skillPoints}</b> ponto{object.skillPoints == 1 ? '' : 's'} de
			perícia, totalizando
			<b>{object.skillPointsTotal}</b>. O valor limite de suas perícias é
			<b>{object.skillLimit}</b>.
		</p>
	</div>

	<div class="my-2">
		<p>
			Nesse rank você ganhou <b>{object.attributes}</b> ponto{object.attributes == 1 ? '' : 's'} de atributos
			físicos, totalizando
			<b>{object.attributesTotal}</b>.
		</p>
		<p>
			Nesse rank você ganhou <b>{object.social}</b> ponto{object.social == 1 ? '' : 's'} de atributos
			sociais, totalizando
			<b>{object.attributesTotal}</b>.
		</p>
		<p>
			O valor limite de atributos para o treinador é <b>5</b> e para Pokémon, depende da espécie.
		</p>
	</div>

	<div>
		<p>
			No momento, seus Pokémon podem usar golpes <b>{@html formatMoves(object.moves)}</b>, e podem
			ter, no máximo <b>INT + {object.numberMoves}</b> golpes.
		</p>
		<p>A Confiança do Treinador e dos Pokémons é igual a <b>INT + {4 + object.numberMoves}</b></p>
	</div>
</div>
