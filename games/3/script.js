let leaf1Audio = new Audio("./audio/leaf-1.wav");
let leaf2Audio = new Audio("./audio/leaf-2.wav");
let leaf3Audio = new Audio("./audio/leaf-3.wav");
let leaf4Audio = new Audio("./audio/leaf-4.wav");
let leaf5Audio = new Audio("./audio/leaf-5.wav");

let leavesAudio = [leaf1Audio, leaf2Audio, leaf3Audio, leaf4Audio, leaf5Audio];

for (let i = 0; i < leavesAudio.length; i++) {
  leavesAudio[i].loop = true;
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
    /* ANIMATE LEAF somehow */

    //the following is for testing purposes
    if (leaf.classList.contains("activated")) {
      console.log("start animation");
    } else {
      console.log("stop animation");
    }
  },
  playMusic: function(leaf) {
    let number = leaf.getAttribute("id").split("-")[1];
    let index = number - 1;
    console.log(number, index);

     if (leaf.classList.contains("activated")) {
      leavesAudio[index].play();
    } else {
      leavesAudio[index].pause();
    }
  },
  returnToCalendar: function() {
    /* for the back button */
  }
}

INIT.addButtonFunctionality();