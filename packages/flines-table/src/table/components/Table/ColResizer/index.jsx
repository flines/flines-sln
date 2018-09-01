import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';

export default class ColResizer extends PureComponent {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.isDraging = false;
    }

    onMouseDown(e) {
        if (e.button !== 0) {
            return;
        }
        this.isDraging = true;
        this.oldX = this.gripRef.offsetLeft;
        this.oldY = this.gripRef.offsetTop;
        this.oldClientX = e.clientX;

        document.body.addEventListener('mousemove', this.onMouseMove, false);
        document.body.addEventListener('mouseup', this.onMouseUp, false);
    }

    onMouseMove(e) {
        if (this.gripRef) {
            this.gripRef.style.top = `${this.oldY}px`;
            this.gripRef.style.left = `${this.oldX + e.clientX - this.oldClientX}px`;
        }
    }

    onMouseUp(e) {
        this.isDraging = false;
        const { colId, updateColWidth } = this.props;
        const colWidthOffset = -(e.clientX - this.oldClientX);
        this.gripRef.style.top = 'unset';
        this.gripRef.style.left = 'unset';
        // updateColWidth(colWidthOffset, colId);
        document.body.removeEventListener('mousemove', this.onMouseMove, false);
        document.body.removeEventListener('mouseup', this.onMouseUp, false);
    }

    onMouseEnter() {
        const { setIsShowColResizer } = this.props;
        setIsShowColResizer(true);
    }

    onMouseLeave() {
        const { setIsShowColResizer } = this.props;
        if (!this.isDraging) {
            setIsShowColResizer(false);
        }
    }

    render() {
        return (
            <div className={`${tns}colResizer`}>
                <span className={`${tns}colResizerGrip`}
                    ref={(gripRef) => { this.gripRef = gripRef; }}
                    onMouseDown={this.onMouseDown}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                    <span className={`${tns}colResizerGripLine`} />
                </span>
            </div>
        );
    }
}

ColResizer.propTypes = {
    colId: PropTypes.string.isRequired,
    // updateColWidth: PropTypes.func.isRequired,
    setIsShowColResizer: PropTypes.func.isRequired
};
