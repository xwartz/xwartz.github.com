var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/scripts/app.js',
        vendor: [
          'react',
          'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, 'src/scripts')],
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015,presets[]=react']
        }, {
            test: /\.scss$/,
            include: [path.resolve(__dirname, 'src/styles')],
            loader: 'style!css!autoprefixer-loader!sass'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
