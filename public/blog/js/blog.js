run(); // process

var _scrollPos = 0;
// var _navbar = document.querySelector('.navbar-custom');
var _topButton = document.getElementById("top-btn");

function run() {
    addEventsImg();
    addScrollWatcher();
}

function addEventsImg() {
    // Apply events on screeshots
    var imgs = document.querySelectorAll("img[type='screenshot']");
    var imgSmall = document.querySelectorAll("img[type='small-screenshot']");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", clickScreenshot);
    }
    for (var i = 0; i < imgSmall.length; i++) {
        imgSmall[i].addEventListener("click", clickScreenshot);
    }
}

// What happens when we click on a screenshot
function clickScreenshot(event) {
    var img = event.target;

    if (img.style.height) {
        // if the img is already expanded
        img.style.height = null;
        img.style.width = null;
        img.style.left = null;
    }
    else {
        // else expand the img
        img.style.height = "140%";
        img.style.width = "140%";
        img.style.left = "-20%";
    }
}

/* Activates top button when scrolled */
function addScrollWatcher() {
    document.addEventListener("scroll", yScroll);
}
// Watch scroll pos
function yScroll(event) {
    // if ((_scrollPos - event.pageY) < 0) {
    //     if (_navbar.style.position === 'fixed') {
    //         _navbar.style.position = null;
    //     }
    // } else {
    //     if (_navbar.style.position !== 'fixed') {
    //         _navbar.style.position = 'fixed';
    //     }
    // }
    // _scrollPos = event.pageY;

    var yPos = window.pageYOffset;
    if ((yPos > 10) && (_topButton.style.bottom !== '10px')) {
        _topButton.style.bottom = '10px';
        _topButton.style.position = 'fixed';
    } else if ((yPos < 10) && (_topButton.style.bottom !== '-50px')){
        _topButton.style.bottom = '-50px';
        _topButton.style.position = null;
    }
}

/// Scroll to top
function ScrollTop() {
    var i = window.pageYOffset;
        var intervalTimer = setInterval(function() {
        if (i > 0) {
          window.scrollTo(0, i);
          i -= 100;
        } else {
          _topButton.style.bottom = "-50px";
          clearInterval(intervalTimer);
        }
    }, 4);
}
