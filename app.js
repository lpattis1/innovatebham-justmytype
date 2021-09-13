displayTargetedKey();
changeToUpperCase();
changeToLowerCase();

// Keyboard variables

const sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];
const upperCaseKeyboard = $("#keyboard-upper-container");
const lowerCaseKeyboard = $("#keyboard-lower-container");
const sentenceContainer = $("#sentence");
const feedback = $("#feedback");

let sentenceIndex = 0;
let letterIndex = 0;
let yellowBlock = $("#yellow-block");

const typingArea = $("#target-letter");

// Hide the uppercase keyboard on load

$(document).ready(hideSecondKeyboard);

function hideSecondKeyboard(e) {
  upperCaseKeyboard.hide();
}

$(document).ready(function (e) {
  sentenceContainer.text(sentences[sentenceIndex]);
});

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

    currentLetterCheck(showTyping, keyNum, selectedKey);
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

function currentLetterCheck(key, num, keyID) {
  let currentSentence = sentences[sentenceIndex].split("");
  let checked = currentSentence[letterIndex++].charAt();

  yellowBlock.css({
    left: "+=17.2px",
  });

  if (key === checked) {
    let correct = $(`<i class="fas fa-check correct"></i>`);
    correct.addClass("green-check");
    feedback.append(correct);
  } else {
    let incorrect = $(`<i class="fas fa-times incorrect"></i>`);
    incorrect.addClass("red-check");
    feedback.append(incorrect);
  }

  if (letterIndex === currentSentence.length) {
    feedback.html("");
    yellowBlock.css({
      left: "0",
    });
    sentenceIndex++;

    letterIndex = 0;
    currentSentence = sentences[sentenceIndex].split("");

    sentenceContainer.text(sentences[sentenceIndex]);
  }
}
