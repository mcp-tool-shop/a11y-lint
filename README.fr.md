<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.md">English</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

Vérification de l'accessibilité pour les sorties de la ligne de commande, en tenant compte des utilisateurs ayant une vision limitée.
---
Vérifie que les messages d'erreur suivent des modèles accessibles, avec la structure **[OK]/[AVERTISSEMENT]/[ERREUR] + Quoi/Pourquoi/Comment corriger**.
## Pourquoi ?
La plupart des outils en ligne de commande traitent la sortie des erreurs comme une fonctionnalité secondaire. Les messages tels que les erreurs "fichier introuvable" ou les messages d'erreur fatals cryptiques supposent que l'utilisateur peut interpréter visuellement une sortie de terminal dense et qu'il connaît déjà ce qui s'est mal passé. Pour les utilisateurs ayant une vision limitée, des troubles cognitifs, ou pour toute personne travaillant dans un environnement stressant, ces messages constituent un obstacle.
**a11y-lint** détecte ces problèmes avant leur mise en production :
- Lignes trop longues pour les écrans agrandis
- Texte en majuscules qui nuit à la lisibilité
- Jargon sans explication
- Utilisation de la couleur comme seul indicateur
- Absence de contexte "pourquoi" et "comment corriger"
## Philosophie

### Catégories de règles

Cet outil distingue deux types de règles :

- **Règles WCAG :** Correspondant à des critères de succès spécifiques des WCAG. Les violations peuvent constituer des obstacles à l'accessibilité.
- **Règles de politique :** Bonnes pratiques pour l'accessibilité cognitive. Elles ne sont pas des exigences WCAG, mais améliorent l'utilisabilité pour les utilisateurs ayant des troubles cognitifs.

Actuellement, seule la règle `no-color-only` (WCAG SC 1.4.1) est une règle associée aux WCAG. Toutes les autres règles sont des règles de politique qui améliorent la clarté et la lisibilité des messages.

### Notes et intégration continue (CI)

**Important :** Les notes (de A à F) sont des *résumés* pour les rapports de direction. Elles ne doivent **jamais** être le principal mécanisme pour l'intégration continue (CI).

Pour les pipelines CI, vérifiez :
- Les échecs de règles spécifiques (en particulier les règles associées aux WCAG, comme `no-color-only`)
- Les seuils de nombre d'erreurs
- Les régressions par rapport à une référence

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### Badges et conformité

Les scores et les badges sont **purement informatifs**. Ils n'impliquent pas la conformité aux WCAG ni une certification d'accessibilité. Cet outil vérifie des règles de politique qui vont au-delà des exigences minimales des WCAG.

## Installation

```bash
pip install a11y-lint
```

Nécessite Python 3.11 ou une version ultérieure.

Ou installez à partir du code source :

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## Démarrage rapide

Analysez la sortie de la ligne de commande pour détecter les problèmes d'accessibilité :

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## Commandes de la ligne de commande

### `scan` - Vérifie les problèmes d'accessibilité

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

L'option `--color` contrôle la sortie colorée :
- `auto` (par défaut) : Respecte les variables d'environnement `NO_COLOR` et `FORCE_COLOR`, détecte automatiquement le TTY
- `always` : Force la sortie colorée
- `never` : Désactive la sortie colorée

### `validate` - Valide les messages JSON par rapport à un schéma

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - Génère un tableau de bord d'accessibilité

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - Génère un rapport au format Markdown

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - Affiche les règles disponibles

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - Affiche le schéma JSON

```bash
a11y-lint schema
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `NO_COLOR` | Désactive la sortie colorée (toute valeur) |
| `FORCE_COLOR` | Force la sortie colorée (toute valeur, remplace `NO_COLOR=false`) |

Consultez [no-color.org](https://no-color.org/) pour la norme.

## Règles

### Règles WCAG

| Règle | Code | WCAG | Description |
|------|------|------|-------------|
| `no-color-only` | CLR001 | 1.4.1 | Ne transmettez pas d'informations uniquement par la couleur |

### Règles de politique

| Règle | Code | Description |
|------|------|-------------|
| `line-length` | FMT001 | Les lignes doivent contenir 120 caractères ou moins |
| `no-all-caps` | LNG002 | Évitez le texte en majuscules (difficile à lire) |
| `plain-language` | LNG001 | Évitez le jargon technique (EOF, STDIN, etc.) |
| `emoji-moderation` | SCR001 | Limitez l'utilisation des emojis (perturbe les lecteurs d'écran) |
| `punctuation` | LNG003 | Les messages d'erreur doivent se terminer par une ponctuation |
| `error-structure` | A11Y003 | Les erreurs doivent expliquer pourquoi et comment les corriger |
| `no-ambiguous-pronouns` | LNG004 | Évitez de commencer par "il", "ceci", etc. |

## Format des messages d'erreur

Tous les messages d'erreur suivent la structure "Quoi/Pourquoi/Solution".

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## Schéma JSON

Les messages sont conformes au schéma d'erreur de l'interface en ligne de commande (`schemas/cli.error.schema.v0.1.json`).

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

## Intégration CI

### Exemple d'utilisation avec GitHub Actions

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

### Meilleures pratiques

1. **Prioriser les erreurs, pas les notes :** Utilisez les codes de sortie, pas les notes.
2. **Activer des règles spécifiques :** Pour la conformité WCAG, activez la règle `no-color-only`.
3. **Suivre les valeurs de référence :** Utilisez la sortie JSON pour détecter les régressions.
4. **Considérer les badges comme informatifs :** Ils n'impliquent pas la conformité.

## Sécurité et portée des données

**Données traitées :** fichiers texte et JSON transmis en tant qu'arguments de l'interface en ligne de commande (lecture seule), entrées standard (stdin), rapports générés et écrits sur la sortie standard (stdout) ou le chemin spécifié avec l'option `-o`. **Données NON traitées :** aucun fichier en dehors des arguments spécifiés, aucune donnée du navigateur, aucune information d'identification du système d'exploitation. **Aucun transfert de données vers le réseau** : toute l'analyse est effectuée localement. **Aucune télémétrie** n'est collectée ou envoyée.

## Outils complémentaires

| Outil | Description |
|------|-------------|
| [a11y-ci](https://pypi.org/project/a11y-ci/) | Vérification CI pour les rapports de score d'accessibilité avec détection de régressions par rapport aux valeurs de référence. |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | Assistance déterministe pour les échecs de l'interface en ligne de commande. |

## Développement

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

## Licence

MIT

---

Créé par <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>
