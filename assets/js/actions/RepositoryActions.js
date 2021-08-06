import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const createRepositoryValidationErrors = errors => ({
  type: types.CREATE_REPOSITORY_VALIDATION_ERRORS,
  payload: errors,
});

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});