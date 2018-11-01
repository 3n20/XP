var currencyFormatter = require('currency-formatter');
var moment = require("moment")

var msgButton = "<br/>Você pode consultar suas demais aplicações por status clicando em:<br/>";

d = new Date();
function Formatter(retorno) {
    console.log(retorno)
    if(retorno == undefined){
        return
    }
    var status = { 'liquidacao':false, 'finalizado':false, 'cancelado':false, 'pendente':false }
    var result = { "pending": [], "settlement": [], "canceled": [], "finished": [], "lista": "", "count": 0, "buttons": msgButton }
    for (i = 0; retorno.length > i; i++) {
        if (retorno[i].basketBonds[0].situation == 1) {


            if(calculaDias(retorno[i].basketBonds[0].buyDate) < 5){
                result.count++;
                result.lista+= '<li><a href="#" onclick="sendOpt('+ retorno[i].basketBonds[0].codeBasket +',\''+ retorno[i].basketBonds[0].nameBonds +'\',\''+ retorno[i].basketBonds[0].codeBonds + '\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY') + ' - ' + currencyFormatter.format(retorno[i].basketBonds[0].bondsValue, { locale: 'pt-BR' }) + '</a></li>';

                if(status.liquidacao == false){
                    result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(\'Settlement\',\'Em Liquidação\')">Em Liquidação</button> ';
                    status.liquidacao = true
                }

                result.settlement.push({
                    "codeBasket": retorno[i].basketBonds[0].codeBasket,
                    "basketType": retorno[i].basketBonds[0].basketType,
                    "buyDate": moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY'),
                    "nameBonds": retorno[i].basketBonds[0].nameBonds,
                    "codeBonds": retorno[i].basketBonds[0].codeBonds,
                    "bondsValue": (retorno[i].basketBonds[0].bondsValue).toLocaleString("pt-BR")
                })
            }
        }
        else if (retorno[i].basketBonds[0].situation == 2) {
            result.finished.push({
                "codeBasket": retorno[i].basketBonds[0].codeBasket,
                "basketType": retorno[i].basketBonds[0].basketType,
                "buyDate": moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY'),
                "nameBonds": retorno[i].basketBonds[0].nameBonds,
                "codeBonds": retorno[i].basketBonds[0].codeBonds,
                "bondsValue": retorno[i].basketBonds[0].bondsValue
            });
        }
        else if (retorno[i].basketBonds[0].situation == 3) {

            if(calculaDias(retorno[i].basketBonds[0].buyDate) < 5){
                result.count++
                result.lista+= '<li><a href="#" onclick="sendOpt('+ retorno[i].basketBonds[0].codeBasket +',\''+ retorno[i].basketBonds[0].nameBonds +'\', \''+ retorno[i].basketBonds[0].codeBonds + '\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY') + ' - ' + currencyFormatter.format(retorno[i].basketBonds[0].bondsValue, { locale: 'pt-BR' }) + '</a></li>';

                if(status.cancelado == false){
                    result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(\'Cancelled\',\'Cancelada\')">Cancelada</button> ';
                    status.cancelado = true
                }

                result.canceled.push({
                    "codeBasket": retorno[i].basketBonds[0].codeBasket,
                    "basketType": retorno[i].basketBonds[0].basketType,
                    "buyDate": moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY'),
                    "nameBonds": retorno[i].basketBonds[0].nameBonds,
                    "codeBonds": retorno[i].basketBonds[0].codeBonds,
                    "bondsValue": retorno[i].basketBonds[0].bondsValue
                })
            }
        }
        else if (retorno[i].basketBonds[0].situation == 4) {

            if(calculaDias(retorno[i].basketBonds[0].buyDate) < 5){
                result.count++
                result.lista+= '<li><a href="#" onclick="sendOpt('+ retorno[i].basketBonds[0].codeBasket +',\''+ retorno[i].basketBonds[0].nameBonds +'\',\''+ retorno[i].basketBonds[0].codeBonds +'\')">' + retorno[i].basketBonds[0].nameBonds + ' - ' + moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY') + ' - ' + currencyFormatter.format(retorno[i].basketBonds[0].bondsValue, { locale: 'pt-BR' }) + '</a></li>';

                if(status.pendente == false){
                    result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(\'Pending\',\'Em Processamento\')">Em Processamento</button> ';
                    status.pendente = true
                }

                result.pending.push({
                    "codeBasket": retorno[i].basketBonds[0].codeBasket,
                    "basketType": retorno[i].basketBonds[0].basketType,
                    "buyDate": moment(retorno[i].basketBonds[0].buyDate).format('DD/MM/YYYY'),
                    "nameBonds": retorno[i].basketBonds[0].nameBonds,
                    "codeBonds": retorno[i].basketBonds[0].codeBonds,
                    "bondsValue": retorno[i].basketBonds[0].bondsValue
                })
            }
        }
    }

    return { result };
}

function calculaDias(date2) {

    date1 = new Date()

    date2 = new Date(date2)


    //formato do brasil 'pt-br'
    moment.locale('pt-br');
    //setando data1
    var data1 = moment(date1, 'DD/MM/YYYY');
    //setando data2
    var data2 = moment(date2, 'DD/MM/YYYY');
    //tirando a diferenca da data2 - data1 em dias

    //  console.log(date2)

    var diff = data1.diff(data2, 'days');


    return diff;
}

module.exports = Formatter;