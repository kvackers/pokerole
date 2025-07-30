<script>
	import { Button } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';

	import { DEFAULT_POKEMON } from './data';
	import { capitalize } from './utils';

	let { currentPokemon = $bindable(), pokemonList = $bindable(), full = false } = $props();

	const pokemon = $derived(pokemonList[currentPokemon]);

	const deletePokemon = () => {
		const confirmation = confirm(
			`Deseja deletar o Pokémon ${capitalize(pokemon.species)}? Essa ação não pode ser revertida.`
		);
		if (!confirmation) {
			return;
		}

		if (pokemonList.length === 1) {
			pokemonList[0] = { ...DEFAULT_POKEMON };
		} else {
			const index = currentPokemon;
			currentPokemon = 0;
			pokemonList.splice(index, 1);
		}
	};
</script>

<Button class={full ? 'w-full' : ''} color="red" onclick={deletePokemon}>
	<TrashBinSolid class="me-2 h-5 w-5" /> Pokémon
</Button>
