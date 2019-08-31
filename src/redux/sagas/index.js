import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_POKE_DATA, receivePokeData } from '../actions';
import { fetchData } from '../../api';

function* getPokeData(action) {
    try {
        const requestFn = action.payload.url ? () => fetchData(action.payload.url) : fetchData;
        const data = yield call(requestFn);
        yield put(receivePokeData(data));
    } catch (error) {
        console.log(error);
    }
}

export function* pokeSaga() {
    yield takeLatest(REQUEST_POKE_DATA, getPokeData);
}
