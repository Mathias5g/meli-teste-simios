class Simio {
    id?: number;
    dna: string;
    isSimion?: number;
    isHuman?: number;

    private constructor({dna, isSimion, isHuman}: Simio) {
        return Object.assign(this, {
            dna,
            isSimion,
            isHuman
        })
    }

    static create({dna, isSimion, isHuman}: Simio) {
        return new Simio({dna, isSimion, isHuman});
    }
}

export { Simio };
