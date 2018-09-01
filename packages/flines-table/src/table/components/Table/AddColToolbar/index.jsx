import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';
import './style.scss';

export default class AddColToolbar extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onClick() {
        const { colIndex, addCol } = this.props;
        addCol(colIndex);
    }

    onMouseEnter() {
        const { setIsShowAddColToolbar } = this.props;
        setIsShowAddColToolbar(true);
    }

    onMouseLeave() {
        const { setIsShowAddColToolbar } = this.props;
        setIsShowAddColToolbar(false);
    }

    render() {
        return (
            <div className={`${tns}addColToolbar`}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <i className={`seismic-articleV2-icon-add ${tns}addColToolbarIcon`}>
                    <span onClick={this.onClick} />
                </i>
            </div>
        );
    }
}

AddColToolbar.propTypes = {
    colIndex: PropTypes.number.isRequired,
    addCol: PropTypes.func.isRequired,
    setIsShowAddColToolbar: PropTypes.func.isRequired
};
