var $messages = $('.messages-content'),
    d, h, m;

var initMsg = 'Bem-vindo ao atendimento virtual.';
$('.btn-hero').click(function () {
    $('.avenue-messenger').slideToggle();
})

$('.fecha').click(function () {
    $('.avenue-messenger').hide();
})

$(window).load(function () {
    $('.avenue-messenger').hide();
    $messages.mCustomScrollbar();
    setTimeout(function () {
        $('.message.loading').remove();
        $('.message-input').val('ola');
        $('.user').val('2534230');
        sendMessage();
        setDate();
        updateScrollbar();
    }, 100);

});
function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate() {
    d = new Date();
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
        $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
        $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
    }
}
//var opt = '';
function sendMessage(){
    msg     = $('.message-input').val();
    user    = $('.user').val();
    if($.trim(msg) == ''){
        return false;
    }
    var params = {};
    if($.trim(msg) == 'ola'){
        var params = {
            "meta": {
                "idsubnetwork": _subnetwork,
                "iduser": user,
                "timestamp": new Date()
            },
            "interaction": {
                "template": "text",
                "text": msg
            },
            "isFirstConversation": true,
            "monitoramento": false
        };
    }else{
        var params = {
            "meta": {
                "idsubnetwork": _subnetwork,
                "iduser": user,
                "timestamp": new Date()
            },
            "interaction": {
                "template": "text",
                "text": msg
            },
            "isFirstConversation": false,
            "monitoramento": false
        };
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    tratarRetorno(params);
}
function sendMessageOptions(value){
    msgOptions = value;
    user       = $('.user').val();
    let params = {
        "meta": {
            "idsubnetwork": _subnetwork,
            "iduser": user,
            "timestamp": new Date()
        },
        "interaction": {
            "template": "text",
            "text": msgOptions,
            "monitoramento": false
        }
    };
    $('<div class="message message-personal">' + msgOptions + '</div>').appendTo($('.mCSB_container')).addClass('new');    
    tratarRetorno(params);
}
function tratarRetorno(params){
    let monitoramento;
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function(){
        $.ajax({
            url: _url + ":8080/webapp/" + _token,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(params),
            success: function(data){
                var user            = '';
                var resp            = data.meta.text;
                var opcoes          = [];
                if($('.message-input').val()){
                    return false;
                }
                $('<div class="message loading new"><figure class="avatar"><img src="img/sysbot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
                updateScrollbar(); 
                if(data.context != undefined && data.context.monitoramento == true){
                    monitoramento = true;
                }else{
                    monitoramento = false;
                }
                if(monitoramento == true){
                    resp = "monitoramento realizado com sucesso!";
                    $('.message.loading').remove();
                    $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }else if(data.meta.multipart != undefined && data.meta.multipart.length > 0){
                    setTimeout(function(){
                        for(i = 0; data.meta.multipart.length > i; i++){
                            $('.message.loading').remove();
                            $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + data.meta.multipart[i] + '</div>').appendTo($('.mCSB_container')).addClass('new'); setDate();
                            updateScrollbar();
                        }
                        setDate();
                        updateScrollbar();
                        verificaOpcoes(data, opcoes);
                    },1000);
                }else{
                    setTimeout(function(){
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        setDate();
                        updateScrollbar();
                        verificaOpcoes(data, opcoes); 
                    },1000);                
                }
            }
        })
    },1000+(Math.random()*20)*100);
}
function verificaAval(data){
    var idInteration    = data.meta.idInteration;
    var conversation_id = data.meta.conversation_id;
    var time            = data.meta.timestamp;
    if(data.meta.aval){
        $('.mCSB_container').append('<div class="pull-right" style="clear:both; margin-bottom:10px; font-size: 12px; color:#888;margin-right:10px;">A resposta acima foi útil?<br/><div class="pull-right"><a href="#" onclick="classifica(\''+ time +'\',\'POSITIVO\', \''+ idInteration + '\', \'' +conversation_id + '\')"><img src="img/avaliaTrue.png" width="25"/></a><a href="#" onclick="classifica(\''+ time +'\',\'NEGATIVO\', \''+ idInteration + '\', \'' +conversation_id + '\')"><img src="img/avaliaFalse.png" width="27"/></a><br/></div><br/><br>');
        updateScrollbar();
    }
}
function verificaOpcoes(data, opcoes){
    if(data.meta.opcoes != undefined && data.meta.opcoes.length > 0){
        for(j = 0; data.meta.opcoes.length > j; j++){
            opcoes.push(data.meta.opcoes[j]);
        }
        $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + data.meta.tituloDasOpcoes + '</br>' + opcoes.toString().replace(/,/g,'') + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
    }
    verificaAval(data);
}

