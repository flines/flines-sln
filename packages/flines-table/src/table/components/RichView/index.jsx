import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const cns = '.flinesNS-';

export default class RichView extends PureComponent {
    render() {
        const { text, className, onClick } = this.props;
        return (
            <div className={`${cns}RichView ${className}`}
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: text }} /> // eslint-disable-line react/no-danger
        );
    }
}

RichView.defaultProps = {
    text: '',
    className: '',
    onClick: () => {}
};

RichView.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};
