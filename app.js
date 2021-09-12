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
  let checked = currentSentence[letterIndex++].charAt().toLowerCase();
  //   console.log(letterIndex);
  //   console.log(key, checked);
  //   console.log(currentSentence);
  //   console.log(currentSentence.length);
  //   console.log(sentenceIndex);

  if (letterIndex === currentSentence.length) {
    sentenceIndex++;
    // console.log(sentenceIndex);
    letterIndex = 0;
    currentSentence = sentences[sentenceIndex].split("");
    // console.log(currentSentence);
    sentenceContainer.text(sentences[sentenceIndex]);
    // console.log(key, checked);
  }

  if (key.toLowerCase() === checked) {
    console.log("correct");
  } else {
    console.log("incorrect");
  }
}
