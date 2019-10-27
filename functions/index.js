const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');


admin.initializeApp();

const app = express()

app.use(cors());


app.post("/", (request, response) => {
    const entry = request.body;
    return admin.database().ref('users').push(entry)
        .then(() => {
            return response.status(200).send(entry)
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        });
});


app.get("/", (request, response) => {
    return admin.database().ref().child('users').on("value", snapshot => {
        return response.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return response.status(500).send('Oh no! Error: ' + error);
    });
});


exports.users = functions.https.onRequest(app);