#!/bin/bash

# Target port for local preview
PORT=5001

echo "============================================="
echo "  SquirrelAgent Dev Server Launcher"
echo "============================================="

# Check if the port is in use and free it if necessary
echo "Checking if port $PORT is in use..."
PID=$(lsof -t -i:$PORT)

if [ -n "$PID" ]; then
  echo "Port $PORT is currently held by process ID: $PID"
  echo "Freeing port $PORT..."
  kill -9 $PID
  sleep 1
else
  echo "Port $PORT is free."
fi

# Launch the hot-reloading dev server
echo "Starting SquirrelAgent with hot reload on http://localhost:$PORT/ ..."
npx -y live-server public --port=$PORT
