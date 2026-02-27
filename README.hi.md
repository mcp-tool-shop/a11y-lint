<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.md">English</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

कम दृष्टि वाले उपयोगकर्ताओं के लिए अनुकूलित एक्सेसिबिलिटी जांच (linting) सुविधा, जो कमांड-लाइन इंटरफेस (CLI) के आउटपुट के लिए है।
---
यह जांचता है कि त्रुटि संदेश सुलभ प्रारूप का पालन करते हैं, जिसमें **[ठीक]/[चेतावनी]/[त्रुटि] + कारण/समाधान** की संरचना होती है।
## क्यों?
ज्यादातर कमांड-लाइन टूल त्रुटि आउटपुट को एक अतिरिक्त विचार के रूप में मानते हैं। जैसे कि `ENOENT` त्रुटियां या अस्पष्ट त्रुटि संदेश, यह मानते हैं कि उपयोगकर्ता टर्मिनल के जटिल आउटपुट को समझ सकता है और उसे पहले से पता है कि क्या गलत हुआ है। कम दृष्टि वाले उपयोगकर्ताओं, संज्ञानात्मक अक्षमताओं वाले लोगों, या तनाव में काम करने वाले किसी भी व्यक्ति के लिए, ये संदेश एक बाधा हैं।
**a11y-lint** इन समस्याओं को होने से पहले ही पकड़ लेता है:
- बहुत लंबे लाइनें जो बड़ी स्क्रीन पर दिखाई नहीं देतीं
- बड़े अक्षरों (ALL-CAPS) में लिखा टेक्स्ट जो पढ़ने में मुश्किल होता है
- बिना स्पष्टीकरण के तकनीकी शब्दजाल
- केवल रंग का उपयोग करके जानकारी देना
- "क्यों" और "समाधान" के संदर्भ का अभाव
## सिद्धांत

### नियमों की श्रेणियां

यह टूल दो प्रकार के नियमों के बीच अंतर करता है:

- **WCAG नियम:** विशिष्ट WCAG सफलता मानदंडों से जुड़े। इन नियमों का उल्लंघन एक्सेसिबिलिटी बाधाएं पैदा कर सकता है।
- **नीति नियम:** संज्ञानात्मक एक्सेसिबिलिटी के लिए सर्वोत्तम अभ्यास। ये WCAG की आवश्यकताएं नहीं हैं, लेकिन संज्ञानात्मक अक्षमताओं वाले उपयोगकर्ताओं के लिए उपयोगिता में सुधार करते हैं।

वर्तमान में, केवल `no-color-only` (WCAG SC 1.4.1) ही WCAG से जुड़ा नियम है। बाकी सभी नियम नीति नियम हैं जो संदेशों की स्पष्टता और पठनीयता में सुधार करते हैं।

### ग्रेड बनाम CI गेटिंग

**महत्वपूर्ण:** अक्षर ग्रेड (A-F) कार्यकारी रिपोर्टिंग के लिए *सारांश* होते हैं। इनका उपयोग कभी भी CI गेटिंग के प्राथमिक तंत्र के रूप में नहीं किया जाना चाहिए।

CI पाइपलाइन के लिए, निम्नलिखित पर ध्यान दें:
- विशिष्ट नियम विफलताओं (विशेष रूप से WCAG से जुड़े नियमों जैसे `no-color-only`)
- त्रुटि गणना सीमाएं
- बेसलाइन से होने वाली गिरावट

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### बैज और अनुपालन

स्कोर और बैज केवल **सूचनात्मक** होते हैं। वे WCAG अनुपालन या एक्सेसिबिलिटी प्रमाणीकरण का संकेत नहीं देते हैं। यह टूल न्यूनतम WCAG आवश्यकताओं से परे नीति नियमों की जांच करता है।

## स्थापना

```bash
pip install a11y-lint
```

इसके लिए Python 3.11 या उसके बाद के संस्करण की आवश्यकता है।

या स्रोत कोड से स्थापित करें:

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## शुरुआत कैसे करें

कमांड-लाइन आउटपुट में एक्सेसिबिलिटी समस्याओं की जांच करें:

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## कमांड-लाइन कमांड

### `scan` - एक्सेसिबिलिटी समस्याओं की जांच करें

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

`--color` विकल्प रंगीन आउटपुट को नियंत्रित करता है:
- `auto` (डिफ़ॉल्ट): `NO_COLOR` और `FORCE_COLOR` पर्यावरण चर का सम्मान करें, TTY का स्वचालित रूप से पता लगाएं
- `always`: रंगीन आउटपुट को बाध्य करें
- `never`: रंगीन आउटपुट को अक्षम करें

