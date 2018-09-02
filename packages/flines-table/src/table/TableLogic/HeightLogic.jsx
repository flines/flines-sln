import { PureComponent } from 'react';

const getRowHeightById = (rowId, rowAttrs) => (
    (rowAttrs && rowAttrs[rowId] && rowAttrs[rowId].rowHeight) || 0
);

const getTableHeight = ({ rowIds, rowAttrs }) => {
    let tableHeight = 0;
    let rowId = null;
    for (let i = 0; i < rowIds.length; i += 1) {
        rowId = rowIds[i];
        tableHeight += getRowHeightById(rowId, rowAttrs);
    }
    return tableHeight;
};

export default class HeightLogic extends PureComponent {
    constructor(props) {
        super(props);
        this.getTableHeight = getTableHeight.bind(this);
    }

    render() {
        return null;
    }
}
