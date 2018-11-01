let request = require('request');
class UserInfoService{
    constructor(){};
    pesquisarUsuarioPorCodigo(iduser){
        return new Promise(function(accept, reject){
            let endpoint = env.urlSysbotCentralApi + 'xp/userInfoByCode?iduser=' + iduser.trim();
            let options  = {
                method: "GET",
                url: endpoint,
                timeout: 30000
            };
            request(options, function(err, response){
                if(err){
                    reject(err);
                }
                accept(response);
            });
        });
    }
}
module.exports = UserInfoService;