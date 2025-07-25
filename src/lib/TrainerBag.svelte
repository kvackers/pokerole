<script>
	import { Button } from 'flowbite-svelte';
	import { CirclePlusSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex w-[360px] flex-col p-2">
	<div
		class="rounded-t-lg border border-b-0 border-solid border-zinc-950 px-4 py-2 dark:border-zinc-50"
	>
		Bolsa & Misc.
	</div>
	<div
		class="flex flex-col rounded-b-lg border border-solid border-zinc-950 p-2 dark:border-zinc-50"
	>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Pokedex</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text border border-x-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/</span
			>
			<input
				type="number"
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Insígnias</span
			>
			<input
				type="number"
				class="w-full rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Poções</p>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Normal</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text border border-x-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>uds</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/ 2</span
			>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Super</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text border border-x-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>uds</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text min-w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/ 4</span
			>
		</div>
		<div class="flex">
			<span
				class="input-group-text min-w-[85px] rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>Híper</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text border border-x-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>uds</span
			>
			<input
				type="number"
				class="w-full border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
			<span
				class="input-group-text w-[50px] rounded-r-lg border border-l-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
				>/ 14</span
			>
		</div>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Bolsa</p>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="number"
				class="w-[50px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<Button class="mt-2" color="green">
			<CirclePlusSolid class="me-2 h-5 w-5" /> Adicionar Item
		</Button>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Conquistas</p>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="checkbox"
				class="h-[40px] w-[40px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="checkbox"
				class="h-[40px] w-[40px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="checkbox"
				class="h-[40px] w-[40px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="checkbox"
				class="h-[40px] w-[40px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>
		<div class="flex">
			<span
				contenteditable
				class="input-group-text w-full rounded-l-lg border border-r-0 border-zinc-950 dark:border-zinc-50 dark:bg-zinc-700"
			></span>
			<input
				type="checkbox"
				class="h-[40px] w-[40px] rounded-r-lg border-zinc-950 dark:border-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
			/>
		</div>

		<hr class="my-3" />

		<p class="mt-0 mb-2 ml-1">Observações e Anotações</p>
		<textarea class="w-full dark:bg-neutral-900 dark:text-zinc-100" rows="20"></textarea>

		<hr class="my-3" />
		<div class="my-2 flex">
			<Button class="mr-2 w-full" color="green">Exportar Save</Button>
			<Button class="w-full" color="yellow">Importar Save</Button>
		</div>
		<textarea class="w-full dark:bg-neutral-900 dark:text-zinc-100" rows="20"></textarea>
	</div>
</div>
