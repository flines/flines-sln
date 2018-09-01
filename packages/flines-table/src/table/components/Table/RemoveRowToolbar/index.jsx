import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';
import './style.scss';

export default class RemoveRowToolbar extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { rowIndex, removeRow } = this.props;
        removeRow(rowIndex);
    }

    render() {
        return (
            <span className={`${tns}removeRowToolbar`}>
                <span className={`${tns}removeRowToolbarIcon`} onClick={this.onClick}>
                    <i />
                </span>
            </span>
        );
    }
}

RemoveRowToolbar.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    removeRow: PropTypes.func.isRequired
};
