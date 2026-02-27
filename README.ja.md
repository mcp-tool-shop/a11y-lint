<p align="center">
  <a href="README.md">English</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-lint/readme.png" width="400" />
</p>

<p align="center">
  <a href="https://pypi.org/project/a11y-lint/"><img src="https://img.shields.io/pypi/v/a11y-lint?color=blue" alt="PyPI version" /></a>
  <a href="https://github.com/mcp-tool-shop-org/a11y-lint/actions/workflows/ci.yml"><img src="https://github.com/mcp-tool-shop-org/a11y-lint/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://codecov.io/gh/mcp-tool-shop-org/a11y-lint"><img src="https://codecov.io/gh/mcp-tool-shop-org/a11y-lint/branch/main/graph/badge.svg" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/python-3.11%20%7C%203.12-blue" alt="Python versions" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="license" /></a>
  <a href="https://mcp-tool-shop-org.github.io/a11y-lint/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page" /></a>
</p>

視覚障碍者向けのアクセシビリティLint機能を、CLI（コマンドラインインターフェース）の出力に適用します。
---
エラーメッセージが、**[OK]/[WARN]/[ERROR] + 何が/なぜ/修正方法** の構造を持つアクセシブルなパターンに従っているか検証します。
## 理由
多くのCLIツールでは、エラー出力は後回しに扱われています。ENOENTエラーや、何が問題なのかを理解するために、ユーザーがターミナルの大量の出力を視覚的に解析する必要があるような、曖昧な致命的なメッセージが表示されることがあります。視覚障害者、認知障害を持つ方、またはストレス下で作業している方にとって、これらのメッセージは障壁となります。
**a11y-lint** は、これらの問題を解決するために、以下のパターンを検出します。
- 拡大表示に適さない、長すぎる行
- 可読性を阻害する大文字のテキスト
- 説明がない専門用語
- 色のみを情報伝達手段とする表現
- 「なぜ」と「修正方法」の説明がない
## 設計思想

### ルールの種類

このツールは、以下の2種類のルールを区別します。

- **WCAGルール**: 特定のWCAG（Web Content Accessibility Guidelines：ウェブコンテンツアクセシビリティガイドライン）の成功基準にマッピングされています。違反は、アクセシビリティの障壁となる可能性があります。
- **ポリシールール**: 認知アクセシビリティに関するベストプラクティスです。WCAGの要件ではありませんが、認知障害を持つユーザーの使いやすさを向上させます。

現在、WCAGにマッピングされているルールは `no-color-only`（WCAG SC 1.4.1）のみです。その他のすべてのルールは、メッセージの明確さと可読性を向上させるポリシールールです。

### グレードとCIゲート

**重要:** レターグレード（A～F）は、経営層向けのレポート用の*集計値*です。これらは、CI（継続的インテグレーション）のゲートとして使用されるべきではありません。

CIパイプラインでは、以下の項目でゲートを設定します。
- 特定のルールの違反（特に `no-color-only`のようなWCAGにマッピングされたルール）
- エラー数の閾値
- 基準からの回帰

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### バッジと適合性

スコアとバッジは、*情報提供のみ*を目的としています。これらは、WCAGへの適合性やアクセシビリティ認証を意味するものではありません。このツールは、最小限のWCAG要件を超えるポリシールールをチェックします。

## インストール

```bash
pip install a11y-lint
```

Python 3.11以降が必要です。

または、ソースコードからインストールします。

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## クイックスタート

CLI出力のアクセシビリティ問題をスキャンします。

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## CLIコマンド

### `scan` - アクセシビリティの問題をチェックします

```bash
a11y-lint scan [OPTIONS] INPUT

Options:
  --stdin              Read from stdin instead of file
  --color [auto|always|never]  Color output mode (default: auto)
  --json               Output results as JSON
  --format [plain|json|markdown]  Output format
  --disable RULE       Disable specific rules (can repeat)
  --enable RULE        Enable only specific rules (can repeat)
  --strict             Treat warnings as errors
```

`--color`オプションは、色の使用を制御します。
- `auto` (デフォルト): `NO_COLOR`と`FORCE_COLOR`環境変数を尊重し、TTY（テレタイプライター）を自動検出します。
- `always`: 色付きの出力を強制します。
- `never`: 色付きの出力を無効にします。

### `validate` - JSONメッセージをスキーマに対して検証します

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - アクセシビリティのスコアカードを生成します

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - Markdownレポートを生成します

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - 利用可能なルールを表示します

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - JSONスキーマを出力します

```bash
a11y-lint schema
```

## 環境変数

