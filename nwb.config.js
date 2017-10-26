module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  cssPreprocessors: {
    sass: {
      test: /\.s[ac]ss$/,
      loader: require.resolve('sass-loader')
    }
  }
}
