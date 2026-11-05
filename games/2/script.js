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
  declareValues: function() {
    //animal
    this.animal = {};
    this.animal.selection = document.getElementById("story-animal").textContent;
    this.animal.x = 0;
    this.animal.y = 350;
    this.animal.velocityX = 0;
    this.animal.velocityY = 0;
    this.animal.image = new Image();
    this.animal.image.src = `./img/game/animals/${this.animal.selection}.png`

    //destination
    this.destination = {};
    this.destination.selection = document.getElementById("story-destination").textContent;
    this.destination.x = 600;
    this.destination.y = Math.floor(Math.random() * 13) * 50;
    this.destination.image = new Image();
    this.destination.image.src = `./img/page/${this.destination.selection}.png`

    //items
    this.itemSelection = document.getElementById("story-item").textContent;
    this.itemCount = 7;
    this.items = [];
    for (let i = 0; i < this.itemCount; i++) {
      this.items[i] = {};
      this.items[i].x = (Math.floor(Math.random() * 11) * 50) + 50;
      this.items[i].y = (Math.floor(Math.random() * 14) * 50) + 50;
      this.items[i].velocityX = 0;
      this.items[i].velocityY = 0;
      this.items[i].image = new Image();
      this.items[i].image.src = `./img/game/items/${this.itemSelection}_${i + 1}.png`;
    }

    //board
    this.board = document.getElementById("game-board");
    this.board.rowCount = 15;
    this.board.columnCount = 15;
    this.board.tileSize = 50;
    this.board.width = this.board.columnCount * this.board.tileSize;
    this.board.height = this.board.rowCount * this.board.tileSize;
    this.context = this.board.getContext("2d");
  },
  createBoard: function() {
    //create board canvas
    let gameContainer = document.getElementById("game-container");
    
    let newBoard = document.createElement("canvas");
    newBoard.setAttribute("id", "game-board");
    newBoard.style.border = "1px solid white";
    gameContainer.appendChild(newBoard);

    //declare event listeners and values
    document.addEventListener("keydown", this.moveAnimal);
    this.declareValues();

    this.update();
  },
  update: function() {
    GAME.move();
    GAME.draw();
    setTimeout(GAME.update, 50);
  },
  draw: function() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
    //x, y, width, height
    this.context.drawImage(this.animal.image, this.animal.x, this.animal.y, 50, 50);
    this.context.drawImage(this.destination.image, this.destination.x, this.destination.y, 150, 150);
    for (let i = 0; i < this.itemCount; i++) {
      this.context.drawImage(this.items[i].image, this.items[i].x, this.items[i].y, 50, 50);
    }
  },
  move: function() {
    this.animal.x += this.animal.velocityX;
    this.animal.y += this.animal.velocityY;

    //check wall collisions

    //check animal + item collision

    //check item + item collision
  },
  moveAnimal: function(e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") {
      GAME.updateVelocity("up");
    } else if (e.code === "ArrowDown" || e.code === "KeyS") {
      GAME.updateVelocity("down");
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      GAME.updateVelocity("left");
    } else if (e.code === "ArrowRight" || e.code === "KeyD") {
      GAME.updateVelocity("right");
    } 
  },
  updateVelocity: function(direction) {
    if (direction === "up") {
      this.animal.velocityX = 0;
      this.animal.velocityY = -this.board.tileSize/4;
    } else if (direction === "down") {
      this.animal.velocityX = 0;
      this.animal.velocityY = this.board.tileSize/4;
    } else if (direction === "left") {
      this.animal.velocityX = -this.board.tileSize/4;
      this.animal.velocityY = 0;
    } else if (direction === "right") {
      this.animal.velocityX = this.board.tileSize/4;
      this.animal.velocityY = 0;
    } 
  },
  collision: function(a, b) {
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
  }
}

SELECTION_SCREENS.activateScreen("cover"); 
COVER_OPTIONS_MENU.createGrid();
COVER_OPTIONS_MENU.addButtonFunctionality();
COVER_OPTIONS_MENU.displayPage("color");


   /*
    next steps:
    -prevent collisions
    -prevent item images from landing on the same spot
    */