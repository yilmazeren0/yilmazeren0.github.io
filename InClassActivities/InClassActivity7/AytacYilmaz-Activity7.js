const button = document.getElementById("catchMe");
const levelTitle = document.getElementById("levelTitle");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

let level = 1;
let clicks = 0;
let timeout = 500;

function randomPosition() {
  const top = Math.random() * 300 + "px";
  const left = Math.random() * 300 + "px";
  button.style.marginTop = top;
  button.style.marginLeft = left;
}

function moveButton() {
  setTimeout(() => {
    randomPosition();
  }, timeout);
}

button.addEventListener("mouseover", moveButton);

button.addEventListener("click", () => {
  clicks++;
  if (clicks >= 3) {
    if (level < 6) {
      level++;
      timeout = Math.max(0, timeout - 100);
      levelTitle.textContent = "Level: " + level;
      popupText.textContent = "You are the winner! You can go next level " + level + ".";
      popup.style.display = "block";
      clicks = 0;
    } else {
      statusText.textContent = "You beat the game (almost impossible)!";
    }
  } else {
    statusText.textContent = "Click " + (3 - clicks) + " more time(s)!";
  }
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});
