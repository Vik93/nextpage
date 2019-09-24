$(function () { // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "100%" // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        }
    });

    // get all slides
    var slides = document.querySelectorAll("section.section");

    // wait until DOM is ready
    //document.addEventListener("DOMContentLoaded", function(event) {
    //
    //    // wait until window is loaded (images, stylesheets, JS, and links)
    //    window.onload = function() {
    //
    //        // custom code goes here
    //
    //    };
    //
    //});

    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: slides[i]
        })
            .setPin(slides[i], {pushFollowers: false})
            //.setVelocity({opacity: 0}, {duration: 400})
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        //scene.setVelocity("#myElement", {opacity: 0.5}, {duration: 1000, easing: "linear"});
    }

});

$( window ).on( "load", function() {
    var number = 1;
    var $headphones = $(".headphones");
    var $camera = $(".camera");
    var $star_big = $(".star_big");

    setInterval(function(){
        if (number === 1){
            $headphones.removeClass('hidden');
            $camera.addClass('hidden');
            $star_big.addClass('hidden');
        }else if (number === 2){
            $camera.removeClass('hidden');
            $headphones.addClass('hidden');
            $star_big.addClass('hidden');
        } else if (number === 3){
            $star_big.removeClass('hidden');
            $camera.addClass('hidden');
            $headphones.addClass('hidden');
        }
        number++;
        if(number === 4){
            number = 1;
        }
    }, 300);

    var counter = 0;
    var c = 0;
    var i = setInterval(function() {
        $('.num').html(c);

        counter++;
        c++;
        if(counter == 101){
            clearInterval(i);
            setInterval(function() {
                counter++;
                if(counter == 125){
                    clearInterval(counter);
                    $(".loader").slideUp(500);
                }
            }, 50);
        }
    }, 50);

    var numbersViewersSmaller = 0;
    var numbersViewersSmall = 21;
    var numbersViewersBig = 30;
    var i2 = setInterval(function() {
        $('.numbers-viewers-smaller').html(numbersViewersSmaller);
        $('.numbers-viewers-small').html(numbersViewersSmall);
        $('.numbers-viewers-big').html(numbersViewersBig);
        numbersViewersSmaller++;
        if(numbersViewersSmaller == 10){
            numbersViewersSmall++;
            numbersViewersSmaller = 0;
        }
        if(numbersViewersSmall == 100){
            numbersViewersBig++;
            numbersViewersSmall = 0;
        }
        if(numbersViewersBig == 100){
            clearInterval(i2);
        }
    }, 10);
});

$( document ).ready(function() {
    (function() {
        // Init
        var container = document.getElementById("container"),
            inner = document.getElementById("inner");

        // Mouse
        var mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function(event) {
                var e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y) * -1;
            },
            setOrigin: function(e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
            },
            show: function() {
                return "(" + this.x + ", " + this.y + ")";
            }
        };

        // Track the mouse position relative to the center of the container.
        mouse.setOrigin(container);

        //----------------------------------------------------

        var counter = 0;
        var refreshRate = 10;
        var isTimeToUpdate = function() {
            return counter++ % refreshRate === 0;
        };

        //----------------------------------------------------

        var onMouseEnterHandler = function(event) {
            update(event);
        };

        var onMouseLeaveHandler = function() {
            inner.style = "";
        };

        var onMouseMoveHandler = function(event) {
            if (isTimeToUpdate()) {
                update(event);
            }
        };

        //----------------------------------------------------

        var update = function(event) {
            mouse.updatePosition(event);
            updateTransformStyle(
                (mouse.y / inner.offsetHeight / 2).toFixed(2),
                (mouse.x / inner.offsetWidth / 2).toFixed(2)
            );
        };

        var updateTransformStyle = function(x, y) {
            var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
            inner.style.transform = style;
            inner.style.webkitTransform = style;
            inner.style.mozTranform = style;
            inner.style.msTransform = style;
            inner.style.oTransform = style;
        };

        //--------------------------------------------------------

        container.onmousemove = onMouseMoveHandler;
        container.onmouseleave = onMouseLeaveHandler;
        container.onmouseenter = onMouseEnterHandler;
    })();

    $('#WeDo a:last').tab('show');

    if(window.innerWidth > 1024){
        $(".gallery").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            visible: 4,
            vertical: false,
            speed: 500
        });
    }else if(window.innerWidth > 768 && window.innerWidth <= 1024){
        $(".gallery").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            visible: 3,
            vertical: false,
            speed: 500
        });
    }else if(window.innerWidth > 600 && window.innerWidth <= 768){
        $(".gallery").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            visible: 2,
            vertical: false,
            speed: 500
        });
    }else if(window.innerWidth <= 600){
        $(".gallery").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            visible: 1,
            vertical: false,
            speed: 500
        });
    }
    scrollSection = function (id) {
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    };
});