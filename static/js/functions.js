(function ($) {
  'use strict';

  $(document).ready(function () {

    (function formatArticleTitle() {

      for (var i = 0; i < $('.break-text').length; i++) {

        var wordsArr = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").split(" ");
        var formatedTitle = [];
        var numberOfChar = 0;
        var generalNumberInString = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").length;
        var maxNumberForTitle = 25;
        var loop = 0;
        var loopPoint = 0;

        if (typeof (wordsArr) == "object") {
          //console.log(wordsArr);
          while (loop < Math.ceil(generalNumberInString / maxNumberForTitle) - 1) {
            
            if (loop === 0) {

              formatedTitle[loop] = "<span>";

              for (var j = 0; j < wordsArr.length; j++) {

                if (typeof (wordsArr[j]) != "undefined") {
                  
                  if (numberOfChar > maxNumberForTitle) {
                    
                    loopPoint = j;
                    break;
                  } else {
                    numberOfChar += wordsArr[j].length;
                    formatedTitle[loop] += wordsArr[j] + " ";
                    loopPoint = j;
                  }
                }
              }

              formatedTitle[loop] += "</div></span>";
              loop += 1;
              continue;

            } else {
              numberOfChar = 0;
              formatedTitle[loop] = "<span>";
              for (var j = loopPoint; j < wordsArr.length; j++) {
                if (typeof (wordsArr[j]) != "undefined") {
                  if (numberOfChar > maxNumberForTitle) {
                    loopPoint = j;
                    break;

                  } else {
                    numberOfChar += wordsArr[j].length;
                    formatedTitle[loop] += wordsArr[j] + " ";
                    loopPoint = j;
                  }

                }

              }

              formatedTitle[loop] += "</span>";
              loop += 1;
              continue;
            }
          }
        }
        //console.log(formatedTitle);
        //RENDER SCRIPT RESULTS
        $(".break-text")[i].innerHTML = "";
        for(var t = 0; t < formatedTitle.length; t++) {
          if(formatedTitle[t].replace("<span>", "").replace("</span>", "").length > 3){
            $(".break-text")[i].innerHTML += formatedTitle[t];
          }
          
        }
        
      }

    })();

  }); //end ready

} (jQuery));