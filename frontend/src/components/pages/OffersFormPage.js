import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NavBar from '../partials/Nav';
import {OffersTable} from '../partials/Tables';
import {getOffer} from '../../actions/offers';
import * as offActions from '../../actions/offers';
import OfferForm from '../forms/OfferForm';
import {getBusinesses} from '../../actions/businesses';
var _ = require("lodash");

class OffersFormPage extends Component {

    componentDidMount() {
        this.props.dispatch(getBusinesses(1000,0));
        if(this.props.routeParams.offerID){
            this.props.dispatch(getOffer(this.props.routeParams.offerID));
        }
    }

    render() {
        const { auth
        } = this.props;
        const user = this.props.users.users[auth.user_id];
        const offers = _.toArray(this.props.offers.offers);
        const orderedOffs = _.filter(_.sortBy(offers, (o) => {return o.id;}));
        const logout = () => {
            this.props.dispatch(actions.logout());
        }
        const back = () => {
            this.props.history.push('/offers/');
        }
        const offer = this.props.routeParams.offerID ? this.props.offers.offers[this.props.routeParams.offerID] : null;
        const businesses = _.toArray(this.props.businesses.businesses);
        const orderedRests = _.filter(_.sortBy(businesses, (o) => {return o.id;}), (o) => {return o.business_name;});
        return (
            <div>
                <NavBar user={user} active="offers"  logout={logout}/>
                <div className="content">
                    <div className="container-fluid">    
                        <div className="row receipt-table">
                            <div className="title">
                                Edit Offer Info:
                            </div>
                            <OfferForm back={back} offer={offer} businesses={orderedRests}/>
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
    businesses: state.businesses,
    offers: state.offers,
  };
}
export default connect(mapStateToProps
)(OffersFormPage);
