import { Component } from '@angular/core';

export class Sitz {
	private sitzNummer: number;
	private belegt: boolean;
	private loge: boolean;
	private parkett: boolean;

	constructor() {
		this.sitzNummer = 0;
		this.belegt = false;
		this.loge = false;
		this.parkett = false;
	}

	public istLoge(): boolean {
		return this.loge;
	}
	public setLoge(loge: boolean): void {
		this.loge = loge;
	}

	public istParkett(): boolean {
		return this.parkett;
	}
	public setParkett(parkett: boolean): void {
		this.parkett = parkett;
	}

	public getSitzNummer(): number {
		return this.sitzNummer;
	}
	public setSitzNummer(sitz: number): void {
		this.sitzNummer = sitz;
	}

	public istBelegt(): boolean {
		return this.belegt;
	}
	public setBelegt(belegt: boolean): void {
		this.belegt = belegt;
	}
}

export class SitzData{
	belegt: boolean = false;
	sitz: number = 0;
}
export class Kinosaal{
	sitze: Sitz[] = [];
	anzahlSitze: number = 0;
	raumNummer: number = 0;


	public create(raumNummer: number, sitze: number): void {
		
		this.raumNummer = raumNummer;

		this.sitze = [];

		const logeSitze = 4;
		const parkettSitze = 6;

		let sitzCounter: number = 0;
		for (let loge = 0; loge < logeSitze; loge++){
			let sitz: Sitz = new Sitz();
			sitz.setSitzNummer(sitzCounter + 1);
			sitz.setBelegt(false);
			sitz.setLoge(true);

			this.sitze.push(sitz);
			sitzCounter++;
		}
		for (let i = 0; i < sitze - (logeSitze + parkettSitze); i++) {
			let sitz: Sitz = new Sitz();
			sitz.setSitzNummer(sitzCounter + 1);
			sitz.setBelegt(false);

			this.sitze.push(sitz);
			sitzCounter++;
		}
		for (let parkett = 0; parkett < parkettSitze; parkett++){
			let sitz: Sitz = new Sitz();
			sitz.setSitzNummer(sitzCounter + 1);
			sitz.setBelegt(false);
			sitz.setParkett(true);

			this.sitze.push(sitz);
			sitzCounter++;
		}
		this.anzahlSitze = this.sitze.length;
	}
	constructor(raumNummer: number, sitze: number) {
		this.create(raumNummer, sitze);
	}

	public reserviereSitz(sitzNummer: number): void {
		let sitz: Sitz = this.sitze[sitzNummer];
		if (sitz.istBelegt() == false) {
			sitz.setBelegt(true);
		}
	}
	public reserviereFreienSitz(): void {
		let freier_sitz: number = this.sitze.findIndex(sitz => sitz.istBelegt() == false);

		if (freier_sitz != -1) { 
			this.reserviereSitz(freier_sitz);
		}
	}
	public reserviereAneinanderliegendeSitze(sitze: number): void {
        if (sitze == 0){
            return;
        }
		let freieSitze: number = 0;
		for (let i = 0; i < this.anzahlSitze; i++) {
			if (this.sitze[i].istBelegt() == false) {
				freieSitze++;

				if (freieSitze >= sitze) {
					for (let j = sitze; j >= 0; j--) {
						this.sitze[i - j].setBelegt(true);
					}
					return;
				}
			}
			else {
				freieSitze = 0;
			}
		}
	}

	public getBelegteReihen(): SitzData[][] {

		let loge: SitzData[] = [];
		let parkett: SitzData[] = [];
		let normal: SitzData[] = [];
		for (let i = 0; i < this.anzahlSitze; i++) {
			
			let sitz: SitzData = new SitzData();
			sitz.belegt = this.sitze[i].istBelegt();
			sitz.sitz = this.sitze[i].getSitzNummer();

			if (this.sitze[i].istLoge()) {
				loge.push(sitz);
			}
			else if (this.sitze[i].istParkett()) {
				parkett.push(sitz);
			}
			else {
				normal.push(sitz);
			}
		}
		let result: SitzData[][] = [];
		result.push(loge);
		result.push(normal);
		result.push(parkett);
		return result;
	}
}

@Component({
	selector: 'app-kinosaal',
	templateUrl: './kinosaal.component.html',
	styleUrls: ['./kinosaal.component.css']
})
export class KinosaalComponent {

	public kinosaal: Kinosaal;
	seatData: SitzData[][] = [];
  	seatTypes = ['loge', 'normal', 'parkett'];

	public reset(): void {
		this.kinosaal = new Kinosaal(38, 19);
		this.seatData = this.kinosaal.getBelegteReihen();
	}
	public reserviereFreienSitz(): void {
		this.kinosaal.reserviereFreienSitz();
		this.seatData = this.kinosaal.getBelegteReihen();
	}
	public reserviere(input:String): void {
		let sitz: number = Number(input);
		this.kinosaal.reserviereSitz(sitz - 1);
		this.seatData = this.kinosaal.getBelegteReihen();
	}
	public reserviereReihe(input:String): void {
		let reihen: number = Number(input);
		this.kinosaal.reserviereAneinanderliegendeSitze(reihen);
		this.seatData = this.kinosaal.getBelegteReihen();
	}

	constructor() {
		this.kinosaal = new Kinosaal(38, 19);
		this.seatData = this.kinosaal.getBelegteReihen();
	}

}
