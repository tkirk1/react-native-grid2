#!/bin/bash
cd "$(dirname "$0")"
echo "Publishing @tkirk1/react-native-grid2..."
npm publish --access=public 2>&1
echo "Publish attempt completed"