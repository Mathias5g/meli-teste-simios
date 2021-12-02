import prismaClient from "../database/client";
import {Request, Response} from "express";
import {Utils} from '../utils/Utils';

const hash = require('object-hash');

class SimioController {
	async isSimian(request: Request, response: Response) {
		const {dna} = request.body;
		let utils = new Utils();
		let dnaProcessado = await utils.verificarDna(hash(dna))
		let validaDna = new Utils().validarDna(dna)

		if (!validaDna) {
			return response.status(403).send({message: "DNA incorreto"});
		}

		if (dnaProcessado) {
			return response.status(403).send({message: "Esse DNA ja foi processado"});
		}

		//cobrir
		return utils.mapearDna(dna).then(res => {
			if (!res) {
				utils.salvarDna(hash(dna), 0, 1);
				return response.status(403).send({message: "DNA de humano encontrado"});
			}

			utils.salvarDna(hash(dna), 1, 0); //ate aqui
			return response.status(200).send({message: "DNA de Simeo encontrado"});
		});
	}

	async checarStats(request: Request, response: Response) {
		let res = await prismaClient.simio.aggregate({
			_sum: {
				count_mutant_dna: true,
				count_human_dna: true
			}
		});

		let count_mutant_dna = res._sum.count_mutant_dna;
		let count_human_dna = res._sum.count_human_dna;
		// @ts-ignore
		let ratio = (count_mutant_dna / count_human_dna).toFixed(2);

		return response.send({
			count_mutant_dna,
			count_human_dna,
			ratio
		}).status(200);
	}
}

export {SimioController};
