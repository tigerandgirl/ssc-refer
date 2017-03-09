import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    alias: {

    }
  },

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: /node_modules/ },
      { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;
