# MongoDB and Express.js REST API sample application

This repository contains the code for calling a rest API app, from server and a React redux front end to consume data fro the API

## How To Run

1. You can follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide, to learn how to create a free Atlas account, create your first cluster and get your Connection String to the database. 
Then, set the Atlas URI connection parameter in `server/config.env` to your Connection String:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

3. Start the React app:
```
cd app/listings/
npm install
npm start
```
