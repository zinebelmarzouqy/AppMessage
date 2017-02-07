export class Message {

    constructor(objet,corps,etat) {
        this._objet = objet
       this._corps = corps
        this._etat= etat
    }
// les getters
    get objet() {return this._objet}
    get corps() {return this._corps}
    get etat() {return this._etat}
//les setters
    set objet(objet) {this._objet = objet}
    set corps(corps) {this._corps = corps}
    set etat(etat) {this._etat = etat}
    toString() { return `Message : objet = ${this.objet} corps = ${this.corps} etat = ${this.etat}`}
}