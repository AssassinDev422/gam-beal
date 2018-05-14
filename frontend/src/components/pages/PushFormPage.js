import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {OffersTable} from '../partials/Tables';
import {getOffer} from '../../actions/offers';
import * as offActions from '../../actions/offers';
import PushForm from '../forms/PushForm';
import {getBusinesses} from '../../actions/businesses';
var _ = require("lodash");

class PushFormPage extends Component {

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.users[auth.user_id];
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const back = () => {
            this.props.history.push('/offers/');
        }
        return (
            <div>
                <NavBar user={user} active="notifications"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Create push notifications:
                            </div>
                            <PushForm back={back}/>
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
    general: state.general,
  };
}
export default connect(mapStateToProps
)(PushFormPage);
