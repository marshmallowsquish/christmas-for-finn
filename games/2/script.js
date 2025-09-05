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
  activateScreen: function(param) {
    let coverScreen = this.getSelection("cover");
    let pageScreen = this.getSelection("page");
    console.log(param);
    
    if (param === "cover") {
      pageScreen.classList.toggle("inactive");
    } else {
      coverScreen.classList.toggle("inactive");
      pageScreen.classList.toggle("inactive");
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

    //adds functionality to proceed button 
    this.getSelection("button").addEventListener("click", changePage);

    function changePage() {
      COVER_OPTIONS_MENU.colorPage ? COVER_OPTIONS_MENU.displayPage("animal") : SELECTION_SCREENS.activateScreen("page");
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
        let animal = document.getElementById("cover-animal-image");
        animal.setAttribute("src", `./img/cover/${selection}.png`)
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
      animal: ["cat", "dog", "fish", "hedgehog", "chicken", "guinea", "bee", "spider", "turtle", "raccoon", "donkey", "deer"],
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

SELECTION_SCREENS.activateScreen("cover"); 
COVER_OPTIONS_MENU.createGrid();
COVER_OPTIONS_MENU.addButtonFunctionality();
COVER_OPTIONS_MENU.displayPage("color");