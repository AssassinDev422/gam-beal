import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as apiActions from '../actions/api';
import * as auth from '../actions/auth';

import LoadingIndicator from './partials/LoadingIndicator';

var styles = require("../../styles/main.scss");

class App extends Component {

  componentDidMount() {
    this.props.dispatch(apiActions.loadInitialData());
  }

  render() {
    // Injected by React Router
    const { location, children, auth: {logged_in, email, user_id}, general: {loading, search_query}} = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    const logout = this.props.dispatch.bind(this, auth.logout());
    var contents;

    if (loading.length >= 1) {
      contents = (<LoadingIndicator />);
    } else {
      contents = children;
    }

    return (
      <div className="app">
        {contents}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
    general: state.general
  };
}

export default connect(
  mapStateToProps
)(App);
