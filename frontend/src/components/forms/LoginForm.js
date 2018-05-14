import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions/auth';
import {login, getMe} from '../../api/auth';

class LoginForm extends Component {
	static propTypes = {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	handleLogin(data) {
		return login({email: data.email, password: data.password})
			.then((response) => {
				this.props.dispatch(actions.login(data.email, response));
				return true;
			}, (response) => {
				var problems = {
					...response
				};

				if (response.non_field_errors) {
					problems.password = response.non_field_errors;
					delete problems.non_field_errors
				}

				throw problems;
			});
	}

	render() {
		const { fields: {email, password} } = this.props;
		const handleSubmit = this.props.handleSubmit(this.handleLogin.bind(this));
		const loading = this.props.asyncValidating || this.props.submitting;

		return (
				<div className="container fullpage vcenter">    
		            <div className="container col-lg-6 col-lg-offset-3">
		                <div className="row">
		                    <div className="logo col-lg-4 col-lg-offset-4">
		                        gambeal
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-lg-12">
								<form onSubmit={handleSubmit}>
		                        <input className="text-field col-lg-12" label="Email" id="email" type="text" placeholder="Email adress" {...email}/>
		                        <input className="text-field col-lg-12" label="Password" id="password" type="password" placeholder="Password" {...password}/>
		                        <input className="login-button col-lg-12" type="submit" onClick={handleSubmit} value="Log In"/>
								</form>
		                    </div>
		                </div>
		                <div className="row">
		                    <a className="forgot-password col-lg-8 col-lg-offset-2" href="">Forgot password?</a>
		                </div>
		            </div>
	        	</div>
		);
	}
}

LoginForm = reduxForm({
	form: 'login',
	fields: ['email', 'password'],
	destroyOnUnmount: false
})(LoginForm);

// export the wrapped component
export default LoginForm;
