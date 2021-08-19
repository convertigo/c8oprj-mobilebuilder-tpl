const webpack = require('webpack'); //to access built-in plugins
 
console.log("!!!! Extra web pack config enabled !!!");
module.exports = {
    parallelism: 50,
    plugins: [
        new webpack.ProgressPlugin({
            handler(percentage, message, ...args) {
                for (i = 0; i < args.length; i++) {
                    if (args[i].indexOf(".js") != -1) {
                        args[i] = args[i].substring(args[i].lastIndexOf("\\") + 1);
                    }
                }
                console.info(Math.round(percentage * 100) + '%', message,
                    args[0] != undefined ? ", [" + args[0] + "]" : "",
                    args[1] != undefined ? ", [" + args[1] + "]" : ""
                );
            }
        }),

		// Disable sourecmap for vendor.js         
        new webpack.SourceMapDevToolPlugin({
      		filename: '[file].map',
      		exclude: ['vendor.js'],
    	})
    ]
};