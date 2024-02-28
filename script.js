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
      ornamentBox.classList.add("ornament-box");
      contentContainer.appendChild(ornamentBox);
    }
  }
}

/* SCRIPT */
INIT.createCalendar();