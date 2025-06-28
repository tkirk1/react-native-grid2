const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the monorepo root to the watchFolders
config.watchFolders = [
  path.resolve(__dirname, '../../'),
];

// Add the packages to the resolver
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];

// Add alias for local package
config.resolver.alias = {
  'react-native-grid2': path.resolve(__dirname, '../../packages/grid2/lib'),
};

module.exports = config;
