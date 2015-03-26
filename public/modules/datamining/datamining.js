

// This function is fired as soon as this file is loaded
(function () {
    getReport();
})();

// Send an ajax request to get the repport in a html format
function getReport() {
    $.get('/datamining/rapport', function (data) {
        // console.log(data);

        $('<div>', {
            class: 'report',
            html: data[0].content,
        }).appendTo("#body");

        buttonClick();
        processing();
    });
}

function buttonClick() {
    $(".btn").click(function () {
        console.log($(this));
    });
}

function toggle(elem) {

}

function processing() {

    // Ripple-effect animation
    (function($) {
        $(".ripple-effect").click(function(e){
            var rippler = $(this);

            // create .ink element if it doesn't exist
            if(rippler.find(".ink").length == 0) {
                rippler.append("<span class='ink'></span>");
            }

            var ink = rippler.find(".ink");
            console.log("totooo");
            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diametr
            if(!ink.height() && !ink.width())
            {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: d, width: d});
            }

            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width()/2;
            var y = e.pageY - rippler.offset().top - ink.height()/2;

            // set .ink position and add class .animate
            ink.css({
              top: y+'px',
              left:x+'px'
            }).addClass("animate");
        })
    })(jQuery);
}
