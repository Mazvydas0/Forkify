# Forkify Project

Recipe application with custom recipe uploads.
Forkify is a web application designed for food enthusiasts who want to explore new recipes, bookmark their favorites, upload their own. Finally, to create a shopping list for needed ingredients.

# Features
1. **Search for recipes:** Users can search for recipes by entering a query in the search bar. The application will display a preview list of matching recipes. When any is selected, image, ingredients and other info will be displayed.
2. **Filter search results:** Users can sort the search results by cooking time or the number of ingredients (in ascending order).
3. **Recipe details:** Clicking on a recipe in the search results will display a detailed view of the recipe, including ingredients, cooking time, servings and a link to the original source.
4. **Adjust servings:** Users can adjust the number of servings for a recipe and the ingredient quantities will be updated accordingly.
5. **Bookmark recipes:** Users can bookmark their favorite recipes for easy access later. Bookmarked recipes are stored in the browser's local storage and can be viewed in the "Bookmarks" section.
6. **Shopping list:** Users can add ingredients from a recipe to their shopping list. The application will consolidate duplicate items and update the quantities accordingly. Users can also delete items from their shopping list.
7. **Upload custom recipes:** Users can upload their own recipes to the application, providing details such as ingredients, cooking time, servings, etc. Custom recipes are bookmarked by default, and will appear in the search if looked for.

# Technologies used
1. JavaScript (ES6+): The core language used for scripting and handling application logic.
2. HTML5: Markup language used for structuring the content of the application.
3. SASS: A CSS preprocessor that allows you to use variables, nested rules, and other features to make CSS more maintainable and organized.
4. npm: Package manager for JavaScript and the world's largest software registry.
5. Babel: A JavaScript compiler that converts ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

# Getting started
To get started with Forkify, follow these steps:

1. Clone the repository: 
```bash
git clone https://github.com/Mazvydas0/Forkify.git
```

2. Change to the project directory:
```bash
cd mapty
```

3. Install needed dependencies:
```bash
npm install
```

4. Build the project:
```bash
npm run build
```

5. Run the project:
```bash
npm run start
```

6. Start exploring the application

# Structure
The application is built using JavaScript mvc architecture (model-view-controller), with the main following components:
- **model.js:** Contains the application's data model and functions for interacting with the API, local storage, and state management.
- **controller.js:** Manages the interaction between the data model and views, handling user input and updating the UI.
- **views:** A directory containing view modules for rendering different parts of the application, such as search results, recipe details, bookmarks, and shopping lists.

# License
Design and concept by Jonas Schmedtmann. Developed by GitHub user Mazvydas0. Forkify is released under the MIT License.
