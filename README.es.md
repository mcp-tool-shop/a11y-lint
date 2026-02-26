<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.md">English</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

Accesibilidad para usuarios con baja visión: análisis de la salida de la línea de comandos.
---
Valida que los mensajes de error sigan patrones accesibles con la estructura **[OK]/[ADVERTENCIA]/[ERROR] + ¿Qué/Por qué/Solución**.
## ¿Por qué?
La mayoría de las herramientas de línea de comandos tratan la salida de errores como una función secundaria. Los mensajes como los errores "ENOENT" o los mensajes fatales crípticos asumen que el usuario puede interpretar visualmente la salida densa de la terminal y ya sabe qué ha salido mal. Para los usuarios con baja visión, discapacidades cognitivas o cualquier persona que trabaje bajo estrés, estos mensajes son una barrera.
**a11y-lint** detecta estos patrones antes de que se publiquen:
- Líneas demasiado largas para pantallas ampliadas.
- Texto en MAYÚSCULAS que dificulta la legibilidad.
- Jerga sin explicación.
- Uso del color como único indicador.
- Falta de contexto sobre el "por qué" y la "solución".
## Filosofía

### Categorías de reglas

Esta herramienta distingue entre dos tipos de reglas:

- **Reglas de WCAG**: Mapeadas a criterios de éxito específicos de WCAG. Las infracciones pueden constituir barreras de accesibilidad.
- **Reglas de política**: Mejores prácticas para la accesibilidad cognitiva. No son requisitos de WCAG, pero mejoran la usabilidad para los usuarios con discapacidades cognitivas.

Actualmente, solo `no-color-only` (WCAG SC 1.4.1) es una regla mapeada a WCAG. Todas las demás reglas son reglas de política que mejoran la claridad y la legibilidad de los mensajes.

### Calificaciones vs. Control de calidad (CI)

**Importante:** Las calificaciones (de la A a la F) son *resúmenes derivados* para informes ejecutivos. **Nunca** deben ser el principal mecanismo para el control de calidad (CI).

Para las canalizaciones de CI, se debe controlar:
- Fallos de reglas específicas (especialmente las reglas mapeadas a WCAG, como `no-color-only`).
- Umbrales de recuento de errores.
- Regresiones con respecto a una línea de base.

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### Insignias y conformidad

Las puntuaciones y las insignias son **puramente informativas**. NO implican conformidad con WCAG ni certificación de accesibilidad. Esta herramienta verifica reglas de política que van más allá de los requisitos mínimos de WCAG.

## Instalación

```bash
pip install a11y-lint
```

Requiere Python 3.11 o posterior.

O instale desde el código fuente:

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## Comienzo rápido

Analice la salida de la línea de comandos en busca de problemas de accesibilidad:

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## Comandos de la línea de comandos

### `scan` - Comprueba si hay problemas de accesibilidad

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

La opción `--color` controla la salida con color:
- `auto` (predeterminado): Respeta las variables de entorno `NO_COLOR` y `FORCE_COLOR`, detecta automáticamente el TTY.
- `always`: Fuerza la salida con color.
- `never`: Desactiva la salida con color.

### `validate` - Valida mensajes JSON contra un esquema

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - Genera un informe de accesibilidad

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - Genera un informe en formato Markdown

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - Muestra las reglas disponibles

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - Imprime el esquema JSON

```bash
a11y-lint schema
```

## Variables de entorno

| Variable | Descripción |
| ---------- | ------------- |
| `NO_COLOR` | Desactiva la salida con color (cualquier valor). |
| `FORCE_COLOR` | Fuerza la salida con color (cualquier valor, anula `NO_COLOR=false`). |

Consulte [no-color.org](https://no-color.org/) para obtener la norma.

## Reglas

### Reglas de WCAG

| Regla | Código | WCAG | Descripción |
| ------ | ------ | ------ | ------------- |
| `no-color-only` | CLR001 | 1.4.1 | No transmitir información solo a través del color. |

### Reglas de política

| Regla | Código | Descripción |
| ------ | ------ | ------------- |
| `line-length` | FMT001 | Las líneas deben tener 120 caracteres o menos. |
| `no-all-caps` | LNG002 | Evite el texto en mayúsculas (difícil de leer). |
| `plain-language` | LNG001 | Evitar la jerga técnica (EOF, STDIN, etc.). |
| `emoji-moderation` | SCR001 | Limitar el uso de emojis (confunden a los lectores de pantalla). |
| `punctuation` | LNG003 | Los mensajes de error deben terminar con signos de puntuación. |
| `error-structure` | A11Y003 | Los errores deben explicar por qué ocurrieron y cómo solucionarlos. |
| `no-ambiguous-pronouns` | LNG004 | Evitar comenzar con "esto", "eso", etc. |

## Formato de los mensajes de error

Todos los mensajes de error siguen la estructura Qué/Por qué/Solución:

```
[ERROR] CODE: What happened
  Why: Explanation of why this matters
  Fix: Actionable suggestion

[WARN] CODE: What to improve
  Why: Why this matters
  Fix: How to improve (optional)

[OK] CODE: What was checked
```

## Esquema JSON

Los mensajes cumplen con el esquema de errores de la interfaz de línea de comandos (`schemas/cli.error.schema.v0.1.json`):

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

## API de Python

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

## Integración con CI

### Ejemplo de GitHub Actions

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

### Mejores prácticas

1. **Priorizar los errores, no las calificaciones**: Utilizar códigos de salida, no calificaciones.
2. **Habilitar reglas específicas**: Para el cumplimiento de WCAG, habilitar `no-color-only`.
3. **Realizar un seguimiento de las líneas base**: Utilizar la salida JSON para detectar regresiones.
4. **Considerar los distintivos como informativos**: No implican conformidad.

## Herramientas complementarias

| Herramienta. | Descripción. |
| ------ | ------------- |
| [a11y-ci](https://pypi.org/project/a11y-ci/) | Control de integración continua para las puntuaciones de accesibilidad con detección de regresiones en la línea base. |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | Asistencia determinista para la accesibilidad en caso de fallos en la interfaz de línea de comandos. |

## Desarrollo

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

## Licencia

MIT.
