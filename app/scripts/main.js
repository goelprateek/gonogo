;(function(){

	'use strict';

	var croId;
var dsaId;
var sessionId = '';
var CRO='CRO';
var DSA='DSA';
var access1;
var access2;
var id_type='';
var name = '';
var id ='';
// socket connection url and port
//var socket_url = 'localhost'; //local
//var socket_url = 'http://gng.softcell.in'; //uat
//var port = '8080'; //local
//var port = '80'; //uat
var userdata = JSON.parse(localStorage.getItem('lists'));
//console.log("login id:"+JSON.stringify(userdata.userid));
 
//right align of chat window
var rightalign=19;
$(document).ready(function() {
	var rightalign=19;
	$("#form_submit, #form_send_message").submit(function(e) {
		e.preventDefault();
		get_name();
	});
	$("#dsa_chat").click(function(e)
	{
		$('#chat_window').show();
		get_name();
		e.preventDefault();
	});
	$(document).on('click', '#btn_close', function(e) {
		e.preventDefault();
		$(this).parent().parent().hide();
		$("div[id^='chat_window_']:visible").each(function()
		{
			rightalign=$(this).css("right");
	        if(rightalign ==='19px')
	        {
	        	$(this).css("right",rightalign+"px");
	        }
	        else
	        {
				rightalign=$(this).css("right").slice(0,-2);
	        	$(this).css("right",rightalign-350+"px");
	        }
		});
	});
});

function get_name() //of user who logged in
{
	name = $('#user_name').text().trim();
	id=$('#user_name').attr("title");
	
	var cro_name=$('#croid').attr("title");
	var cro_id=$('#dsa_chat').attr("title"); //when cro identified
	
	//access1=$('#applicationLink').attr("title");
	access2=$('#notificationLink').attr("title");
	
//	console.log("Access 2 :"+access2);
//if(access1=="true" && access2=="true" && cro_name==name && cro_id==id) //msg to only perticular CRO found in DSA
	if(access2=="true") //this will msg to all CRO
	id_type=CRO;
	
	else if(access2=="false")
		id_type=DSA;
	get_id();
}

function get_id()
{
	if(id_type==CRO)
		{
		id=$('#user_name').attr("title");// this for user name
		croId=id; 
		}
	else 
		{
		id=$('#user_name').attr("title");//some how get the agent id here 
		dsaId=id;
		}
	openSocket();
}

var webSocket;
/**
 * Connecting to socket
 */
/**
 * Will open the socket connection
 */
function openSocket() {
	// Ensures only one connection is open at a time
	if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
		return;
	}

	// Create a new instance of the websocket
	if(dsaId!=undefined){
	webSocket = new WebSocket("ws://" + socket_url + ":" + port
			+ "/GoNoGoV3/chat?id="+dsaId+"&cro=13&name="+name);
	}else{
		webSocket = new WebSocket("ws://" + socket_url + ":" + port
				+ "/GoNoGoV3/chat?id="+croId+"&name="+name);
	}
//	webSocket = new WebSocket("ws://" + socket_url + ":" + port
//			+ "/GoNoGoV2/chat?name=" + name +"& id=13");

	/**
	 * Binds functions to the listeners for the websocket.
	 */
	webSocket.onopen = function(event) {
		$('#message_container').fadeIn();
		if (event.data === undefined)
			return;
	};

	webSocket.onmessage = function(event) {
		// parsing the json data
		//alert("json data:"+event.data);
		parseMessage(event.data);
	};

	webSocket.onclose = function(event) {
	};
	
}

/**
 * Sending the chat message to server
 */
function close_window(name_id)
{
	message="close";
	sendMessageToServer('close', message,$('#chat_window_'+name_id).find("#sessionId").val(),id);
}
function send(name_id) {
	if(id_type==CRO && name_id!=''){ //cro to sumit name_id==sumit
		var message=$('#chat_window_'+name_id).find('#input_message').val();
		if (message.trim().length > 0) {
			sendMessageToServer('message', message,$('#chat_window_'+name_id).find("#sessionId").val(),id);
		} else {
			alert('Please enter message to send!');
		}
		return false;
	}
	else{  //sumit sending msg to cro
		var message=$('#input_message').val();
		//var message = $(this).parent().id;
		//var message = $(this).parent().find('#input_message').val();
		
		if (message.trim().length > 0) {
			sendMessageToServer('message', message,sessionId,id); ///self id
			//alert("Message "+message+"and:"+id);
		} else {
			alert('Please enter message to send!');
		}
		return false;
	}
}

/**
 * Closing the socket connection
 */
function closeSocket() {
	webSocket.close();

	$('#message_container').fadeOut(600, function() {
		$('#prompt_name_container').fadeIn();
		// clearing the name and session id
		sessionId = '';
		name = '';

		// clear the ul li messages
		$('#messages').html('');
		$('p.online_count').hide();
	});
}

/**
 * Parsing the json message. The type of message is identified by 'flag' node
 * value flag can be self, new, message, exit
 */

function parseMessage(message) {
	var jObj = $.parseJSON(message);
	// if the flag is 'self' message contains the session id
	if (jObj.flag == 'self') {
		sessionId = jObj.sessionId;

	}else if (jObj.flag == 'new') {  //pop up to cro side
		
		if(id_type==CRO && jObj.sessionId!=sessionId){  //session id(cro) and jObjj.sessid(dsa)
		var name_id=jObj.name.split(' ').join('_');
		var name_initiator=jObj.name;
		//Stores chat window1
		
		var strVar="";
		strVar += "<div id=\"chat_window_"+name_id+"\" class=\"row clearfix chat_window_pop\" style=\"right:"+rightalign+"px;display:none;  \">";
		strVar += "			<div class=\"chat_header_box\" style=\"font-weight: bold;\">";
		strVar += "			<a href=\"\" id=\"minimize\" style=\"vertical-align: middle;border: 1px solid #fff; color: #fff; padding: 0px 5px 0px 5px; text-decoration: none;\">-<\/a>		";
		strVar += "			<a href=\"\" id=\"maxmize\" style=\"vertical-align: middle;border: 1px solid #fff; color: #fff; padding: 0px 5px 0px 5px; text-decoration: none;\">+<\/a>			";
		strVar += "			<a href=\"\" id=\"name_client\" value=\""+name_initiator+"\" style=\"vertical-align: middle; color: #fff; text-decoration: none;\">"+name_initiator+"<\/a>			";
		
		strVar += "			<a href=\"\" style=\"float: right;padding-right: 10px; color: #fff;\" onclick=\"close_window('"+name_id+"')\"   id=\"btn_close\">Close<\/a>";
		strVar += "			<\/div>";
		strVar += "			<!-- <div id=\"prompt_name_container\" class=\"row clearfix\">";
		strVar += "				<p>Enter your name<\/p>";
		strVar += "				<form id=\"form_submit\" method=\"post\">";
		strVar += "					<input type=\"text\" id=\"input_name\" \/> <input type=\"submit\"";
		strVar += "						value=\"JOIN\" id=\"btn_join\">";
		strVar += "				<\/form>";
		strVar += "			<\/div> -->";
		strVar += "";
		strVar += "			<div id=\"message_container\" style=\"display: block;\">";
		strVar += "";
		strVar += "				<ul id=\"messages\">";
		strVar += "				<\/ul>";
		strVar += "";
		strVar += "";
		strVar += "				<div id=\"input_message_container\">";
		strVar += "					<form id=\"form_send_message\" method=\"post\" action=\"#\">";
		strVar += "						<input type=\"text\" id=\"input_message\"";
		strVar += "							placeholder=\"Type your message here...\" \/> <input type=\"submit\"";
		strVar += "							id=\"btn_send\" onclick=\"return send('"+name_id+"');\" value=\"Send\" \/>";
		strVar += "						<div class=\"clear\"><\/div>";
		strVar += "					<\/form>";
		strVar += "				<\/div>";
		strVar += "";
		strVar += "";
		strVar += "			<\/div>";
		strVar += "		<\/div>";

		// if the flag is 'new', a client joined the chat room
		var new_name = 'You';		
		if (jObj.sessionId != sessionId) {
			new_name = jObj.name;
		}

		if($('#chat_window_'+name_id).length==0 ){
			$('.container').append(strVar);
			//$('#chat_window_'+jObj.sessionId).show();
			$('#chat_window_'+name_id).hide();
			$("<input id='sessionId' type='hidden' value='"+jObj.sessionId+"'/>").appendTo('#chat_window_'+name_id);
			rightalign+=350;
		}
		
		var li = '<li class="new"><span class="name">' + new_name + '</span> ' //for adding msg as joined conversation with recent user name
		+ jObj.message + '</li>';
		$('#chat_window_'+name_id).find('#messages').append(li);
		$('#chat_window_'+name_id).find('#input_message').val('');
		$('#chat_window_'+name_id).find("#sessionId").val(jObj.sessionId);
		
	}
//		else if(CRO_hit=='1' && jObj.sessionId!=sessionId){  //session id(cro) and jObjj.sessid(dsa)
//			
//			alert("cro hit true:"+jObj.sessionId+" "+sessionId);
//			//alert("New cro");
//			var name_id=jObj.name.split(' ').join('_');
//			var name_initiator=jObj.name;
//
//			//alert(name_id);
//			//onclick=\"closeSocket();\"
//			//Stores chat window1
//			
//			
//			var strVar="";
//			strVar += "<div id=\"chat_window_"+name_id+"\" class=\"row clearfix chat_window_pop\" style=\"right:"+rightalign+"px;display:none;  \">";
//			strVar += "			<div class=\"chat_header_box\" style=\"font-weight: bold;\">";
//			strVar += "			<a href=\"\" id=\"minimize\" style=\"vertical-align: middle;border: 1px solid #fff; color: #fff; padding: 0px 5px 0px 5px; text-decoration: none;\">-<\/a>		";
//			strVar += "			<a href=\"\" id=\"maxmize\" style=\"vertical-align: middle;border: 1px solid #fff; color: #fff; padding: 0px 5px 0px 5px; text-decoration: none;\">+<\/a>			";
//			strVar += "			<a href=\"\" id=\"name_client\" value=\""+name_initiator+"\" style=\"vertical-align: middle; color: #fff; text-decoration: none;\">"+name_initiator+"<\/a>			";
//			
//			strVar += "			<a href=\"\" style=\"float: right;padding-right: 10px; color: #fff;\"  id=\"btn_close\">Close<\/a>";
//			strVar += "			<\/div>";
//			strVar += "			<!-- <div id=\"prompt_name_container\" class=\"row clearfix\">";
//			strVar += "				<p>Enter your name<\/p>";
//			strVar += "				<form id=\"form_submit\" method=\"post\">";
//			strVar += "					<input type=\"text\" id=\"input_name\" \/> <input type=\"submit\"";
//			strVar += "						value=\"JOIN\" id=\"btn_join\">";
//			strVar += "				<\/form>";
//			strVar += "			<\/div> -->";
//			strVar += "";
//			strVar += "			<div id=\"message_container\" style=\"display: block;\">";
//			strVar += "";
//			strVar += "				<ul id=\"messages\">";
//			strVar += "				<\/ul>";
//			strVar += "";
//			strVar += "";
//			strVar += "				<div id=\"input_message_container\">";
//			strVar += "					<form id=\"form_send_message\" method=\"post\" action=\"#\">";
//			strVar += "						<input type=\"text\" id=\"input_message\"";
//			strVar += "							placeholder=\"Type your message here...\" \/> <input type=\"submit\"";
//			strVar += "							id=\"btn_send\" onclick=\"return send('"+name_id+"');\" value=\"Send\" \/>";
//			strVar += "						<div class=\"clear\"><\/div>";
//			strVar += "					<\/form>";
//			strVar += "				<\/div>";
//			strVar += "";
//			strVar += "";
//			strVar += "			<\/div>";
//			strVar += "		<\/div>";
//
//
//
//			// if the flag is 'new', a client joined the chat room
//			var new_name = 'You';		
//			if (jObj.sessionId != sessionId) {
//				new_name = jObj.name;
//			}
//
//			if($('#chat_window_'+name_id).length==0 ){
//			
//				
//				$('.container').append(strVar);
//				//$('#chat_window_'+jObj.sessionId).show();
//				$('#chat_window_'+name_id).hide();
//				
//				$("<input id='sessionId' type='hidden' value='"+jObj.sessionId+"'/>").appendTo('#chat_window_'+name_id);
//				
//				rightalign+=350;
//			}
//			$('.container').append(strVar);
//			var li = '<li class="new"><span class="name">' + new_name + '</span> ' //for adding msg as joined conversation with recent user name
//			+ jObj.message + '</li>';
//
//			$('#chat_window_'+name_id).find('#messages').append(li);
//
//			$('#chat_window_'+name_id).find('#input_message').val('');
//			
//			$('#chat_window_'+name_id).find("#sessionId").val(jObj.sessionId);
//		
//		}
		else{
			// if the flag is 'new', a client joined the chat room
			//alert("New dsa");
			var new_name = 'You';		
			if (jObj.sessionId != sessionId) {
				new_name = jObj.name;
			}
			var li = '<li class="new"><span class="name">' + new_name + '</span> '
			+ jObj.message + '</li>';
			$('#messages').append(li);
			$('#input_message').val('');
		}
		
	}else if (jObj.flag == 'message') {
		// if the json flag is 'message', it means somebody sent the chat
		// message

		if(id_type== CRO){
			var from_name = '';
			var li;
			li = '<li class="right_message"><span class="name">' + from_name + '</span> '
			+ jObj.message + '</li>';
			//$('#input_message').val(''); 
			$("div[id^='chat_window']").find('#input_message').val('');//for removing msg from cro screen
			if (jObj.sessionId != sessionId) {
				from_name = jObj.name;
				li = '<li class="left_message"><span class="name" >' + from_name + '</span> '
				+ jObj.message + '</li>';
			}
		var name_id;
			
		if(id_type==CRO){
			$("input[id^='sessionId']").each(function(){
		
				if($(this).val()==jObj.receiver){

					$(this).parent().find('#messages').append(li);
					$(this).parent().show();
					$(this).parent().find('#messages').scrollTop($('#messages').height());
				}
			});
			}
			else{
				name_id=jObj.name.split(' ').join('_');
				// appending the chat message to list
				//appendChatMessage(li);
				$('#chat_window_'+name_id).find('#messages').append(li);
				$('#chat_window_'+name_id).show();
				// scrolling the list to bottom so that new message will be visible
				$('#chat_window_'+name_id).find('#messages').scrollTop($('#messages').height());
			}
			$('#input_message').val('');
		}
		else{
			
			var from_name = '';
			var li;
			li = '<li class="right_message"><span class="name">' + from_name + '</span> '
			+ jObj.message + '</li>';
			if (jObj.sessionId != sessionId) {
				from_name = jObj.name;
				li = '<li class="left_message"><span class="name" >' + from_name + '</span> '
				+ jObj.message + '</li>';
			}

			// appending the chat message to list
			//appendChatMessage(li);
			
//			**********************HTTP call for chat Save****************************************
			var date= new Date().getDay()+":"+new Date().getMonth()+":"+new Date().getFullYear();
			var time= new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
			//var sender='sayali';
			var receiver=''
			var userID=''; 
			if (from_name ==='')
				{
				receiver=$('#user_name').text().trim();
				userID = $('#user_name').attr("title");
				}
			else
				{
				receiver=from_name;
				userID=cro_id; //13
				}
//			var receiver=from_name;
			var msg=  jObj.message;
			var instID =$('#user_name').attr("name");
			var params='{"date":"'+date+'","time":"'+time+'","sender":"'+receiver+'","msg":"'+msg+'","instID":"'+instID+'","userID":"'+userID+'"}';
			var http = new XMLHttpRequest();
			http.open("GET", "/GoNoGoV3/api/GoNoGoV3/savechat?x="+params, true);
			http.setRequestHeader("Content-type", "application/json; charset=utf-8");
			http.setRequestHeader("Content-length", params.length);
			http.setRequestHeader("Connection", "close");

			http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
			          console.log("response :"+http.responseText);
			}
			}
		    http.send();
			
			$('#messages').append(li);
			// scrolling the list to bottom so that new message will be visible
			$('#messages').scrollTop($('#messages').height());
			$('#input_message').val('');

		}
	} else if (jObj.flag == 'exit') {
		// if the json flag is 'exit', it means somebody left the chat room
		console.log(" exit :"+JSON.stringify(jObj));
		jObj.message="left the conversation";
		var li = '<li class="exit"><span class="name red">' + jObj.name
				+ '</span> ' + jObj.message + '</li>';

		if( id_type == CRO){
			var name_id=jObj.name.split(' ').join('_');
			//appendChatMessage(li);
			$('#chat_window_'+name_id).find('#messages').append(li);
			// scrolling the list to bottom so that new message will be visible
			$('#chat_window_'+name_id).find('#messages').scrollTop($('#messages').height());
			$('#input_message').val('');
		}
		else{
			//appendChatMessage(li);
//			name_id="demo";
			//name_id at last screen
//			$('#chat_window_'+name_id).find('#messages').append(li);
//			$('#chat_window_'+name_id).find('#messages').scrollTop($('#messages').height());
			
			$('#chat_window').find('#messages').append(li);
			$('#chat_window').find('#messages').scrollTop($('#messages').height());
			$('#input_message').val('');
		}
	}	
}
/**
 * Appending the chat message to list
 */
function appendChatMessage(li) {
	$('#messages').append(li);
	$('#messages').scrollTop($('#messages').height());
}

/**
 * Sending message to socket server message will be in json format
 */
function sendMessageToServer(flag, message,receiverSessionID,id) {
	var json = '{""}';

	// preparing json object
	var myObject = new Object();
	myObject.sessionId = sessionId;
	myObject.message = message;
	myObject.flag = flag;
	myObject.receiver=receiverSessionID;
	myObject.newid=id;
	// converting json object to json string
	json = JSON.stringify(myObject);
	// sending message to server
	webSocket.send(json);
}


}).call(this)

