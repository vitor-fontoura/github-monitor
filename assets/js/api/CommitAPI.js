import axios from "axios";
import store from "../store";
import { getCommitsSuccess } from "../actions/CommitActions";

export const getCommits = () =>
  axios.get(`/api/commits/`).then((response) => {
    store.dispatch(getCommitsSuccess({ ...response.data }));
  });

export const getPaginatedCommits = (url, params = null) => {
  //TODO revisar
  if (url && params) {
    let temp = url.split("?");
    if (temp.length > 1) {
      url = temp.shift();
      const query = {
        params: Object.fromEntries(
          new URLSearchParams(temp.join("?")).entries()
        ),
      };
      params.params = Object.assign(query.params, params.params);
    }
  }
  window.history.pushState({}, "", '?' + (new URLSearchParams(params.params)).toString())

  return axios.get(url || `/api/commits/`, params).then((response) => {
    store.dispatch(getCommitsSuccess({ ...response.data }));
  });
};

export const removeFilter = (filter) => {
 const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
 for (var key in params) {
     if (key === filter) {
        delete params['page']
        delete params[key];
     }
 }
 getPaginatedCommits(null, {params: params})
};
