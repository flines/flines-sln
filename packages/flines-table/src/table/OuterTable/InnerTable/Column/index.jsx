import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tns } from '../../Core';

export default class Column extends PureComponent {
    render() {
        const { colId, isLast, isSelected, className, getColWidth } = this.props;
        const colWidth = getColWidth(colId);
        const customStyle = {
            width: (colWidth && !isLast) ? `${colWidth}px` : null
        };
        const activeColumnStyle = classnames(`${tns}column ${className}`, {
            [`${tns}columnActive`]: isSelected
        });
        return (
            <td className={activeColumnStyle} style={customStyle}>
                {this.props.children}
            </td>
        );
    }
}

Column.defaultProps = {
    children: undefined,
    colId: undefined,
    isSelected: false,
    className: '',
    isLast: false
};

Column.propTypes = {
    children: PropTypes.node,
    colId: PropTypes.string,
    isSelected: PropTypes.bool,
    isLast: PropTypes.bool,
    className: PropTypes.string,
    getColWidth: PropTypes.func.isRequired
};
