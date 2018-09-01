import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../../Core';
import './style.scss';

export default class AddRowToolbar extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onClick() {
        const { rowIndex, addRow } = this.props;
        addRow(rowIndex);
    }

    onMouseEnter() {
        const { setIsShowAddRowToolbar } = this.props;
        setIsShowAddRowToolbar(true);
    }

    onMouseLeave() {
        const { setIsShowAddRowToolbar } = this.props;
        setIsShowAddRowToolbar(false);
    }

    render() {
        return (
            <div className={`${tns}addRowToolbar`}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <i className={`seismic-articleV2-icon-add ${tns}addRowToolbarIcon`}>
                    <span onClick={this.onClick} />
                </i>
            </div>
        );
    }
}

AddRowToolbar.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    setIsShowAddRowToolbar: PropTypes.func.isRequired,
    addRow: PropTypes.func.isRequired
};
