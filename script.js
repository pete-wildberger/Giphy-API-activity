console.log('It works!');

$(onReady);


function onReady() {
  //listeners
  $('#searchBtn').on('click', clickSearch);

  $('form').on('submit', clickSearch);

  // end of on click
  $('#supercontain').on('click', '.rmvBtn', function(){
    $(this).parent().remove();
  });
  $('.container').on('click', '.favBtn', function(){
    $(this).parent().appendTo('.favorites');
    $(this).remove();

  });

 // end of onReady
function clickSearch(e){
  e.preventDefault();
  console.log('click');
    if($('#userInput').val() === '' || $('#userInput').val() === undefined){
      alert('OhmyGawd!');
    } else {
      var searchURL = 'http://api.giphy.com/v1/gifs/search?q=';
      searchURL += $('#userInput').val();
      searchURL += '&api_key=dc6zaTOxFJmzC';

      $.ajax({
        url: searchURL,
        type: 'GET',
        success: function (response) {
          if(response.data.length === 0){
            $('.container').append('<div><p>Whoopsies</p><img src= https://media.giphy.com/media/80TEu4wOBdPLG/giphy.gif?response_id=5925e85668c66efd24a18672><button class="rmvBtn">Remove</button></div>');
            $('#userInput').val('');
          } else {
          console.log(response);
          var searchResult = response.data[0].images.downsized.url;
          var imgDiv = '<div class="squares">';
          imgDiv += '<img src="' + searchResult + '">';
          imgDiv += '<button class="rmvBtn">Remove</button>';
          imgDiv += '<button class="favBtn">Favorites</button>';
          imgDiv += '</div>';

          $('#userInput').val('');

          $('.container').append(imgDiv);
        }
        },
      }); // end ajax
    } // end of else
  }
}
