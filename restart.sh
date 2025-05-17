#!/bin/bash

echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite

echo "🔄 Restarting dev server..."
npm run dev

chmod +x restart.sh
