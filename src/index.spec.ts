import {app} from "./index";

const request = require("supertest");

describe('Teste Api Simio - Mercado Livre', () => {
	it('should checarStats', async () => {
		const res = await request(app).get("/stats");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("result");
	});

	it('should isSimian dna invalid', async () => {
		const res = await request(app).post("/simian").send({
			dna: ["CTGEGA", "CTAAGB", "TATTGT", "AGIGGG", "CCCCTA", "TCACTG"]
		});
		console.log(res.statusCode);
		expect(res.status).toEqual(403);
		expect(res.body).toEqual({message: "DNA incorreto"});
	});

	it('should isSimian dna already exists', async () => {
		const res = await request(app).post("/simian").send({
			dna: ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"]
		});
		expect(res.status).toEqual(403);
		expect(res.body).toEqual({message: "Esse DNA ja foi processado"});
	});

	it('should isSimian dna human', async () => {
		const res = await request(app).post("/simian").send({
			dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
		});
		expect(res.status).toEqual(403);
		expect(res.body).toEqual({message: "DNA de humano encontrado"});
	});

	it('should isSimian dna simion', async () => {
		const res = await request(app).post("/simian").send({
			dna: ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"]
		});
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({message: "DNA de Simeo encontrado"});
	});
});