var api = "https://api.forismatic.com/api/1.0/?&method=getQuote&format=json&lang=en";
var translationApi = "https://api.mymemory.translated.net";

function getQuoteFromApi(callback) {
    fetch(api, { "mode": "no-cors" })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.log(error))
}

function translateText(text, callback, element) {
    fetch(translationApi + "/get?q=" + text + "&langpair=en|he", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }, { "mode": "no-cors" })
        .then(response => response.json())
        .then(data => callback(element, data.responseData.translatedText))
        .catch(error => console.log(error))
}

document.addEventListener('DOMContentLoaded', () => {
    var quote = document.getElementById('quote');
    var author = document.getElementById('author');
    var button = document.getElementById('generate');
    var translateButton = document.getElementById('translate');
    var translatedQuote = document.getElementById('translated-quote');
    var translatedAuthor = document.getElementById('translated-author');


    function setDataToDOM(data) {
        quote.innerHTML = data.quoteText;
        author.innerHTML = data.quoteAuthor;
    }

    function setTranslatedText(html, translatedText) {
        html.innerHTML = translatedText;
    }

    getQuoteFromApi(setDataToDOM);

    button.addEventListener('click', () => {
        getQuoteFromApi(setDataToDOM);
    });

    translateButton.addEventListener('click', () => {
        var quoteText = quote.innerHTML;
        var authorText = author.innerHTML;
        translateText(quoteText, setTranslatedText, translatedQuote);
        translateText(authorText, setTranslatedText, translatedAuthor);
    });
});
