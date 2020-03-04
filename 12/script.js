const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end");
const button = document.getElementById("button");
const settings = document.getElementById("settings");
const form = document.getElementById("form");
const difficultySelect = document.getElementById("difficulty");
let words = [];

// const words = [
//   "sigh",
//   "tense",
//   "airplane",
//   "ball",
//   "pies",
//   "juice",
//   "warlike",
//   "bad",
//   "north",
//   "dependent",
//   "steer",
//   "silver",
//   "highfalutin",
//   "superficial",
//   "quince",
//   "eight",
//   "feeble",
//   "admit",
//   "drag",
//   "loving"
// ];

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
  addWordToDOM();
  text.focus();
};

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const addWordToDOM = () => {
  randomWord = getRandomWord(words);
  word.innerHTML = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

const updateTime = () => {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);

const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = "flex";
  text.setAttribute("disabled", true);
};

text.addEventListener("input", e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

button.addEventListener("click", () => settings.classList.toggle("hide"));

form.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

getWords();
