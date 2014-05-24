// -----------------------------
// WEB SITE APP - JS FILE (jquery)
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------

// Run when the page is loaded
// -------------------------
window.onload = function () {
	animate_index_icons();
	click_index_icons();
    go_home();
};

// Show section's title when
// the mouse is over the icon
function animate_index_icons() {
	$('.icon_index').hover(function () {
		// mouseEnter
		$('.text_helper').text($(this)[0].getAttribute('alt'));
		$('.border_box').css('opacity', 1);
	}, function () {
		// mouseLeave
		$('.border_box').css('opacity', 0.0);
	});
}

// Click on an icon on the index page
function click_index_icons () {
	$('.icon_index').each(function () {
		$(this).click(function () {
            var url = $(this)[0].getAttribute('alt');
            
            // send ajax request
            prepare_ajax(url);

		});
	});
}


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
                    // console.log('sorry bro');
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
    minimize_top();

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
    minimize_top();

    $('<div>', {
        class: 'cv',
        html: response,
    }).appendTo('#container');

    // add click event on text
    active_lang_selector();
}


// Post process ajax request
// > show blog posts
// ---------------------------
function ajax_blog(response) {
    if(response) {
        response = JSON.parse(response);
        minimize_top();

        for(var i=0; i< response.length; i++) {
            $('<div>', {
                class: 'article',
                html: "<span class='title'>" + response[i].title + "</span>" + "<br>" +
                      "<san class='date'>" + response[i].created_at + "</span>" + "<br>"+
                      "<span class='body'>" + response[i].body + "</span>",
            }).appendTo('#container');
        }

        // add 'Plus' button to the page
        // to add new article in admin mode
        $('.sidebar').css('display', 'block');
        $('.sidebar').children().each( function() {$(this).css('display', 'inline');} );

        // add click event on this plus icon
        $('.sidebar_icon[alt="new article"]').click(create_article_form);
    }
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
    
    // inputs
    // ------
    // title
    var input_title = document.createElement('input');
    input_title.type = 'text';
    input_title.name = 'title';
    input_title.id = 'form_article_title';
    input_title.className = 'form_article_title';
    input_title.placeholder = 'Enter an article title';
    
    // content (body)
    var input_body = document.createElement('textarea');
    input_body.rows = '10';
    input_body.columns = '30';
    input_body.name = 'body';
    input_body.id = 'form_article_body';
    input_body.className = 'form_article_body';
    input_body.placeholder = 'Enter the article content';
    
//    var input_button = document.createElement('input');
//    input_button.type = 'button';
//    input_button.value = 'CREATE!';
//    input_button.style.display = 'block';
    
    // button (validation)
    var button = document.createElement('div');
    button.className = 'form_button_validate';
    button.innerHTML = 'ADD ARTICLE';
    
    
    // add children to the form
    form.appendChild(form_title);
    form.appendChild(label_title);
    form.appendChild(input_title);
    
    form.appendChild(label_body);
    form.appendChild(input_body);
    form.appendChild(button);
    
    
    // add the form to the page
    minimize_top();
    $('#container').append(form);
    
    // add send form event
    add_send_form_event();
}


// Add click event on the 
// send form button
// -----------------------------
function add_send_form_event() {
    $('div[class="form_button_validate"]').click(function() {
        var form = document.forms.article_form;
        var title = form.title.value;
        var body = form.body.value;

        $('.form_article').submit(function() {
            
            $.ajax({
                type: 'POST',
                url: '/blog/new',
                data: $('.form_article').serialize(),
                success: function(data)
                {
                    if(data == 'OK'){
                        show_message('The article has been successfully posted!');
                    }
                }
            });
            
            return false;
        });
        
        $(function() {
            $('.form_article').trigger('submit');
        });
    });
}


// Show status message
// -------------------
function show_message(message) {
    if(!message) return;
    
    set_default_layout();
    minimize_top();
    
    $('<div>', {
        class: 'message',
        html: message + "<br> <div class='ok'>ok</span>",
    }).appendTo('#container');
    
    // click event on OK button
    $('.ok').click(function() {
//        set_default_layout();
        
        // return to blog posts
        setTimeout(prepare_ajax('blog'), 2000);
    });
    
}


// Minimize top bar
// end empty the #container
// ----------------------
function minimize_top() {
    // re-arrange contain (on top)
    $('#container').css('width', '50%');
    $('.icon_index').css({
        width: '90px',
        height: '90px'});
    $('.nav_horizontal').css({
        marginTop: '0'
    });


    // empty #contain page
    $('#container').html('');
    
    // hide side bar
    $('.sidebar').css('display', 'none');
    $('.sidebar').children().each( function() {$(this).css('display', 'none');} );
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
        width: '142px',
        height: '142px'});
    $('.nav_horizontal').css({
        marginTop: '100px'
    });

    // empty #contain page
    $('#container').html('');
    
    $('.sidebar').css('display', 'none');
    $('.sidebar').children().each( function() {$(this).css('display', 'none');} );
}