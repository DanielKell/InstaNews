$(document).ready(function () {

  $('.section-selector').change(function () {

    var input = $('#selection').val();

    var url = "https://api.nytimes.com/svc/topstories/v2/" + input + ".json";
    url += '?' + $.param({
      'api-key': "d4dad082902b43c791328b91dbc82d5a"
    });

    $(".main-header").addClass('article-header')

    $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function (data) {

        $(".loader").show();
        $(".articles").hide();

        $('.news').remove();

        var articles = '';

        var articlesWithImages = data.results.filter(function (article) {
          return article.multimedia.length // this is returning something true/false // if the answer is 0 it equals to false // 1+ = true
        }).slice(0, 12); // the slice is 

        // console.log(data);

        $.each(articlesWithImages, function (key, value) {

          articles += '<div class="news">';
          articles += '<a href="' + value.url + '" class="news-anchor"  target="_blank">' + '<img src="' + value.multimedia[4].url + '" id="news-img"/>' + '</a>';
          articles += '<p class="abstract">' + value.abstract + '</p>'
          articles += '</div>';

        });

        $('.articles').append(articles);

        $(".loader").hide(2000);
        $(".articles").show();

      })
      .fail(function (err) {
        throw err;
      });

    // $(".articles").hover(function () {
    //   $(".news").children('.abstract').fadeIn(1000);
    // }, function () {
    //   $(".news").children(".abstract").fadeOut(1000);
    // });

  });

});