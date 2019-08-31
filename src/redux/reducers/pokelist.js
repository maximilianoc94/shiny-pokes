import { RECEIVE_POKE_DATA } from '../actions';

export default function pokelistReducer(state = {}, { type, payload }) {
  switch (type) {
    case RECEIVE_POKE_DATA:
      return { ...state, response: payload };
    default:
      return { ...state };
  }
}
