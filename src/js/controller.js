import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import shoppingListView from './views/shoppingListView.js';
import addRecipeView from './views/addRecipeView.js';

import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

// import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function (sortBy = '') {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) {
      toggleSortDropdown(false);
      return;
    }

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

    // 5) Show the sorting drop-down menu
    toggleSortDropdown(true);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlShoppingList = function () {
  shoppingListView.render(model.state.shoppingListItems);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
//TODO
const controlAddToShoppingList = function () {
  model.addShoppingListItem(model.state.recipe.ingredients);

  shoppingListView.render(model.state.shoppingListItems);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const fetchFullRecipeData = async function (recipes) {
  const fullRecipes = await Promise.all(
    recipes.map(async recipe => {
      await model.loadRecipe(recipe.id);
      return model.state.recipe;
    })
  );
  return fullRecipes;
};

const toggleSortDropdown = function (show) {
  const sortDropdown = document.querySelector('.sort-container');
  sortDropdown.style.display = show ? 'block' : 'none';
};

const controlSortSearchResults = async function (sortBy) {
  try {
    resultsView.renderSpinner();

    // Fetch complete recipe data for all search results
    const fullRecipes = await fetchFullRecipeData(model.state.search.results);

    if (sortBy === 'duration') {
      fullRecipes.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (sortBy === 'ingredients') {
      fullRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
    }

    // Replace the search results in the state with the sorted full recipe data
    model.state.search.results = fullRecipes;

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlDeleteIngredient = function (id) {
  const btn = document.getElementById(`${id}`);
  btn.closest('.ingredients_list').remove();

  const indexToRemove = model.state.shoppingListItems.findIndex(
    item => item.id === +id
  );
  model.state.shoppingListItems.splice(indexToRemove, 1);
  model.persistShoppingList();
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  shoppingListView.addHandlerRender(controlShoppingList);
  shoppingListView.AddHandlerDeleteIngredient(controlDeleteIngredient);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerAddToShoppingList(controlAddToShoppingList);
  searchView.addHandlerSearch(controlSearchResults);

  searchView.getSortDropdown().addEventListener('change', function (e) {
    controlSortSearchResults(e.target.value);
  });

  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
