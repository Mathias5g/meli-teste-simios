class Simio {
    id?: number;
    dna: string;
    isSimian: boolean;

    private constructor({dna, isSimian}: Simio) {
        return Object.assign(this, {
            dna,
            isSimian
        })
    }

    static create({dna, isSimian}: Simio) {
        return new Simio({dna, isSimian});
    }
}

export { Simio };
