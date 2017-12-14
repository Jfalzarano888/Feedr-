let diggResults;
let diggRoot = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
let mashableResults;
let mashableRoot = "https://newsapi.org/v1/articles?source=mashable&sortBy=top&apiKey=715a957f5a06407d9d7139686ff6de09";
let usaTodayResults;
let usaTodayRoot = "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=715a957f5a06407d9d7139686ff6de09";
let ratings;
let domElement;
let diggNewsExpanded = [];
let usaTodayExpanded = [];
let mashableExpanded = [];
//console.log(mashableExpanded);
// On load, I have the digg information called.

$(window).load(function() {
    console.log(diggNewsExpanded.length);
    $("#S1").append('<a href="#"> USA Today </a>');
    $("#S2").append('<a href="#"> Mashable </a>');
    $("#S3").append('<a href="#">Digg</a>');
    displayDiggNews(diggRoot);
    const $modal = $("#popUp");
    const $modalClose = $modal.children(".closePopUp");
    $("#main").click(function(e){
        $modal.removeClass("loader hidden");
    });
      $modalClose.click(function(){
      $modal.addClass("loader hidden");
    });
});

  //these functions store data inside an array (from the News API) that allows me to call specific data from these APIs

  function storeDiggData(url) {
    $.get(url, function(results){
      results.data.feed.forEach(function(diggFeed) {
      diggNewsExpanded.push(diggFeed.content.title_alt);
      });
    });
  }

  function storeMashableData(url) {
    $.get(url, function(results){
      results.articles.forEach(function(mashArticles) {
      mashableExpanded.push(mashArticles.title);
      });
    });
  }


  function storeUsaTodayData(url) {
    $.get(url, function(results) {
       usaTodayResults = "";
       results.articles.forEach(function (usaArticles){
       usaTodayExpanded.push(usaArticles.title);
       });
     });
  }

  // every time you print an item, attach a unique attribute that represents the array index of that article's data.
  // then when clicking on article, look up the data inside the array based on the ID attribute.
  // 1. find how to get parent article of whatever I click.
  // 2. search how to get the unique value of the attribute.
  // 3. how to block link behavior in Jquery.
  // These functions below dynamically populate the HTML with data from the news APIs

  function displayDiggNews(url) {
    $.get(url, function(results){
         diggResults = "";
         results.data.feed.sort(function(a, b){
             // a - b asc, b - a desc
             return b.digg_score - a.digg_score;
         }).forEach(function(diggFeed, i) {
         diggNewsExpanded.push(diggFeed.content.title_alt);
         diggResults +=
         ` <article key="${i}" feed="digg" class="article">
             <section class="featuredImage">
               <img id="image" src="${diggFeed.content.media.images[0].url}" alt="" />
             </section>
           <section class="articleContent">
               <a href="${diggFeed.content.original_url}"><h3>${diggFeed.content.title_alt}</h3></a>
               <h6>${diggFeed.content.description}</h6>
           </section>
           <section class="impressions">
                ${diggFeed.digg_score}
           </section>
           <div class="clearfix"></div>
         </article>
           `
       });
       $("#main").append(diggResults);
       $("#NewsFeedType").append("<span> Digg News Feed </span>");
     });
  }

  function displayMashableNews (url) {
    $.get(url, function(results){
       mashableResults = "";
       results.articles.forEach(function(mashArticles, i) {
         mashableExpanded.push(mashArticles.title);
         mashableResults +=
           ` <article key="${i}" feed="mashable" class="article">
               <section class="featuredImage">
                  <img  id="image" src="${mashArticles.urlToImage}" alt="" />
                  </section>
               <section class="articleContent">
                  <a href="${mashArticles.url}"><h3>${mashArticles.title}</h3></a>
                  <h6>${mashArticles.description}</h6>
              </section>
              <section class="impressions">

              </section>
                 <div class="clearfix"></div>
              </article>
            `
       });
       $("#main").append(mashableResults);
       $("#NewsFeedType").append("<span> Mashable News Feed </span>");
       //$('.impressions').append(ratings);
    });
  }
    // belongs for onclick event -- $('#main').empty() -- to empty the previous appendings
    // make a function for each source (1 for mashable, 1 for digg, 1 for some other news shit)

   function displayUsaTodayNews(url) {
     $.get(url, function(results) {
        usaTodayResults = "";
        results.articles.forEach(function (usaArticles, i){
          usaTodayExpanded.push(usaArticles.title);
          usaTodayResults +=
          `  <article key="${i}" feed="usaToday" class="article">
                <section class="featuredImage">
                    <img id="image" src="${usaArticles.urlToImage}" alt="" />
                </section>
                <section class="articleContent">
                    <a href="${usaArticles.url}"><h3>${usaArticles.title}</h3></a>
                    <h6>${usaArticles.description}</h6>
                </section>
                <section class="impressions">
                      Score N/A
                </section>
              <div class="clearfix"></div>
            </article>
            `
        });
        $('#main').append(usaTodayResults);
        $("#NewsFeedType").append("<span>USA Today News Feed </span>");
     });
   }



   // $('#main').delegate("#image", "mouseenter",  function() {
   //      $(this).after('<div class="featuredImage"> </div>');
   // });
   // $('#main').delegate("#image", "mouseleave",  function() {
   //      $("div").empty();
   //      //$(this).after("<p id ='fuck'> fuck this course </p>");
   // });


// Here are some click functions that allow me to wipe and dynamically add new content to the front page depending on the news site you want to see.

  $("#S1").click(function() {
    $('#main').empty();
    $('#NewsFeedType').empty();
    displayUsaTodayNews(usaTodayRoot);
  });

  $("#S2").click(function() {
    $('#main').empty();
    $('#NewsFeedType').empty();
    displayMashableNews(mashableRoot);
  });

  $("#S3").click(function() {
    $('#main').empty();
    $('#NewsFeedType').empty();
    displayDiggNews(diggRoot);
  });
