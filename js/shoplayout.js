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
    console.log("load header");
    // menu toggle
    $("body").on("click", ".toggle-buttom", function() {
      $(".toggle-menu").slideToggle();
    });
  }
});
