# Movieland 

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Pull Request comments

### APP.JS

- **LINE 0**: 
Consider renaming `App.js` file to `App.jsx` for consistency.
  
- **LINE 4**:
Why are we importing `'reactjs-popup/dist/index.css'` from a `dist` folder? Even if it's a valid import, please put style imports at the end of imports.

- **LINE 6**:
Consider storing `API_KEY` in an env variable. It should not be exposed on the client code.

- **LINE 16**:
Instead of a two-liner, can be safely destructured like `const { movies } = useSelector((state) => state)`. This slice's initial state is an empty array so it should not throw an error. The same applies for other `useSelectors` where destructuring can be used to keep it in one line.

- **LINE 21**:
It's good practice to define the initial `useState` value, e.g., `null` in this case.

- **LINE 22**:
`isOpen` is not used.

- **LINE 25**:
`closeModal` is not used.

- **LINE 27**:
`closeCard` function is empty.

- **LINE 33**:
Stick to template literals, please. It's more readable.

- **LINE 46**:
`getMovies()` is quite similar to `getSearchResults()`, with both handling fetching for `SEARCH` and `DISCOVER` endpoints. Maybe this can be refactored so that one sets params while the other handles fetching?

- **LINE 48**:
Stick to one indentation variant, please. Additionally, I suggest using template literals throughout for better readability.

- **LINE 60**:
Perhaps it's worth extracting some logic, like `gettingMovie()` and returning `videoKey`, into a separate custom hook to make `App.js` more readable.

- **LINE 67**:
Consider using optional chaining instead of `&&` for shorter and more readable code.

- **LINE 68**:
Avoid "magical strings". Place strings in constants instead please.

- **LINE 75**:
The array dependency is empty in `useEffect()`, so it will only run once when the component renders for the first time. This is probably not intended?

- **LINE 87**:
Avoid inline styles. Use classes instead. It might also be worth having the text in a constant. Additionally, capitalize the first word in this sentence.


### HEADER.JSX
- **LINE 4**: 
Please stick to one convention of writing import lines, either no spaces or spaces to seperate import types between import lines.
  
- **LINE 33**:
Not sure if wrapping input with `Link` is the best way to handle routing. Consider simply adding an `onClick` handler to the input and navigate programmatically to home route.

- **LINE 34**:
Please change the event handler from `onKeyUp` to `onChange` as it covers more/all scenarios.

### MOVIE.JSX
- **LINE 19**:
Direct DOM manipulation is not recommended in React, especially DOM traversal which relies on the DOM structure staying the same, making it prone to errors. Write the 'opened' class conditionally inside a template literal in `className` in the `div` you want, and use a boolean `useState` to either show it or not.
  
- **LINE 24**:
Here you can set the state for the boolean mentioned in the LINE 19 suggestion.

- **LINE 30**:
No need to use `map` and `includes` if you're interested in just a boolean. `some()` should suffice as it returns a boolean.

- **LINE 33**:
Optionally, the movie object can be destructured to make the code a bit cleaner.

- **LINE 47**:
Same as line 30, please.

- **LINE 64**:
`onClick={myClickHandler}` suffices. `myClickHandler` is already defined to accept an 'e' parameter, you don't need to pass it "manually", it's done automatically.

### MOVIES.JSX
- **LINE 8**:
Ensure that you pass down only the results array. Also, having a data slice named `movies` with a property also named `movies` can be a bit confusing, especially as the app grows. Consider refactoring to distinguish both.

### STARRED.JSX
- **LINE 9 & LINE 10**:
Consider destructuring state to combine these lines into one.

- **LINE 19**:
Please fix the indentation.

- **LINE 28**:
That's not a place for a `<footer>` tag.

- **LINE 33**:
The condition here and the condition on line 16 can be combined into one ternary condition.

### WATCHLATER.JSX
- **LINE 5**:
The component is importing styles for the `Starred` component. It should have a separate styles file. If styles are reused across both components, consider using mixins to encapsulate common styles that can be shared.

- **LINE 9 & LINE 10**:
As before, consider destructuring state to combine these lines.

- **LINE 19**:
Please fix the indentation.

- **LINE 28**:
That's not a place for a `<footer>` tag.

- **LINE 33**:
The condition here and the one on line 16 can be combined into a ternary condition. Also, `Starred.jsx` and `WatchLater.jsx` share a similar structure. For instance, the empty cart div info or button, these can be extracted to shared components folder.

### MOVIES.SCSS
- **LINE 19**:
It's a good idea to keep styles for the `Movies` component here, while moving those for a single `Movie` component (like a card) to a separate scss file. Additionally, consider using BEM to structure classes with some not-too-deep nesting for better readability.

- **LINE 94**:
Since Bootstrap is in the project scope, maybe use globally available variables for colors where possible ofc.

- **LINE 146**:
Consider defining some mixins for media queries since there are several of them, which would make the code more readable and add some consistency in uing them.

- **LINE 268**:
It's not good practice to position an element absolutely "hoping" it's going to fit between other relatively positioned elements :), as this can lead to UI bugs where the absolutely positioned element overflows the relative ones.

### STARRED.SCSS
- **LINE 18**:
The `back-button` class doesn't appear to be used in this component (or I might be missing something).

### HEADER.SCSS
- **LINE 74**:
Please use hex for colors. Also, if a color is reused only in this file, consider local variable. Ideally, the color should be part of the "global" set/theme of colors for a particular site, reused among components and available globally.
