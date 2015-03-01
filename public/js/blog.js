// --------------------
// BLOG.JS (SIDEFFECTS)
// --------------------

// Fire functions automatically
function autoloadBlod() {
    getRecentBlogPosts();
}

// Get the last post from the blog which is on a different domain server
function getRecentBlogPosts() {
    $.get("/getblog/", function (data) {
        showPosts(data);
    });
}

// Create blog posts elements on the home page from a array of data
function showPosts(data) {
    for (var i = 0; i < data.length; i++) {
        var title = $("<h1>", {
            class: "post-title",
        });

        var link = $("<a>", {
            class: "post-link",
            html: data[i].title,
            href: data[i].link
        });

        var summary = $("<div>", {
            class: "post-summary",
            html: data[i].summary
        });

        title.append(link);

        var post = $("<div>", {
            class: "blog-post col-lg-6",
        }).append(title).append(summary);

        post.appendTo("#blog .blog-content");
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
