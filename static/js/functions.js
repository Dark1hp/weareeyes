(function ($) {
  'use strict';

  $(document).ready(function () {

    (function formatArticleTitle() {

      var maxNumberForTitle = 31;
      var spanHeight = 26; //указываем тут нормальную высоту заголовка (т.е размер плашки span'a)
      for (var i = 0; i < $('.break-text').length; i++) {
        if ($('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").length > maxNumberForTitle) {

          var wordsArr = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").split(" ");
          var formatedTitle = [];
          var numberOfChar = 0;
          var generalNumberInString = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").length;
          var loop = 0;
          var loopPoint = 0;

          if (typeof (wordsArr) == "object") {
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

                formatedTitle[loop] += "</span>";
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
          for (var t = 0; t < formatedTitle.length; t++) {
            if (formatedTitle[t].replace("<span>", "").replace("</span>", "").length > 3) {
              $(".break-text")[i].innerHTML += formatedTitle[t];
            }
          }
        }
      }

      // Постобработка:
      for(var i = 0; i<$('.break-text').length; i++) {
        for(var j = 0; j < $('.break-text')[i].children.length; j++) {
          if(+$($('.break-text')[i].children[j]).css('height').replace("px", "") > spanHeight) {
            var spanContent = ($($('.break-text')[i].children[j])).html().split(" ");
            //Очищаем массив spanContent от пустых строк
            for(var k = 0; k < spanContent.length; k++) {
              if(spanContent[k].length === 0) {
                 spanContent.splice(k, 1);
              }
            }

            var newSpan = document.createElement('span');
            newSpan.innerHTML = spanContent[spanContent.length-1];

            //Удаляем это же слово в предыдущем span'е
            $('.break-text')[i].children[j].innerHTML = "";
            for(var b = 0; b < spanContent.length-1; b++) {
              $('.break-text')[i].children[j].innerHTML += " "+spanContent[b];
              $('.break-text')[i].insertBefore(newSpan, $('.break-text')[i].children[j+1]);
            } 
          }  
        }
      }
      
    })();

  }); //end ready

} (jQuery));