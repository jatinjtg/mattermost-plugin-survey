const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/index.jsx',
    ],
    resolve: {
        modules: [
            'assets',
            'src',
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react',
                            'env',
                            'stage-0',
                        ],
                        plugins: [
                            'transform-runtime',
                        ],
                    },
                },
            },
            {
                test: /.(bmp|gif|jpe?g|png|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'assets', to: 'static/'},
        ]),
    ],
    externals: {
        react: 'React',
        redux: 'Redux',
        'prop-types': 'PropTypes',
        'post-utils': 'PostUtils',
        'react-bootstrap': 'ReactBootstrap',
        'react-redux': 'ReactRedux',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'main.js',
    },
};
