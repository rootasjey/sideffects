// -----------------------------
// WEB SITE APP - JS FILE (jquery)
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------


// GLOBAL VARIABLES
// ----------------
// Tell if the user is in admin mode
var _ADMIN = false;
// ----------------


// Run when the page is loaded
// --------------------------
window.onload = function () {
	animate_index_icons();
	click_index_icons();
	click_panel_icons();
    animate_top_box();
    go_home();

	window.setTimeout(active_side, 2000);
};

function active_side() {
	$('<span>',{
		html: "Hello!"})
		.appendTo('.side .dialog');
}

function animate_top_box() {
    // initial & ending value
    // for the cv section (for animations)
    var _minHeigh = '5px';
    var _maxHeight = '400px';

    // CLICK
    $('.top_arrow').click(function() {
        if($(this)[0].getAttribute('alt') == 'down') {
            // show about section
            slide_top_box(_minHeigh, _maxHeight, '180');

            $(this)[0].setAttribute('alt', 'up');
            hide_sidebar();
        }
        else {
            // hide about section
            slide_top_box(_maxHeight, _minHeigh, '0');

            $(this)[0].setAttribute('alt', 'down');
            show_sidebar();
        }
    });

    // MOUSE ENTER/ MOUSE LEAVE
	//    $('.top_box').mouseenter(function() {
	//        if($(('.top_arrow'))[0].getAttribute('alt') == 'down') {
	//            slide_top_box(_minHeigh, _maxHeight, '180');
	//            $('.cv').css('display', 'inline-block');
	//            $('.top_arrow')[0].setAttribute('alt', 'up');
	//        }
	//        else {
	//        }
	//    });
	//    $('.top_box').mouseleave(function() {
	//        if($(('.top_arrow'))[0].getAttribute('alt') == 'down') {
	//        }
	//        else {
	//            slide_top_box(_maxHeight, _minHeigh, '0');
	//            $('.cv').css('display', 'none');
	//            $('.top_arrow')[0].setAttribute('alt', 'down');
	//        }
	//    });
}

function slide_top_box(startHeight, endHeight, angleRotate) {
    check_cv_displayed();

    $('.top_box')
         .css('height', startHeight)
         .animate({
             height: endHeight
         },{
             easing: 'linear',
             complete: function() {
                 $('.top_arrow').css({
                     '-webkit-transform': 'rotate(' + angleRotate + 'deg)',
                     '-moz-transform': 'rotate(' + angleRotate + 'deg)',
                     '-ms-transform': 'rotate(' + angleRotate + 'deg)',
                     '-o-transform': 'rotate(' + angleRotate + 'deg)',
                     'transform': 'rotate(' + angleRotate + 'deg)'
                     });

                 // check: resume + image profil diaplay
                 if(angleRotate == '180') {
                     window.setTimeout(function() {
                        $('.cv').css('display', 'inline-block');
                        $('.profil').css('display', 'inline-block');
                     }, 500);
                 }
                 else {
                     $('.cv').css('display', 'none');
                     $('.profil').css('display', 'none');
                 }

             }
         });
}

// Show section's title when
// the mouse is over the icon
function animate_index_icons() {
    // show some text
    // when the mouse cursor is hover index_icon(s)
	$('.icon_index').hover(function () {
		// mouseEnter
        // set the text above index_icons to the 'alt' icon value
        var alt = $(this)[0].getAttribute('alt');
		$('.text_helper').text(alt);
        $('.border_box').css({opacity: 1});

        // animate icon
        if($('#container').html() == '' || $('#container').html() == null) {
            $($('.icon_index[alt ="' + alt + '"]')).css({
                height: '138px',
                width: '138px',
                opacity: '1.0'
            });
        }

	}, function () {
		// mouseLeave
		$('.border_box').css('opacity', 0.0);


        // animate icon
        if($('#container').html() == '' || $('#container').html() == null) {
            var alt = $(this)[0].getAttribute('alt');
            $($('.icon_index[alt ="' + alt + '"]')).css({
                height: '142px',
                width: '142px',
                opacity: '0.5'
            });
        }
	});

    // show 'cv'
    // when the mouse cursor is hover the dropdown arrow
    $('.top_arrow').hover(function() {
        // mouseEnter
        // set the text above index_icons to the 'alt' icon value
        $('.text_helper').text('cv');
        $('.border_box').css({opacity: 1});
    }, function() {
        // mouseLeave
		$('.border_box').css('opacity', 0.0);
    })
}

