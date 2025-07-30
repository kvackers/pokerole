<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';

	const { mode, full = false } = $props();
	let open = $state(false);
</script>

<Button color="dark" class={full ? 'w-full' : ''} onclick={() => (open = true)}
	>Regras Extras</Button
>
<Modal title="Regras Extras" bind:open size={mode}>
	<p>
		<b>Naturezas</b>: Confiança é definida como INT + 4. Treinadores e Pokémon não tem Naturezas,
		mas Pokémon podem, opcionalmente, na hora da captura ou evolução, subir um atributo <b>físico</b> em 1
		e diminuir outro em 1.
	</p>
	<p><b>Número de Golpes</b>: Pokémon podem saber, no máximo, 5 Golpes.</p>
	<p>
		<b>Treinos invés de ranks</b>: Pokémon podem gastar 5 sucessos para fazer <b>uma</b> das seguintes
		coisas:
	</p>
	<ul>
		<li>Aumentar um atributo físico em 1, até um máximo de 8 vezes</li>
		<li>Aumentar um atributo social em 1, até um máximo de 8 vezes</li>
		<li>Aumentar uma perícia em 1, até um máximo de 13 vezes</li>
		<li>Aprender um Golpe listado no livro, substituindo um outro caso já esteja no limite</li>
		<li>Trocar sua Natureza</li>
	</ul>
	<p>
		A cada 3 vezes que uma dessas coisas forem feitas, um Treinador pode fazer uma delas também, se
		aplicável.
	</p>
	<p>
		<b>Velocidade de Evolução</b>: Pokémon do grupo Devagar precisam de 30 vitórias para evoluir.
	</p>
	<p>
		<b>Terastal</b>: Todo Pokémon tem um tipo Terastal que pode ser trocado com Teralitos de um dado
		tipo. A cada batalha, o Treinador pode gastar 1 ponto de Vontade para ativar o efeito Terastal
		em um de seus Pokémon em campo, antes do começo do turno.
	</p>
	<p>
		Um Pokémon terastalizado é considerado somente do tipo Terastal para fins defensivos e de STAB,
		e caso o tipo Terastal já seja um tipo que o Pokémon tem, o valor de STAB se torna 2 invés de 1.
	</p>
	<p>
		Se um Pokémon terastalizado desmaiar em batalha e for revivido, ele deixa de estar Terastalizado
		e o treinador não pode Terastalizar novamente naquela mesma batalha.
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
