// Global Variables
var selectedPills = ["All"];

var createPills = function (pillsEl, onChange) {
  var pills = pillsEl.querySelectorAll (".pills__item");
  var allPill = pillsEl.querySelector (".pills__item[data-type='all']");

  var pillClick = function (targetPill) {
    // Reset all other pills if the target is All
    if (targetPill == allPill) {
      pills.forEach (function (p) {
        p.setAttribute ("data-selected", "false");
      });
      targetPill.setAttribute ("data-selected", "true");
      // Deselect targetPill if already selected
    } else if (targetPill.getAttribute("data-selected") == "true") {
      targetPill.setAttribute ("data-selected", "false");
    } else {
      allPill.setAttribute ("data-selected", "false");
      targetPill.setAttribute ("data-selected", "true");
    }

    var selectedValues = [];
    pillsEl.querySelectorAll (".pills__item[data-selected='true']").forEach (function (p) {
      selectedValues.push (p.innerText);
    });

    // Set All Pill of no pill is selected
    if (selectedValues.length == 0) {
      selectedValues.push (allPill.innerText);
      allPill.setAttribute ("data-selected", "true");
    };
    onChange (selectedValues);
  }

  // Add events to all pills
  pills.forEach (function (p) {
    p.addEventListener ("click", function (ev) {
      pillClick (ev.target);
    }, false);
  });
}

var renderBotsList = function (target, bList) {
  var numberOfColumns = 3; // 2 or 3 or 4 or 6
  var listHTML = "";
  var itemIndex = 0;

  for (var i = 0; i < bList.length; i++) {
    var tagsHTML = "";

    // Skip if not matching filters
    var skip = false;
    if (selectedPills.indexOf("All") != 0) {
      for (var j = 0; j < selectedPills.length; j++) {
        if (bList[i].tags.indexOf(selectedPills[j]) == -1) {
          skip = true;
        }
      }
    }
    if (skip) continue;

    for (var j = 0; j < bList[i].tags.length; j++) {
      tagsHTML += ("    <span class='bot__tag'>" + bList[i].tags[j] + "</span>");
    }


    if (itemIndex%numberOfColumns == 0) {
      listHTML += "<div class='row'>";
    }
    listHTML += (
      "<div class='column column--"+ (12/numberOfColumns) +" column--medium-6 column--small-12'>" +
      "  <div class='bot'>" +
      "    <div class='bot__image'>" +
      "      <img src='" + bList[i].img + "'/>" +
      "    </div>" +
      "    <h2 class='bot__name'>" + bList[i].name + "</h2>" +
      "    <p class='bot__tags'>" + tagsHTML + "</p>" +
      "    <p class='bot__desc'>" + bList[i].desc + "</p>" +
      "    <div class='bot__clickable' onclick='renderPreview(" +
      "\"" + bList[i].preview + "\", " +
      "\"" + bList[i].name + "\", " +
      "\"" + bList[i].img + "\")'></div>" +
      "    <a class='bot__button bot__button-download' href='" + bList[i].file +
      "' download=''" + bList[i].name + "'>Download</a>" +
      "    <button class='bot__button' onclick='launchBot(\"" + bList[i].msg + "\")'>Try</button>" +
      "  </div>" +
      "</div>"
    );
    if (itemIndex%numberOfColumns == numberOfColumns-1) {
      listHTML += "</div>";
      if (numberOfColumns === 3) {
        numberOfColumns = 4;
        itemIndex++;
      }
    }
    itemIndex++;
  }
  target.innerHTML = listHTML;
};

var renderPreview = function(url, name, img) {
  document.getElementById ("preview__container").innerHTML = (
    "<embed src='" + url + "#zoom=150" + "' type='application/pdf'></embed>"
  );
  document.getElementById ("preview__title").innerText = name;
  document.getElementById ("preview").style.display = "block";
  document.getElementById ("preview__header").style.backgroundImage = "url('"+ img + "')";
};

var closePreview = function() {
  document.getElementById ("preview__container").innerHTML = "";
  document.getElementById ("preview").style.display = "none";
};

var launchBot = function (msg) {
  window.helpshiftConfig.userId = Math.random().toString(36).substring(2);
  Helpshift("updateHelpshiftConfig");
  Helpshift("setInitialUserMessage", msg);
  Helpshift("open");
}


renderBotsList (document.getElementById ("bots-list"), BOT_LIST);

createPills (document.getElementById ("filter-pills"), function (sP) {
  selectedPills = sP;
  console.log (selectedPills);
  renderBotsList (document.getElementById ("bots-list"), BOT_LIST);
});
