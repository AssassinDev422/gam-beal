import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {getWithdrawal} from '../../actions/withdrawals';
import * as withActions from '../../actions/withdrawals';
import RequestView from '../partials/RequestView';
var _ = require("lodash");

class RequestViewPage extends Component {

    componentDidMount() {
        if(this.props.routeParams.requestID){
            console.log('requestid', this.props.routeParams.requestID);
            this.props.dispatch(getWithdrawal(this.props.routeParams.requestID));
        }
    }

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.users[auth.user_id];
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const back = () => {
            this.props.history.goBack();
        }
        console.log(this.props);
        return (
            <div>
                <NavBar user={user} active="withdrawals"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Withdraw Request: {this.props.withdrawals.request.id}
                            </div>
                            <RequestView history={this.props.history} request={this.props.withdrawals.request} back={back}/>
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
    withdrawals: state.withdrawals,
  };
}
export default connect(mapStateToProps
)(RequestViewPage);
