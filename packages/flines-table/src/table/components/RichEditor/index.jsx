import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const cns = '.flinesNS-';

export default class RichEditor extends PureComponent {
    render() {
        const { selectAll } = this.props;
        return (
            <div className={`${cns}RichEditor`} onClick={selectAll} />
        );
    }
}

RichEditor.propTypes = {
    selectAll: PropTypes.func.isRequired
};
