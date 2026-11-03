const SELECTION_SCREENS = {
  getSelection: function(param) {
    let choice = {
      cover: document.getElementById("cover-screen"),
      page: document.getElementById("page-screen"),
    }

    return choice[param];
  },
  activateScreen: function(param) {
    let coverScreen = this.getSelection("cover");
    let pageScreen = this.getSelection("page");
    
    if (param === "cover") {
      pageScreen.classList.toggle("inactive");
    } else {
      coverScreen.classList.toggle("inactive");
      pageScreen.classList.toggle("inactive");
      PAGE_OPTIONS_MENU.initialize();
    }
  },
}

const COVER_OPTIONS_MENU = {
  colorPage: true,
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
  addButtonFunctionality: function() {

    //adds functionality to back button
    let backButton = document.getElementById("back-button");

    backButton.addEventListener("click", function() {
      window.location.href = "./../../index.html";
    });

    //adds functionality to proceed button 
    this.getSelection("button").addEventListener("click", changePage);

    function changePage() {
      if (COVER_OPTIONS_MENU.colorPage) {
        COVER_OPTIONS_MENU.displayPage("animal")
      } else {
        if (PAGE_OPTIONS_MENU.animal === "Tiger") {
          alert("Make sure to choose an animal before reading");
        } else {
          let bookColor = document.getElementById("cover-image").classList
          let bookBorder = document.getElementsByClassName("book-border");
        
          for (let i = 0; i < 4; i++) {
            bookBorder[i].classList.add(bookColor);
          }
  
          SELECTION_SCREENS.activateScreen("page");
        }
      }

      COVER_OPTIONS_MENU.colorPage = false;
    }

    //adds functionality to options buttons

    let options = this.getSelection("div").children;
    let book = document.getElementById("closed-book-container").firstElementChild;

    for (let i = 0; i < 12; i++) {
      options[i].lastElementChild.addEventListener("click", changeImage); 
    }

    function changeImage() {
      let selection = this.parentElement.firstElementChild.textContent;

      if (COVER_OPTIONS_MENU.colorPage) {
        book.setAttribute("class", selection);
      } else {
        let animalImage = document.getElementById("cover-animal-image");
        animalImage.setAttribute("src", `./img/cover/${selection}.png`);
        PAGE_OPTIONS_MENU.animal = `${selection}`;
      }
    }
  },
  displayPage: function(param) {
    this.displayMessage(param);
    this.displayOptions(param);
    this.displayButtonText(param);
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
      animal: ["Cat", "Dog", "Fish", "Hedgehog", "Chicken", "Guinea", "Bee", "Spider", "Turtle", "Raccoon", "Donkey", "Deer"],
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
      animal: "Ready to write!",
    }

    this.getSelection("button").textContent = choice[param];
  },
}

