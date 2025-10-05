<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import HomebrewRanks from './HomebrewRanks.svelte';

	const { mode, badges, full = false } = $props();
	let open = $state(false);
</script>

<Button color="dark" class={full ? 'w-full' : ''} onclick={() => (open = true)}
	>Regras Extras</Button
>
<Modal title="Regras Extras" bind:open size={mode}>
	<p>
		<b>Ranks Atualizados</b>: Ranks são determinados pelo seu número de insígnias (ou outras
		façanhas de igual mérito), e tem os seguintes benefícios:
	</p>
	<HomebrewRanks trainerBadges={badges}></HomebrewRanks>
	<p>
		<b>Naturezas</b>: Confiança varia com o seu rank. Treinadores e Pokémon não tem Naturezas, mas
		Pokémon podem, opcionalmente, subir um atributo <b>físico</b> em 1 e diminuir outro em 1.
	</p>
	<p>
		<b>Desobediência</b>: Para cado ponto de lealdade que um Pokémon tiver abaixo de 2 (ou se o
		mestre achar necessário) role um dado quando tentar usar um Golpe ou Revidar.
	</p>
	<p>
		Se tiver rolado alguma falha, o Pokémon não obedece naquele turno. Role um dado para determinar
		o que acontece:
	</p>
	<ul>
		<li>1. O Pokémon ganha o Status Sono.</li>
		<li>2 - 5. O Pokémon não faz nada</li>
		<li>6. O Pokémon usa um Golpe Aleatório</li>
	</ul>
	<p>
		<b>Velocidade de Evolução</b>: Pokémon do grupo Devagar precisam de 30 vitórias para evoluir.
	</p>
	<p>
		<b>Terastal</b>: Todo Pokémon tem um tipo Terastal que pode ser trocado com Teralitos de um dado
		tipo. Uma vez por batalha, o Treinador pode gastar 1 ponto de Vontade para ativar o efeito
		Terastal em um de seus Pokémon em campo, antes do começo do turno.
	</p>
	<p>
		Um Pokémon terastalizado é considerado somente do tipo Terastal para fins defensivos, e também
		tem STAB em Golpes de seu teratipo. Se o teratipo for um tipo que o Pokémon já tem, o valor de
		STAB em Golpes daquele tipo se torna 2 invés de 1.
	</p>
	<p>
		Se um Pokémon terastalizado desmaiar em batalha e for revivido, ele deixa de estar
		Terastalizado.
	</p>
</Modal>

<style>
	ul {
		list-style-type: disc;
		margin-block-start: 1em;
		margin-block-end: 1em;
		padding-inline-start: 40px;
	}
</style>
