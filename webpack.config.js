module.exports = {

  mode: 'development',
  devServer: {
    contentBase: 'dist',
  },
  module: {
    rules: [
      {
        test: /.(jsx?)$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],


  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}

