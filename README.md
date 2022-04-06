# IoT fullstack app

This repository contains the code for calling a rest API app, from the server and a React redux front end to consume data from the API

## How To Run

1. Set the Mongodb URI connection parameter in `server/config.env` to your Connection String:
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
cd app/
npm install
npm start
```
