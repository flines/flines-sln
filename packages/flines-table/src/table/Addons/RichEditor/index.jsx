import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichEditor from './InnerRichEditor';
import RichView from './InnerRichViewer';
import { i18n } from '../../core/context';
import './style.scss';

const cns = '.flinesNS-';

export default class ContentRichEdit extends PureComponent {
    constructor(props) {
        super(props);
        this.clickRichView = this.clickRichView.bind(this);
    }

    clickRichView() {
        const { activeEdit } = this.props;
        activeEdit();
    }

    render() {
        const { isEditing, onChange } = this.props;
        const placeHolder = i18n.format('Widgets_Table_AddContentPlaceHolder');
        if (!isEditing) {
            const text = this.props.text || ' ';
            return <RichView text={text} onClick={this.clickRichView} />;
        }
        const text = this.props.text || '';
        return (
            <RichEditor className={`${cns}ContentRichEdit`}
                value={text}
                placeholder={placeHolder}
                onChange={onChange} />
        );
    }
}

ContentRichEdit.defaultProps = {
    text: '',
    isEditing: false,
    activeEdit: () => {}
};

ContentRichEdit.propTypes = {
    text: PropTypes.string,
    isEditing: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    activeEdit: PropTypes.func
};
