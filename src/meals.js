fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".container");
    data.meals.forEach((meal) => {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      )
        .then((response) => response.json())
        .then((data) => {
          const fullMeal = data.meals[0];
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                  <img src="${fullMeal.strMealThumb}" alt="${fullMeal.strMeal}">
                  <h2>${fullMeal.strMeal}</h2>
                  <p>${fullMeal.strInstructions}</p>
                  <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                      ${getIngredientsList(fullMeal)}
                    </ul>
                  </div>
                `;
          container.appendChild(card);
        });
    });
  });

function getIngredientsList(meal) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients += `<li>${ingredient} - ${measure}</li>`;
    }
  }
  return ingredients;
}
