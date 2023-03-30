const searchMeals = () => {
  event.preventDefault();
  const searchField = document.getElementById("search-field").value;

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals === null) {
        document.getElementById("notification").classList.add("show");
      } else {
        document.getElementById("notification").classList.remove("show");
        displayMeals(data.meals);
        document.getElementById("search-field").value = "";
      }
    })
    .catch((error) => console.log(error));
};

// Show details
const displayMealDetails = (mealId) => {
  // fetch meal details
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      // create a new div to display details
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "meal-details";
      detailsDiv.innerHTML = `
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${meal.strMeal}</h3>
            <h4 class="card-subtitle mt-2 mb-2 text-muted">Ingredients</h4>
            <ul class="list-unstyled mt-3 check-box">
              ${getIngredientsList(meal)}
            </ul>
          </div>
        `;

      // add the details div to the meal container
      const mealContainer = document.getElementById("meal-container-details");
      mealContainer.innerHTML = "";
      mealContainer.appendChild(detailsDiv);
    });
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.className = "card search-result shadow";
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top"  onclick="displayMealDetails('${meal.idMeal}')">
        <div class="card-body" onclick="displayMealDetails('${meal.idMeal}')">
          <h5 class="card-text text-center">${meal.strMeal}</h5>
        </div>
      `;
    mealContainer.appendChild(div);
  });
};

const getIngredientsList = (meal) => {
  let li = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      li += `<li><span><i class="fas fa-check-square"></i></span> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    } else {
      break;
    }
  }
  return li;
};
