// --------------------
// BLOG.JS (SIDEFFECTS)
// --------------------

// Get the last post from the blog which is on a different domain server
function getBlogPosts() {

    $.get("/posts", function (data) {
        getRecentBlogPostsResponse(data);
    });
}

function getRecentBlogPostsResponse(data) {
    // console.log(data);
    // add posts to the page
    for (var i = 0; i < 1; i++) {
        console.log(data[i]);
        _app.posts.push(data[i]);

        var item = _app.buildPostItem(data[i], i);

        // _app.$grid.append(item).masonry('appended', item);
        var grid = document.getElementById('main-grid');
        grid.appendChild(item);
        item.addEventListener('click', clickPostItem);

        if (_app.$grid === null) {
            _app.initGrid();
        }
    }
}

// Get a RSS feed from an URL and fire a callback function
function parseRSS(url, callback) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
        console.log(data);
      callback(data.responseData.feed);
    }
  });
}

function clickPostItem(event) {
    var parent = event.target;

    while (parent.className.indexOf("grid-item ") === -1) {
        parent = parent.parentNode;
    }

    console.log(parent);
    // var projectIndex = parent.getAttribute("data-id");
    //
    // var project = _app.projects[projectIndex];
    //
    // var data = {
    //     title: project.title,
    //     textContent: project.description,
    //     link: project.link,
    //     miniature : project.miniature,
    //     infos: project.infos
    // };
    //
    // _app.hideGrid();
    // _app.modal.show(data);

}