// Click on an icon on the index page
// --------------------------------
function click_index_icons () {
	$('.icon_index').each(function () {
		$(this).click(function () {
            var url = $(this)[0].getAttribute('alt');

            // send ajax request
            prepare_ajax(url);

            minimize_top('70%');
            // animate icon
//                var alt = $(this)[0].getAttribute('alt');
                $(this).css({
                    height: '142px',
                    width: '142px',
                    opacity: '1'
                });
		});
	});
}


function click_panel_icons() {
	// add click event on login icon
	$(".sidebar_icon[data='login']").click(function() {
		create_login_form();
	});

	// add click event on plus icon
	$('.sidebar_icon[alt="new article"]').click(create_article_form);
}

// Get the Resume content
// if hasn't been retrieved yet
// ----------------------------
function check_cv_displayed() {
    if($('.cv').html() === "" || $('.cv').html() === null) {
        prepare_ajax('cv');
    }
}


// Create a ajax object
// and call a route in 'server.js',
// then send the response to a sub-function
// -----------------------------
function prepare_ajax(url) {
    if(!url) return;

    // ajax
    var xhr = new XMLHttpRequest();

    if (url !== '') {
        xhr.open('GET', '/' + url + '/');
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200){

                var response  = xhr.response;
                if (response) {

                    // PROJECTS
                    if (url == 'projects') {
                        ajax_projects(response);
                    }

                    // CV
                    else if (url == 'cv') {
                        ajax_cv(response);
                    }

                    // BLOG
                    else if (url == 'blog') {
                        ajax_blog(response);
                    }

                }
                else {
                    // null response
                }
            }
            else {
                // afficher une erreur
            }
        };
        xhr.send();
    }
}


// Post process ajax request
// > show projects
// -------------------------------
function ajax_projects(response) {
    response = JSON.parse(response);

    // add projects to the page
    for (var i = 0; i < response.length; i++) {
        $('<a>', {
            class: 'project_box',
            html: "<span class='title'>" + response[i]['title'] + "</span>" + "<br>" +
                  "<span class='platform'>" + response[i]['platform'] + "</span>" + "<br><br>"+

                  "<span class='authors'>" + response[i]['authors'] + "</span>" + "<br>" +
                  "<span class='year'>" + response[i]['year'] + "</span>" + "<br>" +
                  "<span class='progress'>" + response[i]['progress'] + "</span>" + "<br><br>",
            href: response[i]['link']

        }).appendTo('#container');
    };
}

// Post process ajax request
// > show resume (cv)
// -------------------------
function ajax_cv(response) {
    $('<div>', {
        class: 'cv',
        html: response,
    }).appendTo('.cv');

    // add click event on text
    active_lang_selector();
}


// Post process ajax request
// > show blog posts
// ---------------------------
function ajax_blog(response) {
    if(response) {
		response = JSON.parse(response);

        for(var i=0; i< response.length; i++) {
			// get formated date
			var date = new Date(response[i].Created_at);
			date = date.toLocaleString();

			var tags = get_tags(response[i].Tags);

            $('<div>', {
                class: 'article',
                html: "<span class='title'>" + response[i].Title + "</span>" + "<br>" +
                      "<span class='date'>" + date + "</span>" + "<br>" +
					  tags +
                      "<div class='body'>" + response[i].Body + "</div>",
            })
			.attr({
				// set attributes
				rowkey: response[i].RowKey,
				partitionkey: response[i].PartitionKey,
			})
			.appendTo('#container');


        }
		// add close icon
		$('.article .title').prepend("<img class='close' src='../icons/plus_icon.png' alt='close'/>");

		// add admin icon panel
		$('<div>', {
			class: 'admin_icons',
			html : "<img class='icon' function='delete' src='../icons/delete_icon.png' alt='delete'/>" +
				   "<img class='icon' function='edit' src='../icons/edit_icon.png' alt='edit'/>",
		}).insertAfter('.article .title');

		expand_article();
    }
}


