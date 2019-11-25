jQuery(function ($) {
    'use strict';

    /* ========================================================================= */
    /*	Page Preloader
    /* ========================================================================= */

    window.onload = function () {
        document.getElementById('preloader').style.display = 'none';

        // Our process timeline
        // Change color of second bullet slider
        // Use window onload because element not created before
        // Manually put numbers, however there is better way to do that...
        /*const bulletSlider = document.querySelectorAll('[role="slider"]')[2].childNodes[0];
        bulletSlider.setAttribute('fill', '#57cbcc');*/
    };


    /* ========================================================================= */
    /*	Post image slider
    /* ========================================================================= */

    $('#post-thumb, #gallery-post').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000

    });

    $('#features').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*	Menu item highlighting
    /* ========================================================================= */


    $('#navigation').sticky({
        topSpacing: 0
    });


    /* ========================================================================= */
    /*	Magnific popup
    /* =========================================================================  */
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 160, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true,
        fixedContentPos: false,
        fixedBgPos: true
    });


    //   magnific popup video
    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-zoom-in',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });
    /* ========================================================================= */
    /*	Portfolio Filtering Hook
    /* =========================================================================  */

    $(document).ready(function () {
        var containerEl = document.querySelector('.filtr-container');
        var filterizd;
        if (containerEl) {
            filterizd = $('.filtr-container').filterizr({});
        }
        //Active changer
        $('.portfolio-filter button').on('click', function () {
            $('.portfolio-filter button').removeClass('active');
            $(this).addClass('active');
        });
    });

    /* ========================================================================= */
    /*	Testimonial Carousel
    /* =========================================================================  */

    //Init the carousel
    $('#testimonials').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*   Contact Form Validating
    /* ========================================================================= */

    $('#budget').on('input change', function() {

        const
            element = $('#budget'),
            value = element.val();
        let step, min;

        if (value > 5000) {
            step = 1000;
            min = 0;    // switch to zero because we want to finish at max=10k; w/o max=9500 (multiples of min w/ 1k step)
        }
        else if (value > 1500) {
            step = 500;
            min = 500;
        }
        else {
            min = 500;
            step = 100;
        }

        element.attr('step', step);
        element.attr('min', min);

    });


    $('#contact-submit').click(function (e) {

        //stop the form from being submitted
        e.preventDefault();

        /* declare the variables, var error is the variable that we use on the end
        to determine if there was an error or not */
        let error = false;
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        /* in the next section we do the checking by using VARIABLE.length
        where VARIABLE is the variable we are checking (like name, email),
        length is a JavaScript function to get the number of characters.
        And as you can see if the num of characters is 0 we set the error
        variable to true and show the name_error div with the fadeIn effect.
        if it's not 0 then we fadeOut the div( that's if the div is shown and
        the error is fixed it fadesOut.

        The only difference from these checks is the email checking, we have
        email.indexOf('@') which checks if there is @ in the email input field.
        This JavaScript function will return -1 if no occurrence have been found.*/
        if (name.length === 0) {
            error = true;
            $('#name').css('border-color', '#D8000C');
        } else {
            $('#name').css('border-color', '#666');
        }
        if (email.length === 0 || email.indexOf('@') === -1) {
            error = true;
            $('#email').css('border-color', '#D8000C');
        } else {
            $('#email').css('border-color', '#666');
        }
        if (subject.length === 0) {
            error = true;
            $('#subject').css('border-color', '#D8000C');
        } else {
            $('#subject').css('border-color', '#666');
        }
        if (message.length === 0) {
            error = true;
            $('#message').css('border-color', '#D8000C');
        } else {
            $('#message').css('border-color', '#666');
        }
        //now when the validation is done we check if the error variable is false (no errors)
        if (error === false) {
            //disable the submit button to avoid spamming
            //and change the button text to Sending...
            $('#contact-submit').attr({
                'disabled': 'false',
                'value': 'Sending...'
            });

            /* using the jquery's post(ajax) function and a lifesaver
            function serialize() which gets all the data from the form
            we submit it to send_email.php */
            $.post('sendmail.php', $('#contact-form').serialize(), function (result) {
                //and after the ajax request ends we check the text returned
                if (result === 'sent') {
                    //if the mail is sent remove the submit paragraph
                    $('#cf-submit').remove();
                    //and show the mail success div with fadeIn
                    $('#mail-success').fadeIn(500);
                } else {
                    //show the mail failed div
                    $('#mail-fail').fadeIn(500);
                    //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                    $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
                }
            });
        }
    });

    /*
    Useless for v1 disregard
     */

    /*const lerp = (a, b, u) => (1 - u) * a + u * b;

    const fade = (element, attribute, end, start, duration) => {
        const interval = 10;
        const steps = duration / interval;
        const step_u = 1.0 / steps;
        let u = 0.0;
        const theInterval = setInterval(function () {
            if (u >= 1.0) {
                clearInterval(theInterval)
            }
            const r = parseInt(lerp(start.r, end.r, u));
            const g = parseInt(lerp(start.g, end.g, u));
            const b = parseInt(lerp(start.b, end.b, u));
            const colorName = 'rgb(' + r + ',' + g + ',' + b + ')';
            element.setAttribute(attribute, colorName);
            u += step_u;
        }, interval);
    };


    const slideUp = (element, duration) => {
        const interval = 10;
        const steps = duration / interval;
        let step_u = 1.0 / steps;
        let u = 0.01;
        const theInterval = setInterval(function () {
            if (u >= 1.0) {
                step_u *= -1;
            } else if (u <= 0) {
                clearInterval(theInterval)
            }
            const slideValue = 21 + (u * 100);
            element.parentNode.setAttribute('transform', 'translate(' + slideValue + ',6)');
            u += step_u;
        }, interval);
    };

    const slideDown = (element, duration) => {
        const interval = 10;
        const steps = duration / interval;
        const step_u = 1.0 / steps;
        let u = 1.0;
        const theInterval = setInterval(function () {
            if (u <= 0.0) {
                clearInterval(theInterval)
            }
            const slideValue = 21 + (u * 100);
            element.parentNode.setAttribute('transform', 'translate(' + slideValue + ',6)');
            u -= step_u;
        }, interval);
    };

    // in action
    const bulletSlider = document.querySelectorAll('[role="slider"]')[2].childNodes[0]; // your element
    const attribute = 'fill';       // fading property
    const endColor = {r: 87, g: 203, b: 204};  // blue
    const startColor = {r: 217, g: 217, b: 217};  // grey

    // fade back after 2 secs
    //fade(bulletSlider, attribute, endColor, startColor, 1000);
    function checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        console.log(!(rect.bottom < 0 || rect.top - viewHeight >= 0));
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    //bulletSlider.parentNode.setAttribute('transform', 'translate(100)');
    $(window).scroll( function(){
        if(checkVisible($('#chartdiv')[0])) {
            console.log("if");
            slideUp(bulletSlider, 1000);
        }
    });*/


    //setTimeout(function(){slideDown(bulletSlider, 1000);}, 4000);


    // Our process timeline
    // Change color of second bullet slider
    // Use window onload because element not created before
    // Manually put numbers, however there is better way to do that...
    //const bulletSlider = document.querySelectorAll('[role="slider"]')[2].childNodes[0];
    //bulletSlider.setAttribute('fill', '#57cbcc');

    /*
    Filter not working for some reasons so we do a filter manually
     */
    //console.log($("tspan:visible").filter(n => $(n).text() !== undefined && $(n).text().length === 5));

    const getLastVisibleHour = () => {
        const tspans = $("tspan");

        const visibleTspans = [];

        for (let i = 0; i < tspans.length; i++) {
            const currentTspanParent = $(tspans[i]).parent().parent().parent();

            if ($(currentTspanParent).css("display") !== "none") {
                visibleTspans.push($(tspans[i])[0]);
            }
        }
        //console.log(visibleTspans);
        const visibleHours = [];
        for (let i = 0; i < visibleTspans.length; i++) {
            const currentTspanText = visibleTspans[i].innerHTML;
            if (currentTspanText.length === 5)
                visibleHours.push(currentTspanText);
        }
        visibleHours.sort();
        console.log("Visibile Hours: " + visibleHours);
        return visibleHours.pop();
    };

    const labels = ["A Day with BMMA", "Step1: Signing Your Contract", "Step2: Setting Up Your Website", "Step3: Creating Marketing Content",
        "Step4: Designing Your Marketing Funnel", "Step5: ROI Tracking", "Step6: Leveraging Feedback to Improve Strategy","Step7: Celebrate!"];
    const stepsHours = ["06:00", "08:00", "10:00", "12:30", "16:00", "20:30", "23:30"];
    let getLastHourInterval;
    let currentLabelText = labels[0];

    const changeLabel = (tspanNewContent) =>
    {
        const visibleTspans = $("tspan");
        console.log("content: " + tspanNewContent);
        for (let i = 0; i < visibleTspans.length; i++) {
            const currentTspanText = visibleTspans[i].innerHTML;
            if (currentTspanText === currentLabelText) {
                visibleTspans[i].innerHTML = tspanNewContent;
                currentLabelText = tspanNewContent;
            }
        }
    };

    const getStepHoursIndexFromHour = (time) => {
        return stepsHours.lastIndexOf(stepsHours.filter(n => n <= time).pop());
    };


    const chartDiv = $("#chartdiv");
    chartDiv.mouseenter(() => {
        getLastHourInterval = window.setInterval(function () {
                const lastVisibleHour = getLastVisibleHour();
                let index = getStepHoursIndexFromHour(lastVisibleHour);
                if (index !== -1) {
                    changeLabel(labels[++index]);
                }
            }, 15);
        }
    );
    chartDiv.mouseleave(() => {
            window.clearInterval(getLastHourInterval);
        }
    );

    /* ========================================================================= */
    /*   Contact Form Budget Range
    /* ========================================================================= */

    let i = document.getElementById("budget"),
        o = document.querySelector('[for="budget"]');

    o.innerHTML = "Your Budget: " + i.value;

