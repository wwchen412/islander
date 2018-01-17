/*
-------------------------------------
商品頁共用header
串完後可刪除 只需留 menu toggle
shop header load 
-------------------------------------
*/


// load header

$(function() {
  if ($("header").hasClass("header-index") === false) {
    $("header").load("shop-index.html header");
    console.log('load header');
    // menu toggle
  
    $("body").on("click", ".toggle-buttom", function() {
      $(".toggle-menu").slideToggle();
    });
  } else {
  }
});


// light box

var vdo_link = document.querySelectorAll(".vdo-link");
// var lightboxActive = document.querySelector('#lightbox.active');

$(".vdo-link").each(function() {
  $(this).click(function(e) {
    event.preventDefault();
    event.stopPropagation();
    var evt_link = $(this).attr("data-src");
    console.log(evt_link);
    $("#lightbox")
      .find(".iframe-wrapper")
      .append(
        '<iframe src="' +
          evt_link +
          '" frameborder="0" allowfullscreen></iframe>'
      );
    $("#lightbox")
      .fadeIn(300)
      .addClass("active");
    $("#wrap").addClass("active");
    // $('body,html').css('height', '100%');
  });
});

// 關閉視窗
$("#lightbox").click(function() {
  if ($(this).hasClass("active")) {
    $(this)
      .fadeOut(300)
      .removeClass("active");
    $(this)
      .find(".iframe-wrapper")
      .html("");
    $("#wrap").removeClass("active");
  }
});
/*-----------------------問與答頁面------------------*/
// faq 題目展開
$(".faq-q").each(function() {
  $(this).click(function() {
    $(this)
      .siblings(".faq-a")
      .slideToggle();
  });
});
/*---------------------------------------------------*/
// 控制 svg 顏色


/*將img 轉換成svg */
jQuery("img.svg").each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr("id");
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("src");

  jQuery.get(
    imgURL,
    function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find("svg");

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr(
          "viewBox",
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
        );
      }

      // Replace image with new SVG
      $img.replaceWith($svg);
    },
    "xml"
  );
});

// fadein動畫
window.addEventListener("scroll", fadeIn);

var appear = document.querySelectorAll(".appear");
var screenHalf = screen.height / 2;

function fadeIn() {
  var windowH = window.pageYOffset;
  for (i = 0; i < appear.length; i++) {
    var appearT = appear[i].offsetTop;
    var fadeActive = appearT - screenHalf;

    if (windowH >= fadeActive) {
      appear[i].classList.add("fadeIn");
    }
  }
}


$(function() {
  $(".sgsbtn").click(function() {
    $(this).addClass("active");
    $(this)
      .siblings(".sgs-list")
      .delay(1000)
      .slideDown();
  });
});

// 商品展開光箱購物車
// var shopMore = document.querySelectorAll('.shop-more');
// var sLightbox = document.querySelector('.shop-lightbox');

// function shopLightbox() {
//     event.preventDefault();
//     event.stopPropagation();
//     // 取得商品資料
//     var boxContents = {
//         title: this.dataset.title,
//         img: this.dataset.src,
//         content: this.dataset.content,
//         price: parseInt(this.dataset.price)
//     };

//     $('.box-img').attr('src', boxContents.img);
//     $('.box-title h3').text(boxContents.title);
//     $('.box-content').text(boxContents.content);
//     // 光箱出現
//     sLightbox.style.display = 'block';
//     // 關閉事件
//     var close_content = document.querySelector('.lightbox-content');
//     var close = document.querySelector('.shop-lightbox .close');
//     close_content.addEventListener('click', closeBox, false);
//     close.addEventListener('click', closeBox, false);
// }
// 關閉事件
// function closeBox() {
//     event.stopPropagation();
//     $('.lightBlock').click(function() {
//         event.stopPropagation();
//     })
//     sLightbox.style.display = 'none';
// }

// 點擊展開
// for (i = 0; i < shopMore.length; i++) {
//     shopMore[i].addEventListener('click', shopLightbox, false);
// }



// ----------------------------------------------------
//                      商品頁面
//                 shop-single.html
// ----------------------------------------------------


$(".single-title").click(function(){
 
  $(this)
    .siblings(".item-editor")
    .stop(true,true)
    .slideToggle() ;
});
// 商品側邊展開
$(function() {
  $(".shop-list .item-list h3").each(function() {
    $(this).click(function() {
      $(this)
        .siblings("ul")
        .slideToggle();
    });
  });
});



