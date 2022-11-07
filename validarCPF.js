function multiplicarValores(c, digitos) {
    let soma = 0;
    for (let i = 0; i < digitos.length; i++) {
        const result = digitos[i] * c;
        soma += result;
        c--;
    };
    return soma;
}

function validarCPF(CPF) {
    if (!CPF || CPF.lenght < 11) return false;

    //set dados
    const cpf = CPF.replaceAll('.', '').replace('-', '');
    let digitosComuns = [];
    let digitosValidadores = [];
    for (let i = 0; i < cpf.length; i++) {
        i < 9 ? digitosComuns.push(cpf[i]) : digitosValidadores.push(cpf[i]);
    };

    /*Validação números iguais */
    let valid = true;
    for (let i = 0; i < cpf.length - 1; i++) {
        const num = cpf[i];
        const prox = cpf[i + 1];
        if (num != prox) {
            valid = true;
            break;
        } else {
            valid = false;
        };
    };
    if (!valid) return false;


    /*Validação 10º número*/
    let somaMultiplicacao = multiplicarValores(10, digitosComuns);
    const resto = (somaMultiplicacao * 10) % 11 === 10 ? 0 : (somaMultiplicacao * 10) % 11;
    const Valid10 = resto == digitosValidadores[0] ? true : false;

    if (!Valid10) return false;

    /*Validação 11º número*/
    digitosComuns.push(digitosValidadores[0]);
    somaMultiplicacao = multiplicarValores(11, digitosComuns);
    const resto2 = (somaMultiplicacao * 10) % 11 === 10 ? 0 : (somaMultiplicacao * 10) % 11;
    const Valid11 = resto2 == digitosValidadores[1] ? true : false;

    if (!Valid11) return false;

    return true;
};

export default validarCPF;
console.log(validarCPF('440.176.740-38'));
console.log(validarCPF('222.222.222-22'));