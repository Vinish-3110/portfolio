#!/bin/sh
set -e

mkdir -p /app/images /app/uploads

if [ -d /app/image-defaults ]; then
  find /app/image-defaults -type f | while read -r src; do
    rel="${src#/app/image-defaults/}"
    dest="/app/images/$rel"
    mkdir -p "$(dirname "$dest")"
    if [ ! -f "$dest" ]; then
      cp "$src" "$dest"
    fi
  done
fi

exec node server.js
