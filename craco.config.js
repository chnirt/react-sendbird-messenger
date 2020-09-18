const CracoLessPlugin = require('craco-less')
const CracoAntDesignPlugin = require('craco-antd')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    webpack: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@context': path.resolve(__dirname, './src/context'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@layout': path.resolve(__dirname, './src/layout'),
            '@screens': path.resolve(__dirname, './src/screens'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
        plugins: [
            ...(process.env.NODE_ENV === 'development'
                ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
                : []),
            new ProgressBarPlugin({
                format:
                    chalk.hex('#6c5ce7')('process: ') +
                    chalk.hex('#0984e3')('▯:bar▯ ') +
                    // chalk.red('▯ :bar ▯ ') +
                    chalk.hex('#00b894')('(:percent) ') +
                    // chalk.green(':percent ') +
                    chalk.hex('#ffeaa7')(':msg'),
                // chalk.blue('( :elapsed s )')
                complete: '▰',
                incomplete: '▱',
                clear: false,
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // only enable hot in development
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                reloadAll: true,
                            },
                        },
                        'css-loader',
                    ],
                },
            ],
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@assets(.*)$': '<rootDir>/src/assets$1',
                '^@components(.*)$': '<rootDir>/src/components$1',
                '^@constants(.*)$': '<rootDir>/src/constants$1',
                '^@context(.*)$': '<rootDir>/src/context$1',
                '^@helpers(.*)$': '<rootDir>/src/helpers$1',
                '^@hooks(.*)$': '<rootDir>/src/hooks$1',
                '^@layout(.*)$': '<rootDir>/src/layout$1',
                '^@screens(.*)$': '<rootDir>/src/screens$1',
                '^@utils(.*)$': '<rootDir>/src/utils$1',
            },
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#762FDD' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(
                    __dirname,
                    'src/style/AntDesign/customTheme.less'
                ),
            },
        },
    ],
}
