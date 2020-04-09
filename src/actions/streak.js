import firebase from "../store/firebase";

import {NO_DATA_STREAK, UPDATE_STREAK} from "./constants";

const db = firebase.firestore();
const streakCollection = db.collection('streak');

export function getStreak() {
    return async (dispatch, getState) => {
        try {
            const reduxState = getState();
            const userUID = reduxState.auth.user.uid;
            const doc = await streakCollection.doc(userUID).get();
            console.log(doc);
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch(updateStreak(doc.data()));
            } else {
                dispatch(noStreakData());
                console.log("No such document!");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function setStreak(startDate) {
    return async (dispatch, getState) => {
        try {
            const reduxState = getState();
            const userUID = reduxState.auth.user.uid;
            const dd = {
                startDate: firebase.firestore.Timestamp.fromDate(startDate.toDate())
            };
            await streakCollection.doc(userUID).set(dd);
            dispatch(updateStreak(dd));
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function updateStreak(userData) {
    return {
        type: UPDATE_STREAK,
        payload: userData
    };
}

export function noStreakData() {
    return {
        type: NO_DATA_STREAK,
    };
}


