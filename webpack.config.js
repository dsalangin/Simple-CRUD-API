import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const config = {
  entry: './index.ts',
  target: 'node',
  mode: 'production',
  output: {
    path: resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
    filename: 'index.js',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
