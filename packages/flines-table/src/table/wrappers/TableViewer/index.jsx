import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from '../../InnerTable';
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
    data: PropTypes.shape({
        rowCount: PropTypes.number.isRequired,
        colCount: PropTypes.number.isRequired,
        data: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        rowAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        colAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        })
    })
};
