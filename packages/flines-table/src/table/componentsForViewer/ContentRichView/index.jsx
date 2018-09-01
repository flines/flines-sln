import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const cns = 'flinesNS-';

export default class ContentRichView extends PureComponent {
    render() {
        const { text } = this.props;
        return (
            <div className={`${cns}contentRichView`} dangerouslySetInnerHTML={{ __html: text }} /> // eslint-disable-line react/no-danger
        );
    }
}

ContentRichView.defaultProps = {
    text: ''
};

ContentRichView.propTypes = {
    text: PropTypes.string
};
