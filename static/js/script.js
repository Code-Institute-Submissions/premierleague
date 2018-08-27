$(document).ready(function() {
    responsive_resize();
    // NAVIGATION
    $('.menu-toggle').click(function(){
        $('.menu-toggle').toggleClass('active');
    });

    $('.teams-nav-link').hover(function(){
        console.log(123);
       $('.teams-list').toggleClass('team-list-active');
    });


// Change width value on user resize, after DOM
    $(window).resize(function(){
         responsive_resize();
    });

    function responsive_resize() {
      var current_width = $(window).width();

      if (current_width <= 767) {
        $('.team-page-hero').addClass('justify-content-center');
      }  else if (current_width >= 768) {
          $('.team-page-hero').removeClass('justify-content-center');
        }
    }
});
