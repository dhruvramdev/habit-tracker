import produce from "immer";
import {NO_DATA_PALETTE, UPDATE_PALETTE} from "../actions/constants";

const intialState = {
    colors: [
        '#FF9AA2',
        '#FFB7B2',
        '#FFDAC1',
        '#E2F0CB',
        '#B5EAD7',
        '#C7CEEA'
    ],
    synced: false
};

const paletteReducer = produce((draft, action) => {
    console.log(action);
    switch (action.type) {
        case UPDATE_PALETTE:
            draft.colors = action.payload.colors;
            draft.synced = true;
            break;
        case NO_DATA_PALETTE:
            draft.synced = true;
    }
}, intialState);

export default paletteReducer;
