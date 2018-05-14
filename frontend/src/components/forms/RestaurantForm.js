import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions/businesses';
import {createBusiness, updateBusiness} from '../../api/restaurants';
import { Link } from 'react-router';
import FilePicker from '../helpers/FilePicker';
var _ = require('lodash');

class RestaurantForm extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {fiurl: "http://placehold.it/476x270", logourl: "http://placehold.it/160x100", loaded: false};
    }

    componentWillReceiveProps(nextProps) {
        if(!this.state.loaded){
            this.props.initializeForm(this.props.business);
            this.setState({loaded: true});
        }
        if(this.props.business!==nextProps.business){
            this.props.initializeForm(nextProps.business);
            this.setState({fiurl: nextProps.business.featured_img, logourl: nextProps.business.logo_img});
        }
    }


    componentWillUnmount() {
        this.props.destroyForm();
    }

    handleCall(data) {
        data.featured_img = this.state.fiurl;
        data.logo_img = this.state.logourl;
        if(data.featured_img==="http://placehold.it/476x270"){
            alert("Featured image invalid!");
            return null;
        }
        if(data.logo_img === "http://placehold.it/160x100"){
            alert("Logo image invalid!");
            return null;
        }
        if(this.props.business.id){
            data = _.extend(this.props.business, data);
            updateBusiness(data, data.id)
                .then((response) => {
                    this.props.dispatch(actions.receiveBusiness(data));
                    this.props.back();
                }, (response) => {
                    var problems = {
                        ...response
                    };

                    throw problems;
                }); 
        }
        else{
            createBusiness(data)
                .then((response) => {
                    this.props.dispatch(actions.receiveBusiness(data));
                    this.props.makeOffer();
                }, (response) => {
                    var problems = {
                        ...response
                    };

                    throw problems;
                }); 
        }
    }

    render() {
        const { fields: {business_name, receipt_rules, featured_img, logo_img, about, fun_facts} } = this.props;
        const handleSubmit = this.props.handleSubmit(this.handleCall.bind(this));
        const loading = this.props.asyncValidating || this.props.submitting;
        const onUploadFeature = url=>{
            this.setState({fiurl: url});
        }
        const onUploadLogo = url=>{
            this.setState({logourl: url});
        }
        return ( 
            <div className="col-lg-12">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-body col-lg-5 col-lg-offset-0">
                            <div className="row form-header">
                                Restaurant Information   
                            </div>
                            <div className="row form-field"> 
                                <div>Business Name:</div>
                                <input className="text-field col-lg-12" label="business_name" id="business_name" type="text" {...business_name}/>
                            </div>
                            <div className="row form-field"> 
                                <div>About Restaurant</div>
                                <textarea className="text-field col-lg-12" rows="15" name="about" id="about" {...about}/>
                            </div>
                            <div className="row form-field"> 
                                <div>Fun Facts</div>
                                <textarea className="text-field col-lg-12" rows="15" name="fun_facts" id="fun_facts" {...fun_facts}/>
                            </div>
                            <div className="row form-field"> 
                                <div>Receipt Rules</div>
                                <textarea className="text-field col-lg-12" rows="15" name="receipt_rules" id="receipt_rules" {...receipt_rules}/>
                            </div>
                        </div>
                        <div className="form-body col-lg-5">
                            <div className="row form-header">
                                Restaurant Images   
                            </div>
                            <div className="row form-field"> 
                                <div className="row">
                                    <div className="col-lg-3">Featured Image:</div>
                                    <FilePicker  className="col-lg-5" onUpload={onUploadFeature}/>
                                </div>
                                <img className="fimg" src={this.state.fiurl}/>
                            </div>
                            <div className="row form-field"> 
                                <div className="row">
                                    <div className="col-lg-3">Logo Image:</div>
                                    <FilePicker className="col-lg-5" onUpload={onUploadLogo}/>
                                </div>
                                <img className="limg" src={this.state.logourl}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-lg-offset-2 row-padded form-buttons">
                            <Link to="/restaurants/"><button className="grey-button">Cancel</button></Link>
                            <button onClick={handleSubmit} className="active-button">Save Changes </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

RestaurantForm = reduxForm({
    form: 'business',
    fields: ['business_name', 'receipt_rules', 'featured_img', 'logo_img', 'about', 'fun_facts'],
    destroyOnUnmount: true
})(RestaurantForm);

// export the wrapped component
export default RestaurantForm;
