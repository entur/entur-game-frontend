# Norgestur

This game was developed during a hackathon by

[@Artur](https://github.com/apkrauze), [@Kenneth](https://github.com/kennetng) and [@Daniel](https://github.com/Daniel-Jansson)
based on the game [entur-game](https://github.com/entur/entur-game) created by [@Mats](https://github.com/draperunner)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Docker

### Run entur-game-frontend with docker locally

```
docker build -t entur-game-frontend .
docker run -p 3000:3000 entur-game-frontend
```
