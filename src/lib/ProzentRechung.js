"use strict";
export function inHundert(prozentsatz, wert) {
    return (wert * prozentsatz) / (100 - prozentsatz);
}

export function vonHundert(prozentsatz, wert) {
    return (wert / 100) * prozentsatz;
}

export function aufHundert(prozentsatz, wert) {
    return (wert / (prozentsatz + 100)) * 100;
}
