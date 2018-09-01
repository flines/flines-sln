const path = require('path');
const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
    entry: {
        sample: path.resolve(__dirname, '../sample/index.jsx')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'flines-table-widget-sample',
        libraryTarget: "umd"

    }
});
