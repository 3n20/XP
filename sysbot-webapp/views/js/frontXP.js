// JavaScript source code
var divChat = document.getElementById("chat-box");
var codCliente = GetQueryStringParams('codigo');
var URLChatBot = 'https://chatbot.xpi.com.br';
var timeoutID; // Timeout inatividade
var conversationLog = [];
var context = "null";
var botMessage = 0;

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

$(window).unload(function () {
    endConversation();
});

function applyShadowHeader() {
    var $cB, $header, chatCurrentH, chatScrollH;
    $cB = $("#chat-box");
    $header = $('.portlet-header');
    if ($cB.scrollTop() === 0) {
        $header.removeClass('js--scrollshadow');
        return
    }
    chatScrollH = 0;
    $cB.children().each(function () {
        chatScrollH = chatScrollH + $(this).outerHeight(true);
    });
    chatCurrentH = $cB.height();
    if (chatCurrentH < chatScrollH) {
        $header.addClass('js--scrollshadow');
        return
    } else {
        $header.removeClass('js--scrollshadow');
        return
    }
}

function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function setup() {
    this.addEventListener("keypress", resetTimer, false);
    startTimer();
}

function startTimer() {
    // Wait 3 minutes before calling goInactive
    timeoutID = window.setTimeout(goInactive, 180000);
}

function resetTimer(e) {
    window.clearTimeout(timeoutID);
    goActive();
}

function closeJa() {
    window.close();
}

function goInactive() {
    endConversation();
    if (!$('#chat-box').hasClass('js--chatended')) {
        $('#chat-box').addClass('js--chatended');
        $('.js--message-field').addClass('js--chatended');
        $('#bot--status').html('Ausente');
        $('#icon--xplogo').addClass('away');
        postResponseMessage('Você deve estar ocupado agora, se precisar de alguma coisa é só me chamar de novo.', true);
        setTimeout((function () {
            $('#chat-box').append('</div> <div class="js--botresponse"> <div class="row bot--row"> <div class="col-lg-12"> <div class="media"> <div class="dh-info dh-closenotification"> <p>Conversa encerrada</p> <p> <button onclick="closeJa()" class="cb--btn">Fechar janela</button> </p> <div class="js--scrollendref"></div></div> </div> </div> </div> </div>');
            document.querySelector('.js--scrollendref').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }), 2000);
    }
};

function goActive() {
    $('#bot--status').html('Ativo');
    $('#icon--xplogo').removeClass('away');
    startTimer();
}

function logCreate(log) {
    conversationLog.push(log);
}

function getLog(log) {
    var temp = 0;
    var endLog = "";
    while (temp < conversationLog.length) {
        endLog += conversationLog[temp];
        temp++;
    }
    var myJsonString = JSON.stringify(log);
    console.log(myJsonString);

    return endLog;
}

$(document).ready(function () {
    setup();

    $(window).bind("beforeunload", function () {
        endConversation();
    });

    $.ajax({

        url: URLChatBot + '/XP-Investimentos/conversa',
        method: 'POST',
        data: { frase: 'reset', context: context },
        success: function (data) {
            postResponseMessage(data);
        },
        error: function() {
            endConversation();
            if (!$('#chat-box').hasClass('js--chatended')) {
                $('#chat-box').addClass('js--chatended');
                $('.js--message-field').addClass('js--chatended');
                postResponseMessage('Estou passando por uma manutenção no momento, tente falar comigo mais tarde.<br/>Para falar com um de nossos especialistas você pode nos enviar um formulário em <a href="www.xpi.com.br/atendimento ">www.xpi.com.br/atendimento</a> (opção "Enviar e-mail").', true);
                $('#bot--status').html('Indiponível');
                $('#icon--xplogo').addClass('unavaliable');
                setTimeout((function () {
                    $('#chat-box').append('</div> <div class="js--botresponse"> <div class="row bot--row"> <div class="col-lg-12"> <div class="media"> <div class="dh-info dh-closenotification"> <p>Conversa encerrada</p> <p> <button onclick="closeJa()" class="cb--btn">Fechar janela</button> </p> <div class="js--scrollendref"></div></div> </div> </div> </div> </div>');
                    document.querySelector('.js--scrollendref').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }), 2000);
            }
        }
    });

    $("#message").keyup(function (event) {
        if (event.keyCode == 13) {
            var msg = $('#message').val().replace("\n", "");
            if (msg != '') {
                sendMessage(msg);
            }
        }
    });

    $('#btn-send').click(function () {
        var msg = $('#message').val();
        if (msg != '') {
            sendMessage(msg);
        }
    });

    $('#chat-box').scroll(function () {
        applyShadowHeader();
    });

    $('#message').bind('input propertychange', function () {
        var m;
        m = $(this).val();
        $('.portlet-footer pre #premsg').html(m);

    });

});


