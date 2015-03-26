

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
        applyHeightOnToggled();
    });
}

function buttonClick() {
    $(".toggle").click(function () {
        var parent = $(this).parent();
        var toggled = parent.find(".toggled");

        toggled.css({
            height : "",
        });
        toggled.toggleClass("toggled-visible");
        toggled.toggleClass("toggled-hidded");
        applyHeightOnToggled();
    });
}

function toggle(elem) {

}

function applyHeightOnToggled() {
    $(".toggled-visible").each(function () {
        var height = $(this).height();
        console.log(height);

        $(this).css({
            height : height + "px",
        });
    });


}
