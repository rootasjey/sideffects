

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
        // console.log($(this));
        var parent = $(this).parent();
        var toggled = parent.find(".toggled");
        // console.log(toggled);
        // toggled.css("display", "none");
        toggled.toggleClass("toggled-hidded");
    });
}

function toggle(elem) {

}

function applyHeightOnToggled() {
    $(".toggled").each(function () {
        var height = $(this).height();
        console.log(height);

        $(this).css("height", height + "px");
    });


}
