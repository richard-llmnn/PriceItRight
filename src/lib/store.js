"use strict";
import { writable } from "svelte/store";

export const inputData = writable({
    listeneinkaufspreis_data: 0,
    lieferantenrabatt_data: 0,
    lieferskonto_data: 0,
    bezugskosten_data: 0,
    handlungskonstenzuschlag_data: 0,
    gewinnzuschlag_data: 0,
    kundenskonto_data: 0,
    vertreterprovision_data: 0,
    kundenrabatt_data: 0,
    umsatzsteuer_data: 19,
    bruttoverkaufspreis_data: 0,
});
export const calculatedData = writable({
    lieferantenrabatt: 0,
    zieleinkaufspreis: 0,
    lieferskonto: 0,
    bareinkaufspreis: 0,
    bezugskosten: 0,
    einstandspreis_bezugspreis: 0,
    handlungskostenzuschlag: 0,
    selbstkosten: 0,
    gewinnzuschlag: 0,
    barverkaufspreis: 0,
    kundenskonto: 0,
    vertreterprovision: 0,
    kundenskonto_vertreterprovision: 0,
    zielverkaufspreis: 0,
    kundenrabatt: 0,
    nettoverkaufspreis: 0,
    umsatzsteuer: 0,
});
