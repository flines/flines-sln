import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const cns = 'flinesNS-';

export default class ContentView extends PureComponent {
    render() {
        const { text = ' ' } = this.props;
        return (
            <div className={`${cns}contentView`}>{text}</div>
        );
    }
}

ContentView.defaultProps = {
    text: ''
};

ContentView.propTypes = {
    text: PropTypes.string
};
