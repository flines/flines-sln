import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';
import './style.scss';

export default class RemoveColToolbar extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { colIndex, removeCol } = this.props;
        removeCol(colIndex);
    }

    render() {
        return (
            <span className={`${tns}removeColToolbar`}>
                <span className={`${tns}removeColToolbarIcon`} onClick={this.onClick}>
                    <i />
                </span>
            </span>
        );
    }
}

RemoveColToolbar.propTypes = {
    colIndex: PropTypes.number.isRequired,
    removeCol: PropTypes.func.isRequired
};
