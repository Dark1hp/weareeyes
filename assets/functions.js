(function ($) {
  'use strict';
  var data_quantity;
  $(document).ready(function () {
    $('.add-to-cart').on('click' , function(event){
     event.preventDefault();
     var id = $("input[name='id']").val();
     $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      dataType: 'json',
      data: $('form[action="/cart/add"]').serialize(),
      success: function(data) {
       // console.log(data);
       setTimeout(function () {
        jQuery.getJSON('/cart.js', function(cart) {


        //     console.log(cart);
        $('.cart__info-count').html(cart.item_count);
        $('.product-price-cart').html(Shopify.formatMoney(cart.original_total_price, window.money_format) );
        var arr = cart.items;
        var html_p = '' ; 
        html_p +=  '<h3 class="cart__item-title">Shopping bag</h3>';
        html_p +='<span class="cart__item-count">('+cart.item_count+' item selected)</span>';
        for(var i = 0 ; i< arr.length ; i++ ){
          if( arr[i].id == id ){
           data_quantity = arr[i].quantity ;
           console.log(data_quantity);
         }

         var  html_p_item = '';
         html_p_item += '<div class="cart__item-product clearfix">'
         html_p_item += '<div class="cart__item-photo"><img src="'+ arr[i].image +'" alt="{{ item.title | escape }}"></div>';
         html_p_item +='<div class="cart__item-info">';
         html_p_item += '<span class="product-name">'+ arr[i].product_title +'</span>';
         html_p_item += '<span class="product-price">'+Shopify.formatMoney(arr[i].price, window.money_format)  +'</span>';
         html_p_item += '<a data-quantity = "'+arr[i].quantity+'" href="'+arr[i].id+'" class="cart__item-remove "></a>'; 
         html_p_item +=  "</div>";
         html_p_item +=  "</div>";
         var  html_p_item_ar = '';
         if(arr[i].quantity > 1){
          for(var iq = 0 ; iq< arr[i].quantity ; iq++ ){
            html_p_item_ar +=html_p_item;
          }
        }else{
          html_p_item_ar+=html_p_item;
        }
        html_p += html_p_item_ar ;

      }
      $('.cart__item_add').html(html_p);
       //  console.log(html_p);
     } );
      }, 200);

//$('.js-cart-click').trigger('click');
}
})
   });


    $(document).on('click' , '.cart__item-remove , .notification__btn' , function(){
     var var_href = $(this).attr('href');
     var var_quantity = $(this).data('quantity');

     jQuery.post('/cart/update.js', "updates["+var_href+"]="+(var_quantity-1)+"");
     setTimeout(function () {
       jQuery.getJSON('/cart.js', function(cart) {
        $('.cart__info-count').html(cart.item_count);
        $('.product-price-cart').html(Shopify.formatMoney(cart.original_total_price, window.money_format));
        var arr = cart.items;
        var html_p = '' ; 
        html_p +=  '<h3 class="cart__item-title">Shopping bag</h3>';
        html_p +='<span class="cart__item-count">('+cart.item_count+' item selected)</span>';
        for(var i = 0 ; i< arr.length ; i++ ){
         var  html_p_item = '';
         html_p_item += '<div class="cart__item-product clearfix">'
         html_p_item += '<div class="cart__item-photo"><img src="'+ arr[i].image +'" alt="{{ item.title | escape }}"></div>';
         html_p_item +='<div class="cart__item-info">';
         html_p_item += '<span class="product-name">'+ arr[i].product_title +'</span>';
         html_p_item += '<span class="product-price">'+Shopify.formatMoney(arr[i].price, window.money_format)  +'</span>';
         html_p_item += '<a data-quantity = "'+arr[i].quantity+'" href="'+arr[i].id+'" class="cart__item-remove "></a>'; 
         html_p_item +=  "</div>";
         html_p_item +=  "</div>";
         var  html_p_item_ar = '';
         if(arr[i].quantity > 1){
          for(var iq = 0 ; iq< arr[i].quantity ; iq++ ){
            html_p_item_ar +=html_p_item;
          }
        }else{
          html_p_item_ar+=html_p_item;
        }
        html_p += html_p_item_ar ;

      }
      $('.cart__item_add').html(html_p);
// console.log(html_p);
} );
     }, 500);
     $(document).trigger('click');
     return false;
   });
    // (function formatArticleTitle() {

    //   var maxNumberForTitle = 25;
    //   var spanHeight = 26; //указываем тут нормальную высоту заголовка (т.е размер плашки span'a)
    //   for (var i = 0; i < $('.break-text').length; i++) {
    //     if ($('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").length > maxNumberForTitle) {

    //       var wordsArr = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").split(" ");
    //       var formatedTitle = [];
    //       var numberOfChar = 0;
    //       var generalNumberInString = $('.break-text')[i].innerHTML.replace("<span>", "").replace("</span>", "").length;
    //       var loop = 0;
    //       var loopPoint = 0;
    //       console.log(wordsArr);
    //       if (typeof (wordsArr) == "object") {
    //         while (loop < Math.ceil(generalNumberInString / maxNumberForTitle) - 1) {
    //           if (loop === 0) {
    //             formatedTitle[loop] = "<span>";

    //             for (var j = 0; j < wordsArr.length; j++) {
    //               if (typeof (wordsArr[j]) != "undefined") {
    //                 if (numberOfChar > maxNumberForTitle) {
    //                   loopPoint = j;
    //                   break;
    //                 } else {
    //                   numberOfChar += wordsArr[j].length;
    //                   formatedTitle[loop] += wordsArr[j] + " ";
    //                   loopPoint = j;
    //                 }
    //               }
    //             }

    //             formatedTitle[loop] += "</span>";
    //             loop += 1;
    //             continue;

    //           } else {
    //             numberOfChar = 0;
    //             formatedTitle[loop] = "<span>";
    //             for (var j = loopPoint; j < wordsArr.length; j++) {
    //               if (typeof (wordsArr[j]) != "undefined") {
    //                 if (numberOfChar > maxNumberForTitle) {
    //                   loopPoint = j;
    //                   break;

    //                 } else {
    //                   numberOfChar += wordsArr[j].length;
    //                   formatedTitle[loop] += wordsArr[j] + " ";
    //                   loopPoint = j;
    //                 }
    //               }
    //             }

    //             formatedTitle[loop] += "</span>";
    //             loop += 1;
    //             continue;
    //           }
    //         }
    //       }
    //       //console.log(formatedTitle);
    //       //RENDER SCRIPT RESULTS
    //       $(".break-text")[i].innerHTML = "";
    //       for (var t = 0; t < formatedTitle.length; t++) {
    //         if (formatedTitle[t].replace("<span>", "").replace("</span>", "").length > 3) {
    //           $(".break-text")[i].innerHTML += formatedTitle[t];
    //         }
    //       }
    //     }
    //   }

    //   // Постобработка:
    //   for(var i = 0; i<$('.break-text').length; i++) {
    //     for(var j = 0; j < $('.break-text')[i].children.length; j++) {
    //       if(+$($('.break-text')[i].children[j]).css('height').replace("px", "") > spanHeight) {
    //         var spanContent = ($($('.break-text')[i].children[j])).html().split(" ");
    //         //Очищаем массив spanContent от пустых строк
    //         for(var k = 0; k < spanContent.length; k++) {
    //           if(spanContent[k].length === 0) {
    //              spanContent.splice(k, 1);
    //           }
    //         }

    //         var newSpan = document.createElement('span');
    //         newSpan.innerHTML = spanContent[spanContent.length-1];

    //         //Удаляем это же слово в предыдущем span'е
    //         $('.break-text')[i].children[j].innerHTML = "";
    //         for(var b = 0; b < spanContent.length-1; b++) {
    //           $('.break-text')[i].children[j].innerHTML += " "+spanContent[b];
    //           $('.break-text')[i].insertBefore(newSpan, $('.break-text')[i].children[j+1]);
    //         } 
    //       }  
    //     }
    //   }

    // })();

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

    if($(window).width() <= 480) {
      (function overflowFix(element) {
        element.wrap('<div class="overflow-x-hidden"></div>')
      })($('.content__img').find('> img'));

      (function overflowFix(element) {
        element.wrap('<div class="overflow-x-scroll"></div>')
      })($('.share__wrapper'));

      (function overflowFix(element) {
        element.wrap('<div class="overflow-x-scroll"></div>')
      })($('.product__descr-list')); // Set the selector
    }

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

      //Centering Scroll
      $(document).on('click', '.product__descr-item', function(e) {
        e.preventDefault();
        var getTarget = $(this);
        var getScroll = $(this).closest('.overflow-x-scroll');
        getScroll.scrollTo(getTarget, 500, {offset: -($(window).width()-getTarget.width())/2.5});
      });
//       $('.overflow-x-scroll').scrollTo($('.overflow-x-scroll').find('.product__descr-item:nth-child(2)'), 500, {offset: -($(window).width()-$('.overflow-x-scroll').find('.product__descr-item:nth-child(2)').width())/2.5})

      // Hover Effect
      if($(window).width() > 480) { 
        $('[data-model-hover]').mouseover(function(e) {
          e.preventDefault();
          var getSrc = $(this).data('model-hover');
          var getImg = $(this).find('img');
          var getSrcImg = getImg.attr('src');
          $(this).data('model-hover', getSrcImg);
          getImg.attr('src', getSrc).attr('style', 'float: none; margin-top: 30px;');
          // getImg.fadeOut(300, function() {
          //   getImg.fadeIn(300);
          // });
        }).mouseout(function(e) {
          e.preventDefault();
          var getSrc = $(this).data('model-hover');
          var getImg = $(this).find('img');
          var getSrcImg = getImg.attr('src');
          $(this).data('model-hover', getSrcImg);
          getImg.attr('src', getSrc).removeAttr('style');
          // getImg.fadeOut(300, function() {
          //   getImg.fadeIn(300);
          // });
        });
      }

      // Slider
      $(document).on('click', '.js-slide-control', function(e) {
        e.preventDefault();
        
        var getSlider = $(this).closest('.slider');
        var getCurrent = getSlider.find('.slider__content-item.active');
        var getTarget;
        
        if($(this).hasClass('js-slide-prev') && !$(this).hasClass('disabled')) {
          getSlider.find('.js-slide-control.active').removeClass('active').prev().addClass('active');
          getTarget = getCurrent.removeClass('active').prev().addClass('active');
          checkSlide(getCurrent.prev(), getSlider);
        } else if($(this).hasClass('js-slide-next') && !$(this).hasClass('disabled')) {
          getSlider.find('.js-slide-control.active').removeClass('active').next().addClass('active');
          getTarget = getCurrent.removeClass('active').next().addClass('active');
          checkSlide(getCurrent.next(), getSlider);
        }

        if(getTarget) {
          getTarget.closest('.slider').siblings('.catalog__list-link').attr("href", getTarget.attr("data-model-url"));
        }
      })

      //Addition
      $(document).on('click', '.slider__color', function(e) {
        e.preventDefault();
        
        var getSlider = $(this).closest('.slider');
        var getCurrent = getSlider.find('.slider__content-item.active');

        var getNumber = getSlider.find('.slider__color').index($(this));
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        getCurrent.removeClass('active');
        var getTarget = getSlider.find('.slider__content-item').eq(getNumber).addClass('active');
        getTarget.closest('.slider').siblings('.catalog__list-link').attr("href", getTarget.attr("data-model-url"));

        checkSlide(getTarget, getSlider);
      });

      $(document).on('click', '.slider__content-item', function(e) {
        e.preventDefault();
        
        var getUrl = $(this).attr('data-model-url');

        location.href = getUrl;
      });
      
      //Notifications
      $(document).on('click', function(e) {
        var container = $('.notification');
        if($(e.target).hasClass('js-product-btn')) {
          var getTarget = $(e.target);
          var getParent = getTarget.parent();
          var getPos = getTarget.position();
          var getAction = getTarget.data('product-action');

          switch(getAction) {
            case 'buy':
            setTimeout(function () {
              var getThumb = getTarget.data('product-thumb');
              var getid = $("input[name='id']").val();              
              var setThumb = $('<img class="notification__thumb" alt="Thumb of product" src="' + getThumb + '">');
              var setText = $("<span class='notification__text'>Good choise! <br> It's in your cart</span>");
              var setBtn = $("<a data-quantity = '"+(data_quantity)+"' class='notification__btn' href='"+getid+"'>Remove from buy cart</a>");
              container.html(setThumb).append(setText).append(setBtn);
              if($(window).width() <= 480) {
                container.appendTo(getParent).css({
                  top: (getPos.top + getTarget.outerHeight() + 20) + "px",
                  left: "50%",
                  transform: "translateX(-50%)"
                }).show(5).delay(3000).hide(5);
              } else {
                container.appendTo(getParent).css({
                  top: (getPos.top + getTarget.outerHeight() + 20) + "px",
                  left: (getPos.left - Math.abs(getTarget.outerWidth() - container.outerWidth())/2) + "px"
                }).show(5).delay(3000).hide(5);
              }

            }, 1500);
            break;
            case 'try':
            var getThumb = getTarget.data('product-thumb');
            var setThumb = $('<img class="notification__thumb" alt="Thumb of product" src="' + getThumb + '">');
            var setText = $("<span class='notification__text'><b>" + getTarget.data('try-number') + " out of " + getTarget.data('try-max') + "</b> <br> For you try!</span>");
            var setBtn = $("<a class='notification__btn' href='#!'>Remove from try cart</a>");
            container.html(setThumb).append(setText).append(setBtn);
            container.appendTo(getParent).css({
              top: (getPos.top + getTarget.outerHeight() + 20) + "px",
              left: (getPos.left - Math.abs(getTarget.outerWidth() - container.outerWidth())/2) + "px"
            }).show();
            break;
            default:
            break;
          }
        } else if(!$(e.target).closest('.notification').length) {
          container.hide();
        }
      })

      /* Navigation effects */
      // Change the color of nav
      $(document).on('scroll', function() {
        if($('#collection').length) {
          if($(this).scrollTop() + $(window).height()/2 >= $('#collection').offset().top){
            $('.nav').addClass('nav--black');
            $('[href="#collection"]').siblings().removeClass('active');
            $('[href="#collection"]').addClass('active');
          } else if ($(this).scrollTop() + $(window).height() > $('#manifesto').offset().top) {
            $('.nav').removeClass('nav--black');
            $('[href="#manifesto"]').siblings().removeClass('active');
            $('[href="#manifesto"]').addClass('active');
          } else {
            $('.nav').removeClass('nav--black');
            $('[href="#home"]').siblings().removeClass('active');
            $('[href="#home"]').addClass('active');
          }
        }
      });
      // Scroll to anchor links
      $(document).on('click', '.nav__item, .header__scroll', function(event) {
        event.preventDefault();

        // Get id of container from href attribute
        var getAnchor = $(this).attr("href");
        
        // Remove class active from others and add to this link
        $(this).siblings().removeClass('active');
        $(this).addClass('active')

        // Animate scrolling to container
        $('html, body').animate({
          scrollTop: $(getAnchor).offset().top
        }, 1000);
      })
    })();

    function checkSlide(getTarget, getSlider) {
      if(getTarget.is(':first-child')) {
        getSlider.find('.js-slide-control').removeClass('disabled');
        getSlider.find('.js-slide-prev').addClass('disabled');
      } else if(getTarget.is(':last-child')) {
        getSlider.find('.js-slide-control').removeClass('disabled');
        getSlider.find('.js-slide-next').addClass('disabled');
      } else {
        getSlider.find('.js-slide-control').removeClass('disabled');
      }
    }

    // Animations (Glitch and etc.)
    (function animations() {

      // Burger icon animations
      $('.burger').hover(
        function(e) {
          e.preventDefault();
          console.log($(this).find('.burger__line:last-child'));
          $(this).find('.burger__line:last-child').animate({
            width: '100%'
          }, 500, 'easeOutBack');
        }, function(e) {
          e.preventDefault();
          $(this).find('.burger__line:last-child').animate({
            width: '65%'
          }, 500)
        }
        );

        // $('.menu__list').bind('DOMMouseScroll mousewheel', function(e){
        //     var menuArr = $('.menu.expanded .menu__list-item');

        //     if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {

        //         // $.each(menuArr, function(i, v) {
        //         //   $(menuArr[i]).animate({top: (($(window).height()/2)+(i*90))});
        //         // });

        //       $.each(menuArr, function(i, v) {
        //         $(menuArr[i]).animate({top: $(this).position().top+25}, 500);
        //       });
        //     }
        //     else{

        //       $.each(menuArr, function(i, v) {
        //         $(menuArr[i]).animate({top: $(this).position().top-25}, 500);
        //       });

        //     }
        // });

      // $('.menu__list').scroll(function(e) {
      //   e.preventDefault();

      //   console.log("Hello");
      //   // $(this).find('.menu__list-item:first-child').css({top: $(window).height()/2});
      //   // console.log($($(this).find('.menu__list-item:first-child .menu__list-link')).position());

      //   // $($(this).find('.menu__list-item')[0]).css('top', ($($(this).find('.menu__list-item')[0]).position().top - 25) + 'px');
      //   // $($(this).find('.menu__list-item')[0]).animate({
      //   //     top: 0
      //   //   }, 2000, 'easeOutElastic');
      // });

      function setPositionMenu() {
        var menuArr = $('.menu.expanded .menu__list-item');

        $.each(menuArr, function(i, v) {
          $(menuArr[i]).css({top: (($(window).height()/2)+(i*90))});
        });
      }

      $(document).on('click', '.burger', function(event) {
        event.preventDefault();
        var el = $(this);

        if(el.data('expand') === true) {
          setPositionMenu();
          el.data('expand', false);
          el.find('.burger__info span:first-child').hide('slide', {direction: 'down', easing: 'easeInBack'}, 600);
          el.find('.burger__line:first-child, .burger__line:last-child').clearQueue().stop().hide('slide', {direction: 'left', easing: 'easeInBack'}, 500, function() {
            $(this).css({"visibility":"hidden",display:'block'}).slideUp(200);
          });
        } else {
          el.data('expand', true);
          el.find('.burger__line:first-child, .burger__line:last-child').clearQueue().stop().css({"visibility":"visible"}).show('slide', {direction: 'left', easing: 'easeOutBack'}, 500);
          el.find('.burger__info span:first-child').show('drop', {direction: 'down', easing: 'easeOutBack'}, 500);
        }

        // var r = e($(window).width(), $(window).height(), 20)
        // , n = Math.max(1, Math.max(r.w / $(window).width(), r.h / $(window).height()));

        TweenMax.set($('.menu')[0], {
          scale: 1,
          rotation: 20,
          y: $(window).height(),
          force3D: "auto",
          transformOrigin: "0px 0px"
        }),
        TweenMax.to($('.menu')[0], .5, {
          ease: Power2.easeOut,
          delay: .1,
          y: 0,
          rotation: 0,
          force3D: "auto",
        })
      })
    })();

  }); //end ready

} (jQuery));