import path from "path";
import webpack from "webpack"; 
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";
import TerserPlugin from 'terser-webpack-plugin'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverWebPack = {
  externals: [{ "node:path": "commonjs path" }, { "node:http": "commonjs http" }],
  target: 'node',
  resolve: {
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
      'util': false,
      'timers': false,
      'tty': false,
      'url': false,
      'util': false,
      'vm': false,
      'zlib': false,
      'net': false,
      'dns': false,
      'dgram': false
    },
  },
  entry: {
    server: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.cjs',
    publicPath: '/'
  },
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin({  })],
  },
  performance : {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  module: {    
    rules: [{
      enforce: 'pre',
      test: /\.jsx$|\.js$/,
      loader: 'eslint-loader',
      include: `${__dirname}/app`,
      exclude: /bundle\.js$/,
    }
    ,{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      resolve: {
        fullySpecified: false,
      },
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
  // 使用 Hot Module Replacement 外掛
  externals: [
    nodeExternals(),
    { FileReader: 'FileReader' }
  ],
};

export default serverWebPack