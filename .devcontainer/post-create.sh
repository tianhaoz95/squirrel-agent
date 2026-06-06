#!/bin/bash
set -e

echo "=== Starting Codespace setup ==="

# Install local dependencies
if [ -f package.json ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "No package.json found, skipping npm install."
fi

# Install Google Antigravity CLI (agy)
echo "Installing Google Antigravity CLI..."
curl -fsSL https://antigravity.google/cli/install.sh | bash

# Install Claude Code CLI (claude)
echo "Installing Claude Code CLI..."
curl -fsSL https://claude.ai/install.sh | bash

echo "=== Codespace environment setup completed successfully ==="
