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

    (function dlTabs() {
      var wrapper = $('.js-tab-wrapper'),
        menu = wrapper.find('.js-tab-menu li'),
        content = wrapper.find('.js-tab-content');
      content.each(function(i) {
        if (i !== 0) {
          $(this).hide();
        }
        $(this).attr('data-tab', 'tab-' + i);
      });
      menu.each(function(i) {
        $(this).attr('data-tab', 'tab-' + i);
      });

      menu.click(function() {
        var getWrapper = $(this).closest(wrapper),
          dataTab = $(this).attr('data-tab'),
          curDataTab = getWrapper.find(menu).find('.active').parent().attr('data-tab');
        getWrapper.find(menu).find('a').removeClass('active');
        $(this).find('a').addClass('active');

        getWrapper.find(content).filter('[data-tab=' + curDataTab + ']').slideUp(0, function() {
          getWrapper.find(content).filter('[data-tab=' + dataTab + ']').slideDown(0);
        });
      });
    })();

    (function initListeners() {
      $(document).on('click', '.js-expand-btn', function(e) {
        e.preventDefault();
        var getContainer = $(this).parents('.js-expand-container');
        getContainer.toggleClass('expanded');
      });
    })();

  }); //end ready

} (jQuery));