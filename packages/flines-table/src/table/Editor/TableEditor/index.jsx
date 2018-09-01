import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import { tns } from '../../core/config';
import { toClient } from './data';

export default class TableEditor extends PureComponent {
    render() {
        const { editMode, data, change } = this.props;
        const clientData = toClient(data);
        return (
            <div className={`${tns}tableEditor`}>
                <Table editable={editMode} data={clientData} changeData={change} />
            </div>
        );
    }
}

TableEditor.defaultProps = {
    editMode: false,
    change: () => {},
    data: undefined
};

TableEditor.propTypes = {
    editMode: PropTypes.bool,
    change: PropTypes.func,
    data: PropTypes.object
};