function postRequestMessage(message) {
    var date, mesExtenso;
    console.log(message);
    date = new Date;
    mesExtenso = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][date.getMonth()];
    $('#chat-box').append('<div class="row client--row"> <div class="col-lg-12"> <div class="media"> <div class="media-body"> <div class="autor-info">' + GetQueryStringParams('nome_usuario').split('%')[0] + '</div><p>' + message + '</p> </div> <div class="dh-info"> <p> ' + date.getDate() + ' de ' + mesExtenso + ' - ' + padLeft(date.getHours(), 2) + ':' + padLeft(date.getMinutes(), 2) + '</p> </div> </div> </div> </div>');
    document.getElementById('message').value = '';
};

function postResponseMessage(data, manual) {
    var botID, botIDno, context, date, mesExtenso, obj, msg, resp, tmg1, tmg2, tmg3, tmg4; //CRIANDO variavel contexto vazia
    if (manual) {
        msg = data;
    } else {
        obj = JSON.parse(data);
        context = JSON.stringify(obj.context);
        resp = obj.output.text;
        msg = resp[0];
    }
    date = new Date;
    botMessage++;
    botID = 'bot--msg' + botMessage;
    botIDno = botMessage;
    mesExtenso = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][date.getMonth()];
    $('#chat-box').append('</div> <div class="js--botresponse before-load" id="' + botID + '"> <div class="anchor-ref"></div> <div class="row bot--row"> <div class="col-lg-12"> <div class="media"> <div class="media-body"> <div class="autor-info"> <a class="pull-left" href="#"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 131 118.1" style="enable-background:new 0 0 131 118.1;" xml:space="preserve"> <g> <path class="st0" d="M116.6,0H14.4C6.5,0,0,6.4,0,14.4v89.3c0,7.9,6.4,14.4,14.4,14.4h70.3V101h-13c0,0-6.2-8.6-9.2-12.7 c-3,4.1-9.2,12.7-9.2,12.7H33.9c0,0,16.4-22.3,19-25.8c-2.6-3.5-18-24.5-18-24.5h19.4c0,0,5.4,7.5,8.2,11.3 c2.8-3.9,8.2-11.3,8.2-11.3h22.7c0,0,1.7,3.2,2.3,4.3c4.2-3.4,9.4-5.2,14.7-5.2c8.6,0,16.2,4.8,20.6,12V14.4 C130.9,6.4,124.5,0,116.6,0L116.6,0z M118.3,75.7c0,5.7-3.9,10.4-8.7,10.4s-8.8-4.7-8.8-10.4c0-5.8,3.9-10.4,8.8-10.4 C114.4,65.3,118.3,70,118.3,75.7L118.3,75.7z M84.6,92.1C79.7,85.4,73.5,77.1,72,75c1.6-2.1,7.9-10.6,12.6-17V92.1L84.6,92.1z M110.3,101.8c8.6,0,16.2-4.8,20.6-12v13.8c0,7.9-6.4,14.4-14.4,14.4h-15.7V99.6C103.9,101,107.1,101.8,110.3,101.8z" /> </g> </svg> </a> <div class="autor-name"> <strong>Assistente Virtual</strong></div> </div> <div class="loader--spinner"><span>.</span><span>.</span><span>.</span></div> <div class="js--media-body-content"> </div> </div> <div class="dh-info"> <p> ' + date.getDate() + ' de ' + mesExtenso + ' - ' + padLeft(date.getHours(), 2) + ':' + padLeft(date.getMinutes(), 2) + '</p> </div> </div> </div> </div> </div>');
    document.querySelector('#' + botID + ' .anchor-ref').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    console.log(msg);
    tmg1 = (1000 + msg.length) > 4000 ? 4000 : 1000 + msg.length;
    tmg2 = tmg1 + 300;
    tmg3 = tmg2 + 1;
    tmg4 = tmg3 + 1;
    setTimeout((function () {
        var lH, oH, aI, R;
        $('#' + botID + ' .js--media-body-content').append('<p>' + msg + '</p>');
        lH = $('.loader--spinner').outerHeight();
        oH = $('#' + botID + ' .js--media-body-content').outerHeight();
        aI = $('#' + botID + ' .autor-info').outerHeight();
        R = (oH - lH + aI < 112 ? 112 : oH - lH + aI);
        $('#' + botID + ' .media-body').css('max-height', R);
        logCreate('Resposta: ' + msg + '\n\n');
    }), tmg1);
    setTimeout((function () {
        $('#' + botID).addClass('loaded');
    }), tmg2);
    setTimeout((function () {
        $('#' + botID + ' .media-body').css('max-height', 'initial');
        $('#' + botID).addClass('allSet');
    }), tmg3);
    setTimeout((function () {
        if (!manual && obj.output.aval === true) { // avaliação : caso seja TRUE (ja tratado no Bluemix) apresenta
            $('#' + botID + ' .media-body').append('<div class="row bot--usefulness"> <div class="col-lg-12"> <p class="js--hlpfd">Esta informação foi útil?</p> <p class="js--hlpbtn"> <button onclick="wasItHelpful(true, ' + botIDno + ')">Sim</button> <button onclick="wasItHelpful(false, ' + botIDno + ')">Não</button></p> </div> </div>');
        }
        document.querySelector('#' + botID + ' .anchor-ref').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }), tmg4);
};

