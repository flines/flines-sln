import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cns } from '../Core';

export default class OuterContainer extends PureComponent {
    render() {
        return (
            <div className={`${cns}OuterContainer`}>
                {this.props.children}
            </div>
        );
    }
}

OuterContainer.propTypes = {
    children: PropTypes.node.isRequired
};
