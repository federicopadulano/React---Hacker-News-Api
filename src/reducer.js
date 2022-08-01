import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        setLoading: true,
      };
    case SET_STORIES:
      return {
        ...state,
        setLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextValue = state.page + 1;
        if (nextValue > state.nbPages - 1) {
          nextValue = 0;
        }
        return {
          ...state,
          page: nextValue,
        };
      }
      if (action.payload === "dec") {
        let prevValue = state.page - 1;
        if (prevValue < 0) {
          prevValue = state.nbPages - 1;
        }
        return {
          ...state,
          page: prevValue,
        };
      }
    default:
      throw new Error(`no matching "${action.type}" action`);
  }
};
export default reducer;
