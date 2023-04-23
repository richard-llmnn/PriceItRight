<script>
    import { inputData } from "../lib/store.js";
    export let valueStoreKey;
    export let disabled = false;
</script>

<span
    ><input
        type="number"
        bind:value={$inputData[valueStoreKey]}
        step="0.01"
        {disabled}
        class:result={disabled}
    />€</span
>
