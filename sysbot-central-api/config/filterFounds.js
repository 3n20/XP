var currencyFormatter = require('currency-formatter');
var moment = require("moment")
var msgButton = "<br/>Você pode consultar suas demais aplicações por status clicando em:<br/>";
var result = {};
function Formatter(retorno) {
    console.log(retorno)
    if (retorno == undefined) {
        return
    }
    var result;
    if (retorno.orders) {
        console.log('**********obteve resultado API');
        //TODO: ALterar depois para modificar apenas as variaveis usadas
        //1-requested
        //2-approved
        //3-pending
        //4-disapproved
        //5-scheduled
        //6-proccessed
        //7-canceled
        //8-processfailed
        //9-inExecution
        result = {"requested":[], "approved":[], "pending": [],"disapproved":[], "scheduled":[],"proccessed": [],"canceled": [],"processfailed": [], "inExecution":[], "lista": "", "count": 0, "buttons": msgButton }
        var status = {'solicitado':false, 'aprovado':false, 'pendente':false, 'reprovado':false, 'agendado':false, 'processado':false, 'falhaProcesso':false, 'executando':false, 'cancelado':false}

        for (i = 0; retorno.orders.length > i; i++) {

//============== SOLICITADO (1)

            if (retorno.orders[i].status == 1) {
                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';
                    //OBS: Para os status 1 e 5 , devido ao fato de que a API retorna dados apenas quando passamos o filtro de status igual a 1, não passaremos mais o id 5 como filtro.
                    if (status.solicitado == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(1,\'Solicitadas\')">Solicitadas</button> ';
                        status.solicitado = true
                    }
                    result.requested.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })
                }
            }

//============== APROVADO (2)

            else if (retorno.orders[i].status == 2) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    if (status.aprovado == false) {
                        status.aprovado = true
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(' + retorno.orders[i].status + ',\'Aprovadas\')">Aprovadas</button> ';
                    }

                    result.approved.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    });
                }
            }

//============== PENDENTE (3)

            else if (retorno.orders[i].status == 3) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    if (status.pendente == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(3,\'Pendentes\')">Pendentes</button> '
                        status.pendente = true
                    }

                    result.pending.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })
                }
            }

//============== REPROVADO (4)

             else if (retorno.orders[i].status == 4) {
                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    if (status.reprovado == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(' + retorno.orders[i].status + ',\'Reprovadas\')">Reprovadas</button> '
                        status.reprovado = true
                    }

                    result.disapproved.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })

                }
            }

//============== AGENDADO (5)

            else if (retorno.orders[i].status == 5) {
                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    //OBS: Para os status 1 e 5, devido ao fato de que a API retorna dados apenas quando passamos o filtro de status igual a 1, não passaremos mais o id 5 como filtro.
                    if (status.agendado == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(1,\'Agendadas\')">Agendadas</button> ';
                        status.agendado = true
                    }

                    result.scheduled.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })
                }
            }

//============== PROCESSADO (6)

            else if (retorno.orders[i].status == 6) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    if (status.processado == false) {
                        status.processado = true
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(' + retorno.orders[i].status + ',\'Processadas\')">Processadas</button> ';
                    }

                    result.proccessed.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    });
                }
            }

//============== CANCELADO (7)

            else if (retorno.orders[i].status == 7) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';

                    if (status.cancelado == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(7,\'Canceladas\')">Canceladas</button> '
                        status.cancelado = true
                    }

                    result.canceled.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })
                }
            }

//============== FALHA(8)

            else if (retorno.orders[i].status == 8) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';
                    if (status.falhaProcesso == false) {
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(' + retorno.orders[i].status + ',\'Não Processadas\')">Não Processadas</button> '
                        status.falhaProcesso = true
                    }

                    result.processfailed.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    })

                }
            }

//============== EXECUTANDO (9)

            else if (retorno.orders[i].status == 9) {

                if (calculaDias(retorno.orders[i].date) <= 5) {
                    result.count++
                    result.lista += '<li><a href="#" onclick="sendOpt(' + retorno.orders[i].id + ',\'' + retorno.orders[i].investmentFund.name + '\')">' + retorno.orders[i].investmentFund.name + ' - ' + moment(retorno.orders[i].date).format('DD/MM/YYYY') + ' ' + currencyFormatter.format(retorno.orders[i].value, {locale: 'pt-BR'}) + '</a></li>';
                    // Troquei de aprovado que estava errado para executando
                    if (status.executando == false) {
                        status.executando = true
                        result.buttons += '<button class="btn btn-default btn-xs" onclick="sendOpt(' + retorno.orders[i].status + ',\'Em liquidação\')">Em liquidação</button> ';
                    }

                    result.inExecution.push({
                        "date": moment(retorno.orders[i].date).format('DD/MM/YYYY'),
                        "name": retorno.orders[i].investmentFund.name,
                        "status": retorno.orders[i].status,
                        "value": (retorno.orders[i].value).toLocaleString("pt-BR")
                    });
                }
            }
        }
        } else {
            console.log('**********Não obteve resultado API');
            // result = { "proccessed": [], "settlement": [], "pending": [], "canceled": [], "unregistered": [], "lista": "", "count": 0 }
            result = {"requested":[], "approved":[], "pending": [],"disapproved":[], "scheduled":[],"proccessed": [],"canceled": [],"processfailed": [], "inExecution":[], "lista": "", "count": 0 }

            if (retorno.status == 1) {
                result.requested.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 2) {
                result.approved.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 3) {
                result.pending.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }

            else if (retorno.status == 4) {
                result.disapproved.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 5) {
                result.scheduled.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 6) {
                result.proccessed.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }

            else if (retorno.status == 7) {
                result.canceled.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 8) {
                result.processfailed.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
            }
            else if (retorno.status == 9) {
                result.inExecution.push({
                    "date": moment(retorno.date).format('DD/MM/YYYY'),
                    "name": retorno.investmentFund.name,
                    "status": retorno.status,
                    "value": (retorno.value).toLocaleString("pt-BR")
                })
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