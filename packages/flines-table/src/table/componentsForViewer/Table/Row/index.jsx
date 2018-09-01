import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';

export default class Row extends PureComponent {
    render() {
        return (
            <tr className={`${tns}row`}>
                {this.props.children}
            </tr>
        );
    }
}

Row.propTypes = {
    children: PropTypes.node.isRequired
};
