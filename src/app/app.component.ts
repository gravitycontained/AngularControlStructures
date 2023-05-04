import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title: String = 'School';
	aufgabe_84_2_target: number = 0;
	aufgabe_84_2_guesses: number = 0;

	constructor() { }

	randomize_target(){
		this.aufgabe_84_2_target = Math.round(Math.random() * 99 + 1);
		this.aufgabe_84_2_guesses = 0;
	}

	ngOnInit(): void { 
		this.randomize_target();
	}

	isValidNumberString(str: string): boolean {
		const num = parseFloat(str);
		return Number.isFinite(num);
	}
	clamp(value: number, min :number, max :number): number {
		return Math.max(min, Math.min(value, max));
	}
	//76.1 a)
	aufgabe_76_1_range_a(): string{
		let result: string = "";
		for (let i = 1; i < 5; i++){
			result += String(i) + " ";
		}
		return result;
	}
	//76.1 b)
	aufgabe_76_1_range_b(): string{
		let result: string = "";
		for (let i = 3; i < 5; i++){
			result += String(i) + " ";
		}
		return result;
	}
	//76.1 c)
	aufgabe_76_1_range_c(): string{
		let result: string = "";
		for (let i = 0; i < 100; i += 2){
			result += String(i) + " ";
		}
		return result;
	}


    //76.2
	aufgabe_76_2_animals(): string{
		const animals: string[] = ["tiger", "mouse", "bird", "python", "elephant", "monkey"];

		let result: string = "";
        for (const animal of animals) {
			result += `'${animal}' ist ein Tier.\n`;
        }
		return result;
	}

	//76.3
	aufgabe_76_3_word_list: string[] = [];

	aufgabe_76_3_words_add(input: string): void {
		this.aufgabe_76_3_word_list.push(input);
	}

	aufgabe_76_3_words_clear(): void {
		this.aufgabe_76_3_word_list = [];
	}

	aufgabe_76_3_words(): string {
		let result: string = "";
		for (let i = 0; i < this.aufgabe_76_3_word_list.length; i++){
			result +=  `words[${i}] = ${this.aufgabe_76_3_word_list[i]}\n`;
		}
		return result;
	}




	aufgabe_79_1_result: string = "";

	aufgabe_79_1(input: string): void {
		if (!this.isValidNumberString(input)) {
			this.aufgabe_79_1_result = 'The input is not a valid number.';
			return;
		} 

		const inputNumber: number = Number(input);

		if (inputNumber > 10) {
			this.aufgabe_79_1_result = 'The number is greater than 10.';
		} 
		else {
			this.aufgabe_79_1_result = 'The number is not greater than 10.';
		}
	}

	aufgabe_79_2_numbers: number[] = [];

	//79.2
	aufgabe_79_2_add(input: string): void {
		if (this.isValidNumberString(input)) {
			const inputNumber: number = Number(input);
			this.aufgabe_79_2_numbers.push(inputNumber);
		}
	}
	aufgabe_79_2_clear(): void {
		this.aufgabe_79_2_numbers = [];
	}
	aufgabe_79_2(): string {
		if (this.aufgabe_79_2_numbers.length == 0){
			return "";
		}
		let min: number = Number.MAX_VALUE;
		let max: number = Number.MIN_VALUE;

		for (let i = 0; i < this.aufgabe_79_2_numbers.length; i++){
			const current = this.aufgabe_79_2_numbers[i];
			if (min > current){
				min = current;
			}
			if (max < current){
				max = current;
			}
		}
		return "min = " + min + ", max = " + max;
	}

	
	aufgabe_79_3_result: string = "";

	aufgabe_79_3(input: string): void {
		if (!this.isValidNumberString(input)) {
			this.aufgabe_79_3_result = 'The input is not a valid number.';
			return;
		} 

		const inputNumber: number = Number(input);
		let is_prime: boolean = false;

		if (inputNumber % 400 == 0){
			is_prime = true;
		}
		else if (inputNumber % 100 == 0){
			is_prime = false;
		}
		else if (inputNumber % 4 == 0){
			is_prime = true;
		}


		if (is_prime) {
			this.aufgabe_79_3_result = "The number " + inputNumber + " is a leap year.";
		} 
		else {
			this.aufgabe_79_3_result = "The number " + inputNumber + " is not a leap year.";
		}
	}

	aufgabe_79_4_grade_result: string = "";

	aufgabe_79_4_grade(grade: string, darkEyeColor: boolean, longHair: boolean, niceWeather: boolean, hasSushi: boolean, isStrong: boolean): void {
		if (!grade) {
			this.aufgabe_79_4_grade_result = 'Please enter a grade.';
			return;
		}
	
		let gradeNumber: number = Number(grade);
	
		if (gradeNumber < 1 || gradeNumber > 6) {
			this.aufgabe_79_4_grade_result = 'Please enter a valid grade (1-6).';
			return;
		}

		const factor:number = 0.1;

		if (darkEyeColor){
			if (longHair){
				gradeNumber *= (1 - factor);
			}
			else{
				gradeNumber *= (1 + factor);
			}
		}
		else{
			if (longHair){
				gradeNumber *= (1 + factor);
			}
			else{
				gradeNumber *= (1 - factor);
			}
		}

		if (niceWeather){
			gradeNumber -= 0.5;
		}
		if (hasSushi){
			gradeNumber -= 1.0;
		}
		if (isStrong){
			gradeNumber -= 0.5;
		}
	
		gradeNumber = this.clamp(gradeNumber, 1, 6);

		gradeNumber = Math.round(gradeNumber * 2) / 2;
		this.aufgabe_79_4_grade_result = `Grade: ${gradeNumber}`;
	}	
	
	aufgabe_83_1(): string{

		let result: string = "";
		let n: number = 1;
		while(n < 100) {
			result += String(n) + " ";
			n++;
		}
		return result;
	}


	aufgabe_83_2_result: string = "";
	aufgabe_83_2(input: string): void {
		if (!this.isValidNumberString(input)) {
			this.aufgabe_83_2_result = 'The input is not a valid number.';
			return;
		} 
	
		let capital: number = Number(input);
		let years = 0;

		const rate = 0.1;
		while (capital < Math.pow(10, 7)){
			capital *= (1 + rate);
			years++;
		}
	
		this.aufgabe_83_2_result = `You need to wait ${years} years.`;
	}

	
	aufgabe_83_3_result: string = "";
	aufgabe_83_3(cash: string, year: string): void {
		if (!this.isValidNumberString(cash)) {
			this.aufgabe_83_3_result = 'The cash value is not a valid number.';
			return;
		} 
		if (!this.isValidNumberString(year)) {
			this.aufgabe_83_3_result = 'The year value is not a valid number.';
			return;
		} 
	
		let cash_number: number = Number(cash);
		let year_number: number = Number(year);

		this.aufgabe_83_3_result = "";
		const depreciation = cash_number / year_number;
		while (year_number){
			cash_number -= depreciation;
			year_number--;

			this.aufgabe_83_3_result += `Year ${year_number}: ${cash_number.toFixed(2)}$\n`;
		}
	}

	
	aufgabe_83_4_result: string = "";
	aufgabe_83_4(): void {
		this.aufgabe_83_4_result = "";
		while (true){
			const roll = Math.round(Math.random() * 5 + 1);

			this.aufgabe_83_4_result += `Rolled a ${roll}\n`;

			if (roll == 6){
				this.aufgabe_83_4_result += `finished`;
				break;
			}
		}
	}
	
	aufgabe_84_1_result: string = "";
	aufgabe_84_1(): void {

		const dice: number[] = [0, 0, 0, 0, 0, 0];
		let sum: number = 0;

		this.aufgabe_84_1_result = "";
		while (true){
			const roll = Math.round(Math.random() * 5 + 1);
			dice[roll - 1]++;
			sum += roll;


			if (sum >= 100){
				this.aufgabe_84_1_result += `Sum = ${sum}\n`;
				for (let i = 0; i < dice.length; i++){
					this.aufgabe_84_1_result += `${i + 1}: ${dice[i]}\n`;
				}
				break;
			}
		}
	}
	
	aufgabe_84_2_result: string = "";
	aufgabe_84_2(input: string): void {
		if (!this.isValidNumberString(input)) {
			this.aufgabe_84_2_result = 'not a valid number.';
			return;
		} 
		
		const max_guess:number = 7;
		const guess: number = Number(input);
		if (guess == this.aufgabe_84_2_target){
			this.aufgabe_84_2_result = `${input} was the target!`;
			this.randomize_target();
			return;
		}
		else if (guess < this.aufgabe_84_2_target){
			this.aufgabe_84_2_result = `(${this.aufgabe_84_2_guesses + 1} / ${max_guess}) the target is bigger than ${input}.`;
		}
		else if (guess > this.aufgabe_84_2_target){
			this.aufgabe_84_2_result = `(${this.aufgabe_84_2_guesses + 1} / ${max_guess}) the target is smaller than ${input}.`;
		}

		
		this.aufgabe_84_2_guesses++;
		if (this.aufgabe_84_2_guesses >= max_guess){
			this.aufgabe_84_2_result = 'Out of guesses! Try again.';
			this.randomize_target();
		}
	}

	aufgabe_84_3_numbers: number[] = [];
	aufgabe_84_3_result: string = "";

	aufgabe_84_3(userNumbers: string[]): void {
		if (userNumbers.length !== 6 || !this.areValidLottoNumbers(userNumbers)) {
			this.aufgabe_84_3_result = 'Please enter 6 valid 2-digit numbers (1-49).';
			return;
		}

		this.generateLottoNumbers();
		const matchedNumbers = this.getMatchedNumbers(userNumbers);
		
		const matchedCount = matchedNumbers.length;
		this.aufgabe_84_3_result = `Lotto Numbers: ${this.aufgabe_84_3_numbers.join(", ")}.`;
		this.aufgabe_84_3_result += '\n\n';
		this.aufgabe_84_3_result += `You matched ${matchedCount} number(s): ${matchedNumbers.join(", ")}`;
	}

	generateLottoNumbers(): void {
		const uniqueNumbers = new Set<number>();
		while (uniqueNumbers.size < 6) {
			const newNumber = Math.round(Math.random() * 48 + 1);
			uniqueNumbers.add(newNumber);
		}
		this.aufgabe_84_3_numbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
	}
	

	getMatchedNumbers(userNumbers: string[]): number[] {
		const matchedNumbers: number[] = [];
		for (const num in userNumbers){
			const userNum = Number(num);
			if (this.aufgabe_84_3_numbers.includes(userNum)) {
			  matchedNumbers.push(userNum);
			}
		}
		return matchedNumbers;
	}
	areValidLottoNumbers(numbers: string[]): boolean {
		const uniqueNumbers = new Set();
		
		for (const numStr of numbers) {
			if (numStr.length == 0){
				return false;
			}
			if (!this.isValidNumberString(numStr)) {
				return false;
			}
			const num = Number(numStr);
	
			// Check if the number is in the valid range
			if (isNaN(num) || num < 1 || num > 49) {
				return false;
			}
	
			// Check if the number is unique
			if (uniqueNumbers.has(num)) {
				return false;
			}
	
			uniqueNumbers.add(num);
		}
	
		return true;
	}
	

	aufgabe_84_4_result: string = "";

	isPrime(input: number): boolean {
		if (input < 2) {
			return false;
		}
		const stop: number = Math.sqrt(input);
		for (let i = 2; i <= stop; i++) {
			if (input % i == 0) {
				return false;
			}
		}
		return true;
	}

	aufgabe_84_4(input: string): void {
		if (!this.isValidNumberString(input)) {
			this.aufgabe_84_4_result = 'The input is not a valid number.';
			return;
		} 

		const inputNumber: number = Number(input);
		this.aufgabe_84_4_result = "Primes = ";
		for (let i = 2; i < inputNumber; i++) {
			if (this.isPrime(i)) {
				this.aufgabe_84_4_result += `${i} `;
			}
		}
	}
	
}