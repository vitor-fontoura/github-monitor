import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CommitListContainer from "./containers/CommitListContainer";
import RepoCreateContainer from "./containers/RepoCreateContainer";

import * as repositoryAPI from "./api/RepositoryAPI";
import * as commitAPI from "./api/CommitAPI";

const App = (props) => {
  const [repositories, setRepositories] = useState([]);
  const getRepos = () => {
    repositoryAPI.getRepositories().then((response) => {
      setRepositories(response.payload.results);
    });
  };
  useEffect(getRepos, []);
  return (
    <Router>
      <div id="wrapper" className="toggled">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/">Github Monitor</Link>
            </li>
            {repositories.map((repository, index) => (
              <li className="text-white" key={repository.name + "|" + index}>
                <a
                  href="#"
                  onClick={() => {
                    commitAPI.getPaginatedCommits(null, {
                      params: { repository__name: repository.name },
                    });
                  }}
                >
                  {repository.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <RepoCreateContainer getRepos={getRepos} />
            <Switch>
              <Route path="/" exact component={CommitListContainer} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default App;
