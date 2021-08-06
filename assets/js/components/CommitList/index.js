import React from 'react';
import PropTypes from 'prop-types';
import * as commitAPI from "../../api/CommitAPI";

const CommitList = (props) => {
  const {commits, next, previous, count, pageHandler, filter} = props;
  const filters = Array.from(new URLSearchParams(window.location.search).entries()).map((item, index) => (
    item = {key: item[0], value: item[1]}
  )).filter(item => item.key !== 'page')
  
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div>Commit List</div>
                <div>
                  {filters.map((filter, index) => (
                    <span className="mx-1 badge badge-pill badge-secondary" key={index}>
                      <span style={{verticalAlign: "middle"}}>{filter.value}</span>
                      <svg onClick={() => { commitAPI.removeFilter(filter.key)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{cursor: "pointer"}}className="ml-1 bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-body">
              {commits.map((commit, index) => (
                <div key={commit.repository.name + '|' +commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <a href='#' onClick={() => filter('author', commit.author)}>{commit.author}</a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a href='#' onClick={() => filter('repository__name', commit.repository.name)}>{commit.repository.name}</a>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={(!previous ? "disabled" : "") + " page-item"}>
                    <a disabled={!previous} onClick={() => pageHandler(previous)} className="page-link" href="#" aria-disabled={!previous}>Previous</a>
                  </li>
                  {Array.from({length: Math.ceil(count / 10)}, (_, i) => i + 1).map((item, index) => (
                    <li className={(item == parseInt(next ? parseInt((new URLSearchParams(next.split('?').pop())).get('page')) - 1 : (previous ? parseInt(((new URLSearchParams(previous.split('?').pop())).get('page')) || 1) + 1 : 1)) ? "active" : "") + " page-item"} key={index}>
                      <a className="page-link" onClick={() => pageHandler(previous || next, {page: item})} href="#">{item}</a>
                    </li>
                  ))}
                  <li className={(!next ? "disabled" : "") + " page-item"}>
                    <a disabled={!next} onClick={() => pageHandler(next)} className="page-link" href="#" aria-disabled={!next}>Next</a>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitList;
