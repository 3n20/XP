let request      = require('requestretry');
let filterFounds = require('../filters/filterFounds');
class FundosService{
    constructor(){};
    pesquisarFundosPorUsuario(idUser){
        let endpoint = env.apiFundos;
        return new Promise(function(accept, reject){
            endpoint += '/api/v1/order?customerTradingAccount=' + idUser;
            let options = {
                method: 'GET',
                url: endpoint,
                timeout: 5000,
                json: true
            }
            request(options, function(err, response, body){
                if(err){
                    response = {result: {count: -1}};
                    accept(response);
                }
                switch(response.statusCode){
                    case 200:
                        let filtrados = filterFounds(body);
                        accept(filtrados);
                        break;
                    case 204:
                        response = {count: -1};
                        accept(response);
                        break;
                }
            });
        });
    }
}
module.exports = FundosService;