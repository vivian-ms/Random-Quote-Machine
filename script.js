var quotes = [];

$(function() {
  getQuotes();

  $('#new-quote').on('click', getRandomQuote);
});

function getQuotes() {
  axios.get('https://type.fit/api/quotes')
    .then(res => {
      // Get first 100 qutoes
      quotes = res.data.slice(0, 100);
      getRandomQuote();
    });
}

function getRandomQuote() {
  let i = Math.floor(Math.random() * quotes.length);
  displayQuote(quotes[i]);
}

function displayQuote(quote) {
  $('#text').text(`"${quote.text}"`);
  $('#author').text(quote.author);
}
