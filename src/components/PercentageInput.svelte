<script>
    import { inputData } from "../lib/store.js";
    export let valueStoreKey;
    export let disabled = false;
</script>

<span><input type="number" bind:value={$inputData[valueStoreKey]} step="1" min="0" {disabled} />%</span>
