<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.md">English</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-lint/readme.png" width="400" />
</p>

<p align="center">
  <a href="https://pypi.org/project/a11y-lint/"><img src="https://img.shields.io/pypi/v/a11y-lint?color=blue" alt="PyPI version" /></a>
  <a href="https://github.com/mcp-tool-shop-org/a11y-lint/actions/workflows/ci.yml"><img src="https://github.com/mcp-tool-shop-org/a11y-lint/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <img src="https://img.shields.io/badge/python-3.11%20%7C%203.12-blue" alt="Python versions" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="license" /></a>
  <a href="https://mcp-tool-shop-org.github.io/a11y-lint/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page" /></a>
</p>

कम दृष्टि वाले उपयोगकर्ताओं के लिए अनुकूलन योग्य, कमांड-लाइन इंटरफेस (CLI) आउटपुट के लिए एक्सेसिबिलिटी जांच उपकरण।
---
यह सुनिश्चित करता है कि त्रुटि संदेश सुलभ प्रारूपों का पालन करें, जिसमें **[ठीक]/[चेतावनी]/[त्रुटि] + कारण/समाधान** की संरचना हो।
## क्यों?
ज्यादातर CLI टूल त्रुटि आउटपुट को एक अतिरिक्त सुविधा के रूप में मानते हैं। जैसे कि `ENOENT` त्रुटियां या अस्पष्ट त्रुटि संदेश, यह मानते हैं कि उपयोगकर्ता घने टर्मिनल आउटपुट को समझ सकता है और उसे पता है कि क्या गलत हुआ। कम दृष्टि वाले उपयोगकर्ताओं, संज्ञानात्मक अक्षमताओं वाले लोगों, या तनाव में काम करने वाले किसी भी व्यक्ति के लिए, ये संदेश एक बाधा हैं।
**a11y-lint** इन समस्याओं को शिप होने से पहले ही पकड़ लेता है:
- बहुत लंबे लाइनें जो बड़ी स्क्रीन पर पढ़ने में मुश्किल होती हैं।
- बड़े अक्षरों (ALL-CAPS) में लिखा टेक्स्ट जो पठनीयता को कम करता है।
- बिना स्पष्टीकरण के तकनीकी शब्दजाल।
- केवल रंग का उपयोग करके जानकारी देना।
- "क्यों" और "समाधान" के संदर्भ की कमी।
## दर्शन

### नियमों की श्रेणियां

यह उपकरण दो प्रकार के नियमों के बीच अंतर करता है:

- **WCAG नियम:** विशिष्ट WCAG सफलता मानदंडों से जुड़े। इन नियमों का उल्लंघन एक्सेसिबिलिटी बाधाएं पैदा कर सकता है।
- **नीति नियम:** संज्ञानात्मक एक्सेसिबिलिटी के लिए सर्वोत्तम अभ्यास। ये WCAG की आवश्यकताएं नहीं हैं, लेकिन संज्ञानात्मक अक्षमताओं वाले उपयोगकर्ताओं के लिए उपयोगिता में सुधार करते हैं।

वर्तमान में, केवल `no-color-only` (WCAG SC 1.4.1) ही एक WCAG-मैप किया गया नियम है। अन्य सभी नियम नीति नियम हैं जो संदेश की स्पष्टता और पठनीयता में सुधार करते हैं।

### ग्रेड बनाम CI गेटिंग

**महत्वपूर्ण:** अक्षर ग्रेड (A-F) कार्यकारी रिपोर्टिंग के लिए *सारांशित जानकारी* हैं। इनका उपयोग कभी भी CI गेटिंग के प्राथमिक तंत्र के रूप में नहीं किया जाना चाहिए।

CI पाइपलाइनों के लिए, निम्नलिखित पर ध्यान दें:
- विशिष्ट नियम विफलताओं (विशेष रूप से `no-color-only` जैसे WCAG-मैप किए गए नियमों)।
- त्रुटि गणना सीमाएं।
- बेसलाइन से होने वाली गिरावट।

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### बैज और अनुपालन

