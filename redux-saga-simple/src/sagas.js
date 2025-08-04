import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USERS_FAILURE, GET_USERS_FETCH, GET_USERS_SUCCESS } from "./actions";

function usersFetch() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}

function* workGetUsersFetch() {
    try {
        const users = yield call(usersFetch);
        yield put({ type: GET_USERS_SUCCESS, users });
    } catch (error) {
        yield put({ type: GET_USERS_FAILURE, error: error.message });
    }
}

function* myFirstSaga() {
    yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
}

export default myFirstSaga;