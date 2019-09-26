# FriendFinder
https://friend-finder-cl.herokuapp.com/

FriendFinder is an app that matches users based on results of a survey they take.

### OVERVIEW:
This app has both backend and frontend files.
#### BACKEND:
1. *server.js:* Main backend file. Imports *apiRoutes.js* and *htmlRoutes.js* and sets up Express.
1. *apiRoutes.js:* Handles the "api/friends" GET and POST routes. The GET request returns data from the *friends.js* file. The POST request reads data from the *friends.js* file, then compares the scores in that file to scores the user entered. It then saves the user to the friends list and returns the friend who scored the closest.
1. *htmlRoutes.js:* Handles the webpage requests. "/survey" serves to the *survey.html* page. Other routes that do not have a . (in other words, routes that are not files) serve the *home.html* page. All other routes serve files in the "/public" folder, so that we can use external scripts and stylesheets.
#### FRONTEND:
1. *home.html:* Intro page. Has links to *survey.html* and a list of friends.
1. *survey.html:* Survey page. Users must enter their name and their responses to 10 questions. Those answers are POSTed to "api/friends". Uses *survey.js*.
1. *survey.js:* Adds listeners and functions to allow POSTing survey data and displaying results.

### HOW TO RUN:
Run server.js in node with the following structure:
```
    node .\server.js
```

### TECHNOLOGIES USED:
* Node
* Express Node module
* Heroku

### TEAM:
* Cameron Lattz, Developer