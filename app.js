displayTargetedKey();
changeToUpperCase();
changeToLowerCase();

// Keyboard variables

const upperCaseKeyboard = $("#keyboard-upper-container");
const lowerCaseKeyboard = $("#keyboard-lower-container");

// Important key variables

const typingArea = $("#target-letter");

// Hide the uppercase keyboard on load

$(document).ready(hideSecondKeyboard);

function hideSecondKeyboard(e) {
  upperCaseKeyboard.hide();
}

// Display the key pressed on screen

function displayTargetedKey(e) {
  $(document).keypress(function (e) {
    const showTyping = String.fromCharCode(e.keyCode);
    const keyNum = e.which;
    const selectedKey = $(`#${keyNum}`);
    selectedKey.addClass("key-pressed");
    setInterval(() => {
      selectedKey.removeClass("key-pressed");
    }, 500);
    typingArea.text(showTyping);
  });
}

function changeToUpperCase() {
  $(document).keydown(function (e) {
    const showTyping = String.fromCharCode(e.keyCode);
    const keyNum = e.which;

    if (keyNum === 16) {
      upperCaseKeyboard.show();
      lowerCaseKeyboard.hide();
    }
  });
}

function changeToLowerCase() {
  $(document).keyup(function (e) {
    const target = $(this);
    const keyNum = e.which;
    const selectedKey = $(`#${keyNum}`);
    if (keyNum === 16) {
      lowerCaseKeyboard.show();
      upperCaseKeyboard.hide();
    }
    selectedKey.removeClass("key-pressed");
  });
}
