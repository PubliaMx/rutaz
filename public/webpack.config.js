const path = require('path');

module.exports = {
  entry: './src/index.js', // Ruta de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida para los archivos compilados
    filename: 'bundle.js', // Nombre del archivo compilado
  },
  resolve: {
    fallback: {
      // Agrega polyfills para los módulos de Node.js que faltan
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
    },
  },
};
