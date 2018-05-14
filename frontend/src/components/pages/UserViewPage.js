import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {getUser} from '../../actions/users';
import * as recActions from '../../actions/users';
import UserView from '../partials/UserView';
import UserForm from '../forms/UserForm';
var _ = require("lodash");

class UserViewPage extends Component {

    componentDidMount() {
        if(this.props.routeParams.userID){
            this.props.dispatch(getUser(this.props.routeParams.userID));
        }
    }

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.user;
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const back = () => {
            this.props.history.goBack();
        }
        return (
            <div>
                <NavBar user={user} active="users"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                :
                            </div>
                            <UserForm history={this.props.history} user={user} back={back}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
    general: state.general
  };
}
export default connect(mapStateToProps
)(UserViewPage);