function sendMessage(msg) {
    $('.portlet-footer pre #premsg').html('');
    $.ajax({
        url: URLChatBot + '/XP-Investimentos/conversa',
        method: 'POST',
        data: { frase: msg, context: context },

        beforeSend: function () {
            logCreate("Pergunta: " + msg + "\n\n");
            postRequestMessage(msg);
        },

        success: function (data) {
            postResponseMessage(data);
        }
    });
}

function resendMessage(msg) {

    $.ajax({
        url: URLChatBot + '/XP-Investimentos/conversa',
        method: 'POST', method: 'POST',
        data: { frase: msg, context: context },

        beforeSend: function () {
            logCreate("Pergunta: " + msg + "\n\n");
            console.log(message);
        },

        success: function (data) {
            postResponseMessage(data);
            divChat.scrollTop = divChat.scrollHeight;
        }
    });
}

function endConversation() {
    var codSF = '#CONTAXP: ' + codCliente;

    logCreate("\n\n" + codSF);

    $.ajax({
        url: URLChatBot + '/XP-Investimentos/fecharConversa',
        method: 'POST',
        data: getLog(conversationLog),
        contentType: 'text/plain;charset=utf-8',
        dataType: 'text'
    });
}

function wasItHelpful(bool, botMessage) {
    botID = 'bot--msg' + botMessage;
    $('#' + botID).addClass('feedbacked');
    if (bool) {
        logCreate("Avaliação = Positivo\n");
        $('#' + botID).addClass('feedbacked-yes');
        $('#' + botID + ' .js--hlpfd').html('Esta informação <strong>foi útil</strong> para você.');
        postResponseMessage('Obrigado pelo seu feedback, estamos sempre tentando melhorar os serviços prestados para você.', true);
    } else {
        logCreate("Avaliação = Negativo\n");
        $('#' + botID).addClass('feedbacked-no');
        $('#' + botID + ' .js--hlpfd').html('Esta informação <strong>não</strong> foi útil para você.');
        postResponseMessage('Desculpe se não pude te ajudar ainda não consigo responder a esta pergunta, mas estou aprendendo com o tempo.<br />Para falar com um de nossos especialistas você pode nos enviar um formulário em <a href="www.xpi.com.br/atendimento ">www.xpi.com.br/atendimento</a> (opção "Enviar e-mail").', true);
    }
}