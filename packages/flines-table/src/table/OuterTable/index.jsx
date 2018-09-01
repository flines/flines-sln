import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableContainer from './OuterContainer';
import RealTable from './RealOuterTable';
import Row from './InnerTable/Row';
import Column from './InnerTable/Column';
import Cell from './InnerTable/Cell';
import TableHeader from './TableHeader';
import RowHeader from './RowHeaders/RowHeader';
import ColHeader from './ColHeaders/ColHeader';
import AddRowToolbar from './RowToolBars/AddRowToolbar';
import RemoveRowToolbar from './RowToolBars/RemoveRowToolbar';
import AddColToolbar from './ColToolBars/AddColToolbar';
import RemoveColToolbar from './ColToolBars/RemoveColToolbar';
import ColResizer from '../Addons/ColResizer';
import ContentEdit from '../Addons/RichEditor';
import { tableStyleNS, tns, uuid, getCellId, minRowCount, maxRowCount, minColCount, maxColCount, minColWidth } from './Core';


import './style.scss';

export default class Table extends PureComponent {
    constructor(props) {
        super(props);

        this.defineComponentsInConstructor = this.defineComponentsInConstructor.bind(this);

        this.changeData = this.changeData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addCol = this.addCol.bind(this);
        this.removeCol = this.removeCol.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeRow = this.changeRow.bind(this);
        this.changeCol = this.changeCol.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.selectCol = this.selectCol.bind(this);
        this.selectCell = this.selectCell.bind(this);

        this.setIsShowAddRowToolbar = this.setIsShowAddRowToolbar.bind(this);
        this.setRowOverlay = this.setRowOverlay.bind(this);
        this.setMoveInRowHeaderIndex = this.setMoveInRowHeaderIndex.bind(this);
        this.setIsShowAddColToolbar = this.setIsShowAddColToolbar.bind(this);
        this.setColOverlay = this.setColOverlay.bind(this);
        this.setMoveInColHeaderIndex = this.setMoveInColHeaderIndex.bind(this);
        this.setIsDragging = this.setIsDragging.bind(this);
        this.setIsShowColResizer = this.setIsShowColResizer.bind(this);

        this.getTableInfo = this.getTableInfo.bind(this);
        this.setTableInfo = this.setTableInfo.bind(this);
        this.getRowAttrs = this.getRowAttrs.bind(this);
        this.setRowAttrs = this.setRowAttrs.bind(this);
        this.getColAttrs = this.getColAttrs.bind(this);
        this.setColAttrs = this.setColAttrs.bind(this);
        this.getTableWidth = this.getTableWidth.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
        this.getColWidth = this.getColWidth.bind(this);
        this.updateTableInfo = this.updateTableInfo.bind(this);
        this.setTableElStyle = this.setTableElStyle.bind(this);
        this.startRealRender = this.startRealRender.bind(this);
        this.renderSmartStyleContainer = this.renderSmartStyleContainer.bind(this);
        this.beforeRealRender = this.beforeRealRender.bind(this);
        this.realRender = this.realRender.bind(this);
        this.tableInfo = {};
        this.rowAttrs = (this.props.data && this.props.data.rowAttrs) || {};
        this.colAttrs = (this.props.data && this.props.data.colAttrs) || {};

        this.state = {
            isLoaded: false,
            selectedRowIndex: -1, // Cell, ColHeader, RowHeader
            selectedColIndex: -1, // Cell, ColHeader, RowHeader
            hasColOverlay: false, // ColHeader
            hasRowOverlay: false, // RowHeader
            isSelectAll: false, // TableHeader
            isDragging: false, // ColHeader, RowHeader
            isShowAddRowToolbar: false, // RowToolbar, RowHeader
            isShowAddColToolbar: false, // ColToolbar, ColHeader
            moveInRowHeaderIndex: -1, // RowHeader
            moveInColHeaderIndex: -1, // ColHeader
            isShowColResizer: false, // ColResizer
            rowIds: this.props.data && this.props.data.rowIds,
            colIds: this.props.data && this.props.data.colIds,
            data: this.props.data && this.props.data.data
        };
        this.defineComponentsInConstructor();
    }

