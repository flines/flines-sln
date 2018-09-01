import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tns } from '../tableCore';
import './style.scss';

const onDragOver = (ev) => {
    ev.preventDefault();
};

export default class RowHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.selectRow = this.selectRow.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.clickRowPlaceHolder = this.clickRowPlaceHolder.bind(this);
    }

    onDragStart(evt) {
        const { rowIndex, setRowOverlay, setIsDragging } = this.props;
        const ev = evt;
        ev.dataTransfer.dropEffect = 'move';
        ev.dataTransfer.effectAllowed = 'move';
        setRowOverlay(true);
        setIsDragging(true);
        const data = {
            index: rowIndex,
            type: 'RowChange'
        };
        ev.dataTransfer.setData('text', JSON.stringify(data));
    }

    onDrop(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const { rowIndex, setRowOverlay, changeRow, setIsDragging } = this.props;
        const str = ev.dataTransfer.getData('text');
        setRowOverlay(false);
        setIsDragging(false);
        try {
            const data = JSON.parse(str);
            if (data.type !== 'RowChange') return;
            const sourceIndex = data.index;
            const targetIndex = rowIndex;
            changeRow(sourceIndex, targetIndex);
        } catch (ex) {
            console.error(ex);
        }
    }

    onMouseMove() {
        const { rowIndex, setMoveInRowHeaderIndex } = this.props;
        setMoveInRowHeaderIndex(rowIndex);
    }

    onMouseEnter() {
        const { setIsShowAddRowToolbar } = this.props;
        setIsShowAddRowToolbar(true);
    }

    onMouseLeave() {
        const { setIsShowAddRowToolbar } = this.props;
        setIsShowAddRowToolbar(false);
    }

    selectRow() {
        const { rowIndex, selectRow } = this.props;
        selectRow(rowIndex);
    }

    clickRowPlaceHolder(e) {
        e.stopPropagation();
        const { setRowOverlay, selectRow } = this.props;
        setRowOverlay(false);
        selectRow(-1);
    }

    render() {
        const { isSelected, hasRowOverlay } = this.props;
        const rowHeaderStyle = classnames(`${tns}rowHeader`, {
            [`${tns}rowHeaderActive`]: isSelected,
            [`${tns}rowHeaderOverlay`]: hasRowOverlay
        });
        return (
            <div className={rowHeaderStyle}
                draggable={isSelected}
                onClick={this.selectRow}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onMouseMove={this.onMouseMove}
                onDrop={this.onDrop}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <span className={`${tns}rowHeaderDragIcon`} />
                {hasRowOverlay &&
                    <div className={`${tns}rowHeaderEmptyPlace`} onClick={this.clickRowPlaceHolder} />
                }
            </div>
        );
    }
}

RowHeader.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    rowIndex: PropTypes.number.isRequired,
    hasRowOverlay: PropTypes.bool.isRequired,
    selectRow: PropTypes.func.isRequired,
    changeRow: PropTypes.func.isRequired,
    setRowOverlay: PropTypes.func.isRequired,
    setMoveInRowHeaderIndex: PropTypes.func.isRequired,
    setIsDragging: PropTypes.func.isRequired,
    setIsShowAddRowToolbar: PropTypes.func.isRequired
};
