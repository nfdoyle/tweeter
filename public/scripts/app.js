/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweets = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwi{ssenheit."
//     },
//     "created_at": 1461113796368
//   }
// ]

$(() => {

  function timeCodeConvert(unixTime){
    let currentTime = Date.now();
    let time = currentTime - unixTime;
    time = time/1000/60/60/24;
    if (time <= 1){
      return `Today`
    }else if (time < 2){
      return `1 day ago`
    } else {
      let result = Math.floor(time) + " days ago"
      return result
    } 
  }

  function createTweetElement(tweet){
    //do biz
    console.log(`tweet object`);
    console.log(tweet);
    const article = $('<article>').addClass("tweet");
    const header = $('<header>').appendTo(article);
    const avatar = $('<img>').addClass("logo").attr('src', `${tweet.user.avatars.small}`).attr('width', '50px').attr('height', '50px').appendTo(header);
    const p1 = $('<p>').text(tweet.user.handle).addClass("handle").appendTo(header);
    const h2 = $('<h2>').text(tweet.user.name).appendTo(header);
    const div = $('<div>').appendTo(article);
    const p2 = $('<p>').text(tweet.content.text).appendTo(div);
    const footer = $('<footer>').addClass("timecode").appendTo(article);
    const p3 = $('<p>').text(timeCodeConvert(tweet.created_at)).appendTo(footer);
    const report = $('<i>').addClass(`fas fa-flag`).addClass(`tweet-btn`).addClass(`report-btn`).appendTo(footer);
    const retweet = $('<i>').addClass(`fas fa-retweet`).addClass(`tweet-btn`).addClass(`retweet-btn`).appendTo(footer);
    const like = $('<i>').addClass(`fas fa-heart tweet-btn like-btn`).data( "liked", false ).appendTo(footer);
    const likeCount = $('<h3>').text(tweet.likes).data("t-id", tweet.tuid).addClass(`like-count`).appendTo(footer);
    return article
  }

  function renderTweets(tweets){
    tweets.forEach(function(tweet){
      var $tweet = createTweetElement(tweet);

      // Test / driver code (temporary)
      console.log($tweet); // to see what it looks like
      $('#tweet-section').prepend($tweet);
    });
    $(".like-btn").click(function(){
      let likeButton = $(this);
      let current;
      if (likeButton.data( "liked" ) == false){
        // post liked
        likeButton.data("liked", true);
        likeButton.css('color', 'firebrick');
        let likeCounter = likeButton.siblings(`.like-count`);
        likeCounter.slideToggle(`slow`, function(){
          current = Number(likeCounter[0].innerText);
          current += 1;  
          likeCounter[0].innerHTML = current;  
          likeCounter.slideToggle(`slow`);        
        });
        // ajax like put
        $.ajax({
          method: "PUT",
          url: "/like"
        })
        
        console.log(likeCounter);
      } else {
        // post unliked
        likeButton.data("liked", false);
        likeButton.css('color', '#00a087');
        let likeCounter = likeButton.siblings(`.like-count`);
        likeCounter.slideToggle(`slow`, function(){
          current = Number(likeCounter[0].innerText);
          current -= 1;  
          likeCounter[0].innerHTML = current;  
          likeCounter.slideToggle(`slow`);  
        });
        //ajax unlike put
        $.ajax({
          method: "GET",
          url: "/unlike"
        })

      }
      // console.log(likeButton);
      // console.log(event);
      // alert(`${event.target.localName} was ${event.type}ed`);
    });
  }

  // renderTweets(tweets);

  const allTweets = $('#tweet-section');

  function getAllTweets() {

    $.ajax({
      method: "GET",
      url: "/tweets"
    }).done(function(tweets) {
      allTweets.empty();
      renderTweets(tweets);
    });
  }

  getAllTweets();

  $("#compose").click(function(){
    $(".new-tweet").slideToggle(`slow`);
    $(`#tweetform-actual`).focus();
  });

  

  

  // $(".tweetform").on('submit', function(event) {
  //   // prevent the default behavor
  //   event.preventDefault();
  //   // get the data from the form
  //   // const content = $(this).find('input').val();
  //   // ajax post request
  //   const serialized = $(this).serialize();
  //   console.log(serialized);
  //   $.ajax({
  //     method: "POST",
  //     url: "/tweets",
  //     data: serialized
  //   })


    // .done(function() {
    //   // on success, refresh the creaks on the page
    //   console.log(serialized);
    //   getAllTweets();
    // });

    
  //});

  

  $(".tweetform").on('submit', function(event) {
    console.log(event);
    console.log(event.target.innerText);
    event.preventDefault();
    //target.children[3].innerText
    const serialized = $(this).serialize();
    console.log("tweet: " + serialized);
    
    if (event.target.children[2].innerText == 140 || event.target.children[2].innerText < 0){
      alert(`Invalid tweet. Submissions can range from 0 to 140 characters.`);
      //error
      console.log(event.target.children[2]);
      if (event.target.children[2].innerText == '140'){
        let errorMessage = $(`.error`);
        errorMessage.slideUp(`fast`, function(){
        errorMessage[0].innerHTML = `Can not be 0 characters`;
        });      
       errorMessage.slideDown(`slow`);
      } else {
        let errorMessage = $(`.error`);
        errorMessage.slideUp(`fast`, function(){
        errorMessage[0].innerHTML = `Must be under 140 characters`;
        });      
        errorMessage.slideDown(`slow`);
      }
      
    } else {
      $(`.tweetform`).val("");
      //$(`.counter`).innerText(`140`);
      let errorMessage = $(`.error`);
      errorMessage.slideUp(`slow`);
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serialized
      }).done(function() {
        // on success, refresh the creaks on the page
        getAllTweets();

      });

      getAllTweets();
    }
    getAllTweets();
  });

});


// function createCreakElement1(creak) {
//   return `
//   <article class="creak">
//     <header>
//       <h3>${creak.username}</h3>
//     </header>
//     <main>
//       <p>${creak.content}</p>
//     </main>
//   </article>
//   `;
// }

// function createCreakElement2(creak) {
//   const article = $('<article>').addClass("creak");
//   const header = $('<header>').appendTo(article);
//   const h3 = $('<h3>').text(creak.username).appendTo(header);
//   const main = $('<main>').appendTo(article);
//   const p = $('<p>').text(creak.content).appendTo(main);
//   return article;
// }

/* <article class="tweet">  
                <header>
                    <img class="logo" src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" width="50px" height="50px">
                    <h2>Dan Dangler</h2>
                    <p id="handle">@MrGiggles </p>
                </header>
                <div>
                  <p>Dan Dangler likes Dilly Bars!</p>
                </div>
                <footer id="timecode">
                  <p>10 days ago</p>
                </footer>
              </article>      */