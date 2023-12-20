var remainingTime = document.getElementById('countdown');
var mainEl = document.getElementById('main');

function countdown() {
    var secondsLeft = 90;
  
    // We need to create a function to make sure our timer works
    var timer = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (secondsLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        remainingTime.textContent = secondsLeft + ' seconds left!';
        // Decrement `timeLeft` by 1
        secondsLeft--;
      } else if (secondsLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        remainingTime.textContent = secondsLeft + 'seconds left!';
        secondsLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        remainingTime.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timer);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000);
  }
  countdown();

  