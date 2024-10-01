$(document).ready(function(){
    var $backToTop = $(".back-to-top, .ballicon");
    var $backEmail = $("#contactme-btn");

    // Carrousel
    $('#single-item').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        swipeToSlide: true,
        touchThreshold: 50,
        autoplaySpeed: 1000,
        variableWidth: true,
        prevArrow: $('.arrow-prev'),
        nextArrow: $('.arrow-next')
    });
    $('.diff-content-left').slick({
        slidesToShow: 1,
        slidesToScroll: 2,
        autoplay: false,
        infinite: false,
        arrows: false,
        autoplaySpeed: 2000,
        variableWidth: true
    });
    $('#marqueeD').slick({
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        slidesToScroll: 2,
        arrows: false,
        swipe: false,
        slidesToShow: 4,
        cssEase: 'linear',
        pauseOnFocus: false,
        pauseOnHover: false,
        variableWidth: true
    });
    // Variables
    $backToTop.on('click', function(e) {
        $("html, body").animate({scrollTop: 0}, 800);
    });

    $backEmail.on('click', function(e) {
        $('html, body').animate({
            scrollTop: $("#container-mail").offset().top
        }, 600);
    });

    $('#copy').click(function() {
        const input = document.getElementById('seuTxt');
        input.select();
        document.execCommand('copy');

        document.getElementById('buttonImage').src = 'assets/img/svg/approve.svg';
    
        setTimeout(() => {
            document.getElementById('buttonImage').src = 'assets/img/svg/copy.svg';
        }, 2000);
    });
    
 });