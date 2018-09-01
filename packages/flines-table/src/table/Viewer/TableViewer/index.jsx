import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from '../../componentsForViewer/Table';
import { tns } from '../../core/config';
import { toClient } from './data';
import './style.scss';

export default class TableViewer extends PureComponent {
    render() {
        const { data } = this.props;
        const clientData = toClient(data || {});
        return (
            <div className={`${tns}tableViewer`}>
                <Table data={clientData} />
            </div>
        );
    }
}

TableViewer.defaultProps = {
    data: undefined
};

TableViewer.propTypes = {
    data: PropTypes.object
};
