import {DESTROY_STATE} from "./constants";

export const resetStore = () => {
    return async (dispatch) => {
        dispatch({
            type: DESTROY_STATE,
        });
    };
};
