import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import { Button } from 'react-bootstrap';
import * as actions from '../../actions/offers';
import {createOffer, updateOffer} from '../../api/offers';
import { Link } from 'react-router';
var _ = require('lodash');

class OfferForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {variables: []};
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.offer!==nextProps.offer){
            nextProps.offer.offer_type = nextProps.offer.offer_type==="surge" ? "fixed" : nextProps.offer.offer_type;
            if(nextProps.offer.offer_type ==="variable")
                this.setState({variables: nextProps.offer.variable_rewards});

            const surge_startDate = new Date(nextProps.offer.surge_start);
            const surge_endDate = new Date(nextProps.offer.surge_end);
            const surge_monthString = surge_startDate.getMonth()+1>9 ? (surge_startDate.getMonth()+1) : "0" + (surge_startDate.getMonth()+1);
            const surge_dateString = surge_startDate.getDate()>9 ? surge_startDate.getDate() : "0" + surge_startDate.getDate();
            nextProps.offer.surge_date = surge_startDate.getFullYear() + "-" + surge_monthString + "-" + surge_dateString;
            const surge_startHours = surge_startDate.getHours()>9 ? surge_startDate.getHours() : "0" + surge_startDate.getHours();
            const surge_endHours = surge_endDate.getHours()>9 ? surge_endDate.getHours() : "0" + surge_endDate.getHours();
            const surge_startMinutes = surge_startDate.getMinutes()>9 ? surge_startDate.getMinutes() : "0" + surge_startDate.getMinutes();
            const surge_endMinutes = surge_endDate.getMinutes()>9 ? surge_endDate.getMinutes() : "0" + surge_endDate.getMinutes();
            nextProps.offer.surge_start_time = surge_startHours + ":" + surge_startMinutes;
            nextProps.offer.surge_end_time = surge_endHours + ":" + surge_endMinutes;

            this.props.initializeForm(nextProps.offer);
        }
    }
    handleCall(data) {
        const surge_start = new Date(data.surge_date + " " + data.surge_start_time);
        const surge_end = new Date(data.surge_date + " " + data.surge_end_time);
        console.log('data', data);
        if(data.surge){
            data.surge_start = (surge_start).toISOString();
            data.surge_end = (surge_end).toISOString();
        }
        if(data.offer_type==="fixed"){
            data.variable_rewards=this.state.variables;
            data.max_reward = data.min_reward;
        }
        data.business_id = parseInt(data.business_id);
        console.log('attempting submit');
        if(this.props.offer){
            data = _.extend(this.props.offer, data);
            updateOffer(data, data.id)
                .then((response) => {
                    console.log('success', response);
                    this.props.back();
                    this.props.dispatch(actions.getOffers(6,0));
                }, (response) => {
                    console.log('error', response);
                    console.log('failure data', data);
                    var problems = {
                        ...response
                    };

                    throw problems;
                }); 
        }
        else{
            data.featured=false;
            createOffer(data)
                .then((response) => {
                    console.log('success', response);
                    this.props.dispatch(actions.getOffers((6,0)));
                    this.props.back();
                }, (response) => {
                    console.log('error', response);
                    var problems = {
                        ...response
                    };

                    throw problems;
                }); 
        }
    }

    render() {
        const { fields: {business_id, offer_type,minimum_spend_amount, surge_date, surge_start_time, surge_end_time,
            min_reward, max_reward, redeemable_quantity, status, display_order, surge_multiplier, surge, details} } = this.props;
        const handleSubmit = this.props.handleSubmit(this.handleCall.bind(this));
        const loading = this.props.asyncValidating || this.props.submitting;
        const defaultValue = this.props.offer ? this.props.offer.business_id : 1;
        const default_details = this.props.offer ? this.props.offer.details : "Welcome to this Gambeal! You can earn \"amount\" just for spending \"minimum amount\", taking a picture of your receipt, and rating your experience at \"Restaurant Name\"!"

        const getOptions = ()=>{
            if(this.props.offer && this.props.offer.id){
                return (
                    <option value={this.props.offer.business_id}>{this.props.offer.business.business_name}</option>
                    );
            }else{
                return _.map(this.props.businesses, (business, i) =>{
                    return (
                        <option value={business.id} key={i.toString()}>{business.business_name}</option>
                        );
                })
            }
        }
        console.log('variable = ', offer_type.value);
        const surgeText = surge.checked ? "Surge" : null;
        const surgeMult = surge.checked ? (
                    <div>
                        <div className="col-lg-3 half-padded">Surge Mult:</div>
                        <input className="text-field col-lg-3" label="surge_multiplier" id="surge_multiplier" type="number" min="0" max="1000000" step="1" {...surge_multiplier}/>
                    </div>
            ) : null;

        const updatePrize = (e, index)=>{
            let vars = this.state.variables;
            vars[index].prize = e.target.value;
            this.setState({variables: vars});
        }
        const updateUsercount = (e, index)=>{
            let vars = this.state.variables;
            vars[index].users = e.target.value;
            this.setState({variables: vars});
        }
        const addRow = ()=>{
            let vars = this.state.variables;
            vars.push({users: 1, prize: 0.00})
            this.setState({variables: vars});
        }
        const options = getOptions();
        return ( 
            <div className="col-lg-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-body">
                        <div className="row form-header">
                            Offer Information   
                        </div>
                        <div className="row form-field"> 
                            <div>Business Name:</div>
                            <div className="select">
                                <select defaultValue={defaultValue} name="business_id" {...business_id}>
                                    {options}
                                </select>
                            </div>
                        </div>
                        <div className="row form-field"> 
                            <div>Offer Type:</div>
                            <div className="select">
                                <select value="fixed" name="offer_type" {...offer_type}>
                                    <option value="select">Select Type</option>
                                    <option value="fixed">Fixed</option>
                                    <option value="variable">Variable</option>
                                </select>
                            </div>
                        </div>
                        {offer_type.value==="fixed" ? (
                            <div className="row row-padded"> 
                                    <div className="col-lg-2 half-padded">Surge:</div>
                                    <input className="col-lg-1 full-padded" label="surge" id="surge" type="checkbox" {...surge}/>
                                {surgeMult}
                            </div>
                        ) : null}
                        {surge.checked ? (
                            <div className="row"> 
                                <div className="col-lg-5">
                                    <div>Surge Date:</div>
                                    <input className="text-field col-lg-12" label="surge_date" id="surge_date" type="date" {...surge_date}/>
                                </div>
                                <div className="col-lg-3">
                                    <div>Surge Time:</div>
                                    <input className="text-field col-lg-12" label="surge_time1" id="surge_time1" type="time"{...surge_start_time}/>
                                </div>
                                <div className="col-lg-3">
                                    <div><br/></div>
                                    <input className="text-field col-lg-12" label="surge_time2" id="surge_time2" type="time"{...surge_end_time}/>
                                </div>
                            </div>
                        ) : null}

                        <div className="row row-padded"> 
                            <div className="col-lg-3">
                                <div>Reward Values:</div>
                                <input className="text-field col-lg-12" value={0.25} label="reward_min" id="reward_min" type="number" min="0.00" max="1000000.00" step="0.01" {...min_reward}/>
                            </div>
                            {offer_type.value==="variable" ? (
                                <div>
                                <div className="col-lg-1 padded">to</div>
                                <div className="col-lg-3">
                                    <div><br/></div>
                                    <input className="text-field col-lg-12" label="reward_max" id="reward_max" type="number" min="0.00" max="1000000.00" step="0.01"{...max_reward}/>
                                </div>
                                </div>
                            ) : null}
                            <div className="col-lg-4">
                                <div>Redeemable Qty:</div>
                                <input className="text-field col-lg-12" value={100} label="redeemable_quantity" id="redeemable_quantity" type="number" min="0" max="1000000" step="1"{...redeemable_quantity}/>
                            </div>
                        </div>

                        <div className="row row-padded"> 
                            <div className="col-lg-3">
                                <div>Minimum Spend Amount:</div>
                                <input className="text-field col-lg-12" value={10.00} label="reward_min" id="reward_min" type="number" min="0.00" max="1000000.00" step="0.01" {...minimum_spend_amount}/>
                            </div>
                        </div>
                        {offer_type.value==="variable" ? _.map(this.state.variables, (reward, index) => {
                            return (
                            <div className="row row-padded" key={index.toString()}> 
                                <div className="col-lg-1 half-padded">
                                    <div>{index+1}</div>
                                </div> 
                                <div className="col-lg-2">
                                    <input className="text-field col-lg-12" defaultValue={reward.users} onChange={e => updateUsercount(e, index)} type="number" min="0" max="10000000" step="1"/>
                                </div>
                                <div className="col-lg-4 half-padded">Users can earn</div>
                                <div className="col-lg-4">
                                    <input className="text-field col-lg-8" defaultValue={reward.prize} onChange={e => updatePrize(e, index)} type="number" min="0" max="10000000" step="0.01"/>
                                </div>
                            </div>
                            );
                        }) : null}
                        {offer_type.value==="variable" ? (
                            <div className="row row-padded"> 
                                <button type="button" onClick={addRow} className="add-button">+</button>
                            </div>
                        ) : null}
                        <div className="row row-padded"> 
                            <div className="col-lg-3">
                                <div>Status:</div>
                                <div className="select">
                                    <select name="status" {...status}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div>Display Order:</div>
                                <input className="text-field col-lg-12" value={3} label="display_order" id="display_order" type="number" min="1" max="50" step="0.001"{...display_order}/>
                            </div>
                        </div>
                        <div className="row form-field">
                            <div>Details</div>
                            <textarea className="text-field col-lg-12" value={default_details} rows="15" name="details" id="details" {...details}/>
                        </div>
                    </div>
                    <div className="row row-padded form-buttons">
                        <button onClick={()=>this.props.back()} className="grey-button">Cancel</button>
                        <button onClick={handleSubmit} className="active-button">Save Changes </button>
                    </div>
                </form>
            </div>

        );
    }
}

OfferForm = reduxForm({
    form: 'offer',
    fields: ['business_id', 'minimum_spend_amount', 'offer_type', 'surge_date', 'surge_start_time', 'surge_end_time',
            'min_reward', 'max_reward', 'redeemable_quantity', 'status', 'display_order', 'surge_multiplier', 'surge', 'details'],
    destroyOnUnmount: true
})(OfferForm);

// export the wrapped component
export default OfferForm;
