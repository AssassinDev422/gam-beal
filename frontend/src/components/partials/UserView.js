import React, {Component, PropTypes} from 'react';
import * as actions from '../../actions/users';
import { Link } from 'react-router';
import { connect } from 'react-redux';
var _ = require('lodash');

class UserView extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }
    constructor() {
        super();
    }

    render() {
        const loading = this.props.asyncValidating || this.props.submitting;
        const user = this.props.user;
        const receipts = user ? user.receipts : [];
        return ( 
            <div className="col-lg-12">
                <div className="row">
                    <div className="form-body col-lg-5 col-lg-offset-0">
                        <div className="row form-header">
                            User: {user.id}   
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Profile Image:
                                    </td>
                                    <td>
                                        <img src={user.image_url}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User Email:
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        PayPal Email Address:
                                    </td>
                                    <td>
                                        {user.paypal}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Phone Number:
                                    </td>
                                    <td>
                                        {user.phone_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        DOB:
                                    </td>
                                    <td>
                                        {user.birthdate}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Pending Balance:
                                    </td>
                                    <td>
                                        {user.pending_money}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Current Balance:
                                    </td>
                                    <td>
                                        {user.available_money}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Offers Redeemed:
                                    </td>
                                    <td>
                                        {user.offers_redeemed}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Lifetime Earnings:
                                    </td>
                                    <td>
                                        {user.lifetime_earnings}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date Joined:
                                    </td>
                                    <td>
                                        {user.date_joined}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserView;
