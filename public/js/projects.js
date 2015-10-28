// ---------------------------
// PROJECTS.JS (SIDEFFECTS)
// ---------------------------

function getProjects() {
    $.get("/getprojects", function (data) {
        getProjectsResponse(data);
    });
}

// Post process ajax request
// > show projects
// -------------------------------
function getProjectsResponse(data) {
    // response = JSON.parse(response);

    // add projects to the page
    for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);
        _app.projects.push(data[i]);

        var item = _app.buildProjectItem(data[i], i);
        _app.$grid.append(item).masonry('appended', item);

        item.addEventListener('click', clickProjectItem);
    }
}

function clickProjectItem(event) {
    var parent = event.target;

    while (parent.className.indexOf("grid-item ") === -1) {
        parent = parent.parentNode;
    }

    // console.log(parent);
    var projectIndex = parent.getAttribute("data-id");

    var project = _app.projects[projectIndex];

    var data = {
        title: project.title,
        textContent: project.description,
        link: project.link,
        miniature : project.miniature,
        infos: project.infos
    };

    _app.hideGrid();
    _app.modal.show(data);

}
