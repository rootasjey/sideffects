
function getLessons() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/lessons');
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
      var response  = xhr.response;
      if (response) {
        // LESSONS
        getLessonsResponse(response);
      }
      else {
        // null response
        console.log("une erreur est survenue");
      }
    }
  };
  xhr.send();
}

function getLessonsResponse(response) {
  response = JSON.parse(response);

  // add projects to the page
  for (var i = 0; i < response.length; i++) {
    addLesson(response[i], i);
  };
}

function addLesson(element, number) {
    var lesson = $('<li>', {
      title : element.title,
      path  : element.path,
    });

    var content = $('<a>', {
      html  : element.title,
      class : 'portfolio-link',
      href  : '#lessonsModal'
    });
    content.attr('data-toggle', 'modal');

    lesson.click(function () {
        clickLesson(this);
    });

    lesson.append(content);
    lesson.appendTo("#lessons .lessons-list");
}

function clickLesson(lesson) {
  var xhr = new XMLHttpRequest();
  var path = lesson.getAttribute('path');
  var title = lesson.getAttribute('title');

  var parameters = '?path=' + path + '&title=' + title;

  xhr.open('GET', '/lesson' + parameters);
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
      var response  = xhr.response;
      if (response) {
        clickLessonResponse(response);
      }
      else {
        // null response
        console.log("une erreur est survenue");
      }
    }
  };
  xhr.send( );
}

// Click event when a lesson is clicked
// Update the modal
function clickLessonResponse(response) {
  var data = JSON.parse(response);
  addLessonToModal(data);

}

function addLessonToModal(lesson) {
    var modalName = "#lessonsModal";
    $(modalName + " .lesson-title").html(lesson[0].title);
    $(modalName + " .lesson-content").html(lesson[0].content);
}
