import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Slider from 'react-slick';
import NavBar from '../partials/Nav';
import * as actions from '../../actions/auth';
import {login} from '../../api/auth';
import {getMe} from '../../actions/auth';
import {getAnalytics} from '../../actions/api';

var _ = require('lodash');
var classNames = require('classnames');
var moment = require('moment');


class HomePage extends Component {

    componentDidMount() {
        this.props.dispatch(getMe());
        console.log('getting analytics');
        this.props.dispatch(getAnalytics("24"));
    }

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.users[auth.user_id];
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const update_range = event => {
            this.props.dispatch(getAnalytics(event.target.value));
        }
        return (
            <div>
                <NavBar user={user} active="home" logout={logout}/>
                <div className="content">
                    <div className="container-fluid">   
                        <select className="select-range" defaultValue="24" onChange={update_range}>
                            <option value="24">Last 24 Hours</option>
                            <option value="72">Last 72 Hours</option>
                            <option value="1wk">Last Week</option>
                            <option value="1mo">Last Month</option>
                            <option value="3mo">Last 3 Months</option>
                            <option value="inf">Lifetime</option>

                        </select> 
                        <div className="row counters">
                            <div className="col-lg-3 item">
                                Money Earned<br/>
                                <div className="value">    
                                    ${this.props.auth.analytics ? this.props.auth.analytics.money_earned : 0}
                                </div>
                            </div>
                            <div className="col-lg-3 item">
                                New Users<br/>
                                <div className="value">
                                    {this.props.auth.analytics ? this.props.auth.analytics.new_users : 0}
                                </div>
                            </div>
                            <div className="col-lg-3 item">
                                Receipts Submitted<br/>
                                <div className="value">    
                                    {this.props.auth.analytics ? this.props.auth.analytics.receipts_submitted : 0}
                                </div>
                            </div>
                            <div className="col-lg-3 item">
                                Receipts Pending<br/>
                                <div className="value">    
                                    {this.props.auth.analytics ? this.props.auth.analytics.receipts_pending : 0}
                                </div>
                            </div>
                        </div>
                        <div className="row receipt-table">
                            <div className="title">
                                Receipts Pending:
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <th>
                                        Receipt Name
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                                {
                                    this.props.auth.analytics &&  this.props.auth.analytics.receipts_recent_pending && this.props.auth.analytics.receipts_recent_pending.length>0 ? _.map(this.props.auth.analytics.receipts_recent_pending, rec=>{
                                        return (
                                            <tr>
                                                <td>
                                                    {rec.id}
                                                </td>
                                                <td>
                                                    {<Link to={"/receipts/"+rec.id}><button type="button">View Receipt</button></Link>}
                                                </td>
                                            </tr>
                                            );
                                    }) : (
                                        <tr>
                                            <td>
                                                You have 0 pending receipts.
                                            </td>
                                            <td/>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
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
  };
}
export default connect(mapStateToProps
)(HomePage);