स्कोर और बैज केवल **सूचनात्मक** हैं। वे WCAG अनुपालन या एक्सेसिबिलिटी प्रमाणीकरण का संकेत नहीं देते हैं। यह उपकरण न्यूनतम WCAG आवश्यकताओं से परे नीति नियमों की जांच करता है।

## स्थापना

```bash
pip install a11y-lint
```

Python 3.11 या बाद के संस्करण की आवश्यकता है।

या स्रोत से स्थापित करें:

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## शुरुआत कैसे करें

एक्सेसिबिलिटी समस्याओं के लिए CLI आउटपुट की जांच करें:

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## CLI कमांड

### `scan` - एक्सेसिबिलिटी समस्याओं की जांच करें।

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
- `auto` (डिफ़ॉल्ट): `NO_COLOR` और `FORCE_COLOR` पर्यावरण चर का सम्मान करें, TTY का स्वचालित रूप से पता लगाएं।
- `always`: रंगीन आउटपुट को बाध्य करें।
- `never`: रंगीन आउटपुट को अक्षम करें।

### `validate` - JSON संदेशों को स्कीमा के विरुद्ध मान्य करें।

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - एक्सेसिबिलिटी स्कोरकार्ड उत्पन्न करें।

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - मार्कडाउन रिपोर्ट उत्पन्न करें।

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - उपलब्ध नियमों को दिखाएं।

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - JSON स्कीमा प्रिंट करें।

```bash
a11y-lint schema
```

## पर्यावरण चर

| चर | विवरण |
| ---------- | ------------- |
| `NO_COLOR` | रंगीन आउटपुट को अक्षम करें (कोई भी मान)। |
| `FORCE_COLOR` | रंगीन आउटपुट को बाध्य करें (कोई भी मान, `NO_COLOR=false` को ओवरराइड करता है)। |

मानक के लिए [no-color.org](https://no-color.org/) देखें।

## नियम

### WCAG नियम

| नियम | कोड | WCAG | विवरण |
| ------ | ------ | ------ | ------------- |
| `no-color-only` | CLR001 | 1.4.1 | केवल रंग के माध्यम से जानकारी न दें। |

### नीति नियम

| नियम | कोड | विवरण |
| ------ | ------ | ------------- |
| `line-length` | FMT001 | लाइनें 120 वर्ण या उससे कम होनी चाहिए। |
| `no-all-caps` | LNG002 | बड़े अक्षरों (hard to read) से बचें। |
| `plain-language` | LNG001 | तकनीकी शब्दों (जैसे EOF, STDIN, आदि) का उपयोग करने से बचें। |
| `emoji-moderation` | SCR001 | इमोजी का उपयोग सीमित करें (यह स्क्रीन रीडर को भ्रमित कर सकता है)। |
| `punctuation` | LNG003 | त्रुटि संदेशों का अंत विराम चिह्नों के साथ होना चाहिए। |
| `error-structure` | A11Y003 | त्रुटियों को यह समझाना चाहिए कि समस्या क्या है और इसे कैसे ठीक किया जाए। |
| `no-ambiguous-pronouns` | LNG004 | "यह", "यह", आदि शब्दों से वाक्य शुरू करने से बचें। |

## त्रुटि संदेश का प्रारूप

सभी त्रुटि संदेश "क्या/क्यों/कैसे ठीक करें" संरचना का पालन करते हैं:

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

संदेश CLI त्रुटि स्कीमा (`schemas/cli.error.schema.v0.1.json`) के अनुरूप होते हैं।

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

1. **त्रुटियों पर ध्यान दें, अंकों पर नहीं:** एग्जिट कोड का उपयोग करें, अंकों का नहीं।
2. **विशिष्ट नियमों को सक्षम करें:** WCAG अनुपालन के लिए, `no-color-only` को सक्षम करें।
3. **बेसलाइन को ट्रैक करें:** प्रतिगमन का पता लगाने के लिए JSON आउटपुट का उपयोग करें।
4. **बैज को केवल सूचनात्मक मानें:** वे अनुपालन का संकेत नहीं देते हैं।

## सहायक उपकरण

| उपकरण | विवरण |
| ------ | ------------- |
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
