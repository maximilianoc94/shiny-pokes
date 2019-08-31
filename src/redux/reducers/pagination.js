import { SET_PAGE } from '../actions';

export default function paginationReducer(state = { page: 0 }, { type, payload }) {
  switch (type) {
    case SET_PAGE:
      return { ...state, page: payload };
    default:
      return { ...state };
  }
}
