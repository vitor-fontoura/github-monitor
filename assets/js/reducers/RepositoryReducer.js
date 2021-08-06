import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
  successMessage: false,
  errors: {}
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {
        ...state,
        successMessage: action.payload.successMessage
      };
    }
    case types.CREATE_REPOSITORY_VALIDATION_ERRORS: {
      return {
        ...state,
        errors: action.payload
      }
    }
    case types.GET_REPOSITORIES_SUCCESS : {
      return {
        ...state,
        repositories: Object.values(action.payload.results),
      }
    }
    default:
      return state;
  }
};

export default repositoryReducer;
