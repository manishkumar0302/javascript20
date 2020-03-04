const cardsContainer = document.getElementById("cards");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const modal = document.getElementById("modal");

let currentActiveCard = 0;
const cardsEl = [];

const createCards = () => cardsData.forEach((data, index) => createCard(data, index));

const createCard = (data, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <h2>
          Question: ${data.question}
        </h2>
      </div>
      <div class="inner-card-back">
        <h2>
          Answer: ${data.answer}
        </h2>
      </div>
      <button id="flip">Flip</button>
    </div>
  `;
  card.querySelector('#flip').addEventListener("click", e => e.target.parentNode.classList.toggle("show-answer"));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

const updateCurrentText = () => currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;

const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

const setCardsData = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

const cardsData = getCardsData();

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

showBtn.addEventListener("click", () => modal.classList.remove("hide"));
hideBtn.addEventListener("click", () => modal.classList.add("hide"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    modal.classList.add("hide");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

createCards();
