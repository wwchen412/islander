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

// load header

$(function() {

    if ($('header').hasClass('header-index') === false) {
        $('header').load('shop-index.html header');
    } else {

    }
})

// 篩國家
// 台灣內才能選鄉鎮市
$(function() {

    $('.nation').on('change', function() {

        var nationText = $('.nation :selected ').text();

        if (nationText !== '台灣') {
            $('.county').attr('disabled', true);
            $('.county').attr('required', false);
            $('.country').attr('disabled', true);
            $('.country').attr('required', false);
            $('.district').attr('disabled', true);
            $('.district').attr('required', false);

        } else {
            $('.county').attr('disabled', false);
            $('.country').attr('disabled', false);
            $('.district').attr('disabled', false);
            $('.county').attr('required', true);
            $('..country').attr('required', true);
            $('.district').attr('required', true);
        }
    })

})