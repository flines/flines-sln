import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tns } from '../../Core';

export default class Row extends PureComponent {
    render() {
        const { isSelected, className } = this.props;
        const activeRowStyle = classnames(`${tns}row ${className}`, {
            [`${tns}rowActive`]: isSelected
        });
        return (
            <tr className={activeRowStyle}>
                {this.props.children}
            </tr>
        );
    }
}

Row.defaultProps = {
    isSelected: false,
    className: ''
};

Row.propTypes = {
    isSelected: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};
