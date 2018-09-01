import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns, getCellId } from '../tableCore';

export default class RealTable extends PureComponent {
    constructor(props) {
        super(props);
        this.renderCell = this.renderCell.bind(this);
        this.renderCellRows = this.renderCellRows.bind(this);
    }

    renderCell(rowId, colId) {
        const { Cell } = this.context;
        const { data } = this.props;
        const cellId = getCellId(rowId, colId);
        const cellData = data[cellId];
        return (
            <Cell cellData={cellData} />
        );
    }

    renderCellRow(rowId) {
        const { Row, Column } = this.context;
        const { colIds } = this.props;
        return (
            <Row key={rowId}>
                {colIds &&
                    colIds.map(colId => (
                        <Column key={colId}>
                            {this.renderCell(rowId, colId)}
                        </Column>
                    ))
                }
            </Row>
        );
    }

    renderCellRows() {
        const { rowIds } = this.props;
        return rowIds && rowIds.map(rowId => this.renderCellRow(rowId));
    }

    render() {
        return (
            <table className={`${tns}realTable`}>
                <tbody>
                    {this.renderCellRows()}
                </tbody>
            </table>
        );
    }
}

RealTable.propTypes = {
    rowIds: PropTypes.array.isRequired,
    colIds: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
};

RealTable.contextTypes = {
    Row: PropTypes.func.isRequired,
    Column: PropTypes.func.isRequired,
    Cell: PropTypes.func.isRequired,
    ContentView: PropTypes.func.isRequired
};
