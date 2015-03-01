// ---------------------------
// PROJECTS.JS (SIDEFFECTS)
// ---------------------------

function getProjects() {
    $.get("/api/test", function (data) {
        console.log(data);
    });
  // var xhr = new XMLHttpRequest();
  //
  // xhr.open('GET', '/projects');
  // xhr.onreadystatechange = function () {
  //   if(xhr.readyState == 4 && xhr.status == 200){
  //     var response  = xhr.response;
  //     if (response) {
  //       // PROJECTS
  //       getProjectsResponse(response);
  //     }
  //     else {
  //       // null response
  //       console.log("une erreur est survenue");
  //     }
  //   }
  // };
  // xhr.send();
}

// Post process ajax request
// > show projects
// -------------------------------
function getProjectsResponse(response) {
    response = JSON.parse(response);

    // add projects to the page
    for (var i = 0; i < response.length; i++) {
      addSectionToPortfolio(response[i], i);
      addPortfolioModal(response[i], i);
    };
}

// Add an item to the portfolio section
function addSectionToPortfolio(element, number) {
  var item = $('<div>', {
    class: 'col-sm-3 portfolio-item'
  });

  var link = $('<a>', {
    class: 'portfolio-link',
    href: '#portfolioModal' + number,

  }).attr("data-toggle", 'modal');

  var caption = $('<div>', {
    class: 'caption'
  });

  var captionContent = $('<div>', {
    class: 'caption-content'
  });

  var information = $('<i>', {
    class: 'fa fa-search-plus fa-3x'
  });

  var img = $('<img>', {
    class: 'img-responsive img-projects',
    src : element.preview,
    alt: ''
  });

  caption.append(captionContent.append(information));
  item.append(link.append(caption).append(img));
  item.appendTo("#portfolio .container .items");
}

// Add a modal according to the current portfolio item
function addPortfolioModal(element, number) {
  var modal = $("<div>", {
      id : 'portfolioModal' + number,
      class: 'portfolio-modal modal fade',
      tabindex : "-1",
      role : "dialog"
  }).attr( 'aria-hidden', 'true');

  var modalContent = $('<div>', { class: 'modal-content'});

  var lr = $('<div>', { class: 'lr' }).append("<div class='rl'></div>")
  var closeModal = $('<div>', { class: 'close-modal' }).attr('data-dismiss','modal').append(lr);

  var container = $('<div>', { class: 'container' });
  var row = $('<div>', { class: 'row' });
  var col = $('<div>', { class: 'col-lg-8 col-lg-offset-2' });
  var modalBody = $('<div>', { class: 'modal-body'});
  var title = $('<h2>', { html: element.title });
  var hr = $("<hr>", { class: 'star-primary' });
  var img = $('<img>', {
    class: 'img-responsive img-centered',
    src: element.miniature,
    alt: ''
  });
  var description = $("<p>", { html: element.description });

  // Projects details
  var list = $('<ul>', { class: 'list-unstyled item-details'});

  var liAuthor = $('<li>', { html: 'Auteur(s)' })
      .append($('<strong>').append($('<p>', { html: element.authors })));

  var liDate = $('<li>', { html: 'Date' })
  .append($('<strong>').append($('<p>', { html: element.year })));

  var liPlatform = $('<li>', { html: 'Plateformes' })
  .append($('<strong>').append($("<p>", { html: element.platform })));


  var button = $('<button>', {
    class: 'btn btn-danger',
    type : 'button'
  }).attr('data-dismiss', 'modal')
    .append("<i class='fa fa-times'>Close</i>");

  list.append(liAuthor).append(liDate).append(liPlatform);
  modalBody.append(title).append(hr).append(img)
           .append(description).append(list).append(button);

  container.append(row).append(col).append(modalBody);
  modalContent.append(closeModal).append(container);
  modal.append(modalContent);
  modal.insertAfter("#portfolio");
}
