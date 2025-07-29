<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';

	const { mode, trainer = $bindable(), full = false } = $props();

	let open = $state(false);
	let text = $state('');

	const importSave = () => {
		const confirmation = confirm('Deseja importar o save? Essa ação não pode ser revertida.');
		if (!confirmation) {
			return;
		}

		console.log(text);
	};
</script>

<Button class={full ? 'w-full' : ''} color="yellow" onclick={() => (open = true)}>Importar</Button>
<Modal title="Importar" bind:open size={mode} onclose={() => (text = '')}>
	<textarea rows="20" class="w-full dark:bg-neutral-900 dark:text-zinc-100" bind:value={text}
	></textarea>
	<Button color="yellow" class="w-full" onclick={importSave}>Importar</Button>
</Modal>
