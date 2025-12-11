/* CHANGE RAIN AUDIO - it should be on google drive; changes it to a 30m loop */

let leaf1Audio = new Audio("./audio/leaf-1.wav");
let leaf2Audio = new Audio("./audio/leaf-2.wav");
let leaf3Audio = new Audio("./audio/leaf-3.wav");
let leaf4Audio = new Audio("./audio/leaf-4.wav");
let leaf5Audio = new Audio("./audio/leaf-5.wav");

let leavesAudio = [leaf1Audio, leaf2Audio, leaf3Audio, leaf4Audio, leaf5Audio];

for (let i = 0; i < leavesAudio.length; i++) {
  leavesAudio[i].loop = true;
  leavesAudio[i].muted = true;
}

document.body.addEventListener("click", function() {
  for (let i = 0; i < leavesAudio.length; i++) {
    leavesAudio[i].play();
  }
});

//make cover screen disappear
let coverImage = document.getElementsByClassName("cover-image");

document.body.addEventListener("click", fadeLeaves);
document.body.addEventListener("click", fadeSoot);

function fadeLeaves() {
  let element = coverImage[0];
  let opacity = 1; 
  let interval = setInterval(function() {
      if (opacity > 0) {
        opacity -= 0.02;
        element.style.opacity = opacity;
      } else {
        clearInterval(interval); 
        element.style.display = "none";
      }
  }, 50);
}

function fadeSoot() {
  let element = coverImage[1];
  let opacity = 1; 
  let interval = setInterval(function() {
      if (opacity > 0) {
        opacity -= 0.05;
        element.style.opacity = opacity;
      } else {
        clearInterval(interval); 
        element.style.display = "none";
      }
  }, 20);
}

//play rain sound
let rainAudio = new Audio("./audio/rain.mp3");
rainAudio.loop = true;
document.body.addEventListener("click", function() {
  rainAudio.play()
});

//animate rain
let counter = 100;
for (let i = 0; i < counter; i++) {
  let hrElement = document.createElement("HR");
  
    hrElement.style.left = Math.floor(Math.random() * (window.innerWidth + 200)) + "px";
    hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
    hrElement.style.animationDelay = Math.random() * 5 + "s";
 
  document.body.appendChild(hrElement);
}

//prevent image dragging
let images = document.getElementsByTagName("img");

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('dragstart', function( event ) {
    event.preventDefault();
  }, false);
}

const INIT = {
  addButtonFunctionality: function() {
    //make back button functional
    let backButton = document.getElementById("back-button");

    backButton.addEventListener("click", function() {
      window.location.href = "./../../index.html";
    });

    //make leaves functional
    let leaves = document.getElementById("leaves").children;
    
    for (let i = 0; i < leaves.length; i++) {
      leaves[i].addEventListener("click", function() {
        this.classList.toggle("activated");
        INIT.animateLeaf(leaves[i]);
        INIT.playMusic(leaves[i]);
      })
    }
  },
  animateLeaf: function(leaf) {
    //animate totoro
    let totoro = document.body.getElementsByClassName("totoro");
    let number = leaf.getAttribute("id").split("-")[1];
    let index = number - 1;

    if (leaf.classList.contains("activated")) {
      totoro[index].classList.remove("hidden");
    } else {
      totoro[index].classList.add("hidden");
    }

    //animate raindrop
    let raindrop = document.body.getElementsByClassName("raindrop");

    if (leaf.classList.contains("activated")) {
      raindrop[index].classList.remove("hidden");
    } else {
      raindrop[index].classList.add("hidden");
    }
  },
  playMusic: function(leaf) {
    let number = leaf.getAttribute("id").split("-")[1];
    let index = number - 1;

     if (leaf.classList.contains("activated")) {
      leavesAudio[index].muted = false;
    } else {
      leavesAudio[index].muted = true;
    }
  },
  returnToCalendar: function() {
    /* for the back button */
  }
}

INIT.addButtonFunctionality();