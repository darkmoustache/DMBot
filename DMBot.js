/**
 * 
 * Authors: Darkmoustache, Boost_Killer
 * Version: 1.1.0
 *
 */

var MenuStatus = false;
var AutoWootStatus = false;
var MusicStatus = true;
var AutoJoinStatus = false;
var Volume;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function ChatColor(text, color){$("#chat-messages").append('<div style="border-left: 3px solid ' + color + '; color:' + color + '; font-weight:700; font-size:13px; padding-left:25px;">' + text + '<div>');}

function ChatColorDefault(text, color){$("#chat-messages").append('<div style="color:' + color + '; font-weight:700; font-size:13px; padding-left:25px;align="center";">' + text + '<div>');}

$("#users-button").click();
$("#chat-button").click();

ChatColor("DMBot was successfully launched !" , "Aqua");
ChatColor("About: /dmbot", "DeepSkyBlue");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GUI
$("#chat").append('<div id="dmbot_menu" style="align:left;width:120px;height:32px;margin-left:-120px;margin-top:7px;"><img id="dmbot_share_button" style="margin:3px;cursor:pointer;" title="Share" src="http://darkmoustache.tk/dmbot/images/bouton_DMBot.png" alt="Share" width="32" height="32" onClick="DMBotShare()"/><a target="blank" href="http://darkmoustache.tk/dmbot"><img id="dmbot_site_button" style="margin:3px;cursor:pointer;" title="Website" src="http://darkmoustache.tk/dmbot/images/bouton_web.png" alt="Website" width="32" height="32"/></a><img id="dmbotmenu_button" style="margin:3px;cursor:pointer;" title="Menu" src="http://darkmoustache.tk/dmbot/images/bouton_plus.png" alt="Menu" width="32" height="32" onClick="DMBotMenu()"/></div>');
$("#chat").append('<br><div onMouseOver="DivOn()" onMouseOut="DivOff()" id="dmbot_ui" style="display:none;width:157px;height:85px;margin-left:-157px;"><table width="150" style="text-align:right;"><tr><th>AutoWoot: <img id="autowoot_button" style="margin-top:1px;cursor:pointer;" title="AutoWoot" src="http://darkmoustache.tk/dmbot/images/button_off.png" alt="AutoWoot" width="32" height="32" onClick="AutoWootUI()"/></tr></th><tr><th>AutoJoin: <img id="autojoin_button" style="margin-top:1px;cursor:pointer;" title="AutoJoin" src="http://darkmoustache.tk/dmbot/images/button_off.png" alt="Autojoin" width="32" height="32" onClick="AutoJoinUI()"/></tr></th><tr><th>Music: <img id="music_button" style="margin-top:1px;cursor:pointer;" title="Music" src="http://darkmoustache.tk/dmbot/images/button_on.png" alt="Music" width="32" height="32" onClick="MusicUI()"/></tr></th></table></div>');

//DMBOT Share
function DMBotShare()
{
	API.sendChat("/me uses DMBot: http://darkmoustache.tk");
}

function DivOn()
{
	document.getElementById('dmbot_ui').style.display = "";
	MenuStatus = true;
}
function DivOff()
{
	document.getElementById('dmbot_ui').style.display = "none";
	MenuStatus = false;
}

//DMBot Menu
function DMBotMenu()
{
	if( MenuStatus === false)
	{
		document.getElementById('dmbot_ui').style.display = "";
		MenuStatus = true;
	}
	else
	{
		document.getElementById('dmbot_ui').style.display = "none";
		MenuStatus = false;
	}
}

//AutoWoot UI
function AutoWootUI()
{
	if(AutoWootStatus === false)
	{
		document.getElementById("autowoot_button").src= "http://darkmoustache.tk/dmbot/images/button_on.png";
		AutoWootStatus = true;
		$('#woot').click();
	}
	else
	{
		document.getElementById("autowoot_button").src= "http://darkmoustache.tk/dmbot/images/button_off.png";
		AutoWootStatus = false;
	}
}

//AutoJoin UI
function AutoJoinUI()
{
	if(AutoJoinStatus === false)
	{
		document.getElementById("autojoin_button").src= "http://darkmoustache.tk/dmbot/images/button_on.png";
		AutoJoinStatus = true;
		AutoJoin();
	}
	else
	{
		document.getElementById("autojoin_button").src= "http://darkmoustache.tk/dmbot/images/button_off.png";
		AutoJoinStatus = false;
		clearInterval(interval);
	}
}

//Music UI
function MusicUI()
{
	if(MusicStatus === false)
	{
		document.getElementById("music_button").src= "http://darkmoustache.tk/dmbot/images/button_on.png";
		MusicStatus = true;
		Music();
	}
	else 
	{
		document.getElementById("music_button").src= "http://darkmoustache.tk/dmbot/images/button_off.png";
		MusicStatus = false;
		Music();
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//AutoWoot
API.on(API.ADVANCE, AutoWoot);
function AutoWoot()
{
	if(AutoWootStatus === true)
	{	
		$('#woot').click();
	}
}

//Autojoin
API.on(API.ADVANCE, djUpdate);
API.on(API.WAIT_LIST_UPDATE, djUpdate);
function djUpdate() 
{
   	if(AutoJoinStatus === true)
   	{
    	API.djJoin();
    }
}

function AutoJoin(){
	var interval = setInterval(function(){if(WaitList != 50){API.djJoin();}}, 1);
}

//Music
function Music()
{
	if(MusicStatus === true)
	{
		document.getElementById("playback").style.visibility="visible";
		if(API.getVolume() === 0)
		{
			API.setVolume(Volume);
		}
	}
	else
	{
		document.getElementById("playback").style.visibility="hidden";
		Volume = API.getVolume();
		API.setVolume(0);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

API.on(API.CHAT_COMMAND,Commands);
function Commands(cmd)
{
	if(cmd === "/dmbot")
	{
		ChatColorDefault("----------[DMBot]----------", "DeepSkyBlue");
		ChatColorDefault("Script: Darkmoustache" , "white");
		ChatColorDefault("Graphics: Boost_Killer" , "white");
		ChatColorDefault("Website: http://darkmoustache.tk" , "white");
		ChatColorDefault("------------------------------", "DeepSkyBlue");
	}
	else
	{
		ChatColor("[DMBot] Unknown command !", "red");
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
