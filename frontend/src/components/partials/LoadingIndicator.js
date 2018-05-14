var _ = require('lodash');
var classNames = require('classnames');

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import { Button, ProgressBar } from 'react-bootstrap';

export default class LoadingIndicator extends Component {
	render() {
		return (
			<div className="loading">
				<div className="indicator">
					<ProgressBar active now={100} bsStyle="info" label="Loading..." />
				</div>
			</div>
		);
	}
}