| 変数 | 説明 |
|----------|-------------|
| `NO_COLOR` | 色の出力を無効にします（任意の値を設定）。 |
| `FORCE_COLOR` | 色の出力を強制します（任意の値を設定。`NO_COLOR=false`を上書き）。 |

標準については、[no-color.org](https://no-color.org/) を参照してください。

## ルール

### WCAGルール

| ルール | コード | WCAG | 説明 |
|------|------|------|-------------|
| `no-color-only` | CLR001 | 1.4.1 | 色だけで情報を伝えないでください。 |

### ポリシールール

| ルール | コード | 説明 |
|------|------|-------------|
| `line-length` | FMT001 | 行は120文字以下にしてください。 |
| `no-all-caps` | LNG002 | すべて大文字のテキストの使用を避けてください（読みにくい）。 |
| `plain-language` | LNG001 | 専門用語（EOF、STDINなど）の使用を避けてください。 |
| `emoji-moderation` | SCR001 | 絵文字の使用を制限してください（スクリーンリーダーで混乱を招く可能性があります）。 |
| `punctuation` | LNG003 | エラーメッセージは句読点で終わらせてください。 |
| `error-structure` | A11Y003 | エラーは、なぜエラーが発生したのか、そしてどのように修正できるのかを説明する必要があります。 |
| `no-ambiguous-pronouns` | LNG004 | "it"、"this"などで始めることを避けてください。 |

## エラーメッセージの形式

すべてのエラーメッセージは、「何が」「なぜ」「修正方法」という構造に従います。

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## JSONスキーマ

メッセージは、CLIエラーのスキーマ（`schemas/cli.error.schema.v0.1.json`）に準拠しています。

```json
{
  "level": "ERROR",
  "code": "A11Y001",
  "what": "Brief description of what happened",
  "why": "Explanation of why this matters",
  "fix": "How to fix the issue",
  "location": {
    "file": "path/to/file.txt",
    "line": 10,
    "column": 5,
    "context": "relevant text snippet"
  },
  "rule": "rule-name",
  "metadata": {}
}
```

## Python API

```python
from a11y_lint import scan, Scanner, A11yMessage, Level

# Quick scan
messages = scan("ERROR: It failed")

# Custom scanner
scanner = Scanner()
scanner.disable_rule("line-length")
messages = scanner.scan_text(text)

# Create messages programmatically
msg = A11yMessage.error(
    code="APP001",
    what="Configuration file missing",
    why="The app cannot start without config.yaml",
    fix="Create config.yaml in the project root"
)

# Validate against schema
from a11y_lint import is_valid, validate_message
assert is_valid(msg)

# Generate scorecard
from a11y_lint import create_scorecard
card = create_scorecard(messages)
print(card.summary())
print(f"Score: {card.overall_score}% ({card.overall_grade})")

# Generate markdown report
from a11y_lint import render_report_md
markdown = render_report_md(messages, title="My Report")
```

## CI連携

### GitHub Actionsの例

```yaml
- name: Check CLI accessibility
  run: |
    # Capture CLI output
    ./your-cli --help > cli_output.txt 2>&1 || true

    # Lint for accessibility issues
    # Exit code 1 = errors found, 0 = clean
    a11y-lint scan cli_output.txt

    # Or strict mode (warnings = errors)
    a11y-lint scan --strict cli_output.txt
```

### ベストプラクティス

1. **エラーに基づいて判断し、成績に基づいては判断しない**: レターグレードではなく、終了コードを使用します。
2. **特定のルールを有効にする**: WCAGへの準拠のため、`no-color-only`を有効にします。
3. **ベースラインを追跡する**: JSON形式の出力を使用して、リグレッションを検出します。
4. **バッジは情報として扱う**: 準拠を意味するものではありません。

## セキュリティとデータ範囲

**アクセスするデータ**: CLI引数として渡されるテキストファイルとJSONファイル（読み取り専用）、標準入力、標準出力または`-o`パスに書き込まれるレポート。 **アクセスしないデータ**: 指定された引数以外のファイル、ブラウザデータ、OSの認証情報。 **外部ネットワークへのアクセスはありません**。すべてのリンティングはローカルで行われます。 **テレメトリーは収集または送信されません**。

## 関連ツール

| ツール | 説明 |
|------|-------------|
| [a11y-ci](https://pypi.org/project/a11y-ci/) | a11y-lintのスコアカードのCIゲート機能。ベースラインリグレッション検出機能付き。 |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | CLIの失敗時に、決定的なアクセシビリティ支援を提供します。 |

## 開発

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests (176 tests)
pytest

# Type check
pyright a11y_lint

# Lint
ruff check .

# Format
ruff format .
```

## ライセンス

MIT

---

<a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>によって作成されました。
