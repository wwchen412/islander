$(function() {
  $(document).pjax("[data-pjax] a, a[data-pjax]", "#pjax-container", {
    fragment: ".pjax-content"
  });
  $(".linkNewsDetiail").each(function() {
    $(this).click(function(event) {
      $(".newsLightbox").css("display", "block");
    });
  });
  $(".whiteBlock").click(function() {
    //阻止泡泡往外找
    event.stopPropagation();
  });
  // 讀取完內容後重新渲染close鈕
  $(document).on("ready pjax:end", function(event) {
    $(".close").on("click", function() {
      $(".newsLightbox").css("display", "none");
    });
  });
  $(".close").on("click", function() {
    $(".newsLightbox").css("display", "none");
  });
  $(".newsLightbox").click(function() {
    // location.href = 'news.html';
    $(".newsLightbox").css("display", "none");
  });
});
