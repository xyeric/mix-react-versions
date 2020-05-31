var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDev = process.env.NODE_ENV === 'development';

var config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          transpileOnly: false, // 注释掉会生成d.ts
          configFileName: path.join(__dirname, 'tsconfig.json'),
          useBabel: true,
          babelOptions: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'last 2 versions, ie 11',
                  modules: false
              }]
            ],
          },
          babelCore: '@babel/core',
        },
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: require.resolve('source-map-loader')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: JSON.stringify({
              esModule: true,
            }),
          },
          {
            loader: require.resolve('css-modules-typescript-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              sourceMap: true,
              esModule: true,
            }
          },
          {
            loader: require.resolve('sass-loader'),
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  externals : function (context, request, callback) {
    if (/^react$/.test(request)) {
      return callback(null, 'React15');
    }
    if (/^react-dom$/.test(request)) {
      return callback(null, 'ReactDOM15');
    }

    if (/react-16/.test(request)) {
      return callback(null, 'React16');
    }
    if (/react-dom-16/.test(request)) {
      return callback(null, 'ReactDOM16');
    }

    const react16Deps = [
      /@alifd\/next/,
      /@formily/,
    ];

    const matched = react16Deps.filter(reg => reg.test(context));
    if (matched.length) {
      if (/^react$/.test(request)) {
        return callback(null, 'React16');
      }
      if (/^react-dom$/.test(request)) {
        return callback(null, 'ReactDOM16');
      }
    }

    callback();
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/static'),
          to: path.resolve(__dirname, 'build/static'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    port: 3456,
  },
};

module.exports = config;