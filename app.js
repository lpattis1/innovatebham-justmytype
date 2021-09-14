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
let yellowBlock = $("#yellow-block");

let sentenceIndex = 0;
let letterIndex = 0;
let mistakes = 0;
let timer = 0;
let timeStart;
let timeEnd;
let gameEnd = false;

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
    timer++;

    timeStart = e.timeStamp;
    console.log(timeStart);

    console.log(timer);
    const showTyping = String.fromCharCode(e.keyCode);
    const keyNum = e.which;
    const selectedKey = $(`#${keyNum}`);
    selectedKey.addClass("key-pressed");
    setInterval(() => {
      selectedKey.removeClass("key-pressed");
    }, 500);
    typingArea.text(showTyping);

    currentLetterCheck(showTyping);
  });
}

function changeToUpperCase() {
  $(document).keydown(function (e) {
    const showTyping = e.keyCode;
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

function currentLetterCheck(key) {
  let currentSentence = sentences[sentenceIndex];
  let checked = currentSentence.charAt(letterIndex++);
  console.log(checked);
  console.log(key);

  yellowBlock.css({
    left: "+=17.2px",
  });

  if (key === checked) {
    let correct = $(`<i class="fas fa-check correct"></i>`);
    correct.addClass("green-check");
    feedback.append(correct);
  } else {
    let incorrect = $(`<i class="fas fa-times incorrect"></i>`);
    mistakes++;
    incorrect.addClass("red-check");
    feedback.append(incorrect);
  }

  if (letterIndex === currentSentence.length && sentenceIndex !== 4) {
    letterIndex = 0;
    yellowBlock.css({
      left: "0",
    });
    feedback.html("");
    sentenceIndex++;
    currentSentence = sentences[sentenceIndex];

    sentenceContainer.text(sentences[sentenceIndex]);
  }

  if (letterIndex > currentSentence.length) {
    yellowBlock.css({
      left: "0",
    });
    feedback.html(`<button class="retry-btn">Retry?</button>`);
  }
}
