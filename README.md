# Highpoint Exercise
## Current State
Objects are displayed in a paginated view, and clicking one brings up a modal with more details about the piece.
Objects can be filtered by department. When content is being loaded that is communicated to the user and furthur action is blocked. If there isn't an image to display, I show a fallback. On mobile, the gallery is displayed in two columns, and on larger screens it's displayed in five.

# Future Improvement
Loading is slow, and we should only fetch the current page of results instead of everything. We could potentially cache results and/or pre fetch the next page of results to cut down on load times.

The UI could be a lot nicer, and display more about each piece.

I could add a router and the details view could be its own page with unique URLs for each piece.

There's currently no logic to determine the number of pages in a result set, which can lead to navigating beyond the number of results. I could add this and prevent the Next button being clicked when we are on the last page.

I kept getting errors when trying to use the search endpoint and was unable to implement the search by title/ID feature due to this.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
