const postsContainer = document.getElementById("posts");
const loading = document.querySelector(".loading");
const filter = document.getElementById("filter");
let limit = 5;
let counter;
localStorage.getItem("page") ? false : localStorage.setItem("page", JSON.stringify(1));
localStorage.getItem("data") ? false : localStorage.setItem("data", JSON.stringify([]));
let currentPage = localStorage.getItem("page");
let currentData = localStorage.getItem("data");

const getPosts = async (currentPage) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage}`
  );
  const data = await res.json();
  const cache = [...JSON.parse(currentData), ...data]
  localStorage.setItem("data", JSON.stringify(cache));
  currentData = localStorage.getItem("data");
  return JSON.parse(currentData);
};

const showPosts = async (currentPage) => {
  let totalPosts = JSON.parse(currentData);
  if(currentPage === totalPosts.length / limit) {
    posts = totalPosts;
  } else {
    posts = await getPosts(currentPage);
  }
  postsContainer.textContent = ``;
  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

const showLoading = () => {
  loading.classList.add('show');
  currentPage = localStorage.getItem("page");
  counter = JSON.parse(currentPage);
  counter++;
  localStorage.setItem("page", JSON.stringify(counter));
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      showPosts(counter);
    }, 300);
  }, 1000);
};

const filterPosts = e => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
};

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);

showPosts(JSON.parse(currentPage));
