/* DECLARE VARIABLES - selectors, define audio, define colors, working values */

//selectors
const backButton = document.getElementById("back-button");
const soundsContainer = document.getElementById("sounds");
const themesContainer = document.getElementById("themes");
const bottomContainer = document.getElementById("bottom");
const starCountDisplay = document.getElementById("stars");
const center = document.getElementById("center");
const svgStar = document.getElementById("star");

//define audio
const clickSound = {
  1: new Audio("./audio/1_j_soundeffects-freesounds_trim.wav"),
  2: new Audio("./audio/2_timouse-freesound_trim-1.wav"),
  3: new Audio("./audio/3_timouse-freesound_trim-2.wav"),
  4: new Audio("./audio/4_mashedtatoes2-freeounds_trim.wav"),
  5: new Audio("./audio/5_andersmmg-freesound.wav"),
  6: new Audio("./audio/6_legitcheese-freesounds.mp3"),
  7: new Audio("./audio/7_mlaudio-freesounds.wav"),
  8: new Audio("./audio/8_suzenako-freesounds.wav"),
  9: new Audio("./audio/9_mootmcnoodles-freesounds.wav"),
  10: new Audio("./audio/10_mattwer3-freesounds.wav")
}

//define colors
const colorList = [
  { name: "red", hex: "#FF0000" },
  { name: "yellow", hex: "#FFFF00" },
  { name: "green", hex: "#00FF00" },
  { name: "blue", hex: "#0000FF" }
]

//working values
let stars = 0;
let color = "#FFFFFF"

/* DECLARE FUNCTIONS */
function startGame() {
  displayStar();
  setTimeout(startGame, GET.number(5000 + 1) + 1000)
}

function displayStar() {
  //create star
  let star = svgStar.cloneNode(true);
  star.classList.remove("hidden");
  star.style.position = "absolute";

  //make stars clickable
  star.addEventListener("click", function() {
    clickSound[GET.number(10) + 1].play();
  })

  //add audio to star clicks
  star.addEventListener("click", function() {
    removeStar();
    stars += 1
    INIT.displayStarCount();
  })

  //append star
  center.appendChild(star);

  //generate new animation
  let durationParam = GET.number(6000 + 1) + 1000;
  let starAnimation = new Array(new FirstKeyframe, new SecondKeyframe);
  let starOptions = new Options(durationParam);

  star.animate(starAnimation, starOptions);
  
  //remove star
  setTimeout(removeStar, durationParam);
  function removeStar() {
    star.remove()
  }
}


/* DECLARE EVENT HANDLERS */
backButton.addEventListener("click", function() {
  window.location.href = "./../../index.html";
})


/* DECLARE NAMESPACES */

const INIT = {
  createSoundButtons: function() {
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("img");
      button.setAttribute("src", "./img/blue.png");
      button.classList.add("top-buttons");
      soundsContainer.appendChild(button);
    }
  },
  createThemeButtons: function() {
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("img");
      button.setAttribute("src", "./img/blue.png");
      button.classList.add("top-buttons");
      themesContainer.appendChild(button);
    }
  },
  createSongButtons: function() {
    for (let i = 0; i < 5; i++) {
      let button = document.createElement("img");
      button.setAttribute("src", "./img/blue.png");
      button.classList.add("song-buttons");
      bottomContainer.appendChild(button);
    }
  },
  displayStarCount: function() {
    starCountDisplay.textContent = stars;
  }
}

const GET = {
  number: function(num) {
    return Math.floor(Math.random() * num);
  },
  posOrNeg: function() {
    let number = GET.number(2)

    if (number === 0) {
      return "-";
    } else {
      return "+";
    }
  },
  rotate: function() {
    let number = GET.number(2)
  
    if (number === 0) {
      return "";
    } else {
      return `rotate(${GET.posOrNeg()}${GET.number(360 + 1)}deg)`;
    }
  },
  hex: function() {
    let number = GET.number(1);
  
    if (number === 0) {
      color = `${colorList[GET.number(4)].hex}`;
    } 
  
    return color;
  },
  xAxis: function() {
    return `${GET.posOrNeg()}${GET.number((centerDimensions.width / 2) + 1)}px`
  },
  yAxis: function() {
    return `${GET.posOrNeg()}${GET.number((centerDimensions.height / 2) + 1)}px`
  }
}

/* SCRIPT */
INIT.createSoundButtons();
INIT.createThemeButtons();
INIT.createSongButtons();
INIT.displayStarCount();

//post-script selectors
const centerDimensions = document.getElementById("center").getBoundingClientRect();

//animation constructors
function FirstKeyframe() {
  this.transform =  `scale(0.${GET.number(9 + 1)}1) translateX(${GET.xAxis()}) translateY(${GET.yAxis()})`;
  this.fill = `${GET.hex()}`;
}

function SecondKeyframe() {
  this.transform =  `${GET.rotate()} scale(0.${GET.number(9 + 1)}) translateX(${GET.xAxis()}) translateY(${GET.yAxis()})`;
  this.fill = `${GET.hex()}`;
}

function Options(durationParam) {
  this.duration = durationParam,
  this.iterations = 1,
  this.easing = `cubic-bezier(0.${GET.number(99 + 1)}, 0.${GET.number(99 + 1)}, 0.${GET.number(99 + 1)}, 0.${GET.number(99 + 1)})`,
  this.fill = "both";
}

//game start
setTimeout(startGame, GET.number(5000 + 1) + 1000)


/* TASKS */
//fix audio lag
//fade out audio for less abrupt transitions
//it sometimes doesn't play the audio