// Extract tags from a string
// and return an array of tags
// ---------------------------
function get_tags(stringToSplit) {
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
function expand_article() {
	$('.article .title').click(function() {
		// display full screen
		var parent = $(this).parent();

		if(parent[0].className == 'article') {
			// create .close button
			parent.removeClass('article')
				  .addClass('fullscreen_article');

			if(_ADMIN) {
				active_admin_button($(this).parent());
			}
			else {
				// hide admin buttons
				// if not admin
				$('.admin_icons').css('display', 'none');

			}
		}
		else if (parent[0].className == 'fullscreen_article') {
			parent[0].className = 'article';
		}

	});
}


// Events on post's administration
// -------------------------------
function active_admin_button(art) {

	$("div[rowkey='" + art.attr('rowkey') + "']" + " .icon").each(function() {
		// unbound the click event
		// > avoid having multiple
		// > events on the same button
		// > after re-click on the same title
		$(this).off('click');
	})

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
				prepare_ajax('blog');

				// and show a message
				show_message('Post deleted', 'info', 0);
			},
			error: function(data)
			{
				// show an error message
				show_message("You're not authorized to delete posts", 'error', 0);
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
				create_article_form();

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
				show_message("You're not authorized to edit posts", 'error', 0);
			}
		});
	});
}

// Create a new form to post
// a new article on the blog
// -----------------------------
function create_article_form() {
    var form = document.createElement('form');
    form.name = 'article_form';
    form.className = 'form_article';
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '');

    // form title (top bar)
    var form_title = document.createElement('div');
    form_title.className = 'form_title';
    form_title.innerHTML = 'NEW BLOG ARTICLE';

    // labels
    // ------
    var label_title = document.createElement('h2');
    label_title.className = 'form_label';
    label_title.innerHTML = 'TITLE';

    var label_body = document.createElement('h2');
    label_body.className = 'form_label';
    label_body.innerHTML = 'CONTENT';

	var label_tags = document.createElement('h2');
    label_tags.className = 'mini_label';
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
    button.className = 'button_validate';
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
    minimize_top('70%');
    $('#container').append(form);



	// Events
	// ------
    // Add send form event
    add_send_form_event();

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
function add_send_form_event() {
    $('div[class="button_validate"]').click(function() {
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
                        show_message('The article has been successfully posted!', 'blog', 1);
                    }
					else {
						show_message('There was an errror', 'error');
					}
                },
				error: function(data)
				{
					show_message('You do not have the permission to post an new article', 'error', 1);
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
function create_login_form() {
    var form = document.createElement('form');
    form.name = 'login_form';
    form.className = 'form_login';
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '');

    // form title (top bar)
    var form_title = document.createElement('div');
    form_title.className = 'form_title';
    form_title.innerHTML = 'ADMIN LOGIN';

    // labels
    // ------
    var label_user = document.createElement('h2');
    label_user.className = 'form_label';
    label_user.innerHTML = 'USER';

    var label_pass = document.createElement('h2');
    label_pass.className = 'form_label';
    label_pass.innerHTML = 'PASSWORD';

    // inputs
    // ------
    // title
    var input_user = document.createElement('input');
    input_user.type = 'text';
    input_user.name = 'user';
    input_user.id = 'form_user';
    input_user.className = 'form_user';
    input_user.placeholder = 'Enter your login';

    // content (body)
    var input_pass = document.createElement('input');
	input_pass.type = 'password';
    input_pass.name = 'pass';
    input_pass.id = 'form_pass';
    input_pass.className = 'form_pass';
    input_pass.placeholder = 'Enter your password';

    // button (validation)
    var button = document.createElement('input');
    button.className = 'form_button_validate';
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
    minimize_top('40%');
    $('#container').append(form);

    // add send form event
    $('input[class="form_button_validate"]').click(function() {
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
                        show_message("You're now logged in!", 'admin', 1);

						// set a global variable to true
						_ADMIN = true;
                    }
					else {
						_ADMIN = false;
						show_message("Wrong credentials", 'error', 1);
					}
                },
				error: function(data) {
					_ADMIN = false;
					show_message("Wrong credentials", 'error', 1);
				}
            });

            return false;
        });

        $(function() {
            $('.form_login').trigger('submit');
        });
	});
}


