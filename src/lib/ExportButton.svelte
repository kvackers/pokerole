<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';

	const { mode, trainer, full = false } = $props();
	let open = $state(false);
</script>

<Button class={full ? 'w-full' : ''} color="green" onclick={() => (open = true)}>Exportar</Button>
<Modal title="Save" bind:open size={mode}>
	<textarea rows="20" class="w-full bg-neutral-900 text-zinc-100"
		>{JSON.stringify({ trainer }, null, 2)}</textarea
	>
</Modal>
