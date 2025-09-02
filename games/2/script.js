//pink, red, orange, yellow, green, blue, indigo, purple, white, grey, black, brown
//fish, hedgehog, cat, dog, bee, chicken, guinea, donkey, spider, turtle, raccoon, deer

//init: add "inactive" class to page selector
//init: call cover selector
//insert proper heading. create 'grid' function (contains h3 for Japanese name, and button). insert button with proper title and functionality.

const SELECTION_SCREENS = {
  getSelection: function(param) {
    let choice = {
      cover: document.getElementById("cover-screen"),
      page: document.getElementById("page-screen"),
    }

    return choice[param];
  },
  toggleActivationStatus: function(param) {
    let screen = this.getSelection(param);

    screen.classList.toggle("inactive");
  },
}

const COVER_OPTIONS_MENU = {
  getSelection: function(param) {
    let choice = {
      h2: document.getElementById("cover-options-message"),
      div: document.getElementById("cover-options"),
      button: document.getElementById("cover-options-proceed-button"),
    }

    return choice[param];
  },
  createGrid: function() {
    for (let i = 0; i < 12; i++) {
      let box = document.createElement("div");
      let name = document.createElement("h3");
      let button = document.createElement("button");
      let image = document.createElement("img");
    
      this.getSelection("div").appendChild(box);
      box.appendChild(name);
      box.appendChild(button);
      button.appendChild(image);
    }
  },
  displayMessage: function(param) {
    let choice = {
      color: "What color will the book be?",
      animal: "Who will the book be about?",
    }
  
    this.getSelection("h2").textContent = choice[param];
  },
  displayOptions: function(param) {
    let choice = {
      color: ["pink", "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "grey", "black", "brown"],
      animal: "test",
    }

    let options = this.getSelection("div").children;

    for (let i = 0; i < 12; i++) {
      options[i].firstElementChild.textContent = choice[param][i]; //labels each button
    }

    for (let i = 0; i < 12; i++) {
      options[i].lastElementChild.firstElementChild.src = `./img/cover/${choice[param][i]}.png`; //decorates each button
    }
  },
  displayButtonText: function(param) {
    let choice = {
      color: "Proceed",
      animal: "Ready to read!",
    }

    this.getSelection("button").textContent = choice[param];
  },
}

SELECTION_SCREENS.toggleActivationStatus("page"); //de-activates the "page" screen, so that we start with the "cover" screen
COVER_OPTIONS_MENU.createGrid();
COVER_OPTIONS_MENU.displayMessage("color");
COVER_OPTIONS_MENU.displayOptions("color");
COVER_OPTIONS_MENU.displayButtonText("color");