const firebase = require("firebase");

// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXuiJsLZbMKeEOcOHgOMJEndQ2hALmVyU",
    authDomain: "what2do-8d1d3.firebaseapp.com",
    databaseURL: "https://what2do-8d1d3.firebaseio.com",
    projectId: "what2do-8d1d3",
    storageBucket: "what2do-8d1d3.appspot.com",
    messagingSenderId: "747463899902",
    appId: "1:747463899902:web:c4944156f0e0dea54c83af",
    measurementId: "G-5W55GS8RMB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getFirebaseRef(){
    return firebase.database().ref();
}

function getFirebaseTestRef(){
    return firebase.database().ref().child('test');
}


module.exports = {
    addNewTodoItem: function(title, uid, importance){
        const testRef = getFirebaseTestRef().child('todo-items');
        const key = testRef.push().key;
        let updates = {};
        updates[key] = {
            title: title,
            importance: importance,
        };
        testRef.update(updates);
    },
};