// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.

/**
 * recipes links
 */
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/recipe_1.json',
  'assets/recipes/recipe_2.json',
  'assets/recipes/recipe_3.json'
];

const first_three = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
];

const next_three = [
  'assets/recipes/recipe_1.json',
  'assets/recipes/recipe_2.json',
  'assets/recipes/recipe_3.json'
]


// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    // console.log('Recipe fetch unsuccessful');
    return;
  };

  // console.log("in init recipeData = ", recipeData);
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional

  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    for (let i = 0; i < recipes.length; i++) {
      fetch(recipes[i])
        .then(response => response.json())
        .then(data => {
          // console.log(recipes[i]);
          // console.log(data);
          recipeData[recipes[i]] = data;

          // console.log(Object.keys(recipeData).length); 

          if (Object.keys(recipeData).length == recipes.length) {
            resolve(true);
          }

        })

        .catch((error) => {
          // console.log(error);
          reject(false);
        })
    }

    // console.log("outside for loop"); 
    // resolve(true); 
    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  // console.log("inside createRecipeCards()")
  // console.log("inside createRecipeCards()", recipeData);
  let main_window = document.querySelector("main");
  // console.log("main: ", main_window);

  /** 
  for (const [key, value] of Object.entries(recipeData)) {
    console.log("key", key);
    console.log("value", value);

    let recipe_in_main = document.createElement("recipe-card"); 
    recipe_in_main.data = value; 
    main_window.appendChild(recipe_in_main);     
  }
  */

  for (let i = 0; i < first_three.length; i++) {
    let recipe_in_main = document.createElement("recipe-card");
    recipe_in_main.data = recipeData[first_three[i]];
    main_window.appendChild(recipe_in_main);
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  // console.log("inside bindShowMore() function");
  var button_wrapper = document.querySelector("#button-wrapper");
  var button = button_wrapper.querySelector('button');
  // console.log("button-wrapper", button);

  button.addEventListener('click', function () {
    more_recipe_card(button_wrapper)
  });

}

function more_recipe_card(button_wrapper) {
  let main_window = document.querySelector("main");
  let button = button_wrapper.querySelector('button');
  let img_ele = button_wrapper.querySelector('img');

  for (let i = 0; i < next_three.length; i++) {
    let recipe_in_main = document.createElement("recipe-card");
    recipe_in_main.data = recipeData[next_three[i]];
    main_window.appendChild(recipe_in_main);
  }

  button.textContent = "Show Less";
  button.addEventListener('click', function () {
    main_window.textContent = "";
    button.textContent = "Show more";

    button.addEventListener('click', function () {
      more_recipe_card(button_wrapper)
    });

    createRecipeCards();
  });

}
