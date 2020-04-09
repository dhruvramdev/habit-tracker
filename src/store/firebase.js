import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtuMdd2IANXvNV5CHqbhpKaRbEF0Yzt0A",
    authDomain: "unfuck-yourself.firebaseapp.com",
    databaseURL: "https://unfuck-yourself.firebaseio.com",
    projectId: "unfuck-yourself",
    storageBucket: "unfuck-yourself.appspot.com",
    messagingSenderId: "513954573003",
    appId: "1:513954573003:web:3202d83268cee3d469094e",
    measurementId: "G-TE5770NNMH"
};

firebase.initializeApp(firebaseConfig);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
//     console.log("Persistence Done");
// }).catch(err => {
//     console.error(err);
//     console.log("Unable to Set Persistence");
// });

export default firebase;
