import path from "path";
import {fileURLToPath} from 'url';
import webpack from "webpack";
import TerserPlugin from 'terser-webpack-plugin'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientWebpack = {
    externals: [{ "node:path": "commonjs path" }, { "node:http": "commonjs http" }],
    resolve: {
      preferRelative: true,
      fallback: {
        'child_process': false,
        'worker_threads': false,
        'uglify-js': false,
        '@swc/core': false,
        'esbuild': false,
        'fs': false,
        'assert': false,
        'buffer': false,
        'console': false,
        'constants': false,
        'crypto': false,
        'domain-browser': false,
        'events': false,
        'http': false,
        'https': false,
        'os': false,
        'path': false,
        'punycode': false,
        'process': false,
        'querystring-es3': false,
        'stream': false,
        'string': false,
        'timers': false,
        'tty': false,
        'url': false,
        'util': false,
        'vm': false,
        'zlib': false,
        'dns': false,
        'net': false,
        'dgram': false,
      },
    },
  entry: {
    //main: ['webpack-hot-middleware/client', './src/client/index.js']
    main: ['./src/client/index.js']
  },
  devServer: {
    static: './public',
    hot: true,
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ })],
  },
  performance : {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/app`,
        exclude: /bundle\.js$/,
      }
      ,
      {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      resolve: {
        fullySpecified: false,
      },
      /*options: {
        plugins: [
          'react-hot-loader/babel'
        ]
      },*/
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        // 配置 name 屬性 (第二步)
        name: '[name].[ext]',
      },
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }
  ],
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

export default clientWebpack