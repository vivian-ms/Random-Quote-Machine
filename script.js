var quotes = [];

$(function() {
  getQuotes();

  $(window).on('resize', adjustStyle);

  $('#new-quote').on('click', getRandomQuote);
});


function adjustStyle() {
  let title_height = $('h1').outerHeight();
  let quote_height = $('#quote-box').outerHeight(true);

  // Vertically center quote box
  $('.container').css('min-height', `${title_height * 2 + quote_height}px`);

  // Set height of background image to height of page
  $('img').css('height', $('.container').outerHeight(true));
}


function getQuotes() {
  axios.get('https://type.fit/api/quotes')
    .then(res => {
      // Get first 100 quotes
      quotes = res.data.slice(0, 100);
      getRandomQuote();
    });
}


function getRandomQuote() {
  let i = Math.floor(Math.random() * quotes.length);
  displayQuote(quotes[i]);
}


function displayQuote(quote) {
  let author = quote.author ?? 'Unknown';

  if (!$('#author').text()) {
    $('#text').html(`<i class="fa fa-quote-left"></i> ${quote.text} <i class="fa fa-quote-right"></i>`);
    $('#author').text(author)
  } else {
    $('#quote-box').fadeOut(() => {
      $('#text').html(`<i class="fa fa-quote-left"></i> ${quote.text} <i class="fa fa-quote-right"></i>`);
      $('#author').text(author);
      $('#quote-box').fadeIn();
    });
  }

  let url = encodeURIComponent(`"${quote.text}" ${quote.author}`);
  $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?text=${url}`);

  adjustStyle();
}
