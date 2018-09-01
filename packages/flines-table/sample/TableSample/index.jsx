import React, { PureComponent } from 'react';
import TableEditor from '../../src/table/Editor';
import './style.scss';

const sns = 'sample-';

export default class TableSample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: true
        };
    }

    render() {
        const { isEditing } = this.state;
        return (
            <div className={`${sns}tableSample`}>
                <TableEditor editMode={isEditing} />
            </div>
        );
    }
}
