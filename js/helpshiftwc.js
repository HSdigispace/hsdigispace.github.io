(function () {
    var PLATFORM_ID = "sean-demo_platform_20200521043441301-5ceb16a636604a6",
    DOMAIN = "sean-demo",
    LANGUAGE = "en";

    window.helpshiftConfig = {
      platformId: PLATFORM_ID,
      domain: DOMAIN,
      language: LANGUAGE,
      userId: Math.random().toString(36).substring(7),
      widgetOptions: {
        // fullScreen: true,
        showLauncher: false,
        // showCloseButton: false
      }
    };
  }) ();

!function(t,e){if("function"!=typeof window.Helpshift){var n=function(){n.q.push(arguments)};n.q=[],window.Helpshift=n;var i,a=t.getElementsByTagName("script")[0];if(t.getElementById(e))return;i=t.createElement("script"),i.async=!0,i.id=e,i.src="https://webchat.helpshift.com/webChat.js";var o=function(){window.Helpshift("init")};window.attachEvent?i.attachEvent("onload",o):i.addEventListener("load",o,!1),a.parentNode.insertBefore(i,a)}else window.Helpshift("update")}(document,"hs-chat");
