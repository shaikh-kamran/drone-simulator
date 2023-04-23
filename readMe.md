# Drone Simulator

This app allow user to simulate the flight of a Drone. 

## Description

The app have a default path ( list of lat, long and timestamp ) and it draws the path of the drone on google map.

## Features
* Users can Pause and Resume the simulation using "pause" button.
* Users can add new drones by just a click of a button and uploading a json file of cordinates of its path.
* User can jump to any point of path just by click on the dot on the path. 
* All Drone's paths will be shown in different color. 

## Running in development
```bash
git clone <repo-url>
cd <app-folder>
create a file: '.env.local'
add VITE_GOOGLE_API_KEY=<your-google-api-key>
npm i
npm run dev
```