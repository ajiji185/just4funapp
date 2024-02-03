const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");
const yeaaayText = document.querySelector(".yeaaay-text");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isTouchNearButton(touchX, touchY, button) {
  const buttonRect = button.getBoundingClientRect();
  const distanceX = Math.abs(touchX - (buttonRect.left + buttonRect.width / 2));
  const distanceY = Math.abs(touchY - (buttonRect.top + buttonRect.height / 2));
  const distanceThreshold = 100; // Adjust this threshold as needed

  return distanceX < distanceThreshold && distanceY < distanceThreshold;
}

function moveButtonAway(button) {
  const containerHeight = container.clientHeight;
  const containerWidth = container.clientWidth;
  const btnHeight = button.clientHeight;
  const btnWidth = button.clientWidth;

  let newTop, newLeft;

  do {
    newTop = getRandomNumber(0, containerHeight - btnHeight);
  } while (Math.abs(newTop - button.offsetTop) < containerHeight / 3);

  do {
    newLeft = getRandomNumber(0, containerWidth - btnWidth);
  } while (Math.abs(newLeft - button.offsetLeft) < containerWidth / 3);

  button.style.top = newTop + "px";
  button.style.left = newLeft + "px";
}

function showYeaaayText() {
  yeaaayText.style.display = "block";
}

function handleNoButtonClick() {
  btnNo.removeEventListener("touchstart", handleNoButtonTouchStart);
  moveButtonAway(btnNo);
  showYeaaayText();

  // Disable the button to prevent further interactions
  btnNo.disabled = true;
}

function handleNoButtonTouchStart(event) {
  event.preventDefault(); // Prevent the default touch behavior
  handleNoButtonClick();
}

btnNo.addEventListener("click", handleNoButtonClick);
btnNo.addEventListener("touchstart", handleNoButtonTouchStart);

container.addEventListener("touchmove", handleTouchMove);

function handleTouchMove(event) {
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  if (isTouchNearButton(touchX, touchY, btnNo)) {
    handleNoButtonTouchStart(event);
  }
}

btnYes.addEventListener("click", () => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
});
