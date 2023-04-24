import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  ingredientsContainer = document.getElementById('ingredients-container');
  addIngredientBtn = document.getElementById('add-ingredient');
  removeIngredientBtn = document.getElementById('remove-ingredient');
  ingredientCount = 0;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // Initialize with the first ingredient input
    this.addIngredient.bind(this);

    this.addIngredientBtn.addEventListener(
      'click',
      this.addIngredient.bind(this)
    );
    this.removeIngredientBtn.addEventListener('click', this.removeIngredient.bind(this))
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // to bind to the main class object, and not the element, calling the event, as it would be without bind
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // because we're inside handler function and this points to form (parentElement)
      const data = Object.fromEntries(dataArr);
      location.reload();
      handler(data);
    });
  }

  createIngredientInput(count) {
    const label = document.createElement('label');
    label.textContent = `Ingredient ${count}`;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `ingredient-${count}`;
    input.placeholder = "Format: 'Quantity,Unit,Description'";
    // input.pattern = '^\\d*\\s*,?\\s*[a-zA-Z]*\\s*,?\\s*[a-zA-Z]*$';
    input.pattern = '^\\d*([.,]\\d+)?,{1}[a-zA-Z]*,{1}[a-zA-Z]*$';
    input.title = "Please follow the format: 'Quantity,Unit,Description'";

    const div = document.createElement('div');
    div.className = 'ingredient-input';
    div.appendChild(label);
    div.appendChild(input);

    return div;
  }

  addIngredient() {
    const ingredientInput = this.createIngredientInput(
      this.ingredientCount + 1
    );
    this.ingredientsContainer.appendChild(ingredientInput);
    this.ingredientCount++;
  }

  removeIngredient() {
    if (this.ingredientCount > 1) {
      this.ingredientsContainer.lastChild.remove();
      this.ingredientCount--;
    }
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
