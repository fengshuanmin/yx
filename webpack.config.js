var path = require("path");
var webpack = require('webpack');



module.exports = {
    devtool: 'source-map',
    entry: {
        lexiuApp:['webpack/hot/dev-server', './lexiuApp/src/js/app.js'],
        loveCarRepair:['webpack/hot/dev-server', './loveCarRepair/src/js/index.js'],
        newBuild:['webpack/hot/dev-server', './newBuild/src/js/index.js'],
        Inquiry:['webpack/hot/dev-server', './inquiry/src/js/index.js'],
        reportStatistics:['webpack/hot/dev-server', './reportStatistics/src/js/index.js'],
    },
    output: {
        path:__dirname + '/dist',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {test: /\.html$/,loader: 'file?name=./build/[name].[ext]'},
            {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader?{browsers:['last 2 version']}"},
            {test: /vendor\/.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window'},
            {test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=server/lexiugo/page/react-owner/dist/img/[name].[ext],url-loader?limit=8192'}
        ]
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        proxy: {
            '/lexiugo-app/*': {
                target: 'http://121.43.165.81:8989',
                //target: 'http://192.168.0.116:8080',
                secure: false
            }
        },
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'web_modules']
    }
};