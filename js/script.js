var total = 0;
var continueLoop = true;
var hitMine = false;
var numClicks = 0; //Maybe make first click not a possible instant loss

// Checks if player won
// (all buttons clicked and revealed except the mine buttons)
function checkWin() {
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 8; j++) {
      if ((document.getElementById("btn" + i + j).getAttribute("clicked") == "f") &&
            (document.getElementById("btn" + i + j).value != 0)) {
        console.log("False Detected");
        return false;
      }
    }
  }
  return true;
}

// Updates the board based on defined button behavior
function buttonClick(nameButton) {
  if (continueLoop) {
    name = nameButton;
    document.getElementById(name).setAttribute("clicked", "t");
    if (document.getElementById(name).style.backgroundColor == "red" ||
        document.getElementById(name).style.backgroundColor == "orange" ||
        document.getElementById(name).style.backgroundColor == "lightgreen" ||
        document.getElementById(name).style.backgroundColor == "blue" ||
        document.getElementById(name).style.backgroundColor == "violet") {
      total = parseInt(total) + 0;
    } else {
      total = parseInt(total) + parseInt(document.getElementById(name).value);
      // Checks game over
      if (document.getElementById(name).value == 0) {
        document.getElementById(name).style.backgroundColor = "red";
        document.getElementById("end").style.visibility = 'visible';
        continueLoop = false;
        document.getElementById("reset").style.display = 'inline';
        hitMine = true;
      } else if (document.getElementById(name).value == -3) {
        document.getElementById(name).style.backgroundColor = "orange";
      } else if (document.getElementById(name).value < 0 && document.getElementById(name).value > -3) {
        document.getElementById(name).style.backgroundColor = "lightgreen";
      } else if (document.getElementById(name).value > 0 && document.getElementById(name).value < 3) {
        document.getElementById(name).style.backgroundColor = "blue";
      } else if (document.getElementById(name).value >= 3) {
        document.getElementById(name).style.backgroundColor = "violet";
      }
      document.getElementById(name).style.color = "white";
      // Checking game over
      if (total < 0) {
        console.log("");
        document.getElementById("end").style.visibility = 'visible';
        continueLoop = false;
        document.getElementById("reset").style.display = 'inline';
      } else {
        document.getElementById("myText").innerHTML = total;
      }

      // Checking win
      var win = checkWin();
      var lose = total < 0 || hitMine;
      if (lose) {
        // Reveal lose statement
        document.getElementById("end").innerHTML = 'GAME OVER';
        document.getElementById("end").style.visibility = 'visible';
      } else if (win) {
        // Reveal win statement
        document.getElementById("end").innerHTML = 'YOU WIN';
        document.getElementById("end").style.visibility = 'visible';
      }
    }
  }
}

function startGame() {
  document.getElementById("end").style.visibility = 'hidden';
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 8; j++) {
      document.getElementById("btn" + i + j).value = Math.round(Math.random() * -3) +
                                                        Math.round(Math.random() * 6);
      document.getElementById("btn" + i + j).setAttribute("clicked", "f");
      document.getElementById("btn" + i + j).style.color = "transparent";
    }
  }
  document.getElementById("reset").style.display = 'none';
  document.getElementById("myText").innerHTML = parseInt(total);
}

function buttonClickRestart() {
  continueLoop = true;
  startGame();
  // reset total score
  total = 0;
  document.getElementById("myText").innerHTML = parseInt(total);

  // reset board
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 8; j++) {
      if (i % 2 == 0 && j % 2 == 0) {
        document.getElementById("btn" + i + j).style.backgroundColor = "#076e07";
      } else if (i % 2 == 1 && j % 2 == 1) {
        document.getElementById("btn" + i + j).style.backgroundColor = "#076e07";
      } else {
        document.getElementById("btn" + i + j).style.backgroundColor = "#026402";
      }
      // reset transparencies
      document.getElementById("btn" + i + j).style.color = "transparent";
    }
  }
}
