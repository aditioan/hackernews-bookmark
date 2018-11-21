import { ADD_BOOKMARK, DELETE_BOOKMARK } from "../constants/action-types";

export const addBookmark = bookmark => ({ 
	type: ADD_BOOKMARK,
	payload: bookmark 
});

export const deleteBookmark = bookmark => ({ 
	type: DELETE_BOOKMARK,
	payload: bookmark 
});