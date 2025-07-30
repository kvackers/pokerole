<script lang="ts">
	import { Alert, Button, Modal } from 'flowbite-svelte';
	import { validateSave } from './save';

	let {
		trainer = $bindable(),
		currentPokemon = $bindable(),
		pokemonList = $bindable(),
		full = false
	} = $props();

	let open = $state(false);
	let error = $state(false);
	let text = $state('');

	const importSave = () => {
		const confirmation = confirm('Deseja importar o save? Essa ação não pode ser revertida.');
		if (!confirmation) {
			return;
		}

		try {
			const data = JSON.parse(text);
			const save = validateSave(data);

			trainer = save.trainer;

			// This is to make sure currentPokemon is valid even when we're changing the pokemon list
			currentPokemon = 0;
			pokemonList = save.pokemonList;
			currentPokemon = save.currentPokemon;

			open = false;
		} catch (e) {
			console.error('Import failed', e);
			error = true;
		}
	};

	const cleanup = () => {
		text = '';
		error = false;
	};
</script>

<Button class={full ? 'w-full' : ''} color="yellow" onclick={() => (open = true)}>Importar</Button>
<Modal title="Importar" bind:open size="sm" onclose={cleanup}>
	{#if error}
		<Alert border dismissable class="mt-2" color="red">
			<span class="font-medium"
				>Algo de errado aconteceu! Por favor contate o administrador com a ficha que tentou
				importar.</span
			>
		</Alert>
	{/if}

	<textarea rows="16" class="w-full bg-neutral-900 text-zinc-100" bind:value={text}></textarea>
	<Button color="yellow" class="w-full" onclick={importSave}>Importar</Button>
</Modal>
