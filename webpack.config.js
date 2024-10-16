import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',  // Entry point for your application
  module: {
    rules: [
      {
        test: /\.tsx?$/,       // Regular expression to match .ts and .tsx files
        use: 'ts-loader',      // Use ts-loader for TypeScript files
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],  // Resolve these extensions
  },
  output: {
    filename: 'bundle.js',  // Output bundle file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  mode: 'development',      // Set mode to development or production
};