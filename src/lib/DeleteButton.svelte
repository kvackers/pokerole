<script>
	import { Button } from 'flowbite-svelte';
	import { DEFAULT_TRAINER } from './data';

	let { trainer = $bindable(), full = false } = $props();

	const deleteSheet = () => {
		const confirmation = confirm('Deseja deletar a ficha? Essa ação não pode ser revertida.');
		if (!confirmation) {
			return;
		}

		trainer = { ...DEFAULT_TRAINER };
	};
</script>

<Button class={full ? 'w-full' : ''} color="red" onclick={deleteSheet}>Limpar</Button>
