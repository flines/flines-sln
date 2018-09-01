import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns, getCellId } from '../tableCore';

export default class RealTable extends PureComponent {
    constructor(props) {
        super(props);
        this.renderCell = this.renderCell.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderAddRowToolbar = this.renderAddRowToolbar.bind(this);
        this.renderRemoveRowToolbar = this.renderRemoveRowToolbar.bind(this);
        this.renderRowHeader = this.renderRowHeader.bind(this);
        this.renderAddColToolbar = this.renderAddColToolbar.bind(this);
        this.renderRemoveColToolbar = this.renderRemoveColToolbar.bind(this);
        this.renderColResizer = this.renderColResizer.bind(this);
        this.renderColHeader = this.renderColHeader.bind(this);
        this.renderColHeaderRow = this.renderColHeaderRow.bind(this);
        this.renderColResizerRow = this.renderColResizerRow.bind(this);
        this.renderCellRow = this.renderCellRow.bind(this);
        this.renderCellRows = this.renderCellRows.bind(this);
    }

    renderCell(rowId, colId, rowIndex, colIndex) {
        const { Cell } = this.context;
        const { data, selectedRowIndex, selectedColIndex } = this.props;
        const cellId = getCellId(rowId, colId);
        const cellData = data[cellId];
        return (
            <Cell cellData={cellData}
                rowId={rowId}
                colId={colId}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isSelected={selectedColIndex === colIndex && selectedRowIndex === rowIndex} />
        );
    }

    renderTableHeader() {
        const { TableHeader } = this.context;
        return (
            <TableHeader />
        );
    }

    renderAddRowToolbar(rowIndex) {
        const { AddRowToolbar } = this.context;
        const { isShowAddRowToolbar, moveInRowHeaderIndex } = this.props;
        const isMoveInRow = moveInRowHeaderIndex === rowIndex;
        return isShowAddRowToolbar && isMoveInRow ? (
            <AddRowToolbar rowIndex={rowIndex} />
        ) : null;
    }

    renderRemoveRowToolbar(rowIndex) {
        const { RemoveRowToolbar } = this.context;
        const { isDragging, selectedRowIndex, selectedColIndex } = this.props;
        const isShowRemoveRowToolbar = !isDragging && selectedRowIndex === rowIndex && selectedColIndex === -1;
        return isShowRemoveRowToolbar ? (
            <RemoveRowToolbar rowIndex={rowIndex} />
        ) : null;
    }

    renderRowHeader(rowId, rowIndex) {
        const { RowHeader } = this.context;
        const { selectedRowIndex, selectedColIndex, hasRowOverlay } = this.props;
        return (
            <RowHeader rowId={rowId}
                hasRowOverlay={hasRowOverlay}
                rowIndex={rowIndex}
                isSelected={selectedRowIndex === rowIndex && selectedColIndex === -1} />
        );
    }

    renderAddColToolbar(colIndex) {
        const { AddColToolbar } = this.context;
        const { isShowAddColToolbar, moveInColHeaderIndex } = this.props;
        const isMoveInCol = moveInColHeaderIndex === colIndex;
        return isShowAddColToolbar && isMoveInCol ? (
            <AddColToolbar colIndex={colIndex} />
        ) : null;
    }

    renderRemoveColToolbar(colIndex) {
        const { RemoveColToolbar } = this.context;
        const { isDragging, selectedRowIndex, selectedColIndex } = this.props;
        const isShowRemoveColToolbar = !isDragging && selectedColIndex === colIndex && selectedRowIndex === -1;
        return isShowRemoveColToolbar ? (
            <RemoveColToolbar colIndex={colIndex} />
        ) : null;
    }

    renderColResizer(colId) {
        const { ColResizer } = this.context;
        const { isDragging } = this.props;
        const isShowColResizer = !isDragging;
        return isShowColResizer ? (
            <ColResizer colId={colId} />
        ) : null;
    }

    renderColHeader(colId, colIndex) {
        const { ColHeader } = this.context;
        const { selectedRowIndex, selectedColIndex, hasColOverlay } = this.props;
        return (
            <ColHeader colId={colId}
                colIndex={colIndex}
                hasColOverlay={hasColOverlay}
                isSelected={selectedColIndex === colIndex && selectedRowIndex === -1} />
        );
    }

