const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const toggleVideoStatus = () => (video.paused ? video.play() : video.pause());

const updatePlayIcon = () =>
  video.paused ? (play.textContent = "Play") : (play.textContent = "Pause");

const updateProgress = () => {
  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);
  mins < 10 && (mins = "0" + String(mins));
  secs < 10 && (secs = "0" + String(secs));
  timestamp.innerHTML = `${mins}:${secs}`;
  progress.value = (video.currentTime / video.duration) * 100;
};

const setVideoProgress = () =>
  (video.currentTime = (+progress.value * video.duration) / 100);

const stopVideo = () => ((video.currentTime = 0), video.pause());

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
