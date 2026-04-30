#!/usr/bin/env bash
# Deploy x-warroom-v2 to VPS. Run from project root after `git push`.
# VPS must already have systemd unit `x-warroom-v2.service` installed.
set -euo pipefail

VPS_HOST="${VPS_HOST:-root@207.148.110.107}"
VPS_KEY="${VPS_KEY:-$HOME/.ssh/vultr_warroom}"
VPS_PATH="${VPS_PATH:-/opt/x-warroom-v2}"
SERVICE="${SERVICE:-x-warroom-v2}"
PORT="${PORT:-3001}"

ssh -i "$VPS_KEY" -o StrictHostKeyChecking=no "$VPS_HOST" bash <<EOF
set -euo pipefail
cd "$VPS_PATH"
echo "--- pull ---"
git pull --rebase 2>&1 | tail -3
echo "--- install ---"
bun install --no-save 2>&1 | tail -3
echo "--- build ---"
bun run build 2>&1 | tail -5
echo "--- restart ---"
systemctl restart $SERVICE
sleep 4
systemctl is-active $SERVICE
echo "--- smoke ---"
curl -s -o /dev/null -w "home: %{http_code}\n" http://localhost:$PORT
curl -s -o /dev/null -w "suggest: %{http_code}\n" http://localhost:$PORT/api/claude/suggest
EOF
