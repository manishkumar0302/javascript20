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
    "https://www.allinahealth.org/-/media/allina-health/content/healthy-set-go/womansun-478849023-682x408.jpg"
  );

  setTimeout(() => {
    text.textContent = "Hold";
    logo.style.animationDuration = `${Math.floor(holdTime / 1000)}s`;
    container.className = "hold";
    logo.setAttribute(
      "src",
      "https://www.centracare.com/images/blog/Dont-Hold-Your-Breath-Post.jpg"
    );

    setTimeout(() => {
      text.textContent = "Breathe Out!";
      logo.style.animationDuration = `${Math.floor(breatheTime / 1000)}s`;
      container.className = "shrink";
      logo.setAttribute(
        "src",
        "https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/08/GRT-woman-happy-sunglasses-sun-bright-colors-1296x728-header-1296x728.jpg?w=1155&h=1528"
      );
    }, holdTime);
  }, breatheTime);
};

setInterval(breathAnimation, totalTime);

breathAnimation();
