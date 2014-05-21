// -----------------------------
// WEB SITE APP - JS FILE (jquery)
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------

// Run when the page is loaded
// -------------------------
window.onload = function() {
	animate_index_icons();
	click_index_icons();
};

// Show section's title when
// the mouse is over the icon
function animate_index_icons () {
	$('.icon_index').hover(function () {
		// mouseEnter
		$('.text_helper').text($(this)[0].getAttribute('alt'))
		$('.border_box').css('opacity', 1)
	}, function () {
		// mouseLeave
		$('.border_box').css('opacity', 0.0)
	});
}

// Click on an icon on the index page
function click_index_icons () {
	$('.icon_index').each(function () {
		$(this).click(function () {
			// ajax
			var xhr = new XMLHttpRequest();
			var url = ''

			if ($(this)[0].getAttribute('alt') == 'blog') {
				url = $(this)[0].getAttribute('alt');
			}
			else if ($(this)[0].getAttribute('alt') == 'projects') {
				url = $(this)[0].getAttribute('alt')
			}
			else if ($(this)[0].getAttribute('alt') == 'cv') {
				url = $(this)[0].getAttribute('alt')
			}

			if (url !== '') {
				xhr.open('GET', '/' + url + '/');
				

				xhr.onreadystatechange = function () {
					if(xhr.readyState == 4 && xhr.status == 200){
						
						var response  = xhr.response;
						if (response) {

							// PROJECTS
							if (url == 'projects') {
								response = JSON.parse(response)

								// re-arrange contain (on top)
								$('#container').css('width', '80%');
								$('.icon_index').css({
									width: '90px',
									height: '90px'});
								$('.nav_horizontal').css({
									marginTop: '0'
								});


								// empty #contain page
								$('#container').html('');

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

							// CV
							else if (url == 'cv') {

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

								$('<div>', {
									class: 'cv',
									html: response,
								}).appendTo('#container');

								active_lang_selector();
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
		});
	});
}

function active_lang_selector () {
	$('.lang_button').each(function() {
		$(this).click(select_lang);
	});
}

function select_lang () {
	// console.log($(this));
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