import React, {Component, PropTypes} from 'react';
import * as actions from '../../actions/ratings';
import {getRating} from '../../api/ratings';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {updateReceipt} from '../../actions/receipts';
var _ = require('lodash');

class ReceiptView extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    render() {
        const loading = this.props.asyncValidating || this.props.submitting;
        const receipt = this.props.receipt;
        const rating = receipt.rating;
        const accept = () => {
            this.props.dispatch(updateReceipt(receipt.id, 'approved'));
            this.props.history.goBack();
        };
        const decline = () => {
            this.props.dispatch(updateReceipt(receipt.id, 'denied'));
            this.props.history.goBack();
        };

        const rating_field = rating ? (                                    
            <div>
                <div className="row form-header">
                    Rating Details   
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Rating:
                            </td>
                            <td>
                                {rating.rating}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Would Come Back:
                            </td>
                            <td>
                                {rating.would_return}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Comments:
                            </td>
                            <td>
                                {rating.comments}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            ) : null;
        return ( 
            <div className="col-lg-12">
                <div className="row">
                    <div className="form-body col-lg-5 col-lg-offset-0">
                        <div className="row form-header">
                            Receipt Information   
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Receipt ID:
                                    </td>
                                    <td>
                                        {receipt.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User Email:
                                    </td>
                                    <td>
                                        {receipt.user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Receipt Status:
                                    </td>
                                    <td>
                                        {receipt.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Reward Value:
                                    </td>
                                    <td>
                                        {receipt.money_earned}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Submit Time:
                                    </td>
                                    <td>
                                        {receipt.submit_time}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row form-header">
                            Offer Information   
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Business Name:
                                    </td>
                                    <td>
                                        {receipt.offer.business.business_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Reward Type:
                                    </td>
                                    <td>
                                        {receipt.offer.offer_type}(${receipt.offer.min_reward}-${receipt.offer.max_reward})
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Minimum Spend Limit:
                                    </td>
                                    <td>
                                        ${receipt.offer.minimum_spend_amount}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Business Logo:
                                    </td>
                                    <td>
                                        <img className="logoimg" src={receipt.offer.business.logo_img}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {rating_field}
                    </div>
                    <div className="form-body col-lg-5">
                        <div className="row form-header">
                            Receipt Image   
                        </div>
                        <div className="row form-field"> 
                            <div className="row">
                            </div>
                            <img className="fimg" src={receipt.receipt_img}/>
                        </div>
                        <div className="row form-field"> 
                            <div className="row">
                                <div className="col-lg-3">Offer Rules:
                                    <div>
                                        {receipt.offer.business.receipt_rules}
                                    </div>
                                </div>

                            </div>
                        </div>
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
    offers: state.offers,
  };
}
export default connect(mapStateToProps
)(ReceiptView);
