module.exports = {
  mode: 'production',
  entry: './app/js/index.js',
  output:  {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [ {
      test: /\.css?$/,
      loader: ['style-loader', 'css-loader']
    }
  ]
  }
}