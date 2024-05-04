/* DECLARE VARIABLES - selectors, working values */

//selectors
const contentContainer = document.getElementById("content-container");

/* DECLARE FUNCTIONS */

/* DECLARE EVENT HANDLERS */

/* DECLARE NAMESPACES */
const INIT = {
  createCalendar: function() {
    for (let i = 0; i < 25; i++) {
      let ornamentBox = document.createElement("img");
      ornamentBox.setAttribute("src", "./img/empty-day.jpeg")
      ornamentBox.classList.add("ornament-box");
      contentContainer.appendChild(ornamentBox);
    }
  },
  addUnlockedDays: function() {
    let days = document.getElementsByClassName("ornament-box");
    days[0].setAttribute("src", "./img/1.png");
    days[0].setAttribute("onclick", "location.href = './games/1/star-catcher.html';")
  }
}

/* SCRIPT */
INIT.createCalendar();
INIT.addUnlockedDays();