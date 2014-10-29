/**
 * 
 * Authors: Darkmoustache, Boost_Killer
 * Version: 1.2.0
 * WebSite: http://darkmoustache.tk
 *
 */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var MenuStatus = false;
var AutoWootStatus = false;
var MusicStatus = true;
var AutoJoinStatus = false;
var Volume;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ChatColor(text, color){$("#chat-messages").append('<div style="border-left: 3px solid ' + color + '; color:' + color + '; font-weight:700; font-size:13px; padding-left:25px;">' + text + '<div>');}

function ChatColorDefault(text, color){$("#chat-messages").append('<div style="color:' + color + '; font-weight:700; font-size:13px; padding-left:25px;align="center";">' + text + '<div>');}

ChatColor("DMBot was successfully launched !" , "Aqua");
ChatColor("About: /dmbot", "DeepSkyBlue");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GUI
$("#chat").append('<div id="dmbot_menu" style="align:left;width:120px;height:32px;margin-left:-120px;margin-top:7px;"><img id="dmbot_share_button" style="margin:3px;cursor:pointer;" title="Share" src="https://static.e-junkie.com/sslpic/133967.3a8b03b655c0adbdb6722a059e10ac31.jpg" alt="Share" width="32" height="32" onClick="DMBotShare()"/><a target="blank" href="http://darkmoustache.tk/dmbot"><img id="dmbot_site_button" style="margin:3px;cursor:pointer;" title="Website" src="https://static.e-junkie.com/sslpic/133969.fd7a098792cd39b281c352d5e29ab16e.jpg" alt="Website" width="32" height="32"/></a><img id="dmbotmenu_button" style="margin:3px;cursor:pointer;" title="Menu" src="https://static.e-junkie.com/sslpic/133968.8c4fb3a1eeaccc2151835a892dbafe3b.jpg" alt="Menu" width="32" height="32" onClick="DMBotMenu()"/></div>');
$("#chat").append('<br><div onMouseOver="DivOn()" onMouseOut="DivOff()" id="dmbot_ui" style="display:none;width:157px;height:85px;margin-left:-157px;"><table width="150" style="text-align:right;"><tr><th>AutoWoot: <img id="autowoot_button" style="margin-top:1px;cursor:pointer;" title="AutoWoot" src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg" alt="AutoWoot" width="32" height="32" onClick="AutoWootUI()"/></tr></th><tr><th>AutoJoin: <img id="autojoin_button" style="margin-top:1px;cursor:pointer;" title="AutoJoin" src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg" alt="Autojoin" width="32" height="32" onClick="AutoJoinUI()"/></tr></th><tr><th>Music: <img id="music_button" style="margin-top:1px;cursor:pointer;" title="Music" src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg" alt="Music" width="32" height="32" onClick="MusicUI()"/></tr></th></table></div>');

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
		document.getElementById("autowoot_button").src= "https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";
		AutoWootStatus = true;
		$('#woot').click();
	}
	else
	{
		document.getElementById("autowoot_button").src= "https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";
		AutoWootStatus = false;
	}
}

//AutoJoin UI
function AutoJoinUI()
{
	if(AutoJoinStatus === false)
	{
		document.getElementById("autojoin_button").src= "https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";
		AutoJoinStatus = true;
		API.djJoin();
	}
	else
	{
		document.getElementById("autojoin_button").src= "https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";
		AutoJoinStatus = false;
	}
}

//Music UI
function MusicUI()
{
	if(MusicStatus === false)
	{
		document.getElementById("music_button").src= "https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";
		MusicStatus = true;
		Music();
	}
	else 
	{
		document.getElementById("music_button").src= "https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";
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
API.on(API.HISTORY_UPDATE, djUpdate);
API.on(API.MOD_SKIP, djUpdate);
function djUpdate() 
{
   	if(AutoJoinStatus === true)
   	{
    	API.djJoin();
    }
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
