import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../Core';

export default class TableHeader extends PureComponent {
    render() {
        const { selectAll } = this.props;
        return (
            <div className={`${tns}tableHeader`} onClick={selectAll} />
        );
    }
}

TableHeader.propTypes = {
    selectAll: PropTypes.func.isRequired
};
