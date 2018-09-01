import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tns } from '../tableCore';

export default class Cell extends PureComponent {
    render() {
        const { ContentView } = this.context;
        const { value = 'hello nihao' } = this.props.cellData || {};
        return (
            <div className={`${tns}cell`}>
                <ContentView text={value} />
            </div>
        );
    }
}

Cell.defaultProps = {
    cellData: undefined
};

Cell.propTypes = {
    cellData: PropTypes.object
};

Cell.contextTypes = {
    ContentView: PropTypes.func.isRequired
};
