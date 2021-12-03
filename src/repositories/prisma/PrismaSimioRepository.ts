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

    async create({dna, isSimian}: Simio): Promise<Simio> {
        const simio = await prismaClient.simio.create({
            data: {
                dna,
                isSimian
            }
        });
        return simio;
    }

    async stats(): Promise<object> {
        //Precisei utilizar um hack para calcular o ratio de mutantxhuman
        let count_mutant_dna;
        let count_human_dna;
        let ratio;

        await prismaClient.simio.groupBy({
            by: ['isSimian'],
            _count: {
                isSimian: true,
            }
        }).then(item => {
            item.forEach(item => {
                if (item.isSimian == true) {
                    count_mutant_dna = item._count.isSimian
                } else {
                    count_human_dna = item._count.isSimian
                }
            })
        });

        if(typeof count_mutant_dna != 'undefined' && typeof count_human_dna != 'undefined') {
            ratio = (count_mutant_dna/count_human_dna).toFixed(2)
        } else {
            if(typeof count_mutant_dna == 'undefined') {
                ratio = count_human_dna
                count_mutant_dna = 0
            } else if (typeof count_human_dna == 'undefined') {
                ratio = count_mutant_dna
                count_human_dna = 0
            } else {
                ratio = (count_mutant_dna/count_human_dna).toFixed(2)
            }
        }

        return {
            count_mutant_dna,
            count_human_dna,
            ratio
        }
    }
}

export { PrismaSimioRepository };
