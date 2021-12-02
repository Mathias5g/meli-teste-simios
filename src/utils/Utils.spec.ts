import { Utils } from "./Utils";
const hash = require('object-hash');

describe("Teste Unitario - Utils", () => {
	let sut: Utils;
	beforeAll(() => {
		sut = new Utils();
	});

	it("verifica se a sequencia do dna é valida", () => {
		let dna = ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
		let valida = sut.validarDna(dna);
		expect(valida).toBeTruthy();
	});

	it("verifica se a sequencia do dna é não valida", () => {
		let dna = ["GBCCFG", "GBCCFG","GBCCFG", "GBCCFG","GBCCFG", "GBCCFG"];
		let valida = sut.validarDna(dna);
		expect(valida).toBeFalsy();
	});

	it("verifica se a sequencia do dna é de um simio", () => {
		let dna = ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"];
		let valida = sut.mapearDna(dna);
		expect(valida).toBeTruthy();
	});

	it("verifica se a sequencia do dna é de um humano", () => {
		let dna = ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
		let valida = sut.mapearDna(dna);
		expect(valida).toBeTruthy();
	});

	it("verifica se a sequencia do dna já foi processada", async () => {
		let dna = ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "CCCCCA", "TCACTG"];
		await sut.salvarDna(hash(dna), 1, 0);
		await expect(sut.verificarDna(hash(dna))).toBeTruthy();
	});

	it("verifica se a sequencia do dna não foi processada", async () => {
		let dna = ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "CCCCCA", "TCACTG"];
		await sut.salvarDna(hash(dna), 1, 0);
		await expect(sut.verificarDna(hash(dna))).toBeFalsy();
	});

});