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
  setInterval(displayStar, getNumber(3000 + 1));
}

function displayStar() {
  star.classList.remove("hidden");
  star.animate(starKeyframes, starOptions);
}

function getNumber(num) {
  return Math.floor(Math.random() * num);
}

const starKeyframes = [
  { transform: "rotate(360deg) scale(0)"},
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0) translateX(100%)", backgroundColor: "white" },
];

const starOptions = {
  duration: 1000,
  iterations: 1,
};

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