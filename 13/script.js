let randomWord = ``;
let voices = [];
const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const randomBtn = document.getElementById("random");
const toggleBtn = document.getElementById("toggle");
const message = new SpeechSynthesisUtterance();
const data = [
  {
    image: "https://placekitten.com/101/100",
    text: "Resist Violence"
  },
  {
    image: "https://placekitten.com/102/100",
    text: "Spread Peace"
  }
];

const getRandomWord = words => {
  let keys = Object.keys(words);
  return keys[(keys.length * Math.random()) << 0];
};

const getWords = async () => {
  let req = await fetch(
    `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json`
  );
  let data = await req.json();
  randomWord = getRandomWord(data);
  setTextMessage(randomWord);
  speakText();
  alert(randomWord);
};

const createBox = item => {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
  });
  main.appendChild(box);
};

const getVoices = () => {
  voices = speechSynthesis
    .getVoices()
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  voices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} / ${voice.lang.split("-")[1]}`;
    voicesSelect.appendChild(option);
  });
};

const setTextMessage = text => (message.text = text);

const speakText = () => speechSynthesis.speak(message);

const setVoice = e =>
  (message.voice = voices.find(voice => voice.name === e.target.value));

speechSynthesis.addEventListener("voiceschanged", getVoices);
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("hide")
);
voicesSelect.addEventListener("change", () => setVoice);
readBtn.addEventListener(
  "click",
  () => (setTextMessage(textarea.value), speakText())
);
text.addEventListener(
  "change",
  () => (setTextMessage(textarea.value), speakText())
);
randomBtn.addEventListener("click", () => getWords());

data.forEach(createBox);
getVoices();
