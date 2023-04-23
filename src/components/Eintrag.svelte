<script>
    export let name;
    export let sign = "";
</script>

<tr class:dark-yellow={sign === "="} class:bright-yellow={sign !== "="}>
    <td class="text-center"><b>{sign}</b></td>
    <td>{name}</td>
    <td><slot name="first" /></td>
    <td>
        {#if sign === "="}
            <u><slot name="second" /></u>
        {:else}
            <slot name="second" />
        {/if}
    </td>
</tr>
