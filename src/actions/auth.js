import firebase from "../store/firebase";
import {UPDATE_USER} from "./constants";

export function loginWithFirebase(email, password) {
    return async (dispatch) => {
        try {
            const data = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(data);
            dispatch(updateUser(data.user));
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function registerWithFirebase(email, password) {
    return async (dispatch) => {
        try {
            const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(data);
            dispatch(updateUser(data.user));
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function setUser(userData) {
    return (dispatch) => {
        dispatch(updateUser(userData));
    };
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        payload: userData
    };
}