$('.message-submit').click(function () {
    sendMessage();
});

/* $('.fecha').click(function(){
  $('.mCSB_container').html('asdad');
}) */

$(window).on('keydown', function (e) {
    if (e.which === 13) {
        sendMessage();
        return false;
    }
})

function sendOpt(opt, msg, codeBound) {

    user = $('.user').val();
    var params = {
        "meta": {
            "idsubnetwork": _subnetwork,
            "iduser": user,
            "timestamp": new Date(),
            "opt": opt,
            "codeBound": codeBound
        },
        "interaction": {
            "template": "text",
            "text": 'sendOpt',
            "monitoramento": false
        }
    };
    //console.log('--------------------------- :' + JSON.stringify(params));
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function () {
        $.ajax({
            url: _url + ":8080/webapp/" + _token,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(params),
            success: function (data) {
                user = '';
                resp = data.meta.text;

                if ($('.message-input').val() != '') {
                    return false;
                }
                $('<div class="message loading new"><figure class="avatar"><img src="img/sysbot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
                updateScrollbar();

                if (data.meta.multipart.length > 0) {
                    setTimeout(function () {
                        for (i = 0; data.meta.multipart.length > i; i++) {
                            $('.message.loading').remove();
                            $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + data.meta.multipart[i] + '</div>').appendTo($('.mCSB_container')).addClass('new'); setDate();
                            updateScrollbar();
                        }
                    }, 1000);
                } else {
                    setTimeout(function () {
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        setDate();
                        updateScrollbar();

                        if (data.meta.aval) {
                            $('.mCSB_container').append('<div class="pull-right" style="clear:both; margin-bottom:10px; font-size: 12px; color:#888;margin-right:10px;">A resposta acima foi útil?<br/><div class="pull-right"><a href="#" onclick="classifica(\''+ time +'\',\'POSITIVO\', \''+ idInteration + '\', \'' +conversation_id + '\')"><img src="img/avaliaTrue.png" width="25"/></a><a href="#" onclick="classifica(\''+ time +'\',\'NEGATIVO\', \''+ idInteration + '\', \'' +conversation_id + '\')"><img src="img/avaliaFalse.png" width="27"/></a><br/></div><br/><br>');
                            updateScrollbar();
                        }

                    }, 1000 + (Math.random() * 20) * 100);
                }

            }
        })

    }, 1000 + (Math.random() * 20) * 100);
}
$('.button').click(function () {
    $('.menu .items span').toggleClass('active');
    $('.menu .button').toggleClass('active');
    ''});   

function avalia(time, aval) {
    user = $('.user').val();
    timestamp = time
    var params = {
        "meta": {
            "idsubnetwork": _subnetwork,
            "iduser": user,
            "timestamp": time
        }
    }
    $.ajax({
        url: _url + ':8050/avalia/'+ aval,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function (data) { }
    })

}

function avaliaAll(x){
    user = $('.user').val();
    var params = {
        "meta": {
            "idsubnetwork": _subnetwork,
            "iduser": user,
            "timestamp": new Date()
        },
        "interaction": {
            "template": "",
            "text": ""
        },
        "isFirstConversation": false
    };
    $.ajax({
        url: _url + ":8080/webapp/" + _token,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function (data) {
            var conversation_id = data.meta.conversation_id;
            alert('conversation_id:' + conversation_id);
            alert('user:' + user);
            if(x=="1"){
                alert("avaliacao: Muito Ruim")
            };
            if(x=="2"){
                alert("avaliacao: Ruim")
            };
            if(x=="3"){
                alert("avaliacao: Normal")
            };
            if(x=="4"){
                alert("avaliacao: Bom")
            };
            if(x=="5"){
                alert("avaliacao: Muito Bom")
            };
            var params = {
                "meta": {
                    "iduser": user,
                    "avaliacao_geral": x,
                    "conversation_id": data.meta.conversation_id
                }
            };

            $.ajax({
                url: _url + ':8050/avalia/avaliacao',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(params),
                success: function (data2) {}
            }, 1000 + (Math.random() * 20) * 100);


        }

    }, 1000 + (Math.random() * 20) * 100);
}
function classifica(time, classificacao, idInteration, conversation_id) {
    user = $('.user').val();
    timestamp = time;
    var params = {
        "meta": {
            "idsubnetwork": _subnetwork,
            "iduser": user,
            "timestamp": time,
            "idInteration": idInteration,
            "classificacao": classificacao,
            "conversation_id": conversation_id
        }
    }
    $.ajax({
        url: _url + ':8050/avalia/'+ classificacao,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function (data) { }
    })
}