import React, {Component, PropTypes} from 'react';

var _ = require("lodash");
var filepicker = require("filepicker-js");
var classNames = require('classnames');

var config = require('../../../../shared_config.json');

export default class FilePicker extends Component {
    componentDidMount() {
        const filepickerApiKey = config.filepicker_public_key;
        filepicker.setKey(filepickerApiKey);
    }

    openPicker(evt) {
        evt.stopPropagation();

        const {onUpload} = this.props;

        filepicker.pick({
            mimetype: 'image/*',
            container: 'modal'
        }, (Blob) => {
            const {url} = Blob;
            console.log("url", url);
            onUpload(url);
        });
    }

    render() {
        const {onUpload, ...rest} = this.props;

        return (
            <div className="image-upload-button">
                <button type="button" onClick={this.openPicker.bind(this)} {...rest}>
                <span className="glyphicon glyphicon-open"></span>
                Choose another image
                </button>
            </div>
        );
    }
}