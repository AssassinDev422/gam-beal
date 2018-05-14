import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import * as offActions from '../../actions/offers';
import RestaurantForm from '../forms/RestaurantForm';
import {getBusiness} from '../../actions/businesses';
var _ = require("lodash");

class RestaurantFormPage extends Component {

    componentDidMount() {
        if(this.props.routeParams.restaurantID){
            this.props.dispatch(getBusiness(this.props.routeParams.restaurantID));
        }
    }

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.users[auth.user_id];
        const logout = () => {
            console.log("logout");
            this.props.dispatch(actions.logout());
        }
        const back = () => {
            this.props.history.push('/restaurants/');
        }
        const makeOffer = () => {
            console.log('making offer');
            this.props.history.push('/offers/create/');
        }
        return (
            <div>
                <NavBar user={user} active="restaurants"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Edit Restaurant Info:
                            </div>
                            <RestaurantForm makeOffer={makeOffer} business={this.props.business} back={back}/>
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
    business: state.businesses.business,
    offers: state.offers,
  };
}
export default connect(mapStateToProps
)(RestaurantFormPage);
