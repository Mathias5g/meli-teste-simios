import {Request, Response} from "express";
import {Utils} from '../utils/Utils';
import {PrismaSimioRepository} from "../repositories/prisma/PrismaSimioRepository";
import {ISimiosRepository} from "../repositories/ISimiosRepositories";

const hash = require('object-hash');

class SimioController {

	async isSimian(request: Request, response: Response): Promise<Response> {
		let salvarDna;
		const {dna} = request.body;
		const utils = new Utils();
		const simioRepository = new PrismaSimioRepository();
		const verificarDnaBancoDados = await simioRepository.exists(hash(dna));
		const mapearDna = await utils.mapearDna(dna);

		if (!utils.validarDna(dna)) {
			return response.status(403).json({message: "DNA incorreto"});
		}

		if (verificarDnaBancoDados) {
			return response.status(403).json({message: "Esse DNA ja foi processado"});
		}

		if (!mapearDna) {
			salvarDna = await simioRepository.create({dna: hash(dna), isSimian: false});
			return response.status(403).json(salvarDna);
		}

		salvarDna = await simioRepository.create({dna: hash(dna), isSimian: true});
		return response.status(200).json(salvarDna);

	}

	async checarStats(request:Request, response: Response): Promise<Response> {
		const simioRepository = new PrismaSimioRepository();
		let stats = await simioRepository.stats();
		return response.status(200).json(stats);
	}
}

export {SimioController};
