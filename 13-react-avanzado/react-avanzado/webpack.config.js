const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')
const WorkboxWeppackPlugin = require('workbox-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      filename: './index.html'
    }),
    new WebpackPwaManifestPlugin({
      filename: 'manifest.webmanifest',
      name: 'Petgram - Tu app de fotos de mascotas',
      short_name: 'Petgram 🐶',
      description: 'Con Petgram puedes encontrar fotos de animales domésticos muy fácilmente',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      background_color: '#fff',
      theme_color: '#b1a',
      icons: [
        {
          src: path.resolve(__dirname, 'src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('Icons'),
          ios: true
        }
      ]

    }),
    new WorkboxWeppackPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /https:\/\/(res.cloudinary.com|images.unsplash.com)/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images'
          }
        },
        {
          urlPattern: /https:\/\/kasteion-petgram-api.herokuapp.com/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api'
          }
        }
      ]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: {
      disableDotRule: true
    }
  }
}
