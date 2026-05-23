#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.deploy"
BUILD_DIR="$ROOT_DIR/src/.output/public"

# Load credentials
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found. Copy .env.deploy.example and fill in credentials." >&2
  exit 1
fi
# shellcheck source=.env.deploy
source "$ENV_FILE"

# Check for lftp
if ! command -v lftp &>/dev/null; then
  echo "lftp is required but not installed."
  echo "  sudo apt-get install lftp"
  exit 1
fi

# Build static site
echo "==> Building static site..."
(cd "$ROOT_DIR/src" && npm run generate)

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Error: build output not found at $BUILD_DIR" >&2
  exit 1
fi

# Deploy via SFTP (avoids FTP passive-mode issues behind NAT/WSL2)
echo "==> Uploading to $FTP_HOST$FTP_REMOTE_DIR ..."
lftp -u "$FTP_USER","$FTP_PASS" "sftp://$FTP_HOST" <<EOF
set sftp:auto-confirm yes
set net:timeout 30
set net:max-retries 3
mirror --reverse --delete --verbose \
  "$BUILD_DIR" "$FTP_REMOTE_DIR"
bye
EOF

echo "==> Deploy complete."
