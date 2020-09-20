var cardWidth = 4;
var cardHeight = 3;
var cardColor = [];
var cardColors = [
  '#A5736A', // brown
  '#A5736A',
  '#FECD56', // yellow
  '#FECD56',
  '#50869B', // blue
  '#50869B',
  '#698D5D', // green
  '#698D5D',
  '#E14B56', // pink
  '#E14B56',
  '#F8A255', // orange
  '#F8A255',
];
var cardColorset = cardColors.slice();
var clickFlag = true;
var clickedCard = [];
var matchedCard = [];
var gameStart;
function shuffle() {
  for (var i = 0; cardColorset.length > 0; i += 1) {
    cardColor = cardColor.concat(
      cardColorset.splice(Math.floor(Math.random() * cardColorset.length), 1)
    );
  }
}

function cardSet(cardWidth, cardHeight) {
  clickFlag = false;
  for (var i = 0; i < cardWidth * cardHeight; i += 1) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = cardColor[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener('click', function () {
        if (clickFlag && !matchedCard.includes(c)) {
          c.classList.toggle('flipped');
          clickedCard.push(c);
          if (clickedCard.length === 2) {
            if (
              clickedCard[0].querySelector('.card-back').style
                .backgroundColor ===
              clickedCard[1].querySelector('.card-back').style.backgroundColor
            ) {
              matchedCard.push(clickedCard[0]);
              matchedCard.push(clickedCard[1]);
              clickedCard = [];
              if (matchedCard.length === 12) {
                var gameFinish = new Date();
                alert(
                  `Congratulations👏 Time record: ${parseInt(
                    (gameFinish - gameStart) / 1000
                  )} seconds`
                );
                document.querySelector('#gameTable').innerHTML = '';
                cardColorset = cardColors.slice();
                cardColor = [];
                matchedCard = [];
                gameStart = null;
                shuffle();
                cardSet(cardWidth, cardHeight);
              }
            } else {
              clickFlag = false;
              setTimeout(function () {
                clickedCard[0].classList.remove('flipped');
                clickedCard[1].classList.remove('flipped');
                clickFlag = true;
                clickedCard = [];
              }, 1000);
            }
          }
        }
      });
    })(card); // 즉시 실행 함수를 c라는 함수로 감싸면 새로운 function 스코프가 생김.
    // card가 c로 복사가 됨. 클로저 문제 해결.
    // var gameTable = document.getElementById('gameTable');
    // gameTable.appendChild(card);
    //document.body.appendChild(card); // 한번 더 div 감싸서 가로 고정
    document.querySelector('#gameTable').appendChild(card);
  }
  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function () {
    document.querySelectorAll('.card').forEach(function (card, index) {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    gameStart = new Date();
  }, 5000);
}

shuffle();
cardSet(cardWidth, cardHeight);
