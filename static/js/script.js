$(document).ready(function() {

    // NAVIGATION
    $('.menu-toggle').click(function(){
        $('.menu-toggle').toggleClass('active');
    });

    $('.teams-nav-link').hover(function(){
        console.log(123);
       $('.teams-list').toggleClass('team-list-active');
    });

});

