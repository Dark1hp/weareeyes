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
          console.log(wordsArr);
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
        if($(this).data('target')) {
          var getTarget = $(this).data('target');
          var getAction = $(this).data('expand');
          console.log(getAction);
          if(getAction === true) {
            $('.' + getTarget).addClass('expanded');
          } else {
            $('.' + getTarget).removeClass('expanded');
          }
        } else {
          var getContainer = $(this).parents('.js-expand-container');
          getContainer.toggleClass('expanded');
        }
      });
      // var slider = $('.catalog-slider').lightSlider({
      //   item: 1,
      //   slideMargin: 0,
      //   controls: false,
      //   pager: false,
      //   mode: 'fade',
      // });
      // $('.flexslider').flexslider({
      //   animation: "fade",
      //   // controlNav: "thumbnails",
      //   controlsContainer: $(".slider__nav-controls"),
      //   customDirectionNav: $(".slider__nav-test a"),
      //   start: function(slider){
      //     $('body').removeClass('loading');
      //   }
      // });
      $('.slider').glide(
      {
        type: 'slideshow',
        // autoplay: false,
        // classes: {
        //   base: 'slider',
        //   arrows: 'slider__nav',
        //   arrow: 'slider__control',
        //   arrowNext: 'slider__right',
        //   arrowPrev: 'slider__left',
        //   bullets: 'slider__bullets',
        //   bullet: 'slider__color',
        // }
      }
      )
    })();

  }); //end ready

} (jQuery));