const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const modalContent = document.getElementById("modal-content");
const close = document.getElementById("close");
const apiURL = "https://api.lyrics.ovh";

const searchSongs = async term => {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
};

const showData = data => {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map(
        song => `<li>
      <span>${song.title} by <strong>${song.artist.name}</strong></span>
      <button data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
      )
      .join("")}
    </ul>
  `;
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
      data.prev
        ? `<button onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
      }
      ${
      data.next
        ? `<button onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
};

const getMoreSongs = async url => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
};

const getLyrics = async (el, artist, songTitle) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  if (data.error) {
    el.textContent = data.error;
    el.disabled = true;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    modalContent.parentElement.classList.remove("hide");
    modalContent.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", e => {
  e.stopPropagation();
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    getLyrics(clickedEl, artist, songTitle);
  }
});

close.addEventListener("click", e => {
  e.preventDefault();
  e.target.parentElement.classList.add("hide");
});
