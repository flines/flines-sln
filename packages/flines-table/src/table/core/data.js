import { uuid, getCellId, defaultRowCount, defaultColCount } from './config';

const getCellIdByIndex = (cellIndex, rowIds, colIds) => {
    const strs = cellIndex.split('_');
    const rowIndex = strs[0];
    const colIndex = strs[1];
    return getCellId(rowIds[rowIndex], colIds[colIndex]);
};

const createRowIds = (rowCount) => {
    const rowIds = [];
    for (let i = 0; i < rowCount; i += 1) {
        rowIds.push(uuid());
    }
    return rowIds;
};

const createColIds = (colCount) => {
    const colIds = [];
    for (let i = 0; i < colCount; i += 1) {
        colIds.push(uuid());
    }
    return colIds;
};

const createTableData = (data, rowIds, colIds) => {
    const tableData = {};
    if (data) {
        let cellId = null;
        Object.keys(data).forEach((cellIndex) => {
            cellId = getCellIdByIndex(cellIndex, rowIds, colIds);
            tableData[cellId] = data[cellIndex];
        });
    }
    return tableData;
};

const createTableRowAttrs = (rowAttrs, rowIds) => {
    const tableRowAttrs = {};
    if (rowAttrs) {
        let rowId = null;
        Object.keys(rowAttrs).forEach((rowIndex) => {
            rowId = rowIds[rowIndex];
            tableRowAttrs[rowId] = rowAttrs[rowIndex];
        });
    }
};

const createTableColAttrs = (colAttrs, colIds) => {
    const tableColAttrs = {};
    if (colAttrs) {
        let colId = null;
        Object.keys(colAttrs).forEach((colIndex) => {
            colId = colIds[colIndex];
            tableColAttrs[colId] = colAttrs[colIndex];
        });
    }
    return tableColAttrs;
};

const toClientFromVersion1 = (inData) => {
    const { rowCount, colCount, data, struct } = inData;
    const { rowAttrs, colAttrs } = struct || {};
    const rowIds = createRowIds(rowCount);
    const colIds = createColIds(colCount);
    const tableData = createTableData(data, rowIds, colIds);
    const tableRowAttrs = createTableRowAttrs(rowAttrs, rowIds);
    const tableColAttrs = createTableColAttrs(colAttrs, colIds);
    return {
        rowIds,
        colIds,
        data: tableData,
        rowAttrs: tableRowAttrs,
        colAttrs: tableColAttrs
    };
};

const toClientFromServer = (inData) => {
    const { dataVersion } = inData;
    switch (dataVersion) {
    case '1.0':
    default:
        return toClientFromVersion1(inData);
    }
};

const toClientFromNew = (inData) => {
    const { rowCount = defaultRowCount, colCount = defaultColCount } = inData;
    const rowIds = createRowIds(rowCount);
    const colIds = createColIds(colCount);
    return {
        rowIds,
        colIds,
        data: {},
        rowAttrs: {},
        colAttrs: {}
    };
};

export const toClient = (inData = {}) => {
    const { rowIds } = inData;
    if (rowIds) {
        return inData;
    }
    const { rowCount, colCount, data, struct } = inData;
    const { rowAttrs, colAttrs } = struct || {};
    if (rowCount && colCount && (data || rowAttrs || colAttrs)) {
        return toClientFromServer(inData);
    }
    return toClientFromNew(inData);
};

export default {};
