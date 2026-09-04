#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

if ! command -v dsh >/dev/null 2>&1; then
  echo "DS Chat requires DeepSeek Harness. Install the dsh command first." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "DS Chat plugin installation requires pnpm on PATH." >&2
  exit 1
fi

npm install
dsh plugin --profile web add "$(pwd)"
exec dsh --profile web "$@"
