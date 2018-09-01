import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableViewer from './TableViewer';

export default class Viewer extends PureComponent {
    render() {
        const { data } = this.props;
        return (
            <TableViewer data={data} />
        );
    }
}

Viewer.defaultProps = {
    data: undefined
};

Viewer.propTypes = {
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
