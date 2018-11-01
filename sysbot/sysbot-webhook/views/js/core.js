var $messages = $('.messages-content'),
    d, h, m;
    
var initMsg = 'Bem-vindo ao atendimento virtual.';

$('.btn-hero').click( function(){
  $('.avenue-messenger').slideToggle();
})

$('.fecha').click( function(){
  $('.avenue-messenger').hide();
})

$(window).load(function() {
  $('.avenue-messenger').hide();
  $messages.mCustomScrollbar();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + initMsg + '</div>').appendTo($('.mCSB_container')).addClass('new');
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

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}
//var opt = '';
function sendMessage() {

  msg = $('.message-input').val();
  user = $('.user').val();

  if ($.trim(msg) == '') {
    return false;
  }

  var params = {
          "meta":{
            "idsubnetwork":"5a157dd054e4c753ebab007f",
            //"idsubnetwork":"5a1487ca71426ce2ffb2e424",
            "iduser":user,
            "timestamp":new Date()
          },
          "interaction":{
            "template": "text",
            "text":msg
          }
        }

  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    $.ajax({
        url: 'http://localhost:8080/webapp/123456',
        //url: 'http://10.40.0.99:8080/webapp/123456',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function(data){
            user = '';
            console.log(data);
           
            resp = data.meta.text;

            if ($('.message-input').val() != '') {
                return false;
            }
            $('<div class="message loading new"><figure class="avatar"><img src="img/sysbot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
            updateScrollbar();

            if(data.meta.multipart){
              setTimeout(function() {
                for(i=0; data.meta.multipart.length > i; i++){
                    $('.message.loading').remove();
                    $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + data.meta.multipart[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');                    setDate();
                    updateScrollbar();
                }
              }, 1000 );
            } else{
              setTimeout(function() {
                  $('.message.loading').remove();
                  $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
                  setDate();
                  updateScrollbar();

                  /* if(data.output.aval){
                      $('.mCSB_container').append('<div class="pull-right" style="clear:both; margin-bottom:10px; font-size: 12px; color:#888;margin-right:10px;">A resposta acima foi útil?<br/><div class="pull-right"><a href="#" onclick="avaliaPositivo()"><img src="img/avaliaTrue.png" width="25"/></a> <a href="#" onclick="avaliaNegativo()"><img src="img/avaliaFalse.png" width="27"/></a><br/></div><br/><br>');
                      updateScrollbar();
                  }  */

              }, 1000 + (Math.random() * 20) * 100);
            }

        }
    })

  }, 1000 + (Math.random() * 20) * 100);
} 

$('.message-submit').click(function() {
  sendMessage();
});

/* $('.fecha').click(function(){
  $('.mCSB_container').html('asdad');
}) */

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    sendMessage();
    return false;
  }
})

function sendOpt(opt){
  
  user = $('.user').val();

  if ($.trim(msg) == '') {
    return false;
  }

  var params = {
          "meta":{
            "idsubnetwork":"5a157dd054e4c753ebab007f",
            //"idsubnetwork":"5a1487ca71426ce2ffb2e424",
            //"iduser":user,
            "iduser":"14456",
            "timestamp":new Date(),
            "opt":opt
          },
          "interaction":{
            "template": "text",
            "text":'sendOpt'
          }
        }

  setTimeout(function() {
    $.ajax({
        url: 'http://localhost:8080/webapp/123456',
        //url: 'http://10.40.0.99:8080/webapp/123456',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function(data){
            user = '';
            console.log(data);
           
            resp = data.meta.text;

            if ($('.message-input').val() != '') {
                return false;
            }
            $('<div class="message loading new"><figure class="avatar"><img src="img/sysbot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
            updateScrollbar();

            if(data.meta.multipart){
              setTimeout(function() {
                for(i=0; data.meta.multipart.length > i; i++){
                    $('.message.loading').remove();
                    $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + data.meta.multipart[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');                    setDate();
                    updateScrollbar();
                }
              }, 1000 );
            } else{
              setTimeout(function() {
                  $('.message.loading').remove();
                  $('<div class="message new"><figure class="avatar"><img src="img/sysbot.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
                  setDate();
                  updateScrollbar();

                  /* if(data.output.aval){
                      $('.mCSB_container').append('<div class="pull-right" style="clear:both; margin-bottom:10px; font-size: 12px; color:#888;margin-right:10px;">A resposta acima foi útil?<br/><div class="pull-right"><a href="#" onclick="avaliaPositivo()"><img src="img/avaliaTrue.png" width="25"/></a> <a href="#" onclick="avaliaNegativo()"><img src="img/avaliaFalse.png" width="27"/></a><br/></div><br/><br>');
                      updateScrollbar();
                  }  */

              }, 1000 + (Math.random() * 20) * 100);
            }

        }
    })

  }, 1000 + (Math.random() * 20) * 100);
}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});