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


// Run when the page is loaded
// --------------------------
window.onload = function () {
	basicFunctions();
};

// Load defaults functions
function basicFunctions() {
	hoverIndexIcons();
	clickIndexIcons();
	clickPanelIcons();
	// animateTopBox();
	hoverFooterIcons();
	getCV();
	goHome();
}

function activeSide() {
	$('<span>',{
		html: "Hello!"})
		.appendTo('.side .dialog');
}

function animateTopBox() {
    // initial & ending value for the cv section (for animations)
    var _minHeigh = '5px';
    var _maxHeight = '400px';

    // CLICK
    $('.top_arrow').click(function() {
        if($(this)[0].getAttribute('alt') == 'down') {
            // show about section
            slideTopBox(_minHeigh, _maxHeight, '180');

            $(this)[0].setAttribute('alt', 'up');
            hideSidebar();
        }
        else {
            // hide about section
            slideTopBox(_maxHeight, _minHeigh, '0');

            $(this)[0].setAttribute('alt', 'down');
            showSidebar();
        }
    });
}

function slideTopBox(startHeight, endHeight, angleRotate) {
    checkCvDisplayed();

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

// Show section's title when the mouse is over the icon
function hoverIndexIcons() {
  // show some text
  // when the mouse cursor is hover index_icon(s)
	$('.header-icon').hover(function () {
		// mouseEnter
    // set the text above index_icons to the 'alt' icon value
    var alt = $(this)[0].getAttribute('alt');
		$('.text-helper').text(alt);
      $('.border-box').css({opacity: 1});

      // animate icon
      // if($('#container').html() == '' || $('#container').html() == null) {
      //   $($('.header-icon[alt ="' + alt + '"]')).css({
      //       height: '90px',
      //       width: '90px',
      //       opacity: '1.0'
      //   });
      // }

	}, function () {
		// mouseLeave
		$('.border-box').css('opacity', 0.0);

    // animate icon
    // if($('#container').html() == '' || $('#container').html() == null) {
    //   var alt = $(this)[0].getAttribute('alt');
    //   $($('.header-icon[alt ="' + alt + '"]')).css({
    //       height: '100px',
    //       width: '100px',
    //       opacity: '0.5'
    //   });
    // }
	});
}

// Click on an icon on the index page
function clickIndexIcons () {
	$('.header-icon').each(function () {
		$(this).click(function () {

				// Check if there's no blocks
				hideBlocks();

        var url = $(this)[0].getAttribute('alt');

				// Avoid getting the same content
				var selector = "." + url;
				var superSelector = $(selector);

				if (isEmpty(superSelector.html())) prepareAjax(url); // send ajax request
				else showBlocks(url)
		});
	});
}

function isEmpty(object) {
	if (object !== null && object !== "" && object !== undefined) {
		return false;
	}
	return true;
}

function showBlocks(block) {
	if (block === 'blog') {
		// $(".blog").css({ display: "block" }).animate({
		// 	top: "0",
		// 	opacity: "1"
		// });
		// minimizeTop();
		toggleBlog();
	}
	else if (block === 'experiments') {
		// $(".experiments").css({ display: "block" }).animate({
		// 	top: "0",
		// 	opacity: "1"
		// });
		// minimizeTop("40%");
		toggleExperiments();
	}
	else if (block === 'passions') {
		// $(".passions").css({ display: "block" }).animate({
		// 	top: "0",
		// 	opacity: "1"
		// });
		// minimizeTop();
		togglePassions();
	}
}

// When the user clicks on a sidepanel icon
function clickPanelIcons() {
	// add click event on login icon
	$(".sidebar-icon[data='login']").click(function() {
		createLoginForm();
	});

	// add click event on plus icon
	$('.sidebar-icon[alt="new article"]').click(createArticleForm);
}

function hoverFooterIcons() {
	$(".icon-footer").hover(function () {
		var text = $(this).attr("alt");
		$(".footer-ghost-text .text").css("opacity", "1").html(text);
	}, function () {
		$(".footer-ghost-text .text").css("opacity", "0").html("");
	});
}

// Get the Resume content
// if hasn't been retrieved yet
function checkCvDisplayed() {
  if($('.cv').html() === "" || $('.cv').html() === null) {
      prepareAjax('cv');
  }
}

// Create a ajax object
// and call a route in 'server.js',
// then send the response to a sub-function
// -----------------------------
function prepareAjax(url) {
  if(!url) return;

  // ajax
  var xhr = new XMLHttpRequest();

  if (url !== '') {
    xhr.open('GET', '/' + url + '/');
    xhr.onreadystatechange = function () {
      if(xhr.readyState == 4 && xhr.status == 200){
        var response  = xhr.response;
        if (response) {
          // EXPERIMENTS
          if (url == 'experiments') {
              ajaxExperiments(response);
          }

          // CV
          else if (url == 'cv') {
              ajaxCv(response);
          }

          // BLOG
          else if (url == 'blog') {
              ajaxBlog(response);
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
// > show resume (cv)
// -------------------------
function ajaxCv(response) {

	// The text content about me
  $('<div>', {
      class: 'me',
      html: response
  }).css({ opacity: '0', top: '20px'}).animate({ opacity: '1', top: '0'})
	.appendTo('.about');

	// The close icon
	$("<img>", {
		class	: 'icon',
		func 	: 'close',
		src		: '/icons/cancel_icon.png'
	})
	.css({ opacity: '0', top: '-20px' })
	.animate({ opacity: '1', top: '0' })
	.prependTo('.me');

	// Close icon click
	$(".icon[func='close']").click(function () {
		toggleCV();
	});

	// Hide the more icon
	$(".more").css("display", "none");
}

function getCV() {
	$(".about .more").click(function () {
		if ($(".me").html() === "" || $(".me").html() === null
		|| $(".me").html() === undefined) {

			prepareAjax('cv');
		}
		else {
			toggleCV();
		}
	});
}

function toggleCV() {
	if ($(".me").css("opacity") == "0") {
		// The text content about me
		$('.me')
		.css({ display: "block", opacity: '0', top: '-20px' })
		.animate({ opacity: '1', top: '0' }, { duration: 1000 });

		// The close icon
		$("icon[func='close']")
		.css({ display: "block", opacity: '0', top: '20px' })
		.animate({ opacity: '1', top: '0' }, { duration: 1000 });

		// Hide the more icon
		$(".more").css("display", "none");
	}
	else {
		// The text content about me
		$('.me').css({}).animate({ opacity: '0', top: '20px' }, { complete: function () {
			$(this).css("display", "none");
		}});

		// The close icon
		$("icon[func='close']").css({}).animate({ opacity: '0', top: '-20px'}, { complete: function () {
			$(this).css("display", "none");
		}});

		// Hide the more icon
		$(".more").css("display", "block");
	}
}

// Show status message
// -------------------
function showMessage(message, type, emptyContainer) {
  if(!message) return;

	if(emptyContainer) {
    setDefaultLayout();
		minimizeTop();
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
		minimizeTop();
		prepareAjax('blog');
	}
	else if(type == 'admin') {
		// empty the page
		setDefaultLayout();
	}
	else {
		// do nothing
		var parent = $(this).parent();
		$('#container')[0].removeChild(parent[0]);
	}
  });
}


// Arrange top content
// ----------------------
function minimizeTop(width) {
  if (width !== undefined && width !== null && width !== '')
		$('#container').css('width', width);

  // $('.header-icon').css({
  //     width: '90px',
  //     height: '90px'});

  $('.nav-horizontal').css({
      marginTop: '0'
  });

	$(".about").css({ display: "none"});
}


// Set to 'none'
// sidebar panel for admin
// -----------------------
function hideSidebar() {
    // hide side bar
    $('.sidebar').css('display', 'none');
    $('.sidebar').children().each( function() {$(this).css('display', 'none');} );
}

// Set to 'block'
// sidebar panel for admin
// -----------------------
function showSidebar() {
    $('.sidebar').css('display', 'block');
    $('.sidebar').children().each( function() {$(this).css('display', 'block');} );
}

// Add click event on text (lang selector)
// -------------------------------
function activeLangSelector () {
	$('.lang_button').each(function() {
		$(this).click(selectLang);
	});
}

// Change the language en <-> fr
// ----------------------
function selectLang () {
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
function goHome() {
    $('.title').click(function() {
        setDefaultLayout();
    });
}

// Set the default layout to the page
// (empty the #container)
// ----------------------------
function setDefaultLayout() {
	hideBlocks();

  $('#container').css('width', "32%");
	$(".about").css({ display: "block"});
}

function hideBlocks() {
	if ($(".blog").css('display') === 'block') {
		$(".blog").css({}).animate({
			top: "20px",
			opacity: "0",
		}, {
			complete: function () {
				$(this).css("display", 'none');
			}
		});
	}
	else if ($(".experiments").css('display') === 'block') {
		$(".experiments").css({}).animate({
			top: "20px",
			opacity: "0",
		}, {
			complete: function () {
				$(this).css("display", "none");
			}
		});
	}
	else if ($(".passions").css('display') === 'block') {
		$(".passions").css({}).animate({
			top: "20px",
			opacity: "0",
		}, {
			complete: function () {
				$(this).css("display", "none");
			}
		});
	}
}
