import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tns } from '../../Core';
import './style.scss';

const onDragOver = (ev) => {
    ev.preventDefault();
};

export default class ColHeader extends PureComponent {
    constructor(props) {
        super(props);

        this.selectCol = this.selectCol.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.clickColPlaceHolder = this.clickColPlaceHolder.bind(this);
    }

    onDragStart(evt) {
        const { colIndex, setColOverlay, setIsDragging } = this.props;
        const ev = evt;
        ev.dataTransfer.dropEffect = 'move';
        ev.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
        setColOverlay(true);
        const data = {
            index: colIndex,
            type: 'ColumnChange'
        };
        ev.dataTransfer.setData('text', JSON.stringify(data));
    }

    onDrop(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const { colIndex, setColOverlay, changeCol, setIsDragging } = this.props;

        const str = ev.dataTransfer.getData('text');
        setColOverlay(false);
        setIsDragging(false);
        try {
            const data = JSON.parse(str);
            if (data.type !== 'ColumnChange') return;
            const sourceIndex = data.index;
            const targetIndex = colIndex;
            changeCol(sourceIndex, targetIndex);
        } catch (ex) {
            console.error(ex);
        }
    }

    onMouseMove() {
        const { colIndex, setMoveInColHeaderIndex } = this.props;
        setMoveInColHeaderIndex(colIndex);
    }

    onMouseEnter() {
        const { setIsShowAddColToolbar } = this.props;
        setIsShowAddColToolbar(true);
    }

    onMouseLeave() {
        const { setIsShowAddColToolbar } = this.props;
        setIsShowAddColToolbar(false);
    }

    selectCol() {
        const { colIndex, selectCol } = this.props;
        selectCol(colIndex);
    }

    clickColPlaceHolder(e) {
        e.stopPropagation();
        const { setColOverlay, selectCol } = this.props;
        setColOverlay(false);
        selectCol(-1);
    }

    render() {
        const { isSelected, hasColOverlay } = this.props;
        const colHeaderStyle = classnames(`${tns}colHeader`, {
            [`${tns}colHeaderActive`]: isSelected,
            [`${tns}colHeaderOverlay`]: hasColOverlay
        });
        return (
            <div className={colHeaderStyle}
                draggable={isSelected}
                onClick={this.selectCol}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onMouseMove={this.onMouseMove}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <span className={`${tns}colHeaderDragIcon`} />
                {hasColOverlay &&
                    <div className={`${tns}colHeaderEmptyPlace`} onClick={this.clickColPlaceHolder} />
                }
            </div>
        );
    }
}

ColHeader.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    colIndex: PropTypes.number.isRequired,
    hasColOverlay: PropTypes.bool.isRequired,
    changeCol: PropTypes.func.isRequired,
    selectCol: PropTypes.func.isRequired,
    setColOverlay: PropTypes.func.isRequired,
    setMoveInColHeaderIndex: PropTypes.func.isRequired,
    setIsShowAddColToolbar: PropTypes.func.isRequired,
    setIsDragging: PropTypes.func.isRequired
};
