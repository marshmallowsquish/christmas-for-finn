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

const colorSound = new Audio("./audio/new-color_alexkandrell-freesounds.wav");

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
let yellow = false;
let red = false;
let blue = false;
let green = false;
let currentThemes = [];

/* DECLARE FUNCTIONS */
function startGame() {
  displayStar();
  setTimeout(startGame, GET.number(5000 + 1) + 1000)
}

function displayStar() {
  //create and append star
  let star = svgStar.cloneNode(true);
  STAR.append(star);
  STAR.generateNewAnimation(star);
  STAR.declareEventHandlers(star);
}

function incrementStars() {
  stars += 1
  INIT.displayStarCount();
}

function handleNewColor() {
  switch (color) {
    case "#FFFFFF":
      break;
    case "#FFFF00":
    if (!yellow) {
      colorSound.play();
      yellow = true;
      themesContainer.children[0].setAttribute("src", "./img/yellow-star.svg");

      themesContainer.children[0].addEventListener("click", function() {
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
          currentThemes.pop("yellow");
        } else {
          this.classList.add("selected");
          currentThemes.push("yellow");
        }
      })
    } else {
      clickSound[GET.number(10) + 1].play();
    }
    break;
    case "#FF0000":
      if (!red) {
        colorSound.play();
        red = true;
        themesContainer.children[1].setAttribute("src", "./img/red-star.svg");

        themesContainer.children[1].addEventListener("click", function() {
          if (this.classList.contains("selected")) {
            this.classList.remove("selected");
            currentThemes.pop("red");
          } else {
            this.classList.add("selected");
            currentThemes.push("red");
          }
        })
      } else {
        clickSound[GET.number(10) + 1].play();
      }
      break;
    case "#0000FF":
      if (!blue) {
        colorSound.play();
        blue = true;
        themesContainer.children[2].setAttribute("src", "./img/blue-star.svg");

        themesContainer.children[2].addEventListener("click", function() {
          if (this.classList.contains("selected")) {
            this.classList.remove("selected");
            currentThemes.pop("blue");
          } else {
            this.classList.add("selected");
            currentThemes.push("blue");
          }
        })
      } else {
        clickSound[GET.number(10) + 1].play();
      }
      break;
    case "#00FF00":
      if (!green) {
        colorSound.play();
        green = true;
        themesContainer.children[3].setAttribute("src", "./img/green-star.svg");

        themesContainer.children[3].addEventListener("click", function() {
          if (this.classList.contains("selected")) {
            this.classList.remove("selected");
            currentThemes.pop("green");
          } else {
            this.classList.add("selected");
            currentThemes.push("green");
          }
        })
      } else {
        clickSound[GET.number(10) + 1].play();
      }
      break;
  }
}


/* DECLARE NAMESPACES */

const INIT = {
  declareEventHandlers: function() {
    backButton.addEventListener("click", function() {
      window.location.href = "./../../index.html";
    })
  },
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
    let number = GET.number(2);
  
    if (number === 0) {
      color = `${colorList[GET.number(4)].hex}`;
    } else {
      color = "#FFFFFF"
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

const STAR = {
  append: function(star) {
    star.classList.remove("hidden");
    star.style.position = "absolute";
    center.appendChild(star);
  },
  generateNewAnimation: function(star) {
    let durationParam = GET.number(6000 + 1) + 1000;
    let starAnimation = new Array(new FirstKeyframe, new SecondKeyframe);
    let starOptions = new Options(durationParam);
    star.animate(starAnimation, starOptions);
    setTimeout(removeStar, durationParam);
    function removeStar() {
      star.remove()
    }
  },
  declareEventHandlers: function(star) {
    //make stars clickable
    star.addEventListener("click", function() {
      handleNewColor();
      star.remove()
      incrementStars();
    })

    //add audio to star clicks
    star.addEventListener("click", function() {
      if (color === "#FFFFFF") {
        clickSound[GET.number(10) + 1].play();
      } 
    })
  }
}

/* SCRIPT */
INIT.declareEventHandlers();
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
  this.fill = `${color}`;
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

/* FEATURES */
//add image to color button on click
//sound buttons double as sky changers
//boing sound for changing star color
//songs add temporary effect for duration of song, or until click off. one is to change color hue. for this, simply have BOTH keyframes getHex with certainty.