### `validate` - JSON संदेशों को स्कीमा के विरुद्ध मान्य करें

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - एक्सेसिबिलिटी स्कोरकार्ड उत्पन्न करें

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - मार्कडाउन रिपोर्ट उत्पन्न करें

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - उपलब्ध नियमों को दिखाएं

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - JSON स्कीमा प्रिंट करें

```bash
a11y-lint schema
```

## पर्यावरण चर

| चर | विवरण |
|----------|-------------|
| `NO_COLOR` | रंगीन आउटपुट को अक्षम करें (कोई भी मान) |
| `FORCE_COLOR` | रंगीन आउटपुट को बाध्य करें (कोई भी मान, `NO_COLOR=false` को ओवरराइड करता है) |

मानक के लिए [no-color.org](https://no-color.org/) देखें।

## नियम

### WCAG नियम

| नियम | कोड | WCAG | विवरण |
|------|------|------|-------------|
| `no-color-only` | CLR001 | 1.4.1 | केवल रंग के माध्यम से जानकारी न दें |

### नीति नियम

| नियम | कोड | विवरण |
|------|------|-------------|
| `line-length` | FMT001 | लाइनें 120 वर्ण या उससे कम होनी चाहिए |
| `no-all-caps` | LNG002 | बड़े अक्षरों (hard to read) का उपयोग करने से बचें |
| `plain-language` | LNG001 | तकनीकी शब्दजाल (EOF, STDIN, आदि) से बचें |
| `emoji-moderation` | SCR001 | इमोजी के उपयोग को सीमित करें (स्क्रीन रीडर को भ्रमित करता है) |
| `punctuation` | LNG003 | त्रुटि संदेशों को विराम चिह्न के साथ समाप्त होना चाहिए |
| `error-structure` | A11Y003 | त्रुटियों को यह बताना चाहिए कि क्या गलत हुआ और इसे कैसे ठीक करें |
| `no-ambiguous-pronouns` | LNG004 | "it", "this" आदि से शुरू न करें। |

## त्रुटि संदेश का प्रारूप

सभी त्रुटि संदेश "क्या/क्यों/समाधान" संरचना का पालन करते हैं:

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## JSON स्कीमा

संदेश CLI त्रुटि स्कीमा के अनुरूप होते हैं (`schemas/cli.error.schema.v0.1.json`):

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

## पायथन एपीआई

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

## CI एकीकरण

### GitHub Actions का उदाहरण

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

### सर्वोत्तम अभ्यास

1. **त्रुटियों पर ध्यान दें, अंकों पर नहीं**: अक्षर ग्रेड के बजाय, एग्जिट कोड का उपयोग करें।
2. **विशिष्ट नियमों को सक्षम करें**: WCAG अनुपालन के लिए, `no-color-only` को सक्षम करें।
3. **बेसलाइन को ट्रैक करें**: प्रतिगमन का पता लगाने के लिए JSON आउटपुट का उपयोग करें।
4. **बैज को सूचनात्मक मानें**: वे अनुपालन का संकेत नहीं देते हैं।

## सुरक्षा और डेटा का दायरा

**डेटा जिस पर कार्रवाई की जाती है:** CLI तर्कों के रूप में पारित टेक्स्ट और JSON फाइलें (केवल पढ़ने के लिए), stdin इनपुट, उत्पन्न रिपोर्ट stdout या `-o` पथ पर लिखी जाती हैं। **डेटा जिस पर कार्रवाई नहीं की जाती है:** निर्दिष्ट तर्कों के बाहर कोई भी फाइल, कोई भी ब्राउज़र डेटा, कोई भी OS क्रेडेंशियल। **कोई भी नेटवर्क आउटगोइंग नहीं** - सभी लिंटिंग स्थानीय रूप से होती है। **कोई भी टेलीमेट्री** एकत्र या भेजा नहीं जाता है।

## सहायक उपकरण

| उपकरण | विवरण |
|------|-------------|
| [a11y-ci](https://pypi.org/project/a11y-ci/) | a11y-lint स्कोरकार्ड के लिए CI गेट, जिसमें बेसलाइन प्रतिगमन का पता लगाना शामिल है। |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | CLI विफलताओं के लिए नियतात्मक पहुंच सहायता। |

## विकास

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

## लाइसेंस

MIT

---

<a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a> द्वारा निर्मित।
