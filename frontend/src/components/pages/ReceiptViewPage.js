import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {getReceipt} from '../../actions/receipts';
import * as recActions from '../../actions/receipts';
import ReceiptView from '../partials/ReceiptView';
var _ = require("lodash");

class ReceiptViewPage extends Component {

    componentDidMount() {
        if(this.props.routeParams.receiptID){
            this.props.dispatch(getReceipt(this.props.routeParams.receiptID));
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
        return (
            <div>
                <NavBar user={user} active="restaurants"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                :
                            </div>
                            <ReceiptView history={this.props.history} receipt={this.props.receipts.receipt} back={back}/>
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
    receipts: state.receipts,
  };
}
export default connect(mapStateToProps
)(ReceiptViewPage);
