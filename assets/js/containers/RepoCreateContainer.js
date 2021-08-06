import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as repositoryAPI from '../api/RepositoryAPI';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return repositoryAPI.createRepository(v, {'X-CSRFToken': token}, dispatch)
      .then((response) => {
        this.props.getRepos()
        commitAPI.getCommits()
        return response
      });
  };

  render() {
    const {successMessage, errors} = this.props;
    return <Form onSubmit={this.submit} successMessage={successMessage} errors={errors} />;
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.repositoryState.successMessage,
  errors: store.repositoryState.errors,
});

export default connect(mapStateToProps)(RepoCreateContainer);
