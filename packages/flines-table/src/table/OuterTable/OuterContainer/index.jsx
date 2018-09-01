import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CustomScrollbars from 'react-custom-scrollbars';
import { tns } from '../Core';

export default class TableContainer extends PureComponent {
    render() {
        return (
            <div className={`${tns}tableContainer`}>
                <CustomScrollbars className={`${tns}tableScrollWrapper`}>
                    {this.props.children}
                </CustomScrollbars>
            </div>
        );
    }
}

TableContainer.propTypes = {
    children: PropTypes.node.isRequired
};
