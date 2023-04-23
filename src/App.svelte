<script>
    import { onMount } from "svelte";
    import { vonHundert, inHundert, aufHundert } from "./lib/ProzentRechung.js";
    import { inputData, calculatedData } from "./lib/store.js";

    import Eintrag from "./components/Eintrag.svelte";
    import EuroInput from "./components/EuroInput.svelte";
    import PercentageInput from "./components/PercentageInput.svelte";

    let modeString = "1";
    $: mode = parseInt(modeString);

    const euroFormatter = new Intl.NumberFormat("de-DE", {
        currency: "EUR",
        style: "currency",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    function calculate() {
        if (mode === undefined) return;

        const inputValues = $inputData;
        const values = $calculatedData;

        if (mode === 1) {
            values["lieferantenrabatt"] = vonHundert(
                inputValues["lieferantenrabatt_data"],
                inputValues["listeneinkaufspreis_data"]
            );
            values["zieleinkaufspreis"] = inputValues["listeneinkaufspreis_data"] - values["lieferantenrabatt"];
            values["lieferskonto"] = vonHundert(inputValues["lieferskonto_data"], values["zieleinkaufspreis"]);
            values["bareinkaufspreis"] = values["zieleinkaufspreis"] - values["lieferskonto"];
            values["bezugskosten"] = inputValues["bezugskosten_data"];
            values["einstandspreis_bezugspreis"] = values["bareinkaufspreis"] + values["bezugskosten"];
            values["handlungskostenzuschlag"] = vonHundert(
                values["einstandspreis_bezugspreis"],
                inputValues["handlungskonstenzuschlag_data"]
            );
            values["selbstkosten"] = values["handlungskostenzuschlag"] + values["einstandspreis_bezugspreis"];
            values["gewinnzuschlag"] = vonHundert(inputValues["gewinnzuschlag_data"], values["selbstkosten"]);
            values["barverkaufspreis"] = values["gewinnzuschlag"] + values["selbstkosten"];
            values["kundenskonto"] = inputValues["kundenskonto_data"];
            values["vertreterprovision"] = inputValues["vertreterprovision_data"];
            values["kundenskonto_vertreterprovision"] = inHundert(
                inputValues["vertreterprovision_data"] + inputValues["kundenskonto_data"],
                values["barverkaufspreis"]
            );
            values["zielverkaufspreis"] = values["kundenskonto_vertreterprovision"] + values["barverkaufspreis"];
            values["kundenrabatt"] = inHundert(inputValues["kundenrabatt_data"], values["zielverkaufspreis"]);
            values["nettoverkaufspreis"] = values["kundenrabatt"] + values["zielverkaufspreis"];
            values["umsatzsteuer"] = vonHundert(inputValues["umsatzsteuer_data"], values["nettoverkaufspreis"]);
            inputValues["bruttoverkaufspreis_data"] = (values["umsatzsteuer"] + values["nettoverkaufspreis"]).toFixed(
                5
            );
        } else if (mode === 2) {
            values["nettoverkaufspreis"] = aufHundert(
                inputValues["umsatzsteuer_data"],
                inputValues["bruttoverkaufspreis_data"]
            );
            values["umsatzsteuer"] = inputValues["bruttoverkaufspreis_data"] - values["nettoverkaufspreis"];
            values["kundenrabatt"] = vonHundert(inputValues["kundenrabatt_data"], values["nettoverkaufspreis"]);
            values["zielverkaufspreis"] = values["nettoverkaufspreis"] - values["kundenrabatt"];
            values["kundenskonto_vertreterprovision"] = vonHundert(
                inputValues["vertreterprovision_data"] + inputValues["kundenskonto_data"],
                values["zielverkaufspreis"]
            );
            values["barverkaufspreis"] = values["zielverkaufspreis"] - values["kundenskonto_vertreterprovision"];
            values["selbstkosten"] = aufHundert(inputValues["gewinnzuschlag_data"], values["barverkaufspreis"]);
            values["gewinnzuschlag"] = values["barverkaufspreis"] - values["selbstkosten"];
            values["einstandspreis_bezugspreis"] = aufHundert(
                inputValues["handlungskonstenzuschlag_data"],
                values["selbstkosten"]
            );
            values["handlungskostenzuschlag"] = values["selbstkosten"] - values["einstandspreis_bezugspreis"];
            values["bezugskosten"] = inputValues["bezugskosten_data"];
            values["bareinkaufspreis"] = values["einstandspreis_bezugspreis"] - values["bezugskosten"];
            values["lieferskonto"] = inHundert(inputValues["lieferskonto_data"], values["bareinkaufspreis"]);
            values["zieleinkaufspreis"] = values["bareinkaufspreis"] + values["lieferskonto"];
            values["lieferantenrabatt"] = inHundert(inputValues["lieferantenrabatt_data"], values["zieleinkaufspreis"]);
            inputValues["listeneinkaufspreis_data"] = (
                values["zieleinkaufspreis"] + values["lieferantenrabatt"]
            ).toFixed(5);
        } else if (mode === 3) {
            // forward calculation
            values["lieferantenrabatt"] = vonHundert(
                inputValues["lieferantenrabatt_data"],
                inputValues["listeneinkaufspreis_data"]
            );
            values["zieleinkaufspreis"] = inputValues["listeneinkaufspreis_data"] - values["lieferantenrabatt"];
            values["lieferskonto"] = vonHundert(inputValues["lieferskonto_data"], values["zieleinkaufspreis"]);
            values["bareinkaufspreis"] = values["zieleinkaufspreis"] - values["lieferskonto"];
            values["bezugskosten"] = inputValues["bezugskosten_data"];
            values["einstandspreis_bezugspreis"] = values["bareinkaufspreis"] + values["bezugskosten"];
            values["handlungskostenzuschlag"] = vonHundert(
                values["einstandspreis_bezugspreis"],
                inputValues["handlungskonstenzuschlag_data"]
            );
            values["selbstkosten"] = values["handlungskostenzuschlag"] + values["einstandspreis_bezugspreis"];

            // backward calculation
            values["nettoverkaufspreis"] = aufHundert(
                inputValues["umsatzsteuer_data"],
                inputValues["bruttoverkaufspreis_data"]
            );
            values["umsatzsteuer"] = inputValues["bruttoverkaufspreis_data"] - values["nettoverkaufspreis"];
            values["kundenrabatt"] = vonHundert(inputValues["kundenrabatt_data"], values["nettoverkaufspreis"]);
            values["zielverkaufspreis"] = values["nettoverkaufspreis"] - values["kundenrabatt"];
            values["kundenskonto_vertreterprovision"] = vonHundert(
                inputValues["vertreterprovision_data"] + inputValues["kundenskonto_data"],
                values["zielverkaufspreis"]
            );
            values["barverkaufspreis"] = values["zielverkaufspreis"] - values["kundenskonto_vertreterprovision"];

            // difference
            values["gewinnzuschlag"] = values["barverkaufspreis"] - values["selbstkosten"];
            inputValues["gewinnzuschlag_data"] = ((values["gewinnzuschlag"] / values["selbstkosten"]) * 100).toFixed(5);
        }
        calculatedData.set(values);
    }

    // calculate default values
    onMount(() => {
        inputData.set($inputData);
        inputData.subscribe(calculate);
    });
</script>

<select bind:value={modeString} id="mode-select">
    <option value="1">Vorwärtskalkulation</option>
    <option value="2">Rückwärtskalkulation</option>
    <option value="3">Differenzkalkulation</option>
</select>

<table>
    <tr class="dark-yellow">
        <th />
        <th>Kategorie</th>
        <th>%</th>
        <th>€</th>
    </tr>
    <Eintrag name="Listeneinkaufspreis" sign={mode === 2 ? "=" : ""}>
        <EuroInput slot="second" valueStoreKey="listeneinkaufspreis_data" disabled={mode === 2} />
    </Eintrag>
    <Eintrag name="Lieferantenrabatt" sign={mode === 2 ? "+" : "-"}>
        <PercentageInput slot="first" valueStoreKey="lieferantenrabatt_data" />
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["lieferantenrabatt"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Zieleinkaufspreis" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["zieleinkaufspreis"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Lieferskonto" sign={mode === 2 ? "+" : "-"}>
        <PercentageInput valueStoreKey="lieferskonto_data" slot="first" sign={mode === 2 ? "+" : "-"} />
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["lieferskonto"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Bareinkaufspreis" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["bareinkaufspreis"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Bezugskosten" sign={mode === 2 ? "-" : "+"}>
        <EuroInput slot="second" valueStoreKey="bezugskosten_data" />
    </Eintrag>
    <Eintrag name="Bezugspreis/Einstandspreis" sign="=">
        <svelte:fragment slot="second"
            >{euroFormatter.format($calculatedData["einstandspreis_bezugspreis"])}</svelte:fragment
        >
    </Eintrag>
    <Eintrag name="Handlungskostenzuschlag" sign={mode === 2 ? "-" : "+"}>
        <PercentageInput slot="first" valueStoreKey="handlungskonstenzuschlag_data" />
        <svelte:fragment slot="second"
            >{euroFormatter.format($calculatedData["handlungskostenzuschlag"])}</svelte:fragment
        >
    </Eintrag>
    <Eintrag name="Selbstkosten" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["selbstkosten"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Gewinnzuschlag" sign={mode === 2 ? "-" : "+"}>
        <PercentageInput slot="first" valueStoreKey="gewinnzuschlag_data" disabled={mode === 3} />
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["gewinnzuschlag"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Berverkaufspreis" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["barverkaufspreis"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Kundenskonto">
        <PercentageInput slot="first" valueStoreKey="kundenskonto_data" />
    </Eintrag>
    <Eintrag name="Vertreterprovision">
        <PercentageInput slot="first" valueStoreKey="vertreterprovision_data" />
    </Eintrag>
    <Eintrag name="Skonto+Provision" sign={mode === 2 ? "-" : "+"}>
        <svelte:fragment slot="first"
            >{$inputData["kundenskonto_data"] + $inputData["vertreterprovision_data"]}%</svelte:fragment
        >
        <svelte:fragment slot="second"
            >{euroFormatter.format($calculatedData["kundenskonto_vertreterprovision"])}</svelte:fragment
        >
    </Eintrag>
    <Eintrag name="Zielverkaufspreis" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["zielverkaufspreis"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Kundenrabatt" sign={mode === 2 ? "-" : "+"}>
        <PercentageInput slot="first" valueStoreKey="kundenrabatt_data" />
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["kundenrabatt"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Nettoverkauspreis" sign="=">
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["nettoverkaufspreis"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Umsatzsteuer" sign={mode === 2 ? "-" : "+"}>
        <PercentageInput slot="first" valueStoreKey="umsatzsteuer_data" />
        <svelte:fragment slot="second">{euroFormatter.format($calculatedData["umsatzsteuer"])}</svelte:fragment>
    </Eintrag>
    <Eintrag name="Bruttoverkauspreis" sign={mode === 1 ? "=" : ""}>
        <EuroInput slot="second" valueStoreKey="bruttoverkaufspreis_data" disabled={mode === 1} />
    </Eintrag>
</table>

<p id="github-text">
    <b>GitHub:</b>
    <a href="https://github.com/richard-llmnn/PriceItRight">https://github.com/richard-llmnn/PriceItRight</a>
</p>
