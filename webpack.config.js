const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';
const packageJSON = require("./package.json");

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            app: path.join(__dirname, './app'),
            assets: path.join(__dirname, './assets'),
            components: path.join(__dirname, './app/components'),
            containers: path.join(__dirname, './app/containers'),
            contracts: path.join(__dirname, './app/contracts'),
            utils: path.join(__dirname, './app/utils'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
            VERSION: JSON.stringify(packageJSON.version),
            GIT_HOMEPAGE: JSON.stringify(packageJSON.homepage),
            WEB3_PROVIDER_URL: JSON.stringify('wss://ws-proxy.dexon.org'),
            NETWORK_VERSION: JSON.stringify('ropsten'),
            NETWORK_NAME: JSON.stringify('Ropsten Testnet'),
            CONTRACT_ADDRESS: JSON.stringify('0x2290C9872e8c6bE40c4794bFDBf26482DAF728Ee'),
            ETHERSCAN_URL: JSON.stringify('https://testnet.dexscan.app'),
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                    plugins: ['react-hot-loader/babel']
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
