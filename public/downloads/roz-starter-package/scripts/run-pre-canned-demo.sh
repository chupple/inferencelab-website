#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA_FILE="$PACKAGE_DIR/data/pre-canned-workday.json"

printf 'Roz pre-canned demo data:\n'
python3 - <<'PY' "$DATA_FILE"
import json, sys
from pathlib import Path
payload = json.loads(Path(sys.argv[1]).read_text())
print(f"Assistant: {payload['assistant']}")
print(f"Scenario: {payload['scenario']}")
print('Email priorities:')
for item in payload['email']:
    print(f"- {item['subject']}: {item['priority']}")
print('Calendar recommendation:')
for item in payload['calendar']:
    print(f"- {item['title']} -> {item['recommended_time']} ({item['reason']})")
print('Secrets:', payload['secrets'])
PY