// Show status message
// -------------------
function show_message(message, type, emptyContainer) {
    if(!message) return;

	if(emptyContainer) {
    	set_default_layout();
		minimize_top('70%');
	}


	// create a message box
    $('<div>', {
        class: 'message',
        html: message + "<br> <div class='ok'>ok</span>",
    }).prependTo('#container');

	// set the background color
	// to red if it's an error
	if(type == 'error') {
		$('.message').css('background', '#e74c3c');
	}

    // click event on OK button
    $('.ok').click(function() {
		// delete the message

		if(type == 'blog') {
			// return to blog posts
			minimize_top('50%');
			prepare_ajax('blog');
		}
		else if(type == 'admin') {
			// empty the page
			set_default_layout();
		}
		else {
			// do nothing
			var parent = $(this).parent();
			$('#container')[0].removeChild(parent[0]);
		}
    });

}


// Minimize index_icon
// end empty the #container
// ----------------------
function minimize_top(width) {
    // re-arrange contain (on top)
    $('#container').css('width', width);
    $('.icon_index').css({
        width: '90px',
        height: '90px'});
    $('.nav_horizontal').css({
        marginTop: '0'
    });


    // empty #contain page
    $('#container').html('');
}


// Set to 'none'
// sidebar panel for admin
// -----------------------
function hide_sidebar() {
    // hide side bar
    $('.sidebar').css('display', 'none');
    $('.sidebar').children().each( function() {$(this).css('display', 'none');} );
}

// Set to 'block'
// sidebar panel for admin
// -----------------------
function show_sidebar() {
    $('.sidebar').css('display', 'block');
    $('.sidebar').children().each( function() {$(this).css('display', 'block');} );
}

// Add click event on text (lang selector)
// -------------------------------
function active_lang_selector () {
	$('.lang_button').each(function() {
		$(this).click(select_lang);
	});
}

// Change the language en <-> fr
// ----------------------
function select_lang () {
	if($(this)[0].getAttribute('selected') == 'true') return;

	var lang = $(this)[0].getAttribute('data');
	if (lang == 'francais') {
		// cache/affiche
		$('.english_resume').css('display', 'none');
		$('.french_resume').css('display', 'block');

		$('span[selected="true"]')[0].setAttribute('selected', false);
		$(this)[0].setAttribute('selected', 'true');

	}
	else if (lang == 'english') {
		// cache/affiche
		$('.english_resume').css('display', 'block');
		$('.french_resume').css('display', 'none');

		$('span[selected="true"]')[0].setAttribute('selected', false);
		$(this)[0].setAttribute('selected', 'true');

	}
}


// Add click event on
// the website title
// -----------------
function go_home() {
    $('.title').click(function() {
        set_default_layout();
    });
}

// Set the default layout to the page
// (empty the #container)
// ----------------------------
function set_default_layout() {
    // re-arrange contain (on top)
    $('#container').css('width', '100%');
    $('.icon_index').css({
        width: '145px',
        height: '145px'});

    $('.nav_horizontal').css({
        marginTop: '100px'
    });

    // empty #contain page
    $('#container').html('');
}
