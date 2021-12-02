import prismaClient from "../../database/client";
import { Simio } from "../../entities/Simio";
import { ISimiosRepository } from "../ISimiosRepositories";


class PrismaSimioRepository implements ISimiosRepository {
    async exists(dna: string): Promise<boolean> {
        const simio = await prismaClient.simio.findUnique({
            where: {
                dna
            }
        });

        return !!simio;
    }

    async create({dna, isSimion, isHuman}: Simio): Promise<Simio> {
        const simio = await prismaClient.simio.create({
            data: {
                dna,
                count_mutant_dna: isSimion,
                count_human_dna: isHuman
            }
        });

        return simio;
    }
}

export { PrismaSimioRepository };
