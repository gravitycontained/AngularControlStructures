import { Component } from '@angular/core';

export class Sitz {
  private sitzNummer: number;
  private belegt: boolean;

  constructor() {
    this.sitzNummer = 0;
    this.belegt = false;
  }

  public getSitzNummer(): number {
    return this.sitzNummer;
  }
  public setSitzNummer(sitz: number): void {
    this.sitzNummer = sitz;
  }

  public getBelegt(): boolean {
    return this.belegt;
  }
  public setBelegt(belegt: boolean): void {
    this.belegt = belegt;
  }
}
export class Kinosaal{
  sitze: Sitz[] = [];
  anzahlSitze: number = 0;
  raumNummer: number = 0;

  constructor(raumNummer: number, sitze: number) {

    this.raumNummer = raumNummer;
    this.anzahlSitze = sitze;

    this.sitze = [];
    for (let sitz = 0; sitz < sitze; sitz++) {

      this.sitze[sitz] = new Sitz();
      this.sitze[sitz].setSitzNummer(sitz);
      this.sitze[sitz].setBelegt(false);
    }
  }

  public reserviereSitz(sitzNummer: number): void {
    let sitz: Sitz = this.sitze[sitzNummer];
    if (sitz.getBelegt() == false){
      sitz.setBelegt(true);
      console.log("Sitz " + sitz.getSitzNummer() + " wurde reserviert.");
    }
    else{
      console.log("Sitz " + sitz.getSitzNummer() + " ist bereits belegt.");
    }
  }

  public reserviereFreienSitz(): void {
    let freier_sitz: number = this.sitze.findIndex(sitz => sitz.getBelegt() == false);

    if (freier_sitz == -1){
      console.log("Es sind keine freien Sitze mehr vorhanden.");
    }
    else{
      this.reserviereSitz(freier_sitz);
    }
  }
}

@Component({
  selector: 'app-kinosaal',
  templateUrl: './kinosaal.component.html',
  styleUrls: ['./kinosaal.component.css']
})
export class KinosaalComponent {

  public kinosaal: Kinosaal;

  constructor(){
    this.kinosaal = new Kinosaal(38, 11);
    this.kinosaal.reserviereSitz(5);
    this.kinosaal.reserviereSitz(5);
    this.kinosaal.reserviereFreienSitz();

    for (let i = 0; i < 5; i++) {
      this.kinosaal.reserviereFreienSitz();
    }
  }

}
