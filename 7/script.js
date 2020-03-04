const word = document.getElementById("word");
const mistakes = document.getElementById("mistakes");
const play = document.getElementById("play");
const popup = document.getElementById("popup");
const notification = document.getElementById("notification");
const status = document.getElementById("status");
const reveal = document.getElementById("reveal");
const correctLetters = [];
const wrongLetters = [];
let playable = true;
let words = [];
let selectedWord = [];

const getRandomWord = words => {
  let keys = Object.keys(words);
  return keys[(keys.length * Math.random()) << 0];
};

const getWords = async () => {
  let req = await fetch(
    `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json`
  );
  let data = await req.json();
  words = data;
  selectedWord = getRandomWord(words);
  displayWord();
};

const displayWord = () => {
  word.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;
  const innerWord = word.innerText.replace(/[ \n]/g, "");
  if (innerWord === selectedWord) {
    playable = false;
    popup.style.display = "block";
    status.textContent = "Congratulations!";
  }
};

const updateMistakes = () => {
  mistakes.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ``}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  if (wrongLetters.length >= 10) {
    playable = false;
    popup.style.display = "block";
    status.textContent = "Lost!";
    reveal.textContent = `Word: ${selectedWord}`;
  }
};

const showNotification = () => {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
};

window.addEventListener("keydown", e => {
  if (playable && e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();
    selectedWord.includes(letter)
      ? !correctLetters.includes(letter)
        ? (correctLetters.push(letter), displayWord())
        : showNotification()
      : !wrongLetters.includes(letter)
        ? (wrongLetters.push(letter), updateMistakes())
        : showNotification();
  }
});

play.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  popup.style.display = "none";
  getWords();
  updateMistakes();
});

getWords();
