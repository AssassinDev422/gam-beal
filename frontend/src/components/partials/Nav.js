var _ = require('lodash');
var classNames = require('classnames');

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import { Button, ProgressBar } from 'react-bootstrap';

const NavLink = ({children, to, active}) => (
  <Link to={to}><li className={classNames({'active': active})}>
      {children}
  </li></Link>
);

export default class NavBar extends Component {
    render() {
        const active = this.props.active;
        return (
            <nav className="navbar navbar-default navbar-fixed-top" >
                <div className="container-fluid header">
                    <div className="collapse navbar-collapse title col-lg-2">
                        <ul className ="nav navbar-nav navbar-left">
                            <li>
                                gambeal
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse navbar-right col-lg-6 user">
                        <div className="row">
                            <img className="img" src="http://www.wellcomedbt.org/uploads/fellowsprofile/default/default.png"/>
                            <div className="name">
                                {(this.props.user ? this.props.user.full_name : "PersonName")}
                            <i className="fa fa-ellipsis-v logout" onClick={this.props.logout} aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <div className="row collapse navbar-collapse header-bottom ">
                    <ul className="nav navbar-nav col-lg-12 ul">
                        <NavLink active={active === "home"} to={`/home`}>Dashboard</NavLink>
                        <NavLink active={active === "restaurants"} to={`/restaurants`}>Restaurant Info</NavLink>
                        <NavLink active={active === "offers"} to={`/offers`}>Offers</NavLink>
                        <NavLink active={active === "users"} to={`/users`}>Users</NavLink>
                        <NavLink active={active === "receipts"} to={`/receipts`}>Receipt Requests</NavLink>
                        <NavLink active={active === "withdrawals"} to={`/withdrawals`}>Withdraw Requests</NavLink>
                        <NavLink active={active === "ratings"} to={`/ratings`}>Ratings</NavLink>
                        <NavLink active={active === "notifications"} to={`/notifications`}>Push Notifications</NavLink>
                    </ul>
                </div>
                
            </nav>
        );
    }
}