const PAGE_OPTIONS_MENU = {
  weather: ["bright, clear", "cloudy, grey", "cold, snowy", "dark, stormy"],
  time: ["morning", "afternoon", "evening", "night"],
  setting: ["city", "countryside", "jungle", "desert"],
  animal: "Tiger",
  destination: ["park", "pool", "library", "movies"],
  item: ["flowers", "rocks", "bugs", "birds"],
  initialize: function() {
    PAGE_OPTIONS_MENU.addButtonFunctionality();
    PAGE_OPTIONS_MENU.updateAnimal();
  },
  updateAnimal: function() {
    let animalSpan = document.getElementById("story-animal");
    animalSpan.textContent = PAGE_OPTIONS_MENU.animal;
  },
  addButtonFunctionality: function() {
    let storyButtons = document.getElementsByClassName("story-button");
    for (let i = 0; i < storyButtons.length; i++) {
      storyButtons[i].addEventListener("click", PAGE_OPTIONS_MENU.displayStoryOptions);
    }

    let pageProceedButton = document.getElementById("page-options-proceed-button");
    pageProceedButton.addEventListener("click", function() {
      //hide page options screen
      let storyContainer = document.getElementById("story-container");
      let pageOptionsContainer = document.getElementById("page-options-container");
      storyContainer.classList.add("inactive");
      pageOptionsContainer.classList.add("inactive")
      this.classList.add("inactive");

      //change background image
      let pageScreen = document.getElementById("page-screen");

      let weather = document.getElementById("story-weather").textContent.split(", ").join("-");
      let time = document.getElementById("story-time").textContent;
      let location = document.getElementById("story-setting").textContent;

      let chosenSetting = weather + "-" + time + "-" + location;
      let URL1 = "url(";
      let URL2 = `./img/game/${chosenSetting}.jpg`
      let URL3 = ")"

      pageScreen.style.backgroundImage= URL1 + URL2 + URL3;

      //create game board
      GAME.createBoard();
    })
  },
  displayStoryOptions: function() {
    let selectedButton = this;
    let selectedButtonName = this.getAttribute("id").split("-");
    let pageOptionsContainer = document.getElementById("page-options-container");

    if (pageOptionsContainer.firstChild) {
      for (let i = 0; i < 4; i++) {
        pageOptionsContainer.removeChild(pageOptionsContainer.firstChild);
      }
    }

    for (let i = 0; i < 4; i++) {
      let optionName = PAGE_OPTIONS_MENU[selectedButtonName[1]][i];
      let optionFileName = optionName.split(", ").join("-");

      let box = document.createElement("div");
      let name = document.createElement("h3");
      let button = document.createElement("button");
      let image = document.createElement("img");

      name.textContent = optionName;
      image.src = `./img/page/${optionFileName}.png`

      button.addEventListener("click", function() {
        selectedButton.textContent = optionName;
      })
    
      pageOptionsContainer.appendChild(box);
      box.appendChild(name);
      box.appendChild(button);
      button.appendChild(image);
    }
  }
}

const GAME = {
  board: null,
  context: null,
  animal: null,
  destination: null,
  item: null,
  animalImage: null,
  destinationImage: null,
  itemImages: null,
  updateValues: function() {
    this.animal = document.getElementById("story-animal").textContent;
    this.destination = document.getElementById("story-destination").textContent;
    this.item = document.getElementById("story-item").textContent;
    this.destinationY = Math.floor(Math.random() * 15) * 50;
  },
  createBoard: function() {
    this.updateValues();

    //create board canvas
    let gameContainer = document.getElementById("game-container");
    
    let newBoard = document.createElement("canvas");
    newBoard.setAttribute("id", "game-board");
    newBoard.style.border = "1px solid white";
    gameContainer.appendChild(newBoard);

    this.declareBoardValues();
    this.loadImages();
    this.update();
  },
  declareBoardValues: function() {
    this.board = document.getElementById("game-board");
    this.board.rowCount = 15;
    this.board.columnCount = 15;
    this.board.tileSize = 50;
    this.board.width = this.board.columnCount * this.board.tileSize;
    this.board.height = this.board.rowCount * this.board.tileSize;
    this.context = this.board.getContext("2d");
  },
  loadImages: function() {
    this.animalImage = new Image();
    this.animalImage.src = `./img/cover/${this.animal}.png`
    this.destinationImage = new Image();
    this.destinationImage.src = `./img/page/${this.destination}.png`
    this.itemImages = [];
    for (let i = 0; i < 7; i++) {
      this.itemImages[i] = new Image();
      this.itemImages[i].src = `./img/game/items/${this.item}_${i + 1}.jpg`
    }
  },
  update: function() {
    //move
    GAME.draw();
    setTimeout(GAME.update, 50);
  },
  draw: function() {
    //x, y, width, height
    this.context.drawImage(this.animalImage, 0, 350, 50, 50);
    this.context.drawImage(this.destinationImage, 600, this.destinationY, 150, 150);
    for (let i = 0; i < 7; i++) {
      this.context.drawImage(this.itemImages[i], 300, 0, 50, 50);
    }

    /*
    next steps:
    -make item images into array instead, and have them all show up at random spots (that don't conflict with animal or destination)
    */
  }

}

SELECTION_SCREENS.activateScreen("cover"); 
COVER_OPTIONS_MENU.createGrid();
COVER_OPTIONS_MENU.addButtonFunctionality();
COVER_OPTIONS_MENU.displayPage("color");
