import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link , Router} from 'react-router';

import LoginForm from '../forms/LoginForm';
import * as actions from '../../actions/auth';

class LoginPage extends Component {

  render() {
    
    return (
      <div>
        <LoginForm />
        <div id="footer">
          Copyright © Gambeal 2016
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(
  mapStateToProps
)(LoginPage);
