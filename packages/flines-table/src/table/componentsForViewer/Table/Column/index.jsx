import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';

export default class Column extends PureComponent {
    render() {
        return (
            <td className={`${tns}column`}>
                {this.props.children}
            </td>
        );
    }
}

Column.propTypes = {
    children: PropTypes.node.isRequired
};
