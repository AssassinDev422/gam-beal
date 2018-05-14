import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class NotFoundPage extends Component {

	render() {
		const {auth} = this.props;

		return (
			<div>
				404
			</div>
		);
	}
}

export default connect(
)(NotFoundPage);
