import express, {Request, Response} from "express";

const app = express();
app.use(express.json());


const dnaX = [
    "CTGAGA",
    "CTAAGC",
    "TATTGT",
    "AGAGGG",
    "CCCCTA",
    "TCACTG"
];

const dnaY = [
    "ATGCGA",
    "CAGTGC",
    "TTATTT",
    "AGACGG",
    "GCGTCA",
    "TCACTG"
];

app.post("/simian", (request: Request, response: Response) => {
    const { dna } = request.body
    isSimian(dna).then(res => {
        if(res) {
            let valido = res[0];
            let mensagem = res[1];

            if(!valido) {
                return response.status(403).json({message: mensagem});
            }

            return response.status(200).json({message: mensagem});
        }
    })
});

async function isSimian(dna: string[]) {

    if(!validarDna(dna)) {
        return [false, "DNA incorreto"];
    }

    return mapearDna(dna).then(res => {
        if(!res) {
            return [false, "DNA de humano encontrado"];
        }
        return [true, "DNA de simeo encontrado"];
    });
}

//Funcao para validar se uma sequencia e valida
function validarDna(sequenciaDna: string[]) {
    let dnaValido = true;
    for (let i = 0; i < sequenciaDna.length; i++) {
        if(!checarSequencia(sequenciaDna[i])) {
            return dnaValido = false;
        }
    }
    return dnaValido;
}

//Funcao que mapeia direcoes horizontais, verticais e diagnonais
async function mapearDna(sequenciaDna: string[]) {
    let listaHorizontal = sequenciaDna;
    let listaVertical = [];
    let dnaSimio = []
    let diagonalEsquerda = [];
    let diagonalDireita = []

    //valida o dna na horizontal
    for (let i = 0; i < listaHorizontal.length; i++) {
        let dnaHorizontalSimio = await validarSequenciaSimio(listaHorizontal[i]);
        if(dnaHorizontalSimio) dnaSimio.push(`H >>> ${listaHorizontal[i]}`);
    }

    //organiza os itens na vertical
    for (let i = 0; i < sequenciaDna.length; i++) {
        let sequenciaVertical = "";
        sequenciaDna.forEach(sequencia => {
            sequenciaVertical = sequenciaVertical.concat(sequencia.charAt(i))
        });
        listaVertical.push(sequenciaVertical);
    }

    //valida o dna na vertical
    for (let i = 0; i < listaHorizontal.length; i++) {
        let dnaVerticalSimio = await validarSequenciaSimio(listaVertical[i]);
        if(dnaVerticalSimio) dnaSimio.push(`V >>> ${listaVertical[i]}`)
    }

    //organiza itens na diagonal esquerda para direita
    for (let i = 0; i < sequenciaDna.length; i++) {
        let leftDiagonalSequenceHorizontal = sequenciaDna[0].charAt(i)
        let nextPosition = i + 1
        while (nextPosition < sequenciaDna.length) {
            leftDiagonalSequenceHorizontal = leftDiagonalSequenceHorizontal.concat(sequenciaDna[nextPosition].charAt(nextPosition))
            nextPosition++
        }
        diagonalEsquerda.push(leftDiagonalSequenceHorizontal)
    }

    for (let i = 1; i < sequenciaDna.length; i++) {
        let leftDiagonalSequenceVertical = sequenciaDna[1].charAt(i - 1)
        let nextPosition = i + 1
        while (nextPosition < sequenciaDna.length) {
            leftDiagonalSequenceVertical = leftDiagonalSequenceVertical.concat(sequenciaDna[nextPosition].charAt(nextPosition - 1))
            nextPosition++
        }
        diagonalEsquerda.push(leftDiagonalSequenceVertical)
    }

    //valida o dna na diagonal esquerda
    for (let i = 0; i < listaHorizontal.length; i++) {
        let dnaDiagonalEsquerdaSimio = await validarSequenciaSimio(diagonalEsquerda[i]);
        if(dnaDiagonalEsquerdaSimio) dnaSimio.push(`DE >>> ${diagonalEsquerda[i]}`)
    }

    //organiza itens na diagonal direita para esquerda
    for (let k = sequenciaDna.length - 1; k >= 0; k--) {
        let rightDiagonalSequenceHorizontal = sequenciaDna[0].charAt(k)
        let nextDnaSequencePosition = 1
        let nextNitrogenBasePosition = k - 1
        while (nextDnaSequencePosition < sequenciaDna.length && nextNitrogenBasePosition >= 0) {
            rightDiagonalSequenceHorizontal = rightDiagonalSequenceHorizontal.concat(sequenciaDna[nextDnaSequencePosition].charAt(nextNitrogenBasePosition))
            nextDnaSequencePosition++
            nextNitrogenBasePosition--
        }
        diagonalDireita.push(rightDiagonalSequenceHorizontal)
    }

    for (let i = 1; i < sequenciaDna.length; i++) {
        let rightDiagonalSequenceVertical = sequenciaDna[i].charAt(sequenciaDna.length - 1)
        let nextDnaSequencePosition = i + 1
        let nextNitrogenBasePosition = sequenciaDna.length - 2
        while (nextDnaSequencePosition < sequenciaDna.length && nextNitrogenBasePosition >= 0) {
            rightDiagonalSequenceVertical = rightDiagonalSequenceVertical.concat(sequenciaDna[nextDnaSequencePosition].charAt(nextNitrogenBasePosition))
            nextDnaSequencePosition++
            nextNitrogenBasePosition--
        }
        diagonalDireita.push(rightDiagonalSequenceVertical)
    }

    //valida o dna na diagonal direita
    for (let i = 0; i < listaHorizontal.length; i++) {
        let dnaDiagonalDireitaSimio = await validarSequenciaSimio(diagonalDireita[i]);
        if(dnaDiagonalDireitaSimio) dnaSimio.push(`DD >>> ${diagonalDireita[i]}`)
    }

    return dnaSimio.length > 0;

}

function checarSequencia(sequencia: string) {
    let regex = new RegExp(/^[ATGC]*$/gm);
    return regex.test(sequencia);
}

async function validarSequenciaSimio(sequencia: string) {
    let regex = new RegExp(/.*?(?=AAAA)|(?=TTTT)|(?=CCCC)|(?=GGGG)/gm)
    return regex.test(sequencia);
}

app.listen(4000, () => console.log('Server is running on PORT 4000'));
