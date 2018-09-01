import uuid from 'uuid';

export const defaultRowCount = 2;
export const defaultColCount = 11;

export const minRowCount = 1;
export const maxRowCount = 100000;

export const minColCount = 1;
export const maxColCount = 50;

export const minColWidth = 114;
export const defaultColWidth = 114;

const StyleNS = 'flinesNS';
export const tableStyleNS = `${StyleNS}-table`;
export const tns = `${tableStyleNS}-`;

export const getCellId = (rowId, colId) => `${rowId}_${colId}`;

export { uuid };

export default {};
