import prismaClient from "../prisma";
import {Request, Response} from "express";
import {Utils} from '../utils/Utils';

const hash = require('object-hash');

class SimioController {
	async isSimian(request: Request, response: Response) {
		const {dna} = request.body;
		let dnaProcessado = await new Utils().verificarDna(hash(dna))
		let validaDna = new Utils().validarDna(dna)

		if (!validaDna) {
			return response.status(403).send({message: "DNA incorreto"});
		}

		if (dnaProcessado) {
			return response.status(403).send({message: "Esse DNA ja foi processado"});
		}

		//cobrir
		return new Utils().mapearDna(dna).then(res => {
			if (!res) {
				new Utils().salvarDna(hash(dna), false);
				return response.status(403).send({message: "DNA de humano encontrado"});
			}

			new Utils().salvarDna(hash(dna), true); //ate aqui
			return response.status(200).send({message: "DNA de Simeo encontrado"});
		});
	}

	async checarStats(request: Request, response: Response) {
		let stats;

		let contagem = await prismaClient.simio.groupBy({
			by: ['simio'],
			_count: {
				simio: true
			},
		});
		//cobrir
		let count_mutant_dna = 1;
		let count_human_dna = 2;
		let ratio = (count_human_dna / count_mutant_dna);

		stats = {
			count_mutant_dna,
			count_human_dna,
			ratio: ratio.toFixed(2)
		}; //ate aqui

		return response.send({result: stats}).status(200);
	}
}

export {SimioController};