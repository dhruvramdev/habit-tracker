import { createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers';
import {DESTROY_STATE} from "../actions/constants";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


const rootReducer = (state, action) => {
    if (action.type === DESTROY_STATE)
        state = undefined;

    return appReducer(state, action);
};

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
}
