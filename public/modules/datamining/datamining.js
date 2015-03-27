

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

        loadontime();
    });
}

// Load functions after everything is set
function loadontime() {
    generateSummary();
    buttonClick();
}

// Event when a click is fired on a button element
function buttonClick() {
    $(".toggle").click(function () {
        var parent = $(this).parent();
        var toggled = parent.find(".toggled");

        toggled.toggleClass("toggled-visible");
        toggled.toggleClass("toggled-hidded");
    });
}

// Create a table of content
function generateSummary() {
    var container = $("<div>", {
        class: "container-summary"
    });

    var summary = $("<nav>", {
        class: "summary toggled toggled-hidded"
    });

    var buttonSum = $("<button>", {
        type: "button",
        html: "sommaire",
        class: "btn btn-raised ripple-effect btn-default toggle button-summary"
    });

    var newLine, el, title, link;
    var content = "<div class='side-bar'></div> <span class='summary-title'>SOMMAIRE</span> <ul>";

    $("h2").each(function() {
      el = $(this);
      title = el.text();
      link = "#" + el.attr("id");

      newLine =
        "<li>" +
          "<a href='" + link + "'>" +
            title +
          "</a>" +
        "</li>";

        content += newLine;

    });

    summary.html(content + " </ul>");
    container.append(buttonSum).append(summary);
    container.appendTo("#body");
    // summary.appendTo("#body");

    // Highlight code
    hljs.initHighlightingOnLoad();
    clickImages();
    clickCode();
}


function clickImages() {
    $("img").click(function () {
        var width = $(this).css('width');

        if (width >= '600px') {
            $(this).css({
                'max-width': '1200px',
                'max-height': '1200px',
                'margin-left': '-300px',
            });
        }
        else {
            $(this).css({
                'max-width': '600px',
                'max-height': '600px',
                'margin-left': '0px',
            });
        }
    });
}

function clickCode() {
    $("pre").toggleClass("code-hidden");
    $(".toggle-code").click(function () {
        console.log("oto");
        var code = $(this).next("pre");
        console.log(code);
        code.toggleClass("code-visible");
        code.toggleClass("code-hidden");
    });
}
