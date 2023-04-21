export class kalkulationsEintrag {
    name;
    wert;
    prozent;
    istBearbeitbar;
    modifizierend;
    istAbzug;
    ist100;

    constructor(name, wert, prozent, istBearbeitbar, modifizierend, istAbzug = false, ist100 = true) {
        this.name = name;
        this.wert = wert;
        this.prozent = prozent;
        this.istBearbeitbar = istBearbeitbar;
        this.modifizierend = modifizierend;
        this.istAbzug = istAbzug;
        this.ist100 = ist100;
    }

    get abzug() {
        return -(+this.istAbzug || -1) * this.wert;
    }
}
