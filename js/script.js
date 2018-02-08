(function() {
    var newGameBtn = document.getElementById('js-newGameButton');
    newGameBtn.addEventListener('click', newGame);
    var pickRock = document.getElementById('js-playerPick_rock'),
        pickPaper = document.getElementById('js-playerPick_paper'),
        pickScissors = document.getElementById('js-playerPick_scissors');
    pickRock.addEventListener('click', function() { playerPick('rock'); });
    pickPaper.addEventListener('click', function() { playerPick('paper'); });
    pickScissors.addEventListener('click', function() { playerPick('scissors'); });
    var gameState = 'notStarted',  //started // ended
        player = {
            name: '',
            score: 0
        },
        computer = {
            score: 0
        };
    var newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement');
    function setGameElements() {
      switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
          break;
        case 'ended':
              newGameBtn.innerText = 'Jeszcze raz';
              playerPickElem.innerText = 'Player selection';
              computerPickElem.innerText = 'Computer seletion';
              playerResultElem.innerText = '';
              computerResultElem.innerText = '';
              playerPointsElem.style.backgroundColor = computerPointsElem.style.backgroundColor = '#777';
              /* falls through */
        case 'notStarted':/* falls through */
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
              break;
      }
    }
    setGameElements();
    var playerPointsElem = document.getElementById('js-playerPoints'),
        playerNameElem = document.getElementById('js-playerName'),
        computerPointsElem = document.getElementById('js-computerPoints');
    function newGame() {
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();
            playerNameElem.innerHTML = player.name;
            setGamePoints();
      }
    }
    function playerPick(playerPick) {
        var computerPick = getComputerPick();
        playerPickElem.innerHTML = playerPick;
        computerPickElem.innerHTML = computerPick;
        checkRoundWinner(playerPick, computerPick);
    }
    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random()*3)];
    }
    var playerPickElem = document.getElementById('js-playerPick'),
        computerPickElem = document.getElementById('js-computerPick'),
        playerResultElem = document.getElementById('js-playerResult'),
        computerResultElem = document.getElementById('js-computerResult');
    function checkRoundWinner(playerPick, computerPick) {
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';
        var winnerIs = 'player';
        if (playerPick === computerPick) {
            winnerIs = 'noone'; // remis
            playerPointsElem.style.backgroundColor = '#777';
            computerPointsElem.style.backgroundColor = '#777';
        } else if (
            (computerPick === 'rock' &&  playerPick === 'scissors') ||
            (computerPick === 'scissors' &&  playerPick === 'paper') ||
            (computerPick === 'paper' &&  playerPick === 'rock')) {
            winnerIs = 'computer';
            playerPointsElem.style.backgroundColor = 'red';
            computerPointsElem.style.backgroundColor = 'green';
        }
        if (winnerIs === 'player') {
            playerResultElem.innerHTML = "Win!";
            playerPointsElem.style.backgroundColor = 'green';
            computerPointsElem.style.backgroundColor = 'red';
            player.score++;
        console.log('Player ' + player.score);
        } else if (winnerIs === 'computer') {
            computerResultElem.innerHTML = "Win!";
            computer.score++;
        console.log('Computer ' + computer.score);
        }
        setGamePoints();
        endGame();
    }
    function setGamePoints() {
        playerPointsElem.innerHTML = player.score;
        computerPointsElem.innerHTML = computer.score;
    }
    function endGame() {
        if (player.score === 10) {
            gameState = 'ended';
            setGameElements();
            alert('You won ' + player.name + '!!!!!!');
        } else if (computer.score === 10){
            gameState = 'ended';
            setGameElements();
            alert('You lose ' + player.name + ' \:\(');
        }
    }
})();