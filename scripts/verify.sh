#!/usr/bin/env bash
set -euo pipefail

echo "=== Running tests ==="
pytest tests/ -v --tb=short

echo ""
echo "=== CLI smoke test ==="
a11y-lint --help > /dev/null
a11y-lint list-rules > /dev/null
a11y-lint schema > /dev/null
echo "CLI commands OK"

echo ""
echo "=== Building package ==="
python -m build

echo ""
echo "=== All checks passed ==="
