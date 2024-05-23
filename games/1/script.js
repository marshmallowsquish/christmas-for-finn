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

function displayStar() {
  star.setAttribute("display", "inline")
  let starAnimation = new Array(new FirstKeyframe, new SecondKeyframe);
  let starOptions = new Options;
  
  star.animate(starAnimation, starOptions);
}

function getNumber(num) {
  return Math.floor(Math.random() * num);
}

function getPosOrNeg() {
  let number = getNumber(2)

  if (number === 0) {
    return "-";
  } else {
    return "+";
  }
}

function getRotate() {
  let number = getNumber(2)

  if (number === 0) {
    return "";
  } else {
    return `rotate(${getPosOrNeg()}${getNumber(360 + 1)}deg)`;
  }
}

function getXAxis() {
  return `${getPosOrNeg()}${getNumber((centerDimensions.width / 2) + 1)}px`
}

function getYAxis() {
  return `${getPosOrNeg()}${getNumber((centerDimensions.height / 2) + 1)}px`
}


/* DECLARE EVENT HANDLERS */
backButton.addEventListener("click", function() {
  window.location.href = "./../../index.html";
})

star.addEventListener("click", function() {
  star.setAttribute("display", "none")
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
  },
  hideStar: function() {
    star.setAttribute("display", "none");
  }
}

/* SCRIPT */
INIT.createSoundButtons();
INIT.createThemeButtons();
INIT.createSongButtons();
INIT.displayStarCount();
INIT.hideStar();

//post-script selectors
const centerDimensions = document.getElementById("center").getBoundingClientRect();

//animation constructors
function FirstKeyframe() {
  this.transform =  `scale(0.${getNumber(9 + 1)}) translateX(${getXAxis()}) translateY(${getYAxis()})`;
  this.fill = "#FFFFFF";
}

function SecondKeyframe() {
  this.transform =  `${getRotate()} scale(0.${getNumber(9 + 1)}) translateX(${getXAxis()}) translateY(${getYAxis()})`;
  this.fill = "#FFFFFF";
}

function Options() {
  this.duration = getNumber(6000 + 1) + 1000,
  this.iterations = 1,
  this.easing = `cubic-bezier(0.${getNumber(99 + 1)}, 0.${getNumber(99 + 1)}, 0.${getNumber(99 + 1)}, 0.${getNumber(99 + 1)})`
}

//game start
setInterval(displayStar, 4000)

