/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, lastScore;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

var score0 = document.getElementById('score-0');
var score1 = document.getElementById('score-1');
var curr0 = document.getElementById('current-0');
var curr1 = document.getElementById('current-1');

var diceDOM = document.querySelector('.dice');

score0.textContent = '0';
score1.textContent = '0';
curr0.textContent = '0';
curr1.textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
   
    var dice = Math.floor(Math.random()*6) + 1;
    console.log(dice);
    diceDOM.style.display='block';
    diceDOM.src = 'dice-' + dice + '.png';

    if((dice !== 1) && !(dice === 6 && lastScore === 6 )){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
        if(dice === 6 && lastScore === 6){
            scores[activePlayer]=0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        }
        nextPlayer();        
    }
    lastScore = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer]>=20){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        diceDOM.style.display = 'none';

    }
    else{
        nextPlayer();
    }
});

function nextPlayer (){
    activePlayer = activePlayer === 0 ? 1 : 0;
        roundScore = 0;

        curr0.textContent = '0';
        curr1.textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}