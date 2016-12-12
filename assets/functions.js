(function($) {
  'use strict';
  var data_quantity;
  $(document).ready(function() {
    $('.add-to-cart').on('click', function(event) {
      event.preventDefault();
      var id = $("input[name='id']").val();
      $.ajax({
        url: '/cart/add.js',
        type: 'POST',
        dataType: 'json',
        data: $('form[action="/cart/add"]').serialize(),
        success: function(data) {
          // console.log(data);
          setTimeout(function() {
            jQuery.getJSON('/cart.js', function(cart) {


              //     console.log(cart);
              $('.cart__info-count').html(cart.item_count);
              $('.product-price-cart').html(Shopify.formatMoney(cart.original_total_price, window.money_format));
              var arr = cart.items;
              var html_p = '';
              html_p += '<h3 class="cart__item-title">Shopping bag</h3>';
              html_p += '<span class="cart__item-count">(' + cart.item_count + ' item selected)</span>';
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                  data_quantity = arr[i].quantity;
                  console.log(data_quantity);
                }

                var html_p_item = '';
                html_p_item += '<div class="cart__item-product clearfix">'
                html_p_item += '<div class="cart__item-photo"><img src="' + arr[i].image + '" alt="{{ item.title | escape }}"></div>';
                html_p_item += '<div class="cart__item-info">';
                html_p_item += '<span class="product-name">' + arr[i].product_title + '</span>';
                html_p_item += '<span class="product-price">' + Shopify.formatMoney(arr[i].price, window.money_format) + '</span>';
                html_p_item += '<a data-quantity = "' + arr[i].quantity + '" href="' + arr[i].id + '" class="cart__item-remove "></a>';
                html_p_item += "</div>";
                html_p_item += "</div>";
                var html_p_item_ar = '';
                if (arr[i].quantity > 1) {
                  for (var iq = 0; iq < arr[i].quantity; iq++) {
                    html_p_item_ar += html_p_item;
                  }
                } else {
                  html_p_item_ar += html_p_item;
                }
                html_p += html_p_item_ar;

              }
              $('.cart__item_add').html(html_p);
              //  console.log(html_p);
            });
          }, 200);

          //$('.js-cart-click').trigger('click');
        }
      })
    });


    $(document).on('click', '.cart__item-remove , .notification__btn', function() {
      var var_href = $(this).attr('href');
      var var_quantity = $(this).data('quantity');

      jQuery.post('/cart/update.js', "updates[" + var_href + "]=" + (var_quantity - 1) + "");
      setTimeout(function() {
        jQuery.getJSON('/cart.js', function(cart) {
          $('.cart__info-count').html(cart.item_count);
          $('.product-price-cart').html(Shopify.formatMoney(cart.original_total_price, window.money_format));
          var arr = cart.items;
          var html_p = '';
          html_p += '<h3 class="cart__item-title">Shopping bag</h3>';
          html_p += '<span class="cart__item-count">(' + cart.item_count + ' item selected)</span>';
          for (var i = 0; i < arr.length; i++) {
            var html_p_item = '';
            html_p_item += '<div class="cart__item-product clearfix">'
            html_p_item += '<div class="cart__item-photo"><img src="' + arr[i].image + '" alt="{{ item.title | escape }}"></div>';
            html_p_item += '<div class="cart__item-info">';
            html_p_item += '<span class="product-name">' + arr[i].product_title + '</span>';
            html_p_item += '<span class="product-price">' + Shopify.formatMoney(arr[i].price, window.money_format) + '</span>';
            html_p_item += '<a data-quantity = "' + arr[i].quantity + '" href="' + arr[i].id + '" class="cart__item-remove "></a>';
            html_p_item += "</div>";
            html_p_item += "</div>";
            var html_p_item_ar = '';
            if (arr[i].quantity > 1) {
              for (var iq = 0; iq < arr[i].quantity; iq++) {
                html_p_item_ar += html_p_item;
              }
            } else {
              html_p_item_ar += html_p_item;
            }
            html_p += html_p_item_ar;

          }
          $('.cart__item_add').html(html_p);
          // console.log(html_p);
        });
      }, 500);
      $(document).trigger('click');
      return false;
    });

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

    if ($(window).width() <= 480) {
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
        if ($(this).data('target')) {
          var getTarget = $(this).data('target');
          var getAction = $(this).data('expand');
          console.log(getAction);
          if (getAction === true) {
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
        getScroll.scrollTo(getTarget, 500, { offset: -($(window).width() - getTarget.width()) / 2.5 });
      });
      //       $('.overflow-x-scroll').scrollTo($('.overflow-x-scroll').find('.product__descr-item:nth-child(2)'), 500, {offset: -($(window).width()-$('.overflow-x-scroll').find('.product__descr-item:nth-child(2)').width())/2.5})

      // Hover Effect
      if ($(window).width() > 480) {
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

        if ($(this).hasClass('js-slide-prev') && !$(this).hasClass('disabled')) {
          getSlider.find('.js-slide-control.active').removeClass('active').prev().addClass('active');
          getTarget = getCurrent.removeClass('active').prev().addClass('active');
          checkSlide(getCurrent.prev(), getSlider);
        } else if ($(this).hasClass('js-slide-next') && !$(this).hasClass('disabled')) {
          getSlider.find('.js-slide-control.active').removeClass('active').next().addClass('active');
          getTarget = getCurrent.removeClass('active').next().addClass('active');
          checkSlide(getCurrent.next(), getSlider);
        }

        if (getTarget) {
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
        if ($(e.target).hasClass('js-product-btn')) {
          var getTarget = $(e.target);
          var getParent = getTarget.parent();
          var getPos = getTarget.position();
          var getAction = getTarget.data('product-action');

          switch (getAction) {
            case 'buy':
              setTimeout(function() {
                var getThumb = getTarget.data('product-thumb');
                var getid = $("input[name='id']").val();
                var setThumb = $('<img class="notification__thumb" alt="Thumb of product" src="' + getThumb + '">');
                var setText = $("<span class='notification__text'>Good choise! <br> It's in your cart</span>");
                var setBtn = $("<a data-quantity = '" + (data_quantity) + "' class='notification__btn' href='" + getid + "'>Remove from buy cart</a>");
                container.html(setThumb).append(setText).append(setBtn);
                if ($(window).width() <= 480) {
                  container.appendTo(getParent).css({
                    top: (getPos.top + getTarget.outerHeight() + 20) + "px",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }).show(5).delay(3000).hide(5);
                } else {
                  container.appendTo(getParent).css({
                    top: (getPos.top + getTarget.outerHeight() + 20) + "px",
                    left: (getPos.left - Math.abs(getTarget.outerWidth() - container.outerWidth()) / 2) + "px"
                  }).show(5).delay(3000).hide(5);
                }

              }, 500);
              break;
            case 'try':
              var getThumb = getTarget.data('product-thumb');
              var setThumb = $('<img class="notification__thumb" alt="Thumb of product" src="' + getThumb + '">');
              var setText = $("<span class='notification__text'><b>" + getTarget.data('try-number') + " out of " + getTarget.data('try-max') + "</b> <br> For you try!</span>");
              var setBtn = $("<a class='notification__btn' href='#!'>Remove from try cart</a>");
              container.html(setThumb).append(setText).append(setBtn);
              container.appendTo(getParent).css({
                top: (getPos.top + getTarget.outerHeight() + 20) + "px",
                left: (getPos.left - Math.abs(getTarget.outerWidth() - container.outerWidth()) / 2) + "px"
              }).show();
              break;
            default:
              break;
          }
        } else if (!$(e.target).closest('.notification').length) {
          container.hide();
        }
      })

      /* Navigation effects */
      // Change the color of nav
      $(document).on('scroll', function() {
        if ($('#collection').length) {
          if ($(this).scrollTop() + $(window).height() / 2 >= $('#collection').offset().top) {
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
      if (getTarget.is(':first-child')) {
        getSlider.find('.js-slide-control').removeClass('disabled');
        getSlider.find('.js-slide-prev').addClass('disabled');
      } else if (getTarget.is(':last-child')) {
        getSlider.find('.js-slide-control').removeClass('disabled');
        getSlider.find('.js-slide-next').addClass('disabled');
      } else {
        getSlider.find('.js-slide-control').removeClass('disabled');
      }
    }

    // Animations (Glitch and etc.)
    (function animations() {

      var core = function() {}


      var scrollY = 0,
        lastScrollY = 0,
        acceleration = Array(),
        velocity = Array(),
        inMotion = Array(),
        frameRate = 1 / 60,
        opacity = Array(),
        newTop = Array(),
        NewPositions = Array(),
        Positions = Array(),
        animating = false,
        stiffness = 28,
        friction = 9,
        threshold = 2,
        $b, $boxItems, elementsLength, $w;



      core.prototype.init = function() {
        window.requestAnimFrame = (function() {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        })();

        window.cancelRequestAnimFrame = (function() {
          return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout
        })();

        $w = $(window);
        $b = $(".menu.expanded");
        $boxItems = $b.find('.menu__list-item');
        var arr = Array.prototype.slice.call($boxItems).reverse();
        $boxItems = arr;
        elementsLength = $boxItems.length;

        $b.find('.menu__wrapper').css({
          height: $w.height()/1.5 + $($boxItems[0]).height() * elementsLength
        });

        for (var i = 0; i < elementsLength; i++) {
          Positions[i] = $w.height() / 2 + $($boxItems[i]).position().top - $b.position().top;
          NewPositions[i] = Positions[i],
            newTop[i] = Positions[i],
            inMotion[i] = true,
            acceleration[i] = 0,
            velocity[i] = 0
        }
        for (var i = 0; i < elementsLength; i++) {
          $($boxItems[i]).css({
            position: 'absolute',
            transform: "translate3d(0," + Positions[i] + "px,0)"
          })
        }
        for (var i = 0; i < elementsLength; i++) {
          $($boxItems[i]).css({ opacity: 1 - Math.abs($boxItems[i].getBoundingClientRect().top - ($w.height() / 2)) / ($w.height() / 2) });
        }

        $b[0].addEventListener('scroll', core.onScrolling, false);
      }

      core.onScrolling = function(e) {
        lastScrollY = scrollY;
        scrollY = $b.scrollTop();

        console.log(scrollY);
        for (var i = 0; i < elementsLength; i++) {
          inMotion[i] = true;
        }
        if (!animating) {
          animating = true;
          requestAnimFrame(core.stepScrolling);
        }
      }

      core.stepScrolling = function() {
        for (var t = elementsLength - 1; t >= 0; t--) {
          var $thisItem = $boxItems[t];
          inMotion[t] ? (
            acceleration[t] = (stiffness + 5 * t) * (Positions[t] - scrollY - NewPositions[t]) - friction * velocity[t],
            velocity[t] += acceleration[t] * frameRate,
            newTop[t] += velocity[t] * frameRate,
            inMotion[t] = Math.abs(acceleration[t]) >= threshold || Math.abs(velocity[t]) >= threshold,
            opacity[t] = 1 - Math.abs($thisItem.getBoundingClientRect().top - ($w.height() / 2)) / ($w.height() / 2),
            $($thisItem).css({
              transform: "translate3d(0," + newTop[t] + "px,0)",
              opacity: opacity[t]
            }),
            NewPositions[t] = newTop[t]) : core.completeScrolling()
        };
        if (animating) requestAnimFrame(core.stepScrolling);
      }

      core.completeScrolling = function() {
        for (var i = 0; i < elementsLength; i++) {
          acceleration[i] = 0;
          velocity[i] = 0;
          inMotion[i] = false;
        }

        animating = false;
        cancelAnimationFrame(core.stepScrolling);
      }

      core.prototype.reset = function() {
        scrollY = 0,
          lastScrollY = 0,
          acceleration = Array(),
          velocity = Array(),
          inMotion = Array(),
          frameRate = 1 / 60,
          opacity = Array(),
          newTop = Array(),
          NewPositions = Array(),
          Positions = Array(),
          animating = false,
          stiffness = 25,
          friction = 10,
          threshold = 2,
          $b, $boxItems, elementsLength, $w;
        for (var i = 0; i < elementsLength; i++) {
          $($boxItems[i]).removeAttr('style');
        }
      }

      $(document).on('click', '.burger', function(event) {
        event.preventDefault();
        var el = $(this);
        var Core = new core();

        if (el.data('expand') === true) {
          Core.init();
          el.data('expand', false);
          el.find('.burger__info span:first-child').hide('slide', { direction: 'down', easing: 'easeInBack' }, 600);
          el.find('.burger__line:first-child, .burger__line:last-child').clearQueue().stop().hide('slide', { direction: 'left', easing: 'easeInBack' }, 500, function() {
            $(this).css({ "visibility": "hidden", display: 'block' }).slideUp(200);
          });


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
            onComplete: function() {
              $('.menu.expanded').removeAttr('style');
              $('body').addClass("overflow-hidden");      
            }
          })

        } else {
          $('body').removeClass("overflow-hidden");
          Core.reset();
          el.data('expand', true);
          el.find('.burger__line:first-child, .burger__line:last-child').clearQueue().stop().css({ "visibility": "visible" }).show('slide', { direction: 'left', easing: 'easeOutBack' }, 500);
          el.find('.burger__info span:first-child').show('drop', { direction: 'down', easing: 'easeOutBack' }, 500);
        }

      })

      // Burger icon animations
      $('.burger').hover(
        function(e) {
          e.preventDefault();
          $(this).find('.burger__line:last-child').animate({
            width: '100%'
          }, 500, 'easeOutBack');
        },
        function(e) {
          e.preventDefault();
          $(this).find('.burger__line:last-child').animate({
            width: '65%'
          }, 500)
        }
      );

    })();

    // Check the page
    (function locPages() {
      var getHref = location.pathname;
      if(getHref !== "/" || getHref !== "/pages/wearequality" || getHref !== "/pages/our-story" || getHref !== "/pages/campaign" || getHref !== "/pages/campaign") {
        $('.footer').find('.line').remove();
      }
    })();
  }); //end ready

}(jQuery));
