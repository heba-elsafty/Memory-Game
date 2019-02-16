/*################
GLOPAL VARIABLE
################
*/
let openedImage = null;
let openedCard = null;
let failedNum = 0;
// click on a card to  display the card image
// cards array holds all cards
let deck = document.querySelector(".deck");
let card = document.getElementsByClassName('card');
let cards = [...card];

// CLOSEBUTTON
let closeButton = document.getElementById("close-button");
closeButton.addEventListener('click' , closeModal );



/*################
ShuffleImages
################
*/
//Image Array
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


/* ################
GAME MOVES
################
*/
let moves = 0;
let counter = document.querySelector("#moves");
counter.innerHTML = "<span class=\"moves-num\">" + moves + "</span>moves</span>";
function movesCounter(){
  moves ++;
  counter.innerHTML = "<span class=\"moves-num\">" + moves + "</span>moves</span>";
}



/*################
GAME RATE
################
*/
let scoreRateNum = 5;
const rateHtml = document.getElementById('rate');
function drawStars(rateNum){
  rateHtml.innerHTML = "";
  for(let i = 0; i < rateNum;i++){
    rateHtml.innerHTML += '<i  class="far fa-star"></i>';
  }
}
drawStars(scoreRateNum); //on start draw 5 stars

/*################
GAME TIMER
################
*/
function getTimerContent(){
  return "<div class=\"minutes\"> \
  <div class=\"numbers\">" + minutes+ "</div>min</div> \
  <div class=\"seconds\"> \
  <div class=\"numbers\">" + seconds + "</div>sec</div> \
  </div>";
}

let seconds = 0 , minutes = 0;
let timer = document.querySelector('#timer');
timer.innerHTML = getTimerContent();
let interval = null ;
function satartTimer(){
  if(interval != null){
    return;
  }
  interval = setInterval(function () {
    timer.innerHTML = getTimerContent();
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

function stopTimer(){
  clearInterval(interval);
  interval = null;
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
  seconds = 0 ;
  minutes = 0 ;
  timer.innerHTML = getTimerContent();
  stopTimer();

  // Reset Rating
  scoreRateNum =5;
  failedNum = 0;
  drawStars(scoreRateNum);

  // Reset CARD
  openedImage = null;
  openedCard = null;
  deck = shuffleArray(images);
  for (let i = 0 ; i < cards.length ; i++){
    cards[i].classList.remove('open', 'card-is-flipped','matched');
    cards[i].innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>';
  }
}


/*
################
Start Game
################
*/
function startGame(){
  for (let i = 0 ; i < cards.length ; i++){
    cards[i].addEventListener('click', function (e) { //on click
      if (!cards[i].classList.contains('open')){ //if box is Unlock
        satartTimer();
        // CARD GAME MATCH AND UNMATCH
        cards[i].classList.add('open','card-is-flipped');
        cards[i].classList.remove('unmatched');
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
            let audio = new Audio('assets/audio/yahoo.wav');
            audio.play();
            congrast();
            movesCounter();
          } else{
            let tempFirstCard = openedCard;
            setTimeout(function(){ //reset cards
              cards[i].innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>'; //reset current box
              tempFirstCard.innerHTML = '<div class="back-card"><img src="assets/images/memory-logo.png"></div>';
              tempFirstCard.classList.remove('open','card-is-flipped');
              cards[i].classList.remove('open','card-is-flipped');
            },500)

            let audio = new Audio('assets/audio/icq-uh-oh.mp3');
            audio.play();
            movesCounter();
            failedNum ++ ;
            if(failedNum == 3){
              failedNum = 0;
              if (scoreRateNum > 1 ){
                scoreRateNum -= 1;
                drawStars(scoreRateNum);
              }
            }
          }
          openedImage = null;
        }
      }

    }); //EOF  on Click

  }
}
startGame();
/*
################
CONGTRATION POPUP
################
*/

function congrast(){
  let cardMatched = document.getElementsByClassName("matched");
  if(cardMatched.length == 16){
    stopTimer();
    let modal = document.getElementById('congrast-modal');
    modal.classList.add("show-modal");
    let audio = new Audio('assets/audio/fireworks.wav');
    audio.play();
    setTimeout(function(){
      let audio = new Audio('assets/audio/winner.wav');
      audio.play();
    },2000);
    // PRINT TIMER
    document.getElementById('f-timer').innerHTML = getTimerContent();

    // PRINT moves
    document.getElementById('f-moves').innerHTML = counter.innerHTML;

    // PRINT RATE
    document.getElementById('f-rate').innerHTML =   rateHtml.innerHTML + ' <span class="text-primary">Stars</span>';

  }
}

function closeModal(){
  let modal = document.getElementById('congrast-modal');
  modal.classList.remove("show-modal");
}

document.getElementById('play-again').addEventListener('click' , function(){
  closeModal();
  restartBtnGame();
})