    defineComponentsInConstructor() { // eslint-disable-line react/sort-comp
        this.SmartTableContainer = (props => <TableContainer {...props}>{props.children}</TableContainer>);
        this.SmartRealTable = (props => <RealTable {...props}
            getTableWidth={this.getTableWidth} />);
        this.SmartRow = (props => <Row {...props}>{props.children}</Row>);
        this.SmartColumn = (props => <Column {...props}
            getColWidth={this.getColWidth}>{props.children}</Column>);
        this.SmartCell = (props => <Cell {...props}
            selectCell={this.selectCell}
            changeValue={this.changeValue}>{props.children}</Cell>);
        this.SmartTableHeader = (props => <TableHeader {...props}
            selectAll={this.selectAll} />);
        this.SmartRowHeader = (props => <RowHeader {...props}
            selectRow={this.selectRow}
            changeRow={this.changeRow}
            setRowOverlay={this.setRowOverlay}
            setMoveInRowHeaderIndex={this.setMoveInRowHeaderIndex}
            setIsShowAddRowToolbar={this.setIsShowAddRowToolbar}
            setIsDragging={this.setIsDragging} />);
        this.SmartColHeader = (props => <ColHeader {...props}
            selectCol={this.selectCol}
            changeCol={this.changeCol}
            setColOverlay={this.setColOverlay}
            setMoveInColHeaderIndex={this.setMoveInColHeaderIndex}
            setIsShowAddColToolbar={this.setIsShowAddColToolbar}
            setIsDragging={this.setIsDragging} />);
        this.SmartAddRowToolbar = (props => <AddRowToolbar {...props}
            setIsShowAddRowToolbar={this.setIsShowAddRowToolbar}
            addRow={this.addRow} />);
        this.SmartRemoveRowToolbar = (props => <RemoveRowToolbar {...props}
            removeRow={this.removeRow} />);
        this.SmartAddColToolbar = (props => <AddColToolbar {...props}
            setIsShowAddColToolbar={this.setIsShowAddColToolbar}
            addCol={this.addCol} />);
        this.SmartRemoveColToolbar = (props => <RemoveColToolbar {...props}
            removeCol={this.removeCol} />);
        this.SmartColResizer = (props => <ColResizer {...props}
            setIsShowColResizer={this.setIsShowColResizer} />);
    }

    getChildContext() {
        return {
            Row: this.SmartRow,
            Column: this.SmartColumn,
            Cell: this.SmartCell,
            TableHeader: this.SmartTableHeader,
            RowHeader: this.SmartRowHeader,
            ColHeader: this.SmartColHeader,
            AddRowToolbar: this.SmartAddRowToolbar,
            RemoveRowToolbar: this.SmartRemoveRowToolbar,
            AddColToolbar: this.SmartAddColToolbar,
            RemoveColToolbar: this.SmartRemoveColToolbar,
            ColResizer: this.SmartColResizer,
            ContentEdit
        };
    }

    componentDidMount() {
        if (this.smartStyleContainerRef) {
            this.setTableInfo({
                containerWidth: this.smartStyleContainerRef.offsetWidth
            });
            this.updateTableInfo();
        }
        setTimeout(() => {
            this.startRealRender();
        }, 0);
    }

    changeData() {
        const { changeData } = this.props;
        const { rowIds, colIds, data, rowAttrs, colAttrs } = this.state;
        if (changeData) {
            changeData({ rowIds, colIds, data, rowAttrs, colAttrs });
        }
    }

    saveData() {
        this.changeData();
    }

    addRow(rowIndex) {
        const { rowIds } = this.state;
        if (rowIds.length < maxRowCount) {
            const rowId = uuid();
            const newRowIds = [...rowIds];
            newRowIds.splice(rowIndex, 0, rowId);
            this.setState({
                rowIds: newRowIds,
                hasRowOverlay: false,
                selectedRowIndex: -1
            }, () => {
                this.saveData();
            });
        } else {
            console.info(`max row count is ${maxRowCount}, current row count is ${rowIds.length}`);
        }
    }

    removeRow(rowIndex) {
        const { data, rowIds, colIds } = this.state;
        if (rowIds.length > minRowCount) {
            const newRowIds = [...rowIds];
            const delData = newRowIds.splice(rowIndex, 1);
            if (delData && delData[0]) {
                const rowId = delData[0];
                const newData = { ...data };
                let cellId = null;
                colIds.forEach((colId) => {
                    cellId = getCellId(rowId, colId);
                    delete newData[cellId];
                });
                this.setState({
                    data: newData,
                    rowIds: newRowIds,
                    hasRowOverlay: false,
                    selectedRowIndex: -1
                }, () => {
                    this.saveData();
                });
            } else {
                console.error(`remove row error for index: ${rowIndex}`);
            }
        } else {
            console.info(`min row count is ${minRowCount}, current row count is ${rowIds.length}`);
        }
    }

    addCol(colIndex) {
        const { colIds } = this.state;
        if (colIds.length < maxColCount) {
            const colId = uuid();
            const newColIds = [...colIds];
            newColIds.splice(colIndex, 0, colId);
            this.setState({
                colIds: newColIds,
                hasColOverlay: false,
                selectedColIndex: -1
            }, () => {
                this.saveData();
            });
        } else {
            console.info(`max column count is ${maxColCount}, current column count is ${colIds.length}`);
        }
    }

