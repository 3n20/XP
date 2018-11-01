exports.respostaWatsonAssistantController = function respostaWatsonAssistantController(watsonResult){
    if(watsonResult.output.generic[1] != undefined && watsonResult.output.generic[1].response_type == 'option'){
        let objetoOpcoes           = [];
        watsonResult.output.opcoes = [];
        watsonResult.output.title  = watsonResult.output.generic[1].title;
        for(let i = 0, ln = watsonResult.output.generic.length; i < ln; i++){
            if(watsonResult.output.generic[i].options != undefined){ 
                objetoOpcoes.push(watsonResult.output.generic[i].options);
            }
        }
        for(let j = 0, ln = objetoOpcoes[0].length; j < ln; j++){
            watsonResult.output.opcoes.push('<li><button class="message-options" value="'+ objetoOpcoes[0][j].value.input.text +'" onclick="sendMessageOptions(value)">'+ objetoOpcoes[0][j].label +'</button></li>');
        }
    }else{
        watsonResult.output.text;
    }
}