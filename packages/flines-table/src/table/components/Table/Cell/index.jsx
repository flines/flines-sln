import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';

export default class Cell extends PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        const { changeValue, rowId, colId } = this.props;
        changeValue(value, rowId, colId);
    }

    render() {
        const { ContentEdit } = this.context;
        const { value = 'hello nihao' } = this.props.cellData || {};
        return (
            <div className={`${tns}cell`}>
                <ContentEdit text={value} onChange={this.onChange} />
            </div>
        );
    }
}

Cell.defaultProps = {
    cellData: undefined
};

Cell.propTypes = {
    cellData: PropTypes.object,
    rowId: PropTypes.string.isRequired,
    colId: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired
};

Cell.contextTypes = {
    ContentEdit: PropTypes.func.isRequired
};
