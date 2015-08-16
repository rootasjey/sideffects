run(); // process

function run() {
    // Apply events on screeshots
    var imgs = document.querySelectorAll("img[type='screenshot']");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", clickScreenshot);
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
