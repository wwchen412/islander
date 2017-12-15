// VARIABLES
var counter = 1;
var scrollDirection;
var slides = $('.full-page .section');
var slidesLength = slides.length;
var inTransition = false;
console.log(slides);

console.log(slidesLength);

function scrollAnimate(distance) {
    inTransition = true;
    console.log(distance);
    $('.full-page').css('transform', 'translate3d(0,' + distance + '%,0)');
    setTimeout(function() {
        inTransition = false;
    }, 1300);
};

// SCROLL ANIMATIONS AND LOGIC
function scrollLogic() {

    //---------------- DOWN TRANSITIONS ----------------------------
    // SLIDE 1 --> SLIDE 2
    if (counter == 1 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length));
    }

    // SLIDE 2 --> SLIDE 3
    else if (counter == 2 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length) * 2);

    }

    // SLIDE 3 --> SLIDE 4
    else if (counter == 3 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length) * 3);
    }
    // SLIDE 4 --> SLIDE 5
    else if (counter == 4 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length) * 4);
    }
    // SLIDE5  --> SLIDE 6
    else if (counter == 5 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length) * 5);
    } else if (counter == 6 && scrollDirection == "down") {
        scrollAnimate(-(100 / slides.length) * 6);
    }
    //---------------- UP TRANSITIONS ----------------------------

    // SLIDE 6 --> SLIDE 5
    else if (counter == 7 && scrollDirection == "up") {
        scrollAnimate(-(100 / slides.length) * 5);
    }
    // SLIDE 5 --> SLIDE 4
    else if (counter == 6 && scrollDirection == "up") {
        scrollAnimate(-(100 / slides.length) * 4);
    }
    // SLIDE 4 --> SLIDE 3
    else if (counter == 5 && scrollDirection == "up") {
        scrollAnimate(-(100 / slides.length) * 3);
    }
    // SLIDE 4 --> SLIDE 3
    else if (counter == 4 && scrollDirection == "up") {
        scrollAnimate(-(100 / slides.length) * 2);
    }

    // SLIDE 3 --> SLIDE 2
    else if (counter == 3 && scrollDirection == "up") {
        scrollAnimate(-(100 / slides.length) * 1);
    }

    // SLIDE 2 --> SLIDE 1
    else if (counter == 2 && scrollDirection == "up") {
        scrollAnimate(0);
    } else {
        inTransition = false;
    };

    //---------------- UPDATE COUNTER ----------------------------
    if (scrollDirection == "down" && counter < slidesLength) {
        counter++;
    } else if (scrollDirection == "up" && counter > 1) {
        counter--;
    };
    console.log(counter);

    // scrollbar
    if (counter == 1) {
        $('#scrollbar').fadeOut().find('.dot').removeClass('active');
        $('nav li').removeClass('active');
    }
    if (counter == 2) {
        $('#scrollbar').fadeIn().find('.dot').eq(0).addClass('active').siblings().removeClass('active');
        $('nav li').eq(1).addClass('active').siblings().removeClass('active');
    }
    if (counter == 3) {
        $('#scrollbar').fadeIn().find('.dot').eq(1).addClass('active').siblings().removeClass('active');
        $('nav li').eq(2).addClass('active').siblings().removeClass('active');
    }
    if (counter == 4) {
        $('#scrollbar').fadeIn().find('.dot').eq(2).addClass('active').siblings().removeClass('active');
        $('nav li').eq(3).addClass('active').siblings().removeClass('active');
    }
    if (counter == 5) {
        $('#scrollbar').fadeIn().find('.dot').eq(3).addClass('active').siblings().removeClass('active');
        $('nav li').eq(4).addClass('active').siblings().removeClass('active');
    }
    if (counter == 6) {
        $('#scrollbar').fadeIn().find('.dot').eq(4).addClass('active').siblings().removeClass('active');
        $('nav li').eq(5).addClass('active').siblings().removeClass('active');
    }
    if (counter == 7) {
        $('#scrollbar').fadeIn().find('.dot').eq(5).addClass('active').siblings().removeClass('active');
        $('nav li').eq(6).addClass('active').siblings().removeClass('active');
    }
};

// creates a global "addWheelListener" method
(function(window, document) {

    var prefix = "",
        _addEventListener, onwheel, support;

    // detect event model
    if (window.addEventListener) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
        "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function(elem, callback, useCapture) {
        _addWheelListener(elem, support, callback, useCapture);

        // handle MozMousePixelScroll in older Firefox
        if (support == "DOMMouseScroll") {
            _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
    };

    function _addWheelListener(elem, eventName, callback, useCapture) {
        elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function(originalEvent) {
            !originalEvent && (originalEvent = window.event);

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                delatZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // calculate deltaY (and deltaX) according to the event
            if (support == "mousewheel") {
                event.deltaY = -1 / 40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback(event);

        }, useCapture || false);
    }

})(window, document);


// LISTEN FOR WHEEL SCROLL 
addWheelListener(document.body, function(e) {

    if (inTransition) {
        return;
    };

    // DETERMINE WHEEL scrollDirection
    if (e.deltaY > 0) {
        scrollDirection = "down";
    } else if (e.deltaY < 0) {
        scrollDirection = "up";
    };

    scrollLogic();

});

// KeyStroke Support
$(window).keydown(function(e) {

    if (e.keyCode == 38) {
        scrollDirection = "up";
    } else if (e.keyCode == 40) {
        scrollDirection = "down";
    } else if (e.keyCode == 39) {
        scrollDirection = "down";
    } else if (e.keyCode = 37) {
        scrollDirection = "up";
    } else {
        return;
    };

    scrollLogic();

});
// nav click

$('nav li').each(function() {
    $(this).click(function() {

        var navNum = $(this).index();
        scrollAnimate(-(100 / slides.length) * navNum);
        $('#scrollbar').fadeIn().find('.dot').eq(navNum - 1).addClass('active').siblings().removeClass('active');
        $('nav li').eq(navNum).addClass('active').siblings().removeClass('active');
        counter = navNum;
        console.log(counter);
    })
})


// light box

var vdo_link = document.querySelectorAll('.vdo-link');
// var lightboxActive = document.querySelector('#lightbox.active');


$('.vdo-link').each(function() {
    $(this).click(function(e) {

        event.preventDefault();
        event.stopPropagation();
        var evt_link = $(this).attr('data-src');
        console.log(evt_link);
        $('#lightbox').find('.iframe-wrapper').append('<iframe src="' + evt_link + '" frameborder="0" allowfullscreen></iframe>');
        $('#lightbox').fadeIn(300).addClass('active');
        $('#wrap').addClass('active');
        // $('body,html').css('height', '100%');
    })
})

// 關閉視窗
$('#lightbox').click(function() {
    if ($(this).hasClass('active')) {
        $(this).fadeOut(300).removeClass('active');
        $(this).find('.iframe-wrapper').html('');
        $('#wrap').removeClass('active');
    }

})

// menu toggle
$('.toggle-buttom').click(function() {
        $('.toggle-menu').slideToggle();
    })
    // faq
$('.faq-q').each(function() {
    $(this).click(function() {
        $(this).siblings('.faq-a').slideToggle();
    })
});

// 控制 svg 顏色
jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest   
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG   
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG   
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org   
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.   
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG   
        $img.replaceWith($svg);

    }, 'xml');

});

// fadein動畫
window.addEventListener("scroll", fadeIn);

var appear = document.querySelectorAll('.appear');
var screenHalf = screen.height / 2;

function fadeIn() {
    var windowH = window.pageYOffset;
    for (i = 0; i < appear.length; i++) {
        var appearT = appear[i].offsetTop;
        var fadeActive = appearT - screenHalf;

        if (windowH >= fadeActive) {
            appear[i].classList.add('fadeIn');
        }
    }
}
$(function() {
    $('.sgsbtn').click(function() {
        $(this).addClass('active');
        $(this).siblings('.sgs-list').delay(1000).slideDown();
    })
})

// 商品展開光箱購物車
var shopMore = document.querySelectorAll('.shop-more');
var sLightbox = document.querySelector('.shop-lightbox');

function shopLightbox() {
    event.preventDefault();
    event.stopPropagation();
    // 取得商品資料
    var boxContents = {
        title: this.dataset.title,
        img: this.dataset.src,
        content: this.dataset.content,
        price: parseInt(this.dataset.price)
    };

    $('.box-img').attr('src', boxContents.img);
    $('.box-title h3').text(boxContents.title);
    $('.box-content').text(boxContents.content);
    // 光箱出現
    sLightbox.style.display = 'block';
    // 關閉事件
    var close_content = document.querySelector('.lightbox-content');
    var close = document.querySelector('.shop-lightbox .close');
    close_content.addEventListener('click', closeBox, false);
    close.addEventListener('click', closeBox, false);
}
// 關閉事件
function closeBox() {
    event.stopPropagation();
    $('.lightBlock').click(function() {
        event.stopPropagation();
    })
    sLightbox.style.display = 'none';
}

// 點擊展開
for (i = 0; i < shopMore.length; i++) {
    shopMore[i].addEventListener('click', shopLightbox, false);
}
// 商品側邊展開
$(function() {
    $('.shop-list .item-list h3').each(function() {
        $(this).click(function() {
            $(this).siblings('ul').slideToggle();
        })
    })
})