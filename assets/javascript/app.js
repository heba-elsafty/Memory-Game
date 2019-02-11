// click on a card to  display the card image
// cards array holds all cards
const card = document.getElementsByClassName('card');
const cards = [...card];

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

shuffleArray(images);

let openedImage = null;
let openedCard = null;
let failedNum = 0;



// function reset(){
//   openedImage = null;
//   openedCard = null;
//
// }

//moves
let movesNum = 0;
let counter = document.querySelector(".moves-num");
// function moveCounter(num){
//   let moveHTML = document.getElementsByClassName('moves-num');
//   movesnum++;
// }



// Score
let scoreRateNum = 5;
function drawStars(rateNum){
  const rateHtml = document.getElementById('rate');
  rateHtml.innerHTML = "";
  for(let i = 0; i < rateNum;i++){
    rateHtml.innerHTML += '<i  class="far fa-star"></i>';
  }
}
drawStars(scoreRateNum); //on start draw 5 stars

for (let i = 0 ; i < cards.length ; i++){
  cards[i].addEventListener('click', function (e) { //on click
    if (!cards[i].classList.contains('open')){ //if box is Unlock
      // Moves
      function movesCounter(){
        movesNum ++;
        if(movesNum >= 1){
          counter.innerHTML = movesNum
        }
      }
      movesCounter();

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

// ShuffleImages
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}




//
// else{ //Lock the box
//     cards[i].innerHTML = '<div class="back-card"></div>';
// }


const stars = document.querySelectorAll(".fa-star");
