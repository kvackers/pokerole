<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';
	import ExportButton from './ExportButton.svelte';
	import HomebrewButton from './HomebrewButton.svelte';
	import ImportButton from './ImportButton.svelte';

	let { trainer = $bindable() } = $props();
</script>

<HomebrewButton full mode="sm"></HomebrewButton>
<ExportButton full mode="sm" {trainer}></ExportButton>
<ImportButton full mode="sm" {trainer}></ImportButton>
<DeleteButton full bind:trainer></DeleteButton>
