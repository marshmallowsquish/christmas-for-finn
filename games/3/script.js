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
    /* PLAY AUDIO USING `leaf-${number}.mp3` */

     //the following is for testing purposes
     if (leaf.classList.contains("activated")) {
      console.log("start audio");
    } else {
      console.log("stop audio");
    }
  },
  returnToCalendar: function() {
    /* for the back button */
  }
}

INIT.addButtonFunctionality();