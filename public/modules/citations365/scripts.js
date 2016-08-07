window.onload = function () {
    getQuote();
}

function getQuote() {
    var req = new XMLHttpRequest();
    req.addEventListener('readystatechange', function() {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            populateBackground(req.response);
        }
    });

    req.open('GET', '/api/365/quote', false);
    req.send(null);
}

function populateBackground(quote) {
    quote = JSON.parse(quote);

    var content = document.querySelector('.quote .content');
    var author = document.querySelector('.quote .author');
    var ref = document.querySelector('.quote .ref');

    content.textContent = quote.content;
    author.textContent = quote.author;
    ref.textContent = quote.ref;
}
