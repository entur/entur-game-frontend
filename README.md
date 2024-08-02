# Norgestur-frontend

## Introduction

Welcome to the Norgestur project! This is the 3rd version of the game, developed by summer interns in 2024. This game aims to provide an engaging and fun way to explore public transportation in Norway. Below you will find information on how to set up, run, and contribute to the project. This is the frontend of our project and works together with [entur-game-backend](https://github.com/entur/entur-game-backend).

## Developers

### 2024 Summer Team

-   [Magnus](https://github.com/Magnus-Farstad)
-   [Marianne](https://github.com/maribsta)
-   [Oscar](https://github.com/oscarahalvorsen)
-   [Selma](https://github.com/selmagudmundsen)
-   [Tomas](https://github.com/tomaswedege)

### Previous Developers

-   [Artur](https://github.com/apkrauze)
-   [Kenneth](https://github.com/kennetng)
-   [Daniel](https://github.com/Daniel-Jansson)

The initial version of the game was based on [entur-game](https://github.com/entur/entur-game) created by [Mats](https://github.com/draperunner).

## Live Demo

You can try out the game here:

-   [Staging](https://entur-game.staging.entur.org/)
-   [Production](https://entur-game.entur.org/)

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the packages

### `npm run dev`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles the app in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Secrets

The login client secret is generated in Azure and will expire on 17.7.2026. The login secrets are stored in LastPass in the folder "shared-entur-spillet". You will also find the Mapbox token in the same folder. Add all the credentials to a `.env.local` file to run the code locally.

## Docker

### Run entur-game-frontend with docker locally

docker build -t entur-game-frontend .
docker run -p 3000:3000 entur-game-frontend