    removeCol(colIndex) {
        const { data, rowIds, colIds } = this.state;
        if (colIds.length > minColCount) {
            const newColIds = [...colIds];
            const delData = newColIds.splice(colIndex, 1);
            if (delData && delData[0]) {
                const colId = delData[0];
                let cellId = null;
                const newData = { ...data };
                rowIds.forEach((rowId) => {
                    cellId = getCellId(rowId, colId);
                    delete newData[cellId];
                });
                this.setState({
                    data: newData,
                    colIds: newColIds,
                    hasColOverlay: false,
                    selectedColIndex: -1
                }, () => {
                    this.saveData();
                });
            } else {
                console.error(`remove column error for index: ${colIndex}`);
            }
        } else {
            console.info(`min column count is ${minColCount}, current column count is ${colIds.length}`);
        }
    }

    changeValue(rowId, colId, value) {
        const { data } = this.state;
        const cellId = getCellId(rowId, colId);
        if (cellId in data && data[cellId].value === value) {
            return;
        }
        const newData = {
            ...data,
            [cellId]: {
                ...data[cellId],
                value
            }
        };
        this.setState({
            data: newData
        }, () => {
            this.saveData();
        });
    }

    changeRow(sourceIndex, targetIndex) {
        const { rowIds } = this.state;
        if (sourceIndex !== targetIndex) {
            const newRowIds = [...rowIds];
            const delData = newRowIds.splice(sourceIndex, 1);
            newRowIds.splice(targetIndex, 0, delData[0]);
            this.setState({
                rowIds: newRowIds,
                hasRowOverlay: false,
                selectedRowIndex: targetIndex
            }, () => {
                this.saveData();
            });
        }
    }

    changeCol(sourceIndex, targetIndex) {
        const { colIds } = this.state;
        if (sourceIndex !== targetIndex) {
            const newColIds = [...colIds];
            const delData = newColIds.splice(sourceIndex, 1);
            newColIds.splice(targetIndex, 0, delData[0]);
            this.setState({
                colIds: newColIds,
                hasColOverlay: false,
                selectedColIndex: targetIndex
            }, () => {
                this.saveData();
            });
        }
    }

    selectAll() {
        this.setState({ isSelectAll: true });
    }

    selectRow(x = -1) {
        this.setState({ selectedRowIndex: x, selectedColIndex: -1 });
    }

    selectCol(y = -1) {
        this.setState({ selectedRowIndex: -1, selectedColIndex: y });
    }

    selectCell(x = -1, y = -1) {
        this.setState({ selectedRowIndex: x, selectedColIndex: y });
    }

    setIsShowAddRowToolbar(isShow) {
        this.setState({ isShowAddRowToolbar: isShow });
    }

    setRowOverlay(status) {
        this.setState({ hasRowOverlay: status });
    }

    setMoveInRowHeaderIndex(index) {
        this.setState({ moveInRowHeaderIndex: index });
    }

    setIsShowAddColToolbar(isShow) {
        this.setState({ isShowAddColToolbar: isShow });
    }

    setColOverlay(status) {
        this.setState({ hasColOverlay: status });
    }

    setMoveInColHeaderIndex(index) {
        this.setState({ moveInColHeaderIndex: index });
    }

    setIsDragging(isDragging) {
        this.setState({ isDragging });
    }

    setIsShowColResizer(isShow) {
        this.setState({ isShowColResizer: isShow });
    }


    getTableInfo() {
        return this.tableInfo || {};
    }

    setTableInfo(info) {
        this.tableInfo = { ...this.tableInfo, ...info };
    }

    getRowAttrs() {
        return this.rowAttrs;
    }

    setRowAttrs(updateRowAttrs) {
        this.rowAttrs = { ...this.rowAttrs, ...updateRowAttrs };
    }

    getColAttrs() {
        return this.colAttrs;
    }

    setColAttrs(updateColAttrs) {
        this.colAttrs = { ...this.colAttrs, ...updateColAttrs };
    }

    getTableWidth() {
        return this.tableInfo && this.tableInfo.tableWidth;
    }

    getRowHeight(rowId) {
        if (rowId) {
            const rowAttrs = this.rowAttrs;
            return rowAttrs[rowId] && rowAttrs[rowId].rowHeight;
        }
        return null;
    }

    getColWidth(colId) {
        if (colId) {
            const colAttrs = this.colAttrs;
            return colAttrs[colId] && colAttrs[colId].colWidth;
        }
        return null;
    }

