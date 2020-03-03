const currencyOne = document.getElementById("currency-one");
const dropdowns = document.querySelectorAll("select");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const dropdown = () => {
  fetch(`./country.json`)
    .then(res => res.json())
    .then(data => {
      dropdowns.forEach(dropdown => {
        let html = ``;
        html = data
          .sort((a, b) => (a.country > b.country ? 1 : -1))
          .map(
            i => `<option value="${i.code}">${i.country} / ${i.name}</option>`
          );
        dropdown.innerHTML = html;
      });
      currencyOne.value = "USD";
      currencyTwo.value = "CAD";
      calculate();
    });
};

const calculate = () => {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      amountTwo.value = (amountOne.value * rate).toFixed(2);
      rateEl.textContent = `${amountOne.value || 0} ${currency_one} = ${
        amountTwo.value
        } ${currency_two}`;
    });
};

const toggle = () => {
  [currencyOne.value, currencyTwo.value] = [
    currencyTwo.value,
    currencyOne.value
  ];
  calculate();
};

amountOne.addEventListener("input", calculate);
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
swap.addEventListener("click", toggle);
window.addEventListener("load", () => amountOne.focus());

dropdown();
