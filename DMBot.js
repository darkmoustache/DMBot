/**
 * 
 * Authors: Darkmoustache, Boost_Killer
 * Version: 1.4.0
 * WebSite: http://darkmoustache.tk
 *
 */
 
var MenuStatus=false;var AutoWootStatus=false;var AutoJoinStatus=false;var VideoStatus=true;var AvatarsStatus=true;var TimeOut;var TimeOutH;var TimeOutM;function ChatColor(a,b){$("#chat-messages").append('<div style="border-left: 3px solid '+b+'; color:'+b+'; font-weight:700; font-size:13px; padding-left:25px;">'+a+'<div>')}function ChatColorDefault(a,b){$("#chat-messages").append('<div style="color:'+b+'; font-weight:700; font-size:13px; padding-left:25px;align="center";">'+a+'<div>')}ChatColor("DMBot was successfully launched !","Aqua");ChatColor("About: /dmbot","DeepSkyBlue");$("#chat").append('<div id="dmbot_menu" style="align:left;width:120px;height:32px;margin-left:-120px;margin-top:7px;"><img id="dmbot_share_button" style="margin:3px;cursor:pointer;" title="Share" src="https://static.e-junkie.com/sslpic/133967.3a8b03b655c0adbdb6722a059e10ac31.jpg" alt="Share" width="32" height="32" onClick="DMBotShare()"/><a target="blank" href="http://darkmoustache.tk/dmbot"><img id="dmbot_site_button" style="margin:3px;cursor:pointer;" title="Website" src="https://static.e-junkie.com/sslpic/133969.fd7a098792cd39b281c352d5e29ab16e.jpg" alt="Website" width="32" height="32"/></a><img id="dmbotmenu_button" style="margin:3px;cursor:pointer;" title="Menu" src="https://static.e-junkie.com/sslpic/133968.8c4fb3a1eeaccc2151835a892dbafe3b.jpg" alt="Menu" width="32" height="32" onClick="DMBotMenu()"/></div>');$("#chat").append('<br><div onMouseOver="DivOn()" onMouseOut="DivOff()" id="dmbot_ui" style="display:none;width:157px;height:85px;margin-left:-157px;"><table width="150" style="text-align:right;"><tr><th>AutoWoot: <img id="autowoot_button" style="margin-top:1px;cursor:pointer;" title="AutoWoot" src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg" alt="AutoWoot" width="32" height="32" onClick="AutoWootUI()"/></tr></th><tr><th>AutoJoin: <img id="autojoin_button" style="margin-top:1px;cursor:pointer;" title="AutoJoin" src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg" alt="Autojoin" width="32" height="32" onClick="AutoJoinUI()"/></tr></th><tr><th>Video: <img id="video_button" style="margin-top:1px;cursor:pointer;" title="Video" src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg" alt="Video" width="32" height="32" onClick="VideoUI()"/></tr></th><tr><th>Avatars: <img id="avatars_button" style="margin-top:1px;cursor:pointer;" title="Avatars" src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg" alt="Avatars" width="32" height="32" onClick="AvatarsUI()"/></tr></th></table></div>');$("#waitlist-button").append('<div id="TimeOut" style="color:grey; font-size:13px; padding-left:15px;"><div>');TimeOut();function DMBotShare(){API.sendChat("/me uses DMBot: Http://darkmoustache.tk")}function DivOn(){document.getElementById('dmbot_ui').style.display="";MenuStatus=true}function DivOff(){document.getElementById('dmbot_ui').style.display="none";MenuStatus=false}function DMBotMenu(){if(MenuStatus===false){document.getElementById('dmbot_ui').style.display="";MenuStatus=true}else{document.getElementById('dmbot_ui').style.display="none";MenuStatus=false}}function AutoWootUI(){if(AutoWootStatus===false){document.getElementById("autowoot_button").src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";AutoWootStatus=true;$('#woot').click()}else{document.getElementById("autowoot_button").src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";AutoWootStatus=false}}function AutoJoinUI(){if(AutoJoinStatus===false){document.getElementById("autojoin_button").src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";AutoJoinStatus=true;API.djJoin()}else{document.getElementById("autojoin_button").src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";AutoJoinStatus=false}}function VideoUI(){if(VideoStatus===false){document.getElementById("video_button").src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";VideoStatus=true;Video()}else{document.getElementById("video_button").src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";VideoStatus=false;Video()}}function AvatarsUI(){if(AvatarsStatus===false){document.getElementById("avatars_button").src="https://static.e-junkie.com/sslpic/133964.4f75f4b4ffb9bda74b01c3942ac1cdd9.jpg";AvatarsStatus=true;Avatars()}else{document.getElementById("avatars_button").src="https://static.e-junkie.com/sslpic/133965.45f3458c998b72e5b4a32012520f3a90.jpg";AvatarsStatus=false;Avatars()}}API.on(API.ADVANCE,AutoWoot);function AutoWoot(){if(AutoWootStatus===true){$('#woot').click()}}API.on(API.USER_SKIP,djUpdate);API.on(API.ADVANCE,djUpdate);API.on(API.WAIT_LIST_UPDATE,djUpdate);API.on(API.HISTORY_UPDATE,djUpdate);API.on(API.MOD_SKIP,djUpdate);function djUpdate(){if(AutoJoinStatus===true){API.djJoin()}}function Video(){if(VideoStatus===true){document.getElementById("playback").style.visibility="visible"}else{document.getElementById("playback").style.visibility="hidden"}}function Avatars(){if(AvatarsStatus===true){$('#avatars-container').show()}else{$('#avatars-container').hide()}}API.on(API.WAIT_LIST_UPDATE,TimeOut);function TimeOut(){setTimeout(function(){if(API.getDJ().username==API.getUser().username){TimeOut="You mix !"}else if(API.getWaitListPosition()===0){TimeOut="Few minutes !"}else if(API.getWaitListPosition()!=-1){TimeOut=(API.getWaitListPosition()+1)*4;TimeOutH=parseInt(TimeOut/60);TimeOutM=(TimeOut%60);if(TimeOutM===0){TimeOut=TimeOutH+"h"}else{TimeOut=TimeOutH+"h"+TimeOutM}}else{TimeOut="Not in the WL"}document.getElementById('TimeOut').innerHTML=TimeOut},1000)}API.on(API.CHAT_COMMAND,Commands);function Commands(a){if(a==="/dmbot"){ChatColorDefault("----------[DMBot]----------","DeepSkyBlue");ChatColorDefault("Author: Darkmoustache","white");ChatColorDefault("Graphics: Boost_Killer","white");ChatColorDefault("Website: http://darkmoustache.tk","white");ChatColorDefault("------------------------------","DeepSkyBlue")}else{ChatColor("[DMBot] Unknown command !","red")}}
