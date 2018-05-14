import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import { Button } from 'react-bootstrap';
import * as actions from '../../actions/users';
import {updateUser} from '../../api/users';
import { Link } from 'react-router';
var _ = require('lodash');

import FilePicker from '../helpers/FilePicker';
import {ReceiptTable, WithdrawTable} from '../partials/Tables';
class UserForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {picture: ""};
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.user!==nextProps.user){
            console.log('proppic', nextProps.user.image_url);
            if(nextProps.user.image_url && nextProps.user.image_url.indexOf("http")!==-1){
                this.setState({picture: nextProps.user.image_url});
            }
            else{
                this.setState({picture: ""});
            }
            this.props.initializeForm(nextProps.user);
        }
    }
    handleCall(data) {
        console.log('data', data);
        if(this.props.user){
            data = _.extend(this.props.user, data);
            console.log("pict", this.state.picture);
            data.image_url = this.state.picture;
            updateUser(data, data.id)
                .then((response) => {
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
        const { fields: {image_url, 
            first_name, middle_name, last_name, 
            suffix, permanent_address, apt_suite_bldg, city, zip_code, country,
            permanent_address_years, permanent_address_months, residence_status,
            occupation, total_annual_income,
            phone_number, work_phone, email, us_citizen,
            birthdate, 
            paypal, pending_money, password,
            available_money, offers_redeemed, lifetime_earnings, date_joined} } = this.props;
        const handleSubmit = this.props.handleSubmit(this.handleCall.bind(this));
        const loading = this.props.asyncValidating || this.props.submitting;
        const onUploadImg = url=>{
            this.setState({picture: url});
        }
        const onSort = () =>{
            return true;
        }
        const checkRec = () =>{
            return true;
        }
        return ( 
            <div className="col-lg-12">
                <form onSubmit={handleSubmit}>
                    <div className="col-lg-5 form-body">
                        <div className="row form-header">
                            User: {this.props.user.id}   
                        </div>
                        <div className="row form-header">
                            General Information
                        </div>
                        <div className="row row-padded">
                            <div className="col-lg-3">Profile Image:</div>
                            <div className="col-lg-2"><img src={this.state.picture}/></div>
                            <div className="col-lg-5"> <FilePicker  className="col-lg-12" onUpload={onUploadImg}/></div>
                        </div>
                        <div className="row"> 
                            <div className="col-lg-3">
                                <div>First Name:</div>
                                <input className="text-field col-lg-12" label="idfirstname" id="idfirstname" type="text" {...first_name}/>
                            </div>
                            <div className="col-lg-3">
                                <div>Last Name:</div>
                                <input className="text-field col-lg-12" label="idlastname" id="idlastname" type="text"{...last_name}/>
                            </div>
                        </div>
                        <div className="row form-header">
                            Security Information
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div>Date Of Birth:</div>
                                <input className="text-field col-lg-12" label="idbirthdate" id="idbirthdate" type="text"{...birthdate}/>
                            </div>
                            <div className="col-lg-6">
                                <div>PayPal Email Address:</div>
                                <input className="text-field col-lg-12" label="idpaypal" id="idpaypal" type="text"{...paypal}/>
                            </div>
                        </div>
                        <div className="row row-padded"> 
                            <div className="col-lg-6">
                                <div>Password:</div>
                                <input className="text-field col-lg-12" label="idpassword1" id="idpassword1" value="**********" disabled="true" type="text"/>
                            </div>
                            <div className="col-lg-6">
                                <div>Reset Password:</div>
                                <input className="text-field col-lg-12" label="idpassword2" id="idpassword2" type="text"{...password}/>
                            </div>
                        </div>

                        <div className="row row-padded"> 
                            <div className="col-lg-6">
                                <div>Pending Balance:</div>
                                <input className="text-field col-lg-12" label="idpendingmoney" id="idpendingmoney" type="text" {...pending_money}/>
                            </div>
                            <div className="col-lg-6">
                                <div>Current Balance:</div>
                                <input className="text-field col-lg-12" label="idavailablemoney" id="idavailablemoney" type="text"{...available_money}/>
                            </div>
                        </div>
                        <div className="row form-field">
                            Offers Redeemed: {offers_redeemed.value}
                        </div>
                        <div className="row form-field">
                            Lifetime Earnings: {lifetime_earnings.value}
                        </div>
                        <div className="row form-field">
                            Date Joined: {date_joined.value}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ReceiptTable receipts={this.props.user.receipts} onCheck={checkRec} onSort={onSort} user={this.props.user}/>
                        <WithdrawTable requests={this.props.user.withdrawls} onCheck={checkRec} onSort={onSort} user={this.props.user}/>
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

UserForm = reduxForm({
    form: 'user',
    fields: ['image_url', 
    'first_name', 'middle_name', 'last_name', 'suffix', 
    'permanent_address', 'apt_suite_bldg', 'city', 'zip_code', 'country',
    'permanent_address_years', 'permanent_address_months', 'residence_status',
    'occupation', 'total_annual_income',
    'phone_number', 'work_phone', 'email', 'us_citizen',
    'birthdate', 
    'paypal', 'pending_money', 'password',
    'available_money', 'offers_redeemed', 'lifetime_earnings', 'date_joined'],
    destroyOnUnmount: true
})(UserForm);

// export the wrapped component
export default UserForm;
