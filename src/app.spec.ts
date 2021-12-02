import {app} from "./app";

const request = require("supertest");

describe('Teste Api Simio - Mercado Livre', () => {
	it('should checarStats', async () => {
		const res = await request(app).get("/stats");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("count_mutant_dna");
		expect(res.body).toHaveProperty("count_human_dna");
		expect(res.body).toHaveProperty("ratio");
	});

	it('should isSimian dna already exists', async () => {
		const res = await request(app).post("/simian").send({
			dna: ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"]
		});
		expect(res.status).toEqual(403);
		expect(res.body).toEqual({message: "Esse DNA ja foi processado"});
	});

});
