let countervar;
let counter;
$(function() {
  // --- our code goes here ---
  console.log("document ready!");
  
  var tweetform = document.querySelector("#tweetform-actual");
// var tweetform = $(`#tweetform`).
  // tweetform.addEventListener('click', eventHandler);
  // tweetform.addEventListener('change', eventHandler);
  
  // tweetform.addEventListener('keypress', eventHandler);
  tweetform.addEventListener('input', eventHandler);

});

function eventHandler(event) {
  
  
  // alert(`${event.target.localName} was ${event.type}ed`);
  console.log(this);
  console.log(this.value);
  var value = $(this).val();
  console.log(countervar - value.length);
  // counter = $(this).next().next();
  counter = $(this).siblings(".counter");
  // counter.css( "innerText", "test" );
  countervar = 140 - value.length;
  if (countervar < 0) {
    counter.css('color', 'red');
  } else {
    counter.css('color', 'black');
  }
  counter[0].innerText = countervar;

  console.log(counter);
  
}

// var tweetform = document.querySelector("#tweetform-actual");
// // var tweetform = $(`#tweetform`).
// tweetform.addEventListener('click', eventHandler);

// $(function() {
// callback function on DOM ready event
// });