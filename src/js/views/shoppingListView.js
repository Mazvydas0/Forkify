import View from './View.js';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-cart');
  _errorMessage = 'Shopping cart is empty ;) Add some products';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(
        ShoppingListItem =>
          `<div class="ingredients_list" id=${ShoppingListItem.id}>
          <div class="shopping-count">
          <input type="number" value="${ShoppingListItem.quantity}" step="0.1" class="shopping__count-value"></input>
          <p class="unit">${ShoppingListItem.unit}</p>
          </div>
          <p class="shopping__description">${ShoppingListItem.description}</p>
           <button class="close-button" id=${ShoppingListItem.id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"          stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        `
      )
      .join('');
  }

  AddHandlerDeleteIngredient(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.close-button');
      if (!btn) return;
      handler(btn.id);
    });
  }
}

export default new ShoppingListView();