    updateTableInfo() {
        const { containerWidth } = this.tableInfo || {};
        if (containerWidth) {
            const { colIds } = this.state;
            const colAttrs = this.colAttrs;
            let tableWidth = containerWidth;
            const colCount = colIds.length;
            let sumWidth = 0;
            let hasStyleColCount = 0;
            Object.keys(colAttrs).forEach((colId) => {
                if (colAttrs[colId] && colAttrs[colId].colWidth && !colAttrs[colId].isPercent) {
                    sumWidth += colAttrs[colId].colWidth;
                    hasStyleColCount += 1;
                }
            });
            let defalutColWidth = (tableWidth - sumWidth) / (colCount - hasStyleColCount);
            if (defalutColWidth < minColWidth) {
                defalutColWidth = minColWidth;
                tableWidth = sumWidth + defalutColWidth * (colCount - hasStyleColCount);
            }
            // const defaultColPercent = defalutColWidth / tableWidth;
            const updateColAttrs = {};
            for (let i = 0; i < colCount; i += 1) {
                if (!colAttrs[colIds[i]] || colAttrs[colIds[i]].isPercent) {
                    updateColAttrs[[colIds[i]]] = {
                        colWidth: defalutColWidth,
                        isPercent: true
                    };
                }
            }
            this.setColAttrs(updateColAttrs);
            this.setTableInfo({
                tableWidth
            });
        }
    }

    setTableElStyle(setStyleCallBack) {
        if (typeof setStyleCallBack === 'function') {
            if (this.tableRootRef) {
                setStyleCallBack(this.tableRootRef, {
                    rootEl: this.tableRootRef
                });
            }
        }
    }

    startRealRender() {
        this.setState({
            isLoaded: true
        });
    }

    renderSmartStyleContainer() {
        const customStyle = {
            width: '100%',
            height: 0
        };
        return (<div style={customStyle}
            ref={(smartStyleContainerRef) => { this.smartStyleContainerRef = smartStyleContainerRef; }} />);
    }

    beforeRealRender() {
        return this.renderSmartStyleContainer();
    }

    realRender() {
        const { editable } = this.props;
        const { rowIds, colIds, data,
            selectedRowIndex, selectedColIndex, hasRowOverlay, hasColOverlay,
            isSelectAll, isDragging, isShowAddColToolbar, moveInColHeaderIndex,
            isShowAddRowToolbar, moveInRowHeaderIndex, isShowColResizer } = this.state;
        const tableRootStyle = classnames(`${tableStyleNS}`, {
            [`${tns}inViewMode`]: !editable,
            [`${tns}isShowColResizer`]: isShowColResizer
        });
        return (
            <div className={tableRootStyle}
                ref={(tableRootRef) => { this.tableRootRef = tableRootRef; }}>
                {this.renderSmartStyleContainer()}
                <this.SmartTableContainer>
                    <this.SmartRealTable rowIds={rowIds}
                        colIds={colIds}
                        data={data}
                        selectedRowIndex={selectedRowIndex}
                        selectedColIndex={selectedColIndex}
                        hasRowOverlay={hasRowOverlay}
                        hasColOverlay={hasColOverlay}
                        isSelectAll={isSelectAll}
                        isDragging={isDragging}
                        isShowAddColToolbar={isShowAddColToolbar}
                        moveInColHeaderIndex={moveInColHeaderIndex}
                        isShowAddRowToolbar={isShowAddRowToolbar}
                        moveInRowHeaderIndex={moveInRowHeaderIndex}
                        isShowColResizer={isShowColResizer} />
                </this.SmartTableContainer>
            </div>
        );
    }

    render() {
        const { isLoaded } = this.state;
        return isLoaded ? this.realRender() : this.beforeRealRender();
    }
}

Table.propTypes = {
    editable: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        rowIds: PropTypes.array.isRequired,
        colIds: PropTypes.array.isRequired,
        data: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        rowAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        colAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        })
    }).isRequired,
    changeData: PropTypes.func.isRequired
};

Table.childContextTypes = {
    Row: PropTypes.func.isRequired,
    Column: PropTypes.func.isRequired,
    Cell: PropTypes.func.isRequired,
    TableHeader: PropTypes.func.isRequired,
    RowHeader: PropTypes.func.isRequired,
    ColHeader: PropTypes.func.isRequired,
    AddRowToolbar: PropTypes.func.isRequired,
    RemoveRowToolbar: PropTypes.func.isRequired,
    AddColToolbar: PropTypes.func.isRequired,
    RemoveColToolbar: PropTypes.func.isRequired,
    ColResizer: PropTypes.func.isRequired,
    ContentEdit: PropTypes.func.isRequired
};
