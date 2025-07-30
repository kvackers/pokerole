<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { CirclePlusSolid } from 'flowbite-svelte-icons';

	import { DEFAULT_POKEMON } from './data';
	import { clone } from './utils';

	let { pokemonList = $bindable(), currentPokemon = $bindable(), full = false } = $props();

	const addPokemon = () => {
		pokemonList.push(clone(DEFAULT_POKEMON));
		currentPokemon = pokemonList.length - 1;
	};
</script>

<Button class={full ? 'w-full' : ''} color="green" onclick={addPokemon}>
	<CirclePlusSolid class="me-2 h-5 w-5" /> Pokémon
</Button>
