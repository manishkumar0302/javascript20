const container = document.getElementById("app");
const text = document.getElementById("text");
const logo = document.getElementById("logo");
const totalTime = 14000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = () => {
  text.textContent = "Breathe In!";
  logo.style.animationDuration = `${Math.floor(breatheTime / 1000)}s`;
  container.className = "grow";
  logo.setAttribute(
    "src",
    "https://media1.giphy.com/media/fQYF7GSkhaQVzwau1N/giphy.gif"
  );

  setTimeout(() => {
    text.textContent = "Hold";
    logo.style.animationDuration = `${Math.floor(holdTime / 1000)}s`;
    container.className = "hold";
    logo.setAttribute(
      "src",
      "https://media.giphy.com/media/5nonrz8FH1wHxRAL9p/giphy.gif"
    );

    setTimeout(() => {
      text.textContent = "Breathe Out!";
      logo.style.animationDuration = `${Math.floor(breatheTime / 1000)}s`;
      container.className = "shrink";
      logo.setAttribute(
        "src",
        "https://media.giphy.com/media/QfKaMrW9GCSFJY4euG/giphy.gif"
      );
    }, holdTime);
  }, breatheTime);
};

setInterval(breathAnimation, totalTime);

breathAnimation();
