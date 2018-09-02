import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cns } from '../Core';

export default class RealOuterTable extends PureComponent {
    constructor(props) {
        super(props);
        this.renderColToolBars = this.renderColToolBars.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderColHeaders = this.renderColHeaders.bind(this);
        this.renderColReorder = this.renderColReorder.bind(this);
        this.renderColResizer = this.renderColResizer.bind(this);
        this.renderRowToolBars = this.renderRowToolBars.bind(this);
        this.renderRowHeaders = this.renderRowHeaders.bind(this);
        this.renderRowReorder = this.renderRowReorder.bind(this);
        this.renderInnerTable = this.renderInnerTable.bind(this);
    }

    renderColToolBars() {
        const { ColToolBars } = this.context;
        return (
            <ColToolBars />
        );
    }

    renderTableHeader() {
        const { TableHeader } = this.context;
        return (
            <TableHeader />
        );
    }

    renderColHeaders() {
        const { ColHeaders } = this.context;
        return (
            <ColHeaders />
        );
    }

    renderColReorder() {
        const { ColReorder } = this.context;
        return (
            <ColReorder />
        );
    }

    renderColResizer() {
        const { ColResizer } = this.context;
        return (
            <ColResizer />
        );
    }

    renderRowToolBars() {
        const { RowToolBars } = this.context;
        return (
            <RowToolBars />
        );
    }

    renderRowHeaders() {
        const { RowHeaders } = this.context;
        return (
            <RowHeaders />
        );
    }

    renderRowReorder() {
        const { RowReorder } = this.context;
        return (
            <RowReorder />
        );
    }

    renderInnerTable() {
        const { InnetTable } = this.context;
        return (
            <InnetTable />
        );
    }

    render() {
        const { editable, getTableWidth } = this.props;
        const tableWidth = getTableWidth();
        const customStyle = {
            width: tableWidth ? `${tableWidth}px` : null
        };
        return (
            <div className={`${cns}RealOuterTable`} style={customStyle}>
                {editable && this.renderColToolBars()}
                {editable && (
                    <div>
                        {this.renderTableHeader()}
                        {this.renderColHeaders()}
                        {this.renderColReorder()}
                        {this.renderColResizer()}
                    </div>
                )}
                <div>
                    {editable && this.renderRowToolBars()}
                    {editable && this.renderRowHeaders()}
                    {editable && this.renderRowReorder()}
                    {this.renderInnerTable()}
                </div>
            </div>
        );
    }
}

RealOuterTable.propTypes = {
    editable: PropTypes.bool.isRequired,
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

RealOuterTable.contextTypes = {
    ColToolBars: PropTypes.func.isRequired,
    TableHeader: PropTypes.func.isRequired,
    ColHeaders: PropTypes.func.isRequired,
    ColReorder: PropTypes.func.isRequired,
    ColResizer: PropTypes.func.isRequired,
    RowToolBars: PropTypes.func.isRequired,
    RowHeaders: PropTypes.func.isRequired,
    RowReorder: PropTypes.func.isRequired,
    InnetTable: PropTypes.func.isRequired
};
