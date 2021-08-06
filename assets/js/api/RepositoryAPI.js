import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getRepositoriesSuccess, createRepositoryValidationErrors
} from '../actions/RepositoryActions';
export const getRepositories = () => axios.get(`/api/repositories/`)
  .then((response) => {
    return store.dispatch(getRepositoriesSuccess({...response.data}));
  });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    store.dispatch(createRepositoryValidationErrors({}))
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    const err = error.response;
    if (err.status === 400) {
      store.dispatch(createRepositoryValidationErrors(err.data))
    } else {
      console.log(err.status);
    }
  });
