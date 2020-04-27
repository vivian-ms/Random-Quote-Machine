var quotes = [];

$(function() {
  getQuotes();
});

function getQuotes() {
  axios.get('https://type.fit/api/quotes')
    .then(res => {
      // Get first 100 qutoes
      quotes = res.data.slice(0, 100);
    });
}
