const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  allMeals = document.getElementById("meals"),
  heading = document.getElementById("heading"),
  singleMeal = document.getElementById("single-meal");

const searchMeal = e => {
  e.preventDefault();
  singleMeal.innerHTML = "";
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        heading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          heading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          allMeals.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
              ${
                meal.strYoutube
                  ? `<a href=${meal.strYoutube}>Watch Video</a>`
                  : ``
                }
            </div>
          `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
};

const getMealById = mealID => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};

const getRandomMeal = () => {
  allMeals.textContent = "";
  heading.textContent = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};

const addMealToDOM = meal => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${
    meal.strCategory
      ? `<p><strong>Category:</strong>${meal.strCategory}</p>`
      : ""
    }
        ${meal.strArea ? `<p><strong>Country:</strong>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        ${meal.strYoutube ? `<a href=${meal.strYoutube}>Watch Video</a>` : ``}
      </div>
    </div>
  `;
};

allMeals.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

submit.addEventListener("submit", e => searchMeal(e));
random.addEventListener("click", getRandomMeal);
