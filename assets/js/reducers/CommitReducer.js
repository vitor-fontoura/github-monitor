import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  successMessage: false,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.results),
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count
      };
    default:
      return state;
  }
};

export default commitReducer;
