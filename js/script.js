$(document).ready(function() {
 


  $('.section-selector').change(function () {

    

    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
      'api-key': "d4dad082902b43c791328b91dbc82d5a"
    });

    $.ajax({
        url: url,
        method: 'GET', 
      })
      .done(function (data) {
        
        
        //console.log(data.results);

        $('.news').remove();
        
        var articles = '';


        $.each(data.results, function (key, value) {
          
          if (value.multimedia.length) {

            console.log(value.multimedia[4].url);

            articles += '<div class="news">';
            articles += '<img src="' + value.multimedia[4].url + '"/>';
            articles += '</div>';

          } 
          else {
            console.log('no images found');
          }
        });

        $('.articles').append(articles);

      }).fail(function (err) {
        throw err;
      });

  });

});