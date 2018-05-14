import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import { Link } from 'react-router';
var _ = require('lodash');
import {sendNotification} from '../../api/offers';
class PushForm extends Component {
	static propTypes = {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	handleCall(data) {
		const newData = {message: data.message_description, subject: "Gambeal"};
		sendNotification(newData).then(resp=>{
			alert('Notification Sent!');
		}).catch(error=>{
			console.log('error', error);
		});
	}

	render() {
		const { fields: {message_description} } = this.props;
		const handleSubmit = this.props.handleSubmit(this.handleCall.bind(this));
		const loading = this.props.asyncValidating || this.props.submitting;
		return ( 
            <div className="col-lg-4">
				<form onSubmit={handleSubmit}>
					<div className="form-body">
		                <div className="row form-header">
		                    Create Notification	
		                </div>

	                    <div className="row form-field"> 
	                    	<textarea className="text-field col-lg-12" rows="15" name="message_description" placeholder="Message Description" id="message_description" {...message_description}/>
	                    </div>
						
					</div>
					<div className="row row-padded form-buttons">
						<button onClick={()=>this.props.back()} className="grey-button">Cancel</button>
						<button onClick={handleSubmit} className="active-button">Send Push </button>
					</div>
				</form>
            </div>

		);
	}
}

PushForm = reduxForm({
	form: 'push',
	fields: ['message_description'],
	destroyOnUnmount: true
})(PushForm);

// export the wrapped component
export default PushForm;
