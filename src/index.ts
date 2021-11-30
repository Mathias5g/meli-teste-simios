/*Criar uma assinatura que verifique se uma determinada sequencia é simio ou humano atraves de uma tabela
NxN onde encontrar uma ou mais sequencia de quatro caracteres na horizontal, vertical ou diagonal.

recebe como parametro um json na seguinte estrutura

dna = ["CTGAGA", "CTGAGC", "TATTGT", "AGAGGG", "CCCTA", "TCACTG"];

a sequencia so podera contar com A, T, C, G

DESAFIO
Desenvolver um metodo que esteja de acordo com a proposta isSimian

validar a sequencia
 */

const dnaX = [
    "CTGAGA",
    "CTGAGC",
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

isSimian(dnaX)

async function isSimian(dna: string[]) {

    if(!validarDna(dna)) {
        console.log("DNA incorreto");
        return;
    }

    mapearDna(dna);
    return validarDna(dna);
}

function validarDna(sequenciaDna: string[]) {
    let dnaValido = true;
    for (let i = 0; i < sequenciaDna.length; i++) {
        if(!checarSequencia(sequenciaDna[i])) {
            return dnaValido = false;
        }
    }
    return dnaValido;
}

async function mapearDna(sequenciaDna: string[]) {
    let listaHorizontal = sequenciaDna;
    let listaVertical = [];
    let dnaSimio = []
    let diagonalEsquerda = [];
    let diagonalDireita = []
    let concat = ""

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

    //organiza itens na diagonal esquerda
    const leftDiagonalSequences = []

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

}

function checarSequencia(sequencia: string) {
    let regex = new RegExp(/^[ATGC]*$/gm);
    return regex.test(sequencia);
}

async function validarSequenciaSimio(sequencia: string) {
    let regex = new RegExp(/.*?(?=AAAA)|(?=TTTT)|(?=CCCC)|(?=GGGG)/gm)
    return regex.test(sequencia);
}
