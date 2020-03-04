const music = document.getElementById("music");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
let songIndex = 2;
let songs = [];

const loadData = async () => {
  progress.style.display = `none`;
  let url = await fetch(`./data.json`);
  let json = await url.json();
  songs = json;
  loadSong(songs, songIndex);
};

const loadSong = (song, index) => {
  const currentSong = song.filter(i => i.id === index);
  title.innerText = currentSong[0].name;
  audio.src = currentSong[0].url;
  cover.src = currentSong[0].thumb;
};

const playSong = () => {
  music.classList.add("play");
  playBtn.textContent = "Pause";
  audio.play();
};

const pauseSong = () => {
  music.classList.remove("play");
  playBtn.textContent = "Play";
  audio.pause();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs, songIndex);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs, songIndex);
  playSong();
};

const updateProgress = e => {
  const { duration, currentTime } = e.srcElement;
  progress.value = Math.floor(currentTime);
  progress.max = Math.floor(duration);
  progress.style.display = `block`;
};

const setProgress = e => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  const total = (clickX / width) * duration;
  audio.currentTime = total;
};

playBtn.addEventListener("click", () => {
  const isPlaying = music.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", setProgress);

loadData();