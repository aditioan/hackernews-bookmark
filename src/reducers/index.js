import { ADD_BOOKMARK, DELETE_BOOKMARK } from "../constants/action-types";

const initialState = {
  bookmarkLists: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return { ...state, bookmarkLists: [...state.bookmarkLists, action.payload] };
    case DELETE_BOOKMARK:
      return { ...state, bookmarkLists: state.bookmarkLists.filter((item) => item.id !== action.payload.id) };
    default:
      return state;
  }
};

export default rootReducer;