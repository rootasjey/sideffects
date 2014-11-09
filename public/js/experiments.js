// ---------------------------
// EXPERIMENTS.JS (SIDEFFECTS)
// ---------------------------

// Show or Hide the experiments block
function toggleExperiments() {
  var exp = $(".experiments");

  if (exp.css("display") === "none") {
    exp.css({
      display: "block",
      opacity: "0",
      top: "20px"
    }).animate({
      top: "0",
      opacity: "1"
    });
    minimizeTop("40%");
  }
  else {
    exp.css({})
    .animate({
      top: "20px",
      opacity: "0"
    }, {
      complete: function () {
        $(this).css('display', 'none');
        minimizeTop();
      }
    });
  }
}

// Post process ajax request
// > show projects
// -------------------------------
function ajaxExperiments(response) {
    response = JSON.parse(response);

    // add projects to the page
    for (var i = 0; i < response.length; i++) {
        $('<a>', {
            class: 'project-box',
            html: "<span class='title'>" + response[i]['title'] + "</span>" + "<br>" +
                  "<span class='platform'>" + response[i]['platform'] + "</span>" + "<br><br>"+

                  "<span class='authors'>" + response[i]['authors'] + "</span>" + "<br>" +
                  "<span class='year'>" + response[i]['year'] + "</span>" + "<br>" +
                  "<span class='progress'>" + response[i]['progress'] + "</span>" + "<br><br>",
            href: response[i]['link']

        }).appendTo('.experiments');
    };

    toggleExperiments();
}
