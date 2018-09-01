import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tableStyleNS } from './Core';
import TableContainer from './InnerContainer';
import RealTable from './RealInnerTable';
import Row from './Row';
import Column from './Column';
import Cell from './Cell';
import ContentView from '../Addons/RichViewer';
import './style.scss';

export default class Table extends PureComponent {
    constructor(props) {
        super(props);

        this.getTableInfo = this.getTableInfo.bind(this);
        this.setTableInfo = this.setTableInfo.bind(this);
        this.setTableElStyle = this.setTableElStyle.bind(this);
        this.startRealRender = this.startRealRender.bind(this);
        this.beforeRealRender = this.beforeRealRender.bind(this);
        this.realRender = this.realRender.bind(this);
        this.tableInfo = {};
        this.state = {
            isLoaded: false,
            rowIds: this.props.data && this.props.data.rowIds,
            colIds: this.props.data && this.props.data.colIds,
            data: this.props.data && this.props.data.data,
            rowAttrs: this.props.data && this.props.data.rowAttrs,
            colAttrs: this.props.data && this.props.data.colAttrs
        };
        this.defineSmartComponent();
    }

    defineSmartComponent() { // eslint-disable-line react/sort-comp
        this.SmartTableContainer = (props => <TableContainer {...props}>{props.children}</TableContainer>);
        this.SmartRealTable = (props => <RealTable {...props} />);
        this.SmartRow = (props => <Row {...props}>{props.children}</Row>);
        this.SmartColumn = (props => <Column {...props}>{props.children}</Column>);
        this.SmartCell = (props => <Cell {...props}>{props.children}</Cell>);
    }

    getChildContext() {
        return {
            Row: this.SmartRow,
            Column: this.SmartColumn,
            Cell: this.SmartCell,
            ContentView
        };
    }

    componentDidMount() {
        if (this.outerContainerRef) {
            this.tableInfo.tableWidth = this.outerContainerRef.offsetWidth;
        }
        setTimeout(() => {
            this.startRealRender();
        }, 0);
    }

    getTableInfo() {
        return this.tableInfo || {};
    }

    setTableInfo(info) {
        this.tableInfo = { ...this.tableInfo, ...info };
    }

    setTableElStyle(setStyleCallBack) {
        if (typeof setStyleCallBack === 'function') {
            if (this.tableRootRef) {
                setStyleCallBack(this.tableRootRef, {
                    rootEl: this.tableRootRef
                });
            }
        }
    }

    startRealRender() {
        this.setState({
            isLoaded: true
        });
    }

    beforeRealRender() {
        const customStyle = {
            width: '100%'
        };
        return (<div style={customStyle}
            ref={(outerContainerRef) => { this.outerContainerRef = outerContainerRef; }} />);
    }

    realRender() {
        const { rowIds, colIds, data, rowAttrs, colAttrs } = this.state;
        return (
            <div className={`${tableStyleNS}`}
                ref={(tableRootRef) => { this.tableRootRef = tableRootRef; }}>
                <this.SmartTableContainer>
                    <this.SmartRealTable rowIds={rowIds}
                        colIds={colIds}
                        data={data}
                        rowAttrs={rowAttrs}
                        colAttrs={colAttrs} />
                </this.SmartTableContainer>
            </div>
        );
    }

    render() {
        const { isLoaded } = this.state;
        return isLoaded ? this.realRender() : this.beforeRealRender();
    }
}

Table.propTypes = {
    data: PropTypes.shape({
        rowIds: PropTypes.array.isRequired,
        colIds: PropTypes.array.isRequired,
        data: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        rowAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        }),
        colAttrs: PropTypes.shape({
            [PropTypes.string]: PropTypes.object
        })
    }).isRequired
};

Table.childContextTypes = {
    Row: PropTypes.func.isRequired,
    Column: PropTypes.func.isRequired,
    Cell: PropTypes.func.isRequired,
    ContentView: PropTypes.func.isRequired
};
