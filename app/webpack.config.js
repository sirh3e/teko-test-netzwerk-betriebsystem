const path = require('path');

module.exports = {
  target: 'node', // Important for Node.js applications
  mode: 'production', // Or 'development' for development settings
  entry: './src/index.js', // Adjust with the path to your main server file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2' // Suitable for Node.js applications
  },
  resolve: {
    fallback: { "url": false } // Avoid polyfilling 'url' if not needed
  },
  externals: {
    express: 'commonjs express' // Treat express as an external dependency
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

