let dna = [
    "CTGAGA",
    "CTGAGC",
    "TATTGT",
    "AGAGGG",
    "CCCCTA",
    "TCACTG"
];

/*
- O programa devera conter uma assinatura que recebera um array de string que ira representar cada linha de uma tabela
quadrada
*/

isSimian(dna);

async function isSimian(arrayDna: string[]) {
    const processamento = await processarDna(arrayDna);
    const statusProcessamento = processamento[0];
    const mensagemProcessamento = processamento[1];
    const simioEncontrado = processamento[2];
    const arrayColuna = processamento[3];

    if(!statusProcessamento) {
        console.log(mensagemProcessamento);
        return false;
    }

    console.log(simioEncontrado);

    return statusProcessamento;
}

async function processarDna(arrayValido: string[]) {
    let arrayDna = arrayValido;
    let quantidadeLinhas = arrayValido.length;
    let simioEncontrado: string[] = [];
    let arrayColuna: string[] = [];
    let arrayDiagonalDParaE = [];
    let arrayDiagonalEParaD = [];

    let mensagem = '';

    //validar sequencia
    for (let nLinha = 0; nLinha < arrayDna.length; nLinha++) {
        let sequencia = arrayDna[nLinha];

        if(!validarSequencialDna(sequencia)) {
            mensagem = `Caracteres invalidos na sequencia ${sequencia}`
            return [false, mensagem, [], []];
        }

        let arrayLinhaColuna = sequencia.split("");
        for (let i = 0; i < arrayLinhaColuna.length; i++) {
            if(arrayColuna.hasOwnProperty(i)) {
                arrayColuna[i] = arrayColuna[i] + arrayLinhaColuna[i];
            } else {
                arrayColuna[i] = arrayLinhaColuna[i];
            }
        }
    }

    for (let nLinha = 0; nLinha < arrayDna.length; nLinha++) {
        let sequenciaLinha = arrayDna[nLinha];
        let sequenciaColuna= arrayColuna[nLinha];

        //valida sequencia na horizontal
        let validaSequenciaLinha = await sequenciaSimioEncontrada(sequenciaLinha);
        if(validaSequenciaLinha) {
            simioEncontrado.push(`H >>> ${sequenciaLinha}`);
        }

        let validaSequenciaColuna = await sequenciaSimioEncontrada(sequenciaColuna);
        if(validaSequenciaColuna) {
            simioEncontrado.push(`V >>> ${sequenciaColuna}`);
        }

    }

    mensagem = "DNA formatado";

    return [true, mensagem, simioEncontrado, arrayColuna];
}

async function sequenciaSimioEncontrada(sequencia: string) {
    return new Promise(function (resolve, reject) {
        var regex = new RegExp(/.*?(?=AAAA)|(?=TTTT)|(?=CCCC)|(?=GGGG)/gm)
        resolve(regex.test(sequencia.toUpperCase()));
    });
}

function validarSequencialDna(sequencia: string) {
    var regex = new RegExp(/^[ATCG]*$/gm);
    return regex.test(sequencia);
}



