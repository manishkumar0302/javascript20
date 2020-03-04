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
    "https://media1.giphy.com/media/fQYF7GSkhaQVzwau1N/giphy.gif?cid=790b7611d282e94b3aeea86ead3f82eca05331a0262b4f13&rid=giphy.gif"
  );

  setTimeout(() => {
    text.textContent = "Hold";
    logo.style.animationDuration = `${Math.floor(holdTime / 1000)}s`;
    container.className = "hold";
    logo.setAttribute(
      "src",
      "https://media2.giphy.com/media/5nonrz8FH1wHxRAL9p/200.webp?cid=790b76116b604a361dcdb74477bad85ccfcb8387458095af&rid=200.webp"
    );

    setTimeout(() => {
      text.textContent = "Breathe Out!";
      logo.style.animationDuration = `${Math.floor(breatheTime / 1000)}s`;
      container.className = "shrink";
      logo.setAttribute(
        "src",
        "https://media3.giphy.com/media/QfKaMrW9GCSFJY4euG/200.webp?cid=790b76116b604a361dcdb74477bad85ccfcb8387458095af&rid=200.webp"
      );
    }, holdTime);
  }, breatheTime);
};

setInterval(breathAnimation, totalTime);

breathAnimation();
