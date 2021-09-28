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

let timeStart = 0;
let timeEnd = 0;
let wordCount = 0;

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
    wordCount++;

    const showTyping = String.fromCharCode(e.keyCode);
    const keyNum = e.which;
    const selectedKey = $(`#${keyNum}`);
    selectedKey.addClass("key-pressed");
    setInterval(() => {
      selectedKey.removeClass("key-pressed");
    }, 500);
    typingArea.text(showTyping);

    currentLetterCheck(showTyping, e);
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

function currentLetterCheck(key, e) {
  let currentSentence = sentences[sentenceIndex];
  let checked = currentSentence.charAt(letterIndex++);

  yellowBlock.css({
    left: "+=17.2px",
  });

  if (key === checked) {
    let correct = $(`<i class="fas fa-check correct"></i>`);
    correct.addClass("green-check");
    feedback.prepend(correct);
  } else {
    let incorrect = $(`<i class="fas fa-times incorrect"></i>`);
    mistakes++;
    incorrect.addClass("red-check");
    feedback.prepend(incorrect);
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
    timeEnd = e.timeStamp;
    let timeDifference = timeEnd - timeStart;
    let seconds = timeDifference / 1000;
    let minutes = seconds / 60;
    let wordsPerMinute = (
      wordCount / minutes.toFixed(1) -
      2 * mistakes
    ).toFixed(3);

    yellowBlock.css({
      left: "0",
    });
    feedback.html(` 
    <h3 class="wpm-txt">WPM: <span class="wpm">${wordsPerMinute}</span></h3>
    <button class="retry-btn">Retry?</button>
    `);

    $(".retry-btn").click(function (e) {
      location.reload();
    });
  }
}