    renderColHeaderRow() {
        const { Row, Column } = this.context;
        const { colIds, selectedRowIndex, selectedColIndex } = this.props;
        const rowId = 'ColHeaderRow';
        const tableHeaderKey = 'TableHeaderColumn';
        return (
            <Row key={rowId} className={`${tns}rowForColHeaders`}>
                <Column key={tableHeaderKey} className={`${tns}colForTableHeader`}>
                    {this.renderTableHeader()}
                </Column>
                {colIds &&
                    colIds.map((colId, colIndex) => (
                        <Column key={colId}
                            className={`${tns}colForColHeader`}
                            colId={colId}
                            isLast={colIndex === colIds.length - 1}
                            isSelected={selectedColIndex === colIndex && selectedRowIndex === -1}>
                            {this.renderAddColToolbar(colIndex)}
                            {this.renderRemoveColToolbar(colIndex)}
                            {this.renderColHeader(colId, colIndex)}
                        </Column>
                    ))
                }
            </Row>
        );
    }

    renderColResizerRow() {
        const { Row, Column } = this.context;
        const { colIds, selectedRowIndex, selectedColIndex } = this.props;
        const rowId = 'ColResizerRow';
        const emptyHeaderKey = 'ColResizerEmptyColumn';
        return (
            <Row key={rowId} className={`${tns}rowForColResizers`}>
                <Column key={emptyHeaderKey} className={`${tns}colForColResizerEmpty`} />
                {colIds &&
                    colIds.map((colId, colIndex) => (
                        <Column key={colId}
                            colId={colId}
                            isLast={colIndex === colIds.length - 1}
                            isSelected={selectedColIndex === colIndex && selectedRowIndex === -1}>
                            {this.renderColResizer(colId)}
                        </Column>
                    ))
                }
            </Row>
        );
    }

    renderCellRow(rowId, rowIndex) {
        const { Row, Column } = this.context;
        const { colIds, selectedRowIndex, selectedColIndex } = this.props;
        const rowHeaderColId = 'RowHeaderCol';
        return (
            <Row key={rowId}
                isSelected={selectedRowIndex === rowIndex && selectedColIndex === -1}>
                <Column key={rowHeaderColId} className={`${tns}colForRowHeader`}>
                    {this.renderAddRowToolbar(rowIndex)}
                    {this.renderRemoveRowToolbar(rowIndex)}
                    {this.renderRowHeader(rowId, rowIndex)}
                </Column>
                {colIds &&
                    colIds.map((colId, colIndex) => (
                        <Column key={colId}
                            colId={colId}
                            isLast={colIndex === colIds.length - 1}
                            isSelected={selectedColIndex === colIndex && selectedRowIndex === -1}>
                            {this.renderCell(rowId, colId, rowIndex, colIndex)}
                        </Column>
                    ))
                }
            </Row>
        );
    }

    renderCellRows() {
        const { rowIds } = this.props;
        return rowIds && rowIds.map((rowId, rowIndex) => this.renderCellRow(rowId, rowIndex));
    }

    render() {
        const { getTableWidth } = this.props;
        const tableWidth = getTableWidth();
        const customStyle = {
            width: tableWidth ? `${tableWidth}px` : null
        };
        return (
            <table className={`${tns}realTable`} style={customStyle}>
                <thead>
                    {this.renderColHeaderRow()}
                </thead>
                <tbody>
                    {this.renderColResizerRow()}
                    {this.renderCellRows()}
                </tbody>
            </table>
        );
    }
}

RealTable.propTypes = {
    rowIds: PropTypes.array.isRequired,
    colIds: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    selectedRowIndex: PropTypes.number.isRequired,
    selectedColIndex: PropTypes.number.isRequired,
    hasRowOverlay: PropTypes.bool.isRequired,
    isShowAddRowToolbar: PropTypes.bool.isRequired,
    moveInRowHeaderIndex: PropTypes.number.isRequired,
    hasColOverlay: PropTypes.bool.isRequired,
    isShowAddColToolbar: PropTypes.bool.isRequired,
    moveInColHeaderIndex: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    getTableWidth: PropTypes.func.isRequired
};

RealTable.contextTypes = {
    Row: PropTypes.func.isRequired,
    Column: PropTypes.func.isRequired,
    Cell: PropTypes.func.isRequired,
    TableHeader: PropTypes.func.isRequired,
    RowHeader: PropTypes.func.isRequired,
    ColHeader: PropTypes.func.isRequired,
    AddRowToolbar: PropTypes.func.isRequired,
    AddColToolbar: PropTypes.func.isRequired,
    RemoveColToolbar: PropTypes.func.isRequired,
    RemoveRowToolbar: PropTypes.func.isRequired,
    ColResizer: PropTypes.func.isRequired
};
