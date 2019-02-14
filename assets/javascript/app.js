// click on a card to  display the card image
// cards array holds all cards
let deck = document.querySelector(".deck");
let card = document.getElementsByClassName('card');
let cards = [...card];

//Image
const images = [
  'assets/images/cat.jpg' ,
  'assets/images/cow.jpg',
  'assets/images/forg.jpg',
  'assets/images/giraffe.jpg',
  'assets/images/hourse.jpg',
  'assets/images/monkey.jpg',
  'assets/images/monkey02.jpg',
  'assets/images/tiger.jpg',
  'assets/images/cat.jpg' ,
  'assets/images/cow.jpg',
  'assets/images/forg.jpg',
  'assets/images/giraffe.jpg',
  'assets/images/hourse.jpg',
  'assets/images/monkey.jpg',
  'assets/images/monkey02.jpg',
  'assets/images/tiger.jpg',
]

// ShuffleImages
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
shuffleArray(images);

// Global variable
let openedImage = null;
let openedCard = null;
let failedNum = 0;


//Game Moves
let moves = 0;
let counter = document.querySelector("#moves");


//GAME Rate
let scoreRateNum = 5;
function drawStars(rateNum){
  const rateHtml = document.getElementById('rate');
  rateHtml.innerHTML = "";
  for(let i = 0; i < rateNum;i++){
    rateHtml.innerHTML += '<i  class="far fa-star"></i>';
  }
}
drawStars(scoreRateNum); //on start draw 5 stars

// Game Timer
let seconds = 0 , minutes = 0;
let timer = document.querySelector('#timer');
let interval ;
function satartTimer(){
  interval = setInterval(function () {
    timer.innerHTML = "<div class=\"minutes\"> \
    <div class=\"numbers\">" + minutes + "</div>min</div> \
    <div class=\"seconds\"> \
    <div class=\"numbers\">" + seconds + "</div>sec</div> \
    </div>";
    ;
    seconds++;
    if(seconds == 60){
      minutes++;
      seconds = 0 ;
    }
    if(minutes == 60){
      hours++;
      minutes = 0
    }
  }, 1000);
}

/*
################
RESTART BUTTON
################
*/
let reset = document.querySelector("#restart");
reset.addEventListener('click', function(){
  restartBtnGame();
});


function restartBtnGame(){
  // Reset MOVES
  moves = 0;
  counter.innerHTML = "<span class=\"moves-num\">" + moves + "</span>moves</span>";

  // Reset TIMER
  timer.innerHTML = "<div class=\"minutes\"> \
  <div class=\"numbers\">" + 0 + "</div>min</div> \
  <div class=\"seconds\"> \
  <div class=\"numbers\">" + 0 + "</div>sec</div> \
  </div>";
  clearInterval(interval);

  // Reset Rating
  drawStars(5); //on start draw 5 stars

  // Reset CARD

  function resetCardtGame(){
    deck = shuffleArray(images);
    for (let i = 0 ; i < cards.length ; i++){
      cards[i].classList.remove('open', 'card-is-flipped','matched');
      cards[i].innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>';
    }
  }
  resetCardtGame();
}


// for (let i = 0 ; i < cards.length ; i++){
//   cards[i].classList.remove('open', 'card-is-flipped','matched');
//   cards[i].innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>';
// }

/*
################
Start Game
################
*/
function startGame(){
  for (let i = 0 ; i < cards.length ; i++){
    cards[i].addEventListener('click', function (e) { //on click
      if (!cards[i].classList.contains('open')){ //if box is Unlock
        /*
        ################
        MOVES AND TIMER
        ################
        */
        function movesCounter(){
          moves ++;
          counter.innerHTML = "<span class=\"moves-num\">" + moves + "</span>moves</span>";
          if(moves == 1){
            secondss = 0;
            minutes = 0;
            hours = 0;
            satartTimer();
          }
        }
        movesCounter();

        /*
        ################
        CARD GAME MATCH AND UNMATCH
        ################
        */
        cards[i].classList.add('open','card-is-flipped');
        cards[i].innerHTML = '<div class="front-card"><img src="' + images[i] +'" /></div>';
        if(openedImage  == null ){ //this is first card
          openedImage =  images[i];
          openedCard = cards[i];
        } else { //second click on another image
          if(openedImage == images[i] ){ // matched images
            // score changed
            //add class mached
            cards[i].classList.add('matched');
            openedCard.classList.add('matched');

          } else{
            let tempFirstCard = openedCard;
            setTimeout(function(){ //reset cards
              cards[i].innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>'; //reset current box
              tempFirstCard.innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>';
              tempFirstCard.classList.remove('open','card-is-flipped');
              cards[i].classList.remove('open','card-is-flipped');
            },500)
            var audio = new Audio('assets/audio/NFF-wrong-move.wav');
            audio.play();
            failedNum ++ ;
            if(failedNum == 3){
              failedNum = 0;
              if (scoreRateNum > 1 ){
                scoreRateNum -= 1;
                drawStars(scoreRateNum);
              }
            }
            //add class notmatched
          }
          openedImage = null;
        }

      }

    }); //EOF  on Click
  }
}
startGame();
