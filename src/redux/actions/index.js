export const REQUEST_POKE_DATA = 'REQUEST_POKE_DATA';
export const requestPokeData = (url) => ({ type: REQUEST_POKE_DATA, payload: url });

export const RECEIVE_POKE_DATA = 'RECEIVE_POKE_DATA';
export const receivePokeData = (data) => ({ type: RECEIVE_POKE_DATA, payload: data });

export const SET_PAGE = 'SET_PAGE';
export const storePage = (page) => ({ type: SET_PAGE, payload: page });
