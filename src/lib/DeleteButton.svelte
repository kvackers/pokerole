<script>
	import { Button } from 'flowbite-svelte';
	import { DEFAULT_SAVE } from './data';

	let { save = $bindable(), full = false } = $props();

	const deleteSheet = () => {
		const confirmation = confirm('Deseja deletar a ficha? Essa ação não pode ser revertida.');
		if (!confirmation) {
			return;
		}

		save = { ...DEFAULT_SAVE };
	};
</script>

<Button class={full ? 'w-full' : ''} color="red" onclick={deleteSheet}>Limpar</Button>
