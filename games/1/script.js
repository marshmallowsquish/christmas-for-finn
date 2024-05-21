/* DECLARE VARIABLES - selectors, working values */

//selectors
const backButton = document.getElementById("back-button");
const soundsContainer = document.getElementById("sounds");
const themesContainer = document.getElementById("themes");
const bottomContainer = document.getElementById("bottom");
const starCountDisplay = document.getElementById("stars");

const star = document.getElementById("star");

//working values
let stars = 0;

/* DECLARE FUNCTIONS */
function startGame() {
  setInterval(displayStar, 1000);
}

function displayStar() {
  star.classList.remove("hidden")
}

/* DECLARE EVENT HANDLERS */
backButton.addEventListener("click", function() {
  window.location.href = "./../../index.html";
})

star.addEventListener("click", function() {
  stars += 1
  INIT.displayStarCount();
})

/* DECLARE NAMESPACES */

const INIT = {
  createSoundButtons: function() {
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("img");
      button.classList.add("top-buttons");
      soundsContainer.appendChild(button);
    }
  },
  createThemeButtons: function() {
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("img");
      button.classList.add("top-buttons");
      themesContainer.appendChild(button);
    }
  },
  createSongButtons: function() {
    for (let i = 0; i < 5; i++) {
      let button = document.createElement("img");
      button.classList.add("song-buttons");
      bottomContainer.appendChild(button);
    }
  },
  displayStarCount: function() {
    starCountDisplay.textContent = stars;
  }
}

/* SCRIPT */
INIT.createSoundButtons();
INIT.createThemeButtons();
INIT.createSongButtons();
INIT.displayStarCount();
startGame();