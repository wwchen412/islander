// VARIABLES
var counter = 1;
var scrollDirection;
var slides = $('.full-page .section');
var slidesLength = slides.length;
var inTransition = false;



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
    }

    //---------------- UP TRANSITIONS ----------------------------
    // SLIDE 6 --> SLIDE 5
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