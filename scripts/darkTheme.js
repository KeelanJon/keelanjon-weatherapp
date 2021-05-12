/* --------------------------------------------------------*/
//This area down here is for the current dark theme stuff!
//Dark theme experimentation
let darkTheme = false;
const darkModeBtn = document.querySelector("#darkModeBtn");
const upperContainer = document.querySelector("#upperContainer");
const locationText = document.querySelector("#thecity");

darkModeBtn.addEventListener("click", function () {
  toggleTheme();
});

function toggleTheme() {
  const allCards = document.querySelectorAll(".day-card");

  console.log(allCards);

  if (darkTheme == false) {
    console.log("Dark theme activated");
    document.body.style.background = "#27252D";
    upperContainer.style.background = "#0D0C0E";
    locationText.style.color = "#f8f7fd";

    darkTheme = true;
  } else {
    console.log("Dark theme DEactivated");
    document.body.style.background = "#f8f7fd";
    upperContainer.style.background = "#ffe49d";
    locationText.style.color = "#333333";

    darkTheme = false;
  }
}
