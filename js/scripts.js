console.log($('header').offset() - $(document).scrollTop());


$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $('.container-menu').addClass('black');
    } else {
        $('.container-menu').removeClass('black');
    }
});