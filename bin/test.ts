import webpack from '../lib/webpack'
import path from 'path'
webpack({
    entry: {
        main: './example/test',
    },
    devServer: {
        contentBase: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    context: __dirname
})