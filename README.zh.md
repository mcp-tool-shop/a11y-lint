<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

针对低视力用户的可访问性代码检查，用于检查命令行输出。
---
验证错误消息是否遵循可访问的模式，结构为 **[OK]/[WARN]/[ERROR] + 原因/解决方法**。
## 原因
大多数命令行工具将错误输出视为次要功能。例如，ENOENT 错误或难以理解的致命错误消息，假设用户能够通过视觉方式解析终端输出，并且已经知道发生了什么问题。对于视力较差、认知障碍的用户，或者在压力下工作的人来说，这些消息会造成障碍。
**a11y-lint** 会在这些问题出现之前就将其检测出来：
- 行太长，不适合放大显示
- 使用全大写文本，影响可读性
- 使用没有解释的专业术语
- 仅使用颜色作为提示
- 缺少“原因”和“解决方法”的上下文信息
## 设计理念

### 规则分类

该工具将规则分为两类：

- **WCAG 规则**: 映射到特定的 WCAG 成功标准。违反这些规则可能构成可访问性障碍。
- **策略规则**: 认知可访问性的最佳实践。虽然不是 WCAG 的强制要求，但可以提高认知障碍用户的可用性。

目前，只有 `no-color-only` (WCAG SC 1.4.1) 是映射到 WCAG 的规则。所有其他规则都是策略规则，旨在提高消息的清晰度和可读性。

### 等级与 CI 自动化

**重要提示**: 字母等级 (A-F) 仅为管理层报告的 *汇总信息*。它们绝不应该作为 CI 自动化的主要依据。

对于 CI 自动化流程，应该基于以下内容进行自动化：
- 具体的规则失败（尤其是映射到 WCAG 的规则，如 `no-color-only`）
- 错误计数阈值
- 与基准相比的回归

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### 徽章与合规性

分数和徽章仅为 *信息参考*。它们不代表 WCAG 合规性或可访问性认证。该工具会检查超出 WCAG 最低要求的策略规则。

## 安装

```bash
pip install a11y-lint
```

需要 Python 3.11 或更高版本。

或者，从源代码安装：

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## 快速入门

扫描命令行输出，查找可访问性问题：

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## 命令行命令

### `scan` - 检查可访问性问题

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

`--color` 选项控制彩色输出：
- `auto` (默认值): 尊重 `NO_COLOR` 和 `FORCE_COLOR` 环境变量，自动检测 TTY
- `always`: 强制彩色输出
- `never`: 禁用彩色输出

### `validate` - 验证 JSON 消息是否符合 schema

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - 生成可访问性评估报告

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - 生成 Markdown 报告

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - 显示可用规则

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - 打印 JSON schema

```bash
a11y-lint schema
```

## 环境变量

| 变量 | 描述 |
|----------|-------------|
| `NO_COLOR` | 禁用彩色输出（任何值） |
| `FORCE_COLOR` | 强制彩色输出（任何值，覆盖 `NO_COLOR=false`） |

请参考 [no-color.org](https://no-color.org/) 了解标准。

## 规则

### WCAG 规则

| 规则 | 代码 | WCAG | 描述 |
|------|------|------|-------------|
| `no-color-only` | CLR001 | 1.4.1 | 不要仅通过颜色来传递信息 |

### 策略规则

| 规则 | 代码 | 描述 |
|------|------|-------------|
| `line-length` | FMT001 | 行应该限制在 120 个字符以内 |
| `no-all-caps` | LNG002 | 避免使用全大写文本（难以阅读） |
| `plain-language` | LNG001 | 避免使用技术术语（EOF、STDIN 等） |
| `emoji-moderation` | SCR001 | 限制 emoji 的使用（会干扰屏幕阅读器） |
| `punctuation` | LNG003 | 错误消息应该以标点符号结尾 |
| `error-structure` | A11Y003 | 错误应该解释原因和解决方法 |
| `no-ambiguous-pronouns` | LNG004 | 避免以 "it"、"this" 等开头 |

## 错误消息格式

所有错误消息都遵循“是什么/为什么/如何修复”的结构：

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## JSON 模式

消息符合 CLI 错误模式（`schemas/cli.error.schema.v0.1.json`）：

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

## CI 集成

### GitHub Actions 示例

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

### 最佳实践

1. **关注错误，而非分数：** 使用退出码，而不是字母等级。
2. **启用特定规则：** 为了符合 WCAG 标准，启用 `no-color-only` 规则。
3. **跟踪基线：** 使用 JSON 输出来检测回归。
4. **将徽章视为信息：** 它们不代表符合标准。

## 安全与数据范围

**涉及的数据：** 作为 CLI 参数传递的文本和 JSON 文件（只读），stdin 输入，以及写入到 stdout 或 `-o` 路径生成的报告。 **未涉及的数据：** 不包括指定参数之外的文件，不包括浏览器数据，也不包括操作系统凭据。 **没有网络出站流量：** 所有代码检查都是本地进行的。 **不收集或发送任何遥测数据。**

## 配套工具

| 工具 | 描述 |
|------|-------------|
| [a11y-ci](https://pypi.org/project/a11y-ci/) | 用于 a11y-lint 分数卡的 CI 检查，并具有基线回归检测功能。 |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | 用于 CLI 失败的可预测的可访问性辅助功能。 |

## 开发

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

## 许可证

MIT

---

由 <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a> 构建。
