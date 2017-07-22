$(document).ready(function () {


  $('.section-selector').change(function () {

    var input = $('#selection').val();

    var url = "https://api.nytimes.com/svc/topstories/v2/" + input + ".json";
    url += '?' + $.param({
      'api-key': "d4dad082902b43c791328b91dbc82d5a"
    });

    $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function (data) {

        $('.news').remove();

        var articles = '';

        var articlesWithImages = data.results.filter(function (article) {
          return article.multimedia.length
        }).slice(0, 12);    

        console.log(data);

        $.each(articlesWithImages, function (key, value) {

          articles += '<div class="news">';
          articles += '<a href="' + value.url + '" target="_blank">' + '<img src="' + value.multimedia[1].url + '"/>' + '</a>';
          articles += '<p>' + value.abstract + '</p>'
          articles += '</div>';


        });


        $('.articles').append(articles);
      })
      .fail(function (err) {
        throw err;
      });


  });

});