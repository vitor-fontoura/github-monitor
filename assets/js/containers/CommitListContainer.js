import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

class CommitListContainer extends React.Component {
  componentDidMount() {
    const params = { params: Object.fromEntries(new URLSearchParams(window.location.search).entries())}
    commitAPI.getPaginatedCommits(null, params)
  }

  pageHandler = (url, params) => {
    //if(url)
    //  params = Object.assign(params, Object.fromEntries(new URLSearchParams(url.split("?").pop())))

    commitAPI.getPaginatedCommits(url, {params: params});
  };

  filter = (field, value) => {
    let params = {};
    params[field] = value
    commitAPI.getPaginatedCommits(null, {params: params});
  }

  render() {
    const {commits, next, previous, count, page} = this.props;
    return (
      <div>
        <CommitList
          commits={commits}
          next={next}
          previous={previous}
          count={count}
          pageHandler={this.pageHandler}
          filter={this.filter}
          page={this.page || 1}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  next: store.commitState.next,
  previous: store.commitState.previous,
  count: store.commitState.count,
});

export default connect(mapStateToProps)(CommitListContainer);
