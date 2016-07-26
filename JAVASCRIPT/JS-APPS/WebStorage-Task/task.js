function solve() {
  var isInitCalled = false;
  var numberDigits = [];
  var attemptNumber = 1;
  var theNumber;
  
  function init(playerName, endCallback) {
    isInitCalled = true;
    generateNumber();
    theNumber = numberDigits.join('');
    $('#name-input').hide();
    $('#the-label').text('Enter your guess number: ').attr('for', 'guess-input').after($('<input />').attr('id', 'guess-input'));
    $('#start-button').text('Guess').unbind().click(function(){
        var guessNumber = $('#guess-input').val();
        if (validateGuessNumber(guessNumber)) {
          $('#guess-input').val('');
          var result = guess(guessNumber);
          if(result.rams === 4){
            saveScore(playerName, attemptNumber);
            endCallback();
          }  
        } else{
          $('#guess-input').val('');
          alert('Please, enter a valid guess number with 4 different digits, first cannot be 0');
      }
    });
  }

  function guess(guessNumber) {
    if (!isInitCalled) {
      throw 'Init must be called first';
    }
    console.log('Attempt ' + attemptNumber);
    attemptNumber += 1;
    console.log(guessNumber + ' --> rams: ' + showGuessResult(guessNumber).rams + '; sheep: ' + showGuessResult(guessNumber).sheep);
    return showGuessResult(guessNumber);
  }

  function getHighScore(count) {
    return JSON.parse(localStorage.getItem('TheSheepGame')).slice(0, count);
  }
  
  function validateGuessNumber(numberToValidate){
    if (isNaN(numberToValidate) 
        || numberToValidate*1 < 1000 
        || numberToValidate*1 > 9999 
        || (numberToValidate*1 !== ((numberToValidate*1)|0))) {
      return false;
    }
    
    for(var i = 0, len = numberToValidate.length; i < len; i += 1){
      for(var j = i + 1; j < len; j += 1){
        if(numberToValidate[j] === numberToValidate[i]){
          return false;
        }
      }
    }
    
    return true;    
  }
  
  function generateNumber(){
    numberDigits.push(Math.floor(Math.random()*9) + 1);
    while(numberDigits.length < 4){
      var nextNumber = Math.floor(Math.random()*10);
      if (numberDigits.every(function(item){
        return item !== nextNumber;
      })) {
        numberDigits.push(nextNumber);
      }
    }
  }
  
  function showGuessResult(guessNumber){
    var rams = 0,
        sheep = 0,
        i,
        j,
        len;
    for (i = 0, len = theNumber.length; i < len; i+=1) {
      for (j = 0; j < len; j+=1) {
        if(theNumber[i] === guessNumber[j]){
          if (i === j) {
            rams+=1;
            break;
          } else{
            sheep+=1;
            break;
          }
        }        
      }
    }
    return {
      sheep: sheep,
      rams: rams
    };
  }
  
  function saveScore(name, score) {
        var playerScore = [],
            localStorageEntries;

        playerScore.push({
            name: name,
            score: score
        });

        if (localStorage.TheSheepGame === undefined) {
            localStorage.setItem('TheSheepGame', JSON.stringify(playerScore));
        } else {
            localStorageEntries = JSON.parse(localStorage.getItem('TheSheepGame'));
            localStorageEntries.push({
                name: name,
                score: score
            });
            localStorageEntries.sort(function(x, y){
              return y.score - x.score;
            });
            localStorage.setItem('TheSheepGame', JSON.stringify(localStorageEntries));
        }
    }

  return {
    init, guess, getHighScore
  };
}

var game = solve();

$('#start-button').click(function(){
  var playerName = $('#name-input').val();
  if (playerName && playerName.length > 0) {
    game.init(playerName, endGame);    
  } else{
    alert('Please, enter your name to start');
  }
});

function endGame(){
  console.log('Congratulations!');
  console.log('Top 5:');
  var topFive = game.getHighScore(5);

  for(var i = 0, len = topFive.length; i < len; i += 1){
    console.log(topFive[i].name + ': ' + topFive[i].score);
  }
  
  var startOver = confirm('Play again?');
  if (startOver) {
    this.location.reload();
  } else {
    window.close();
  }
}

// module.exports = solve;