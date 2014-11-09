// --------------------
// BLOG.JS (SIDEFFECTS)
// --------------------

// Show or Hide the blog block
function toggleBlog() {
  var blog = $(".blog");

  if (blog.css("display") === "none") {
    blog.css({
      display: "block",
      opacity: "0",
      top: "20px"
    }).animate({
      top: "0",
      opacity: "1"
    });
    minimizeTop();
  }
  else {
    blog.css({})
    .animate({
      top: "20px",
      opacity: "0"
    }, {
      complete: function () {
        $(this).css('display', 'none');
      }
    });
  }
}

// Post process ajax request
// > show blog posts
// ---------------------------
function ajaxBlog(response) {
  if(response) {
    response = JSON.parse(response);

    for(var i=0; i< response.length; i++) {
      // get formated date
      var date = new Date(response[i].Created_at);
      date = date.toLocaleString();

      var tags = getTags(response[i].Tags);

      $('<div>', {
          class: 'article',
          html: "<span class='title'>" + response[i].Title + "</span>" + "<br>" +
                "<span class='date'>" + date + "</span>" + "<br>" + tags +
                "<div class='body'>" + response[i].Body + "</div>",
      })
      .attr({
        // set attributes
        rowkey: response[i].RowKey,
        partitionkey: response[i].PartitionKey,
      })
      .appendTo('.blog');
    }

    // add close icon
    $('.article .title').prepend("<img class='close' src='../icons/plus_icon.png' alt='close'/>");

    // add admin icon panel
    $('<div>', {
      class: 'admin-icons',
      html : "<img class='icon' function='delete' src='../icons/delete_icon.png' alt='delete'/>" +
           "<img class='icon' function='edit' src='../icons/edit_icon.png' alt='edit'/>",
    }).insertAfter('.article .title');

    expandArticle();

    // Show the blog block
    toggleBlog();
  }
}


// Extract tags from a string
// and return an array of tags
// ---------------------------
function getTags(stringToSplit) {
  if(!stringToSplit) return;

  // separate tags
  var arrayOfTags 	= stringToSplit.split(',');
  var stringToReturn 	= "<div class='tags'>";
  var before			= "<span class='tag'>";
  var after  			= "</span>";

  for(var i=0; i<arrayOfTags.length; i++) {
    stringToReturn += before + arrayOfTags[i] + after;
  }

  stringToReturn += '</div> <br>';
  return stringToReturn;
}


// Add click event on article's titles
// and display full screen article's content
// ----------------------
function expandArticle() {
  $('.article .title').click(function() {
    // display full screen
    var parent = $(this).parent();

    if(parent[0].className == 'article') {
      // create .close button
      parent.removeClass('article')
          .addClass('fullscreen_article');

      if(_ADMIN) {
        activeAdminButton($(this).parent());
      }
      else {
        // hide admin buttons
        // if not admin
        $('.admin-icons').css('display', 'none');

      }
    }
    else if (parent[0].className == 'fullscreen_article') {
      parent[0].className = 'article';
    }

  });
}


// Events on post's administration
// -------------------------------
function activeAdminButton(art) {

  $("div[rowkey='" + art.attr('rowkey') + "']" + " .icon").each(function() {
    // unbound the click event
    // > avoid having multiple
    // > events on the same button
    // > after re-click on the same title
    $(this).off('click');
  });

  // DELETE A POST
  // -------------
  // This is a long selector to be very specific in the selection of the element.
  // We could just write "img[function='delete']", but it'd set the click event on
  // every img[function='delete'] element.
  // Instead, we set the click event only on the unique post having a specific rowkey
  $("div[rowkey='" + art.attr('rowkey') + "']" + " img[function='delete']").click(function() {

    // ajax
    $.ajax({
      type: 'POST',
      url: '/blog/delete_post',
      data: {
          rowkey: art.attr('rowkey'),
          partitionkey: art.attr('partitionkey')
          },
      success: function(data)
      {
        // empty container
        $('#container').html('');

        // refresh the page
        prepareAjax('blog');

        // and show a message
        showMessage('Post deleted', 'info', 0);
      },
      error: function(data)
      {
        // show an error message
        showMessage("You're not authorized to delete posts", 'error', 0);
      }
    });
  });


  // EDIT A POST
  // -----------
  $("div[rowkey='" + art.attr('rowkey') + "']" + " img[function='edit']").click(function() {

    // get the post informations
    var rowkey 		 = art.attr('rowkey');
    var partitionkey = art.attr('partitionkey');


    // ajax
    $.ajax({
      type: 'POST',
      url: '/blog/edit_post',
      data: {
          rowkey: art.attr('rowkey'),
          partitionkey: art.attr('partitionkey')
          },
      success: function(data)
      {
        // receive OK if we're in admin mode

        // empty container
        $('#container').html('');

        // get the article form
        createArticleForm();

        // fill input with text
        var form = document.forms.article_form;
        form.title.value 	= data[0].Title;
        form.body.value  	= data[0].Body;
        form.tags.value 	= data[0].Tags;
        form.rowkey.value 	= data[0].RowKey;
      },
      error: function(data)
      {
        // show an error message
        showMessage("You're not authorized to edit posts", 'error', 0);
      }
    });
  });
}

// Create a new form to post
// a new article on the blog
// -----------------------------
function createArticleForm() {
  var form = document.createElement('form');
  form.name = 'article_form';
  form.className = 'form_article';
  form.setAttribute('method', 'POST');
  form.setAttribute('action', '');

  // form title (top bar)
  var form_title = document.createElement('div');
  form_title.className = 'form-title';
  form_title.innerHTML = 'NEW BLOG ARTICLE';

  // labels
  // ------
  var label_title = document.createElement('h2');
  label_title.className = 'form-label';
  label_title.innerHTML = 'TITLE';

  var label_body = document.createElement('h2');
  label_body.className = 'form-label';
  label_body.innerHTML = 'CONTENT';

  var label_tags = document.createElement('h2');
  label_tags.className = 'mini-label';
  label_tags.innerHTML = 'TAGS';

  // inputs
  // ------
  // title
  var input_title = document.createElement('input');
  input_title.type = 'text';
  input_title.name = 'title';
  input_title.className = 'input_title';
  input_title.placeholder = 'Enter an article title';

  // content (body)
  var input_body = document.createElement('textarea');
  input_body.rows = '10';
  input_body.columns = '30';
  input_body.name = 'body';
  input_body.className = 'input_body';
  input_body.placeholder = 'Enter the article content';

  // tags
  var input_tags = document.createElement('input');
  input_tags.type = 'text';
  input_tags.name = 'tags';
  input_tags.className = 'input_tags';
  input_tags.placeholder = 'Enter tags separated with a comma ","';

  // hidden fields
  // rowkey
  var input_rowkey = document.createElement('input');
  input_rowkey.type = 'text';
  input_rowkey.name = 'rowkey';
  input_rowkey.style.display = 'none';


  // button (validation)
  var button = document.createElement('div');
  button.className = 'button-validate';
  button.innerHTML = 'ADD ARTICLE';

  // icons panel
  var icons_panel = document.createElement('div');
  icons_panel.className = 'icons_panel';
  // buttons
  var button_expandbody = document.createElement('img');
  button_expandbody.src = '../icons/plus_icon.png';
  button_expandbody.className = 'icon'

  var button_collapsebody = document.createElement('img');
  button_collapsebody.src = '../icons/minus_icon.png';
  button_collapsebody.className = 'icon';

  icons_panel.appendChild(button_expandbody);
  icons_panel.appendChild(button_collapsebody);


  // Add children to the form
  // ------------------------
  // title
  form.appendChild(form_title);
  form.appendChild(label_title);
  form.appendChild(input_title);

  // tags
  form.appendChild(input_tags);

  // body
  form.appendChild(label_body);
  form.appendChild(input_body);

  // icons_panel
  form.appendChild(icons_panel);

  // button
  form.appendChild(button);

  // hidden : rowkey
  form.appendChild(input_rowkey);


  // Add the form to the page
  minimizeTop('70%');
  $('#container').append(form);



  // Events
  // ------
  // Add send form event
  addSendFormEvent();

  // Expend body
  button_expandbody.addEventListener('click', function() {
    $('.input_body').css({
      height: '+=100px'
    });
  }, false);

  // Collapse body
  button_collapsebody.addEventListener('click', function() {
    $('.input_body').css({
      height: '-=100px'
    });
  }, false);
}


// Add click event on the
// send form button
// -----------------------------
function addSendFormEvent() {
    $('div[class="button-validate"]').click(function() {
        var form = document.forms.article_form;
        var title = form.title.value;
        var body = form.body.value;

        $('.form_article').submit(function() {

            $.ajax({
                type: 'POST',
                url: '/blog/add_post',
                data: $('.form_article').serialize(),
                success: function(data)
                {
                    if(data == 'OK'){
                        showMessage('The article has been successfully posted!', 'blog', 1);
                    }
          else {
            showMessage('There was an errror', 'error');
          }
                },
        error: function(data)
        {
          showMessage('You do not have the permission to post an new article', 'error', 1);
        }
            });

            return false;
        });

        $(function() {
            $('.form_article').trigger('submit');
        });
    });
}


// Create a new form to login
// -----------------------------
function createLoginForm() {
    var form = document.createElement('form');
    form.name = 'login_form';
    form.className = 'form-login';
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '');

    // form title (top bar)
    var form_title = document.createElement('div');
    form_title.className = 'form-title';
    form_title.innerHTML = 'ADMIN LOGIN';

    // labels
    // ------
    var label_user = document.createElement('h2');
    label_user.className = 'form-label';
    label_user.innerHTML = 'USER';

    var label_pass = document.createElement('h2');
    label_pass.className = 'form-label';
    label_pass.innerHTML = 'PASSWORD';

    // inputs
    // ------
    // title
    var input_user = document.createElement('input');
    input_user.type = 'text';
    input_user.name = 'user';
    input_user.id = 'form-user';
    input_user.className = 'form-user';
    input_user.placeholder = 'Enter your login';

    // content (body)
    var input_pass = document.createElement('input');
    input_pass.type = 'password';
    input_pass.name = 'pass';
    input_pass.id = 'form-pass';
    input_pass.className = 'form-pass';
    input_pass.placeholder = 'Enter your password';

    // button (validation)
    var button = document.createElement('input');
    button.className = 'form-button-validate';
    button.type = 'submit';
    button.value = 'LOG ME IN';


    // add children to the form
    form.appendChild(form_title);
    form.appendChild(label_user);
    form.appendChild(input_user);

    form.appendChild(label_pass);
    form.appendChild(input_pass);
    form.appendChild(button);


    // add the form to the page
    minimizeTop('40%');
    $('#container').append(form);

    // add send form event
    $('input[class="form-button-validate"]').click(function() {
    var form = document.forms.login_form;
        var user = form.user.value;
        var pass = form.pass.value;

    $('.form_login').submit(function() {
        $.ajax({
          type: 'POST',
          url: '/login/admin',
          data: $('.form_login').serialize(),
          success: function(data)
          {
            if(data == 'OK'){
              showMessage("You're now logged in!", 'admin', 1);

              // set a global variable to true
              _ADMIN = true;
            }

            else {
              _ADMIN = false;
              showMessage("Wrong credentials", 'error', 1);
            }
          },
          error: function(data) {
            _ADMIN = false;
            showMessage("Wrong credentials", 'error', 1);
          }
        });

        return false;
    });

    $(function() {
        $('.form_login').trigger('submit');
    });
  });
}
