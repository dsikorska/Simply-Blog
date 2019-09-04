import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    redirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true });

        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { error: null, loading: false, token: action.token });

        case actionTypes.AUTH_FAIL:
            return updateObject(state, { error: action.error, loading: false });

        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null });

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { redirectPath: action.redirectPath });

        default:
            return state;
    }
}

export default reducer;