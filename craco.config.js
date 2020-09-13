const CracoLessPlugin = require('craco-less')
const CracoAntDesignPlugin = require('craco-antd')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

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
                    chalk.hex('#6c5ce7')('build ') +
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
        ],
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
        // { plugin: require('craco-preact') },
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
