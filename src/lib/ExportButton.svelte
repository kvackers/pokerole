<script lang="ts">
	import { Alert, Button, Modal } from 'flowbite-svelte';

	const { trainer, currentPokemon, pokemonList, full = false } = $props();

	let open = $state(false);
	let success = $state(false);

	const save = { version: 'hb-1', trainer, currentPokemon, pokemonList };

	const exportSave = async () => {
		open = true;

		try {
			await navigator.clipboard.writeText(JSON.stringify(save, null, 2));
			success = true;
		} catch (err) {
			console.error('Failed to copy save to clipbboard');
		}
	};
</script>

<Button class={full ? 'w-full' : ''} color="green" onclick={exportSave}>Exportar</Button>
<Modal title="Save" bind:open onclose={() => (success = false)} size="sm">
	<Alert border dismissable class="mt-2" color="yellow">
		<span class="font-medium">Ficha exportada com sucesso!</span>
	</Alert>

	<textarea rows="20" class="w-full bg-neutral-900 text-zinc-100"
		>{JSON.stringify(save, null, 2)}</textarea
	>
</Modal>
