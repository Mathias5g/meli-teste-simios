import { Simio } from "../entities/Simio";

interface ISimiosRepository {
    create(simio: Simio): Promise<Simio>
    exists(dna: string): Promise<Boolean>
    stats(): Promise<object>
}

export { ISimiosRepository }
