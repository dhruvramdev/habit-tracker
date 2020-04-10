import firebase from "../store/firebase";
import {NO_DATA_PALETTE, UPDATE_PALETTE} from "./constants";

const db = firebase.firestore();
const paletteCollection = db.collection('palette');

export function getPalette() {
    return async (dispatch, getState) => {
        try {
            const reduxState = getState();
            const userUID = reduxState.auth.user.uid;
            const doc = await paletteCollection.doc(userUID).get();
            console.log(doc);
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch(updatePalette(doc.data()));
            } else {
                dispatch(noPalette());
                console.log("No such document!");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function setPalette(colors) {
    return async (dispatch, getState) => {
        try {
            const reduxState = getState();
            const userUID = reduxState.auth.user.uid;
            const dd = {
                colors
            };
            await paletteCollection.doc(userUID).set(dd);
            firebase.analytics().logEvent('set_palette');
            dispatch(updatePalette(dd));
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function updatePalette(paletteData) {
    return {
        type: UPDATE_PALETTE,
        payload: paletteData
    };
}

export function noPalette() {
    return {
        type: NO_DATA_PALETTE
    };
}


