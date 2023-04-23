<script>
    import { inputData } from "../lib/store.js";
    export let valueStoreKey;
    export let disabled = false;

    let step = 0.01;
    const keydown = function (event) {
        if (event.shiftKey === true) {
            step = 1;
        }
    };
    const keyup = function (event) {
        if (event.shiftKey === false) {
            step = 0.01;
        }
    };
</script>

<span
    ><input
        type="number"
        bind:value={$inputData[valueStoreKey]}
        {step}
        {disabled}
        class:result={disabled}
        on:keydown={keydown}
        on:keyup={keyup}
    />€</span
>
