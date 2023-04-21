<script>
    import { kalkulationsEintrag } from "./lib/kalkulationsEintrag";

    const kalkulation = Object.entries({
        listeneinkaufspreis: new kalkulationsEintrag("Listeneinkaufspreis", 100, undefined, true, false),
        lieferantenrabatt: new kalkulationsEintrag("Lieferantenrabatt", undefined, 10, true, true, true),
        zieleinkaufspreis: new kalkulationsEintrag("Zieleinkaufspreis", undefined, undefined, false, false),
        lieferantenskonto: new kalkulationsEintrag("Lieferantenskonto", undefined, 2, true, true, true),
        bareinkaufspreis: new kalkulationsEintrag("Bareinkaufspreis", undefined, undefined, false, false),
        bezugskosten: new kalkulationsEintrag("Bareinkaufspreis", 11.8, undefined, true, true),
        einstandspreis: new kalkulationsEintrag("Einstandspreis (Bezugspreis)", undefined, undefined, false, false),
        gemeinkosten: new kalkulationsEintrag("Gemeinkosten", undefined, 40, true, true),
        selbstkosten: new kalkulationsEintrag("Selbstkosten", undefined, undefined, false, false),
        gewinnzuschlag: new kalkulationsEintrag("Gewinnzuschlag", undefined, 25, true, true),
        barverkaufspreis: new kalkulationsEintrag("Barverkaufspreis", undefined, undefined, false, false),
        kundenskonto: new kalkulationsEintrag("Kundenskonto", undefined, 3, true, true, false, false),
        zielverkaufspreis: new kalkulationsEintrag("Zielverkaufspreis", undefined, undefined, false, false),
        kundenrabatt: new kalkulationsEintrag("Kundenrabatt", undefined, 10, true, true, false, false),
        listenverkaufspreisNetto: new kalkulationsEintrag(
            "Listenverkaufspreis (netto)",
            undefined,
            undefined,
            false,
            false
        ),
        umsatzsteuer: new kalkulationsEintrag("Umsatzsteuer", undefined, 19, true, true),
        listenverkaufspreisBrutto: new kalkulationsEintrag("Listenverkaufspreis (brutto)", undefined, undefined),
    });
</script>

<table>
    <tr><th>Kategorie</th><th>%</th><th>€</th></tr>
    {#each kalkulation as [name, wert], index}
        <tr>
            <td>{wert.name}</td>
            {#if wert.modifizierend}
                <td>
                    {#if wert.istBearbeitbar}
                        {#if wert.prozent !== undefined}
                            <input type="number" bind:value={wert.prozent} />
                        {:else}
                            <input type="number" bind:value={wert.wert} />
                        {/if}
                    {:else}
                        {wert.wert}
                    {/if}
                </td>
                {#if wert.ist100}
                    <td
                        >{(wert.wert = +(
                            wert.prozent !== undefined
                                ? (kalkulation[index - 1][1].wert * wert.prozent) / 100
                                : wert.wert
                        ).toFixed(2))}</td
                    >
                {:else}
                    <td
                        >{(wert.wert = +(wert.prozent !== undefined
                            ? (kalkulation[index - 1][1].wert / (100 - wert.prozent)) * wert.prozent
                            : wert.wert)).toFixed(2)}</td
                    >
                {/if}
            {:else}
                <td />
                <td>
                    {#if wert.istBearbeitbar}
                        <input type="number" bind:value={wert.wert} />
                    {:else}
                        {(wert.wert = +(kalkulation[index - 2][1].wert + kalkulation[index - 1][1].abzug)).toFixed(2)}
                    {/if}
                </td>
            {/if}
        </tr>
    {/each}
</table>
