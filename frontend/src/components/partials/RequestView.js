import React, {Component, PropTypes} from 'react';
import * as actions from '../../actions/withdrawals';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {updateWithdrawal} from '../../actions/withdrawals';
var _ = require('lodash');

class RequestView extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    render() {
        const loading = this.props.asyncValidating || this.props.submitting;
        const request = this.props.request;
        console.log('request', request);
        const accept = () => {
            this.props.dispatch(updateWithdrawal(request.id, 'accepted'));
            this.props.history.goBack();
        };
        const decline = () => {
            this.props.dispatch(updateWithdrawal(request.id, 'rejected'));
            this.props.history.goBack();
        };
        return ( 
            <div className="col-lg-12">
                <div className="row">
                    <div className="form-body col-lg-5 col-lg-offset-0">
                        <div className="row form-header">
                            Request Information   
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Request ID:
                                    </td>
                                    <td>
                                        {request.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Paypal Email:
                                    </td>
                                    <td>
                                        {request.user.paypal}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User Email:
                                    </td>
                                    <td>
                                        {request.user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Request Status:
                                    </td>
                                    <td>
                                        {request.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Request Amount:
                                    </td>
                                    <td>
                                        {request.amount}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Submit Date:
                                    </td>
                                    <td>
                                        {request.date}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-3 col-lg-offset-2 row-padded form-buttons">
                        <button type="button" onClick={decline} className="grey-button">Decline</button>
                        <button type="button" onClick={accept} className="active-button">Accept Receipt </button>
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
)(RequestView);
