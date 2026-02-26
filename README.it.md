<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.md">English</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

Controllo di accessibilità per output della riga di comando, con priorità per gli utenti con problemi di vista.
---
Verifica che i messaggi di errore seguano schemi accessibili con la struttura **[OK]/[AVVERTIMENTO]/[ERRORE] + Cosa/Perché/Soluzione**.
## Perché
Molti strumenti a riga di comando trattano l'output degli errori come un'aggiunta successiva. Messaggi come errori "file non trovato" o messaggi di errore fatali presuppongono che l'utente possa interpretare visivamente l'output del terminale e che già sappia cosa è andato storto. Per gli utenti con problemi di vista, disabilità cognitive o per chiunque lavori sotto stress, questi messaggi rappresentano un ostacolo.
**a11y-lint** rileva questi schemi prima che vengano implementati:
- Righe troppo lunghe per display ingranditi
- Testo in MAIUSCOLO che rende la lettura difficile
- Termini tecnici senza spiegazioni
- Utilizzo del colore come unico indicatore
- Mancanza del contesto "perché" e "soluzione"
## Filosofia

### Categorie di regole

Questo strumento distingue tra due tipi di regole:

- **Regole WCAG**: Corrispondono a specifici criteri di successo WCAG. Le violazioni possono costituire barriere all'accessibilità.
- **Regole di politica**: Buone pratiche per l'accessibilità cognitiva. Non sono requisiti WCAG, ma migliorano l'usabilità per gli utenti con disabilità cognitive.

Attualmente, solo `no-color-only` (WCAG SC 1.4.1) è una regola mappata a WCAG. Tutte le altre regole sono regole di politica che migliorano la chiarezza e la leggibilità dei messaggi.

### Voti rispetto all'integrazione nel sistema di Continuous Integration (CI)

**Importante:** I voti (da A a F) sono *riepiloghi derivati* per la reportistica dirigenziale. Non devono mai essere il meccanismo principale per l'integrazione nel sistema di CI.

Per le pipeline di CI, si deve bloccare l'esecuzione in caso di:
- Fallimento di regole specifiche (soprattutto regole mappate a WCAG come `no-color-only`)
- Superamento delle soglie di numero di errori
- Regressioni rispetto a una baseline

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### Badge e conformità

I punteggi e i badge sono **puramente informativi**. Non implicano la conformità a WCAG o la certificazione di accessibilità. Questo strumento verifica regole di politica che vanno oltre i requisiti minimi di WCAG.

## Installazione

```bash
pip install a11y-lint
```

Richiede Python 3.11 o versioni successive.

Oppure, installare dal codice sorgente:

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## Guida rapida

Analizzare l'output della riga di comando per problemi di accessibilità:

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## Comandi della riga di comando

### `scan` - Controlla la presenza di problemi di accessibilità

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

L'opzione `--color` controlla l'output colorato:
- `auto` (predefinito): Rispetta le variabili d'ambiente `NO_COLOR` e `FORCE_COLOR`, rileva automaticamente il terminale (TTY)
- `always`: Forza l'output colorato
- `never`: Disabilita l'output colorato

### `validate` - Valida i messaggi JSON rispetto allo schema

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - Genera una scheda di valutazione dell'accessibilità

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - Genera un report in formato Markdown

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - Mostra le regole disponibili

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - Stampa lo schema JSON

```bash
a11y-lint schema
```

## Variabili d'ambiente

| Variabile | Descrizione |
| ---------- | ------------- |
| `NO_COLOR` | Disabilita l'output colorato (qualsiasi valore) |
| `FORCE_COLOR` | Forza l'output colorato (qualsiasi valore, sovrascrive NO_COLOR=false) |

Consultare [no-color.org](https://no-color.org/) per lo standard.

## Regole

### Regole WCAG

| Regola | Codice | WCAG | Descrizione |
| ------ | ------ | ------ | ------------- |
| `no-color-only` | CLR001 | 1.4.1 | Non trasmettere informazioni solo attraverso il colore |

### Regole di politica

| Regola | Codice | Descrizione |
| ------ | ------ | ------------- |
| `line-length` | FMT001 | Le righe devono contenere al massimo 120 caratteri |
| `no-all-caps` | LNG002 | Evitare il testo in MAIUSCOLO (difficile da leggere) |
| `plain-language` | LNG001 | Evitare termini tecnici (EOF, STDIN, ecc.). |
| `emoji-moderation` | SCR001 | Limitare l'uso di emoji (possono confondere i lettori di schermo). |
| `punctuation` | LNG003 | I messaggi di errore devono terminare con la punteggiatura. |
| `error-structure` | A11Y003 | Gli errori devono spiegare perché si sono verificati e come risolverli. |
| `no-ambiguous-pronouns` | LNG004 | Evitare di iniziare con "it", "this", ecc. |

## Formato dei messaggi di errore

Tutti i messaggi di errore seguono la struttura Cosa/Perché/Soluzione:

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## Schema JSON

I messaggi sono conformi allo schema degli errori della CLI (`schemas/cli.error.schema.v0.1.json`):

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

## API Python

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

## Integrazione CI

### Esempio di GitHub Actions

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

### Buone pratiche

1. **Concentrarsi sugli errori, non sui voti**: Utilizzare i codici di uscita, non i voti.
2. **Abilitare regole specifiche**: Per la conformità WCAG, abilitare `no-color-only`.
3. **Tracciare le baseline**: Utilizzare l'output JSON per rilevare regressioni.
4. **Considerare le badge come informative**: Non implicano la conformità.

## Strumenti complementari

| Strumento | Descrizione |
| ------ | ------------- |
| [a11y-ci](https://pypi.org/project/a11y-ci/) | Controllo CI per i risultati di accessibilità con rilevamento di regressioni rispetto alla baseline. |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | Assistenza deterministica per l'accessibilità in caso di errori della CLI. |

## Sviluppo

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

## Licenza

MIT