// use 'change' instead to see the difference in response
    i.addEventListener('input', function () {
        o.innerHTML = "Your Budget: " + i.value;
    }, false);



});
// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW({
    offset: 100, // distance to the element when triggering the animation (default is 0)
    mobile: false // trigger animations on mobile devices (default is true)
});
wow.init();


/* ========================================================================= */
/*	Smooth Scroll
/* ========================================================================= */
var scroll = new SmoothScroll('a[href*=\'#\']');


/* ========================================================================= */

/*	Google Map Customization
/* =========================================================================  */

function initialize() {
    'use strict';

    var myLatLng = new google.maps.LatLng(40.7831, -73.9712);

    var roadAtlasStyles = [{
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [{
            'color': '#2F3238'
        }]
    }, {
        'elementType': 'labels.text.fill',
        'stylers': [{
            'color': '#FFFFFF'
        }]
    }, {
        'elementType': 'labels.text.stroke',
        'stylers': [{
            'visibility': 'off'
        }]
    }, {
        'featureType': 'road',
        'elementType': 'geometry.fill',
        'stylers': [{
            'color': '#50525f'
        }]
    }, {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [{
            'visibility': 'on'
        }, {
            'color': '#808080'
        }]
    }, {
        'featureType': 'poi',
        'elementType': 'labels',
        'stylers': [{
            'visibility': 'off'
        }]
    }, {
        'featureType': 'transit',
        'elementType': 'labels.icon',
        'stylers': [{
            'visibility': 'off'
        }]
    }, {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [{
            'color': '#808080'
        }]
    }, {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [{
            'color': '#3071a7'
        }, {
            'saturation': -65
        }]
    }, {
        'featureType': 'road',
        'elementType': 'labels.icon',
        'stylers': [{
            'visibility': 'off'
        }]
    }, {
        'featureType': 'landscape',
        'elementType': 'geometry.stroke',
        'stylers': [{
            'color': '#bbbbbb'
        }]
    }];

    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
        }
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: ''
    });


    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    var styledMapOptions = {
        name: 'US Road Atlas'
    };

    var usRoadMapType = new google.maps.StyledMapType(
        roadAtlasStyles, styledMapOptions);

    map.mapTypes.set('roadatlas', usRoadMapType);
    map.setMapTypeId('roadatlas');
}

google.maps.event.addDomListener(window, 'load', initialize);

