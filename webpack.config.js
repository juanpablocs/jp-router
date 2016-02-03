var webpack = require('webpack');

module.exports = {
    entry: {
        home:'./src/modules/home/home.js',
        login:'./src/modules/login/login.js',
        vendor:['react'],
    },
    output:{
        path:'./build',
        filename:'[name].bundle.js',
        chunkFilename: "[id].chunk.js"
    },
    module:{
        loaders:[ 
            {
                test:/js$/, 
                loader:'babel-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js"),
    ]
}

// var webpack = require('webpack');

// module.exports = {
//     entry: {
//         home:'./src/modules/home/home.js',
//         login:'./src/modules/login/login.js',
//     },
//     output:{
//         path:'./build',
//         filename:'[name].bundle.js',
//         chunkFilename: "[id].chunk.js"
//     },
//     module:{
//         loaders:[ 
//             {
//                 test:/js$/, 
//                 loader:'babel-loader',
//                 exclude: /(node_modules|bower_components)/
//             }
//         ]
//     },
//     externals:{
//         "react": "React",
//         "react-dom": "ReactDOM"
//     },
//     plugins: [
//     ]
// }