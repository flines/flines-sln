import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from '../../OuterTable';
import { tns } from '../../core/config';
import { toClient } from './data';

export default class TableEditor extends PureComponent {
    render() {
        const { editMode, data, actions = {} } = this.props;
        const { change = () => {} } = actions;
        const clientData = toClient(data);
        return (
            <div className={`${tns}tableEditor`}>
                <Table editable={editMode} data={clientData} changeData={change} />
            </div>
        );
    }
}

TableEditor.defaultProps = {
    // language: 'en',
    editMode: false,
    actions: undefined,
    data: undefined
};

TableEditor.propTypes = {
    // language: PropTypes.string,
    editMode: PropTypes.bool,
    actions: PropTypes.shape({
        change: PropTypes.func
    }),
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
