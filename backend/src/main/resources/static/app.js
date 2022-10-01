var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/product-ws');
    console.log("Dados do socket");
    console.log(socket);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        stompClient.subscribe('/topic/product', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });

        stompClient.subscribe('/user/topic/product-added', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
}

function sendName() {
    stompClient.send("/app/product-scanner", {}, JSON.stringify({'productId': $("#name").val()}));
}

function sendPrivateName() {
    stompClient.send("/app/private-product-scanner", {}, JSON.stringify({'productId': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr>");
    $("#greetings").append("<td>" + message.id + "</td>");
    $("#greetings").append("<td>" + message.name + "</td>");
    $("#greetings").append("<td>" + message.price + "</td>");
    $("#greetings").append("<td>" + message.description ?? '' + "</td>");
    $("#greetings").append("</tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#send-private" ).click(function() { sendPrivateName(); });
});