import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableEditor from './TableEditor';

export default class Editor extends PureComponent {
    render() {
        const { data, editMode, actions } = this.props;
        const { change } = actions || {};
        return (
            <TableEditor data={data} editMode={editMode} change={change} />
        );
    }
}

Editor.defaultProps = {
    // language: 'en',
    editMode: false,
    actions: undefined,
    data: undefined
};

Editor.propTypes = {
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