// 篩國家
// 台灣內才能選鄉鎮市
$(function() {
  $(".nation").each(function() {
    $(this).on("change", function() {
      var nationText = $(this)
        .find("option:selected")
        .text();
      var country = $(this)
        .parents(".islander-4")
        .siblings()
        .find(".county");
      var district = $(this)
        .parents(".islander-4")
        .siblings()
        .find(".district");

      if (nationText !== "台灣") {
        country.attr("disabled", true);
        country.attr("required", false);

        district.attr("disabled", true);
        district.attr("required", false);
      } else {
        country.attr("disabled", false);
        district.attr("disabled", false);
        country.attr("required", true);
        district.attr("required", true);
      }
    });
  });
});


// 複製表格
function copy() {
  console.log("copy");
  var newform2 = $(".buy-form").clone();
  newform2.filter("form").prop("class", "get-form");
  console.log(newform2);
  $(".get-form").replaceWith(newform2);
}

$("#autoForm").on("change", copy);

$("input#member").on("change", function() {
  var appendText = `
                    <div class="input-group">
                    <input id="user-pwd-input" type="password" placeholder="請輸入密碼" required>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve" class="svg icon replaced-svg">
                      <style type="text/css">
                      .st0{fill:#FFD732;}
                      </style>
                      <title>password</title>
                      <g id="圖層_2">
                        <g id="圖層_1-2">
                           <path class="st0" d="M15,30C6.7,30,0,23.3,0,15S6.7,0,15,0s15,6.7,15,15S23.3,30,15,30z M15,1C7.3,1,1,7.3,1,15s6.3,14,14,14    s14-6.3,14-14S22.7,1,15,1z"></path>
                          <path class="st0" d="M19.8,12.9h-1.5v-1.2c0-2.4-1.1-3.8-3.3-3.8s-3.3,1.4-3.3,3.8v1.2H10c-0.5,0.1-0.8,0.5-0.8,1v6.5    c0,0.5,0.4,0.9,0.8,1.1l1,0.3c0.5,0.2,1.1,0.2,1.6,0.3h4.8c0.5,0,1-0.1,1.5-0.2l1-0.3c0.5-0.2,0.8-0.6,0.8-1.1v-6.5    C20.7,13.4,20.3,13,19.8,12.9z M13.3,11.4c-0.1-0.9,0.5-1.7,1.4-1.8c0.1,0,0.2,0,0.3,0c0.9,0,1.6,0.6,1.7,1.5c0,0.1,0,0.2,0,0.3    v1.5h-3.3V11.4z"></path>
                        </g>
                      </g>
                    </svg>
                    </div>
                    <div class="input-group">
                        <input type="password" placeholder="密碼確認" class="user_pwd_again" required name="user_pwd_again">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve" class="svg icon replaced-svg">
                          <style type="text/css">
                            .st0{fill:#FFD732;}
                          </style>
                          <title>check</title>
                          <g id="圖層_2">
                            <g id="圖層_1-2">
                              <path class="st0" d="M15,30C6.7,30,0,23.3,0,15S6.7,0,15,0s15,6.7,15,15S23.3,30,15,30z M15,1C7.3,1,1,7.3,1,15s6.3,14,14,14    s14-6.3,14-14S22.7,1,15,1z"></path>
                              <path class="st0" d="M13.6,20.7c-0.4,0-0.7-0.2-0.9-0.5l-2.9-3.8c-0.4-0.5-0.3-1.2,0.2-1.6c0.5-0.4,1.2-0.3,1.6,0.2l1.9,2.5    l4.8-7.7c0.3-0.5,1-0.7,1.6-0.4c0.5,0.3,0.7,1,0.4,1.6l-5.7,9.1C14.4,20.4,14,20.6,13.6,20.7L13.6,20.7z"></path>
                            </g>
                          </g>
                        </svg>
                    </div>
                            `;
  $(".send-form .member").append(appendText);
});

// 刪除商品
var removeBtn = document.querySelectorAll(".form-list .close");
// console.log(removeBtn);
for (i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener("click", function() {
    var formList = document.querySelectorAll(".form-list");
    // console.log(formList.length)
    if (formList.length <= 1) {
      $(".formLists").html(
        '<h3 style="padding:30px 0;text-align:center;color:#aaa">目前購物車內沒有商品</h3 style="padding:30px 0;text-align:center;color:#aaa">'
      );
    } else {
      $(this)
        .closest(".form-list")
        .remove();
    }
  });
}


/*          History Page       */
$(function () {
// 只顯示10筆
$(".history-form .content")
  .slice(0, 10)
  .css('display','flex');

  // 點擊更多
  $('.history-form .btn-more').click(function(){
    var hiddenContent = $(".history-form .content:hidden").length;
    $(".history-form .content:hidden")
      .slice(0, 10)
      .css("display", "flex");

      // 全部出現以後消失
      if (hiddenContent == 0){
        $(".history-form .btn-more").fadeOut();
      }
      //  console.log(hiddenContent);
  })
});
