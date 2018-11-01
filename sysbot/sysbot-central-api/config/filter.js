result = { "pending": [], "settlement": [], "canceled": [], "finished": [], "lista": [], "count": 0 }
function Formatter(retorno) {
    for (i = 0; retorno.length > i; i++) {
        if (retorno[i].basketBonds[0].situation == 1) {
            result.count++
            result.lista.push('<li><a href="#" onclick="sendOpt(\''+ retorno[i].basketBonds[0].codeBonds +'\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + retorno[i].basketBonds[0].nameBonds + ' (' + retorno[i].basketBonds[0].buyDate + ') - R$ ' + retorno[i].basketBonds[0].bondsValue + '</a></li>')
            result.settlement.push({
                "buyDate": retorno[i].basketBonds[0].buyDate,
                "nameBonds": retorno[i].basketBonds[0].nameBonds,
                "codeBonds": retorno[i].basketBonds[0].codeBonds,
                "bondsValue": retorno[i].basketBonds[0].bondsValue
                //"string": retorno[i].basketBonds[0].nameBonds + " - " + retorno[i].basketBonds[0].buyDate
            })
        }
        else if (retorno[i].basketBonds[0].situation == 2) {
            result.count++
            result.lista.push('<li><a href="#" onclick="sendOpt(\''+ retorno[i].basketBonds[0].codeBonds +'\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + retorno[i].basketBonds[0].nameBonds + ' (' + retorno[i].basketBonds[0].buyDate + ') - R$ ' + retorno[i].basketBonds[0].bondsValue + '</a></li>')
            result.finished.push({
                "buyDate": retorno[i].basketBonds[0].buyDate,
                "nameBonds": retorno[i].basketBonds[0].nameBonds,
                "codeBonds": retorno[i].basketBonds[0].codeBonds,
                "bondsValue": retorno[i].basketBonds[0].bondsValue  
            })
        }
        else if (retorno[i].basketBonds[0].situation == 3) {
            result.count++
            result.lista.push('<li><a href="#" onclick="sendOpt(\''+ retorno[i].basketBonds[0].codeBonds +'\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + retorno[i].basketBonds[0].nameBonds + ' (' + retorno[i].basketBonds[0].buyDate + ') - R$ ' + retorno[i].basketBonds[0].bondsValue + '</a></li>')
            result.canceled.push({
                "buyDate": retorno[i].basketBonds[0].buyDate,
                "nameBonds": retorno[i].basketBonds[0].nameBonds,
                "codeBonds": retorno[i].basketBonds[0].codeBonds,
                "bondsValue": retorno[i].basketBonds[0].bondsValue
            })
        }
        else if (retorno[i].basketBonds[0].situation == 4) {
            result.count++
            result.lista.push('<li><a href="#" onclick="sendOpt(\''+ retorno[i].basketBonds[0].codeBonds +'\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + retorno[i].basketBonds[0].nameBonds + ' (' + retorno[i].basketBonds[0].buyDate + ') - R$ ' + retorno[i].basketBonds[0].bondsValue + '</a></li>')
            result.pending.push({
                "buyDate": retorno[i].basketBonds[0].buyDate,
                "nameBonds": retorno[i].basketBonds[0].nameBonds,
                "codeBonds": retorno[i].basketBonds[0].codeBonds,
                "bondsValue": retorno[i].basketBonds[0].bondsValue
            })
        }
    }
    
    return { result };

}

module.exports = Formatter;