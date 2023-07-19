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
export abstract class Saal{
	protected sitze: Sitz[] = [];
	protected anzahlSitze: number = 0;
	protected raumNummer: number = 0;


	public create(raumNummer: number, sitze: number): void {
		
		this.setRaumNummer(raumNummer);

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
	constructor(raumNummer: number, sitze: number) {
		this.create(raumNummer, sitze);
	}

    public abstract getInfos(): string;

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
}

export interface InformationsInterface{
    getInfos(): string;
}

export class Bistro implements InformationsInterface{
    
    public getInfos(): string {
        return "Bistro";
    }
}

export class Kinosaal extends Saal{
    private leinwandGröße: number = 0;
    private dolbySystem: string = "";
	constructor(raumNummer: number, sitze: number, leinwandGröße : number, dolbySystem : string) {
        super(raumNummer, sitze);
        this.setLeinwandGröße(leinwandGröße);
        this.setDolbySystem(dolbySystem);
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

    public override getInfos(): string {
        return "Leinwandgröße: " + this.leinwandGröße + " DolbySystem: " + this.dolbySystem;
    }
}

export class Theatersaal extends Saal{
    private bühnenGröße: number = 0;
	constructor(raumNummer: number, sitze: number, bühnenGröße : number) {
        super(raumNummer, sitze);
        this.setBühnenGröße(bühnenGröße);
    }

    public getBühnenGröße(): number {
        return this.bühnenGröße;
    }

    public setBühnenGröße(bühnenGröße: number): void {
        this.bühnenGröße = bühnenGröße;
    }
    
    public override getInfos(): string {
        return "Bühnengröße: " + this.bühnenGröße;
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
		this.saal = new Kinosaal(38, 19, 400, "Dolby Atmos");
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
		this.saal = new Kinosaal(38, 19, 400, "Dolby Atmos");
		this.seatData = this.saal.getBelegteReihen();
	}

}
