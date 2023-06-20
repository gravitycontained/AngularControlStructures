import { Component } from '@angular/core';


export abstract class Sitz {
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

	public istBelegt(): boolean {
		return this.belegt;
	}
	public setBelegt(belegt: boolean): void {
		this.belegt = belegt;
	}

    public abstract getName(): string;
}

export class Loge extends Sitz {
    constructor() {
        super();
    }

    public override getName(): string {
        return "Loge";
    }
}

export class Parkett extends Sitz {
    constructor() {
        super();
    }
    public override getName(): string {
        return "Parkett";
    }
}

export class Normal extends Sitz {
    constructor() {
        super();
    }
    public override getName(): string {
        return "Normal";
    }
}


export class SitzData{
	belegt: boolean = false;
	sitzNummer: number = 0;
}
export class Saal{
	protected sitze: Sitz[] = [];
	protected anzahlSitze: number = 0;
	protected raumNummer: number = 0;
    protected leinwandGröße: number = 0;
    protected dolbySystem: string = "";


	public create(raumNummer: number, sitze: number, leinwandGröße : number, dolbySystem : string): void {
		
		this.setRaumNummer(raumNummer);
        this.setLeinwandGröße(leinwandGröße);
        this.setDolbySystem(dolbySystem);

		this.sitze = [];

		const logeSitze = 4;
		const parkettSitze = 6;

		let sitzCounter: number = 0;
		for (let loge = 0; loge < logeSitze; loge++){
            let logeSitz: Loge = new Loge();
			logeSitz.setSitzNummer(sitzCounter + 1);
			logeSitz.setBelegt(false);

			this.sitze.push(logeSitz);
			sitzCounter++;
		}
		for (let i = 0; i < sitze - (logeSitze + parkettSitze); i++) {
            let normalSitz: Normal = new Normal();
			normalSitz.setSitzNummer(sitzCounter + 1);
			normalSitz.setBelegt(false);

			this.sitze.push(normalSitz);
			sitzCounter++;
		}
		for (let parkett = 0; parkett < parkettSitze; parkett++){
			let parketSitz: Parkett = new Parkett();
			parketSitz.setSitzNummer(sitzCounter + 1);
			parketSitz.setBelegt(false);

			this.sitze.push(parketSitz);
			sitzCounter++;
		}
		this.anzahlSitze = this.sitze.length;
	}
	constructor(raumNummer: number, sitze: number, leinwandGröße : number, dolbySystem : string) {
		this.create(raumNummer, sitze, leinwandGröße, dolbySystem);
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
			sitz.sitzNummer = this.sitze[i].getSitzNummer();

            if (this.sitze[i].getName() == "Loge") {
                loge.push(sitz);
            }
            else if (this.sitze[i].getName() == "Parkett") {
                parkett.push(sitz);
            }
            else if (this.sitze[i].getName() == "Normal") {
                normal.push(sitz);
            }
		}
		let result: SitzData[][] = [];
		result.push(loge);
		result.push(normal);
		result.push(parkett);
		return result;
	}

    public setRaumNummer(raumNummer: number): void {
        this.raumNummer = raumNummer;
    }

    public getRaumNummer(): number {
        return this.raumNummer;
    }

    public getLeinwandGröße(): number {
        return this.leinwandGröße;
    }

    public setLeinwandGröße(leinwandGröße: number): void {
        this.leinwandGröße = leinwandGröße;
    }

    public getDolbySystem(): string {
        return this.dolbySystem;
    }

    public setDolbySystem(dolbySystem: string): void {
        this.dolbySystem = dolbySystem;
    }

}

export class Kinosaal extends Saal{
	constructor(raumNummer: number, sitze: number, leinwandGröße : number, dolbySystem : string) {
        super(raumNummer, sitze, leinwandGröße, dolbySystem);
    }
}

export class Theatersaal extends Saal{
	constructor(raumNummer: number, sitze: number, leinwandGröße : number, dolbySystem : string) {
        super(raumNummer, sitze, leinwandGröße, dolbySystem);
    }
}


@Component({
	selector: 'app-kinosaal',
	templateUrl: './kinosaal.component.html',
	styleUrls: ['./kinosaal.component.css']
})
export class KinosaalComponent {

	public saal: Kinosaal;
	seatData: SitzData[][] = [];
  	seatTypes = ['loge', 'normal', 'parkett'];

	public reset(): void {
		this.saal = new Kinosaal(38, 19, 10, "Dolby Atmos");
		this.seatData = this.saal.getBelegteReihen();
	}
	public reserviereFreienSitz(): void {
		this.saal.reserviereFreienSitz();
		this.seatData = this.saal.getBelegteReihen();
	}
	public reserviere(input:String): void {
		let sitz: number = Number(input);
		this.saal.reserviereSitz(sitz - 1);
		this.seatData = this.saal.getBelegteReihen();
	}
	public reserviereReihe(input:String): void {
		let reihen: number = Number(input);
		this.saal.reserviereAneinanderliegendeSitze(reihen);
		this.seatData = this.saal.getBelegteReihen();
	}

	constructor() {
		this.saal = new Kinosaal(38, 19, 10, "Dolby Atmos");
		this.seatData = this.saal.getBelegteReihen();
	}

}
