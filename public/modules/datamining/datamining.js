

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
    buttonClick();
    generateSummary();
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
    var summary = $("<nav>", {
        class: "summary"
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
    summary.appendTo("#body");
}
