$(document).ready( function(){
    getSubnetwork()
})

var _url = 'http://' + document.location.hostname;
var _subnetwork = '5a28289504f3ef66f0bf11bc'
var _token = '2d5f53ffcdbf45e3bf2395cd0d0d5a39';
//var _subnetwork = "5a28289504f3ef66f0bf11bc" HML XP
//var _subnetwork = "5a1487ca71426ce2ffb2e424" DEV XP


function getSubnetwork(){
    $.ajax({
        url: '/getSubnetwork',
        type: 'POST',
        contentType: 'application/json',
        success: function(data){
            _subnetwork = data
        }
    })
}
