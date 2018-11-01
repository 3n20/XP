function Formatter(result) {
    var confianca = {
        semConfianca: 0,
        confiancaBaixa: 0,
        confiacaMedia: 0,
        confiancaAlta: 0
    }

    for (i = 0; result.length > i; i++) {
        var confidence = parseFloat(result[i].confidence);
        if (confidence > 0.8) {
            confianca.confiancaAlta++;
        }

        else if (confidence > 0.6 &&  confidence< 0.8) {
            confianca.confiacaMedia++;
        }
        else if (confidence > 0.4 && confidence < 0.6) {
            confianca.confiancaBaixa++;
        }

        else if (confidence < 0.4) {
            confianca.semConfianca++;
        }
    }
    return confianca
}

module.exports = Formatter;