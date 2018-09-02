import { PureComponent } from 'react';

const getColWidthById = (colId, colAttrs) => (
    (colAttrs && colAttrs[colId] && colAttrs[colId].colWidth) || 0
);

const getTableWidthForAuto = ({ colIds, containerWidth }, minColWidth) => {
    let tableWidth = null;
    const colCount = colIds.length;
    let newColWidth = containerWidth / colCount;
    if (newColWidth < minColWidth) {
        newColWidth = minColWidth;
        tableWidth = minColWidth * colCount;
    } else {
        tableWidth = containerWidth;
    }
    return tableWidth;
};

const getTableWidthForResized = ({ colIds, colAttrs, containerWidth }) => {
    let tableWidth = 0;
    let colId = null;
    for (let i = 0; i < colIds.length; i += 1) {
        colId = colIds[i];
        tableWidth += getColWidthById(colId, colAttrs);
    }
    if (tableWidth < containerWidth) {
        tableWidth = containerWidth;
    }
    return tableWidth;
};

const getTableWidth = ({ colIds, colAttrs, containerWidth, tableColResized }, { minColWidth }) => {
    if (tableColResized) {
        return getTableWidthForResized({ colIds, colAttrs, containerWidth });
    }
    return getTableWidthForAuto({ colIds, containerWidth }, minColWidth);
};

export default class WidthLogic extends PureComponent {
    constructor(props) {
        super(props);
        this.getTableWidth = getTableWidth.bind(this);
    }

    render() {
        return null;
    }
}
