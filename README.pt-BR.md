<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.md">English</a>
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

Verificação de acessibilidade para saídas de linha de comando, priorizando usuários com baixa visão.
---
Valida se as mensagens de erro seguem padrões acessíveis, com a estrutura **[OK]/[AVISO]/[ERRO] + O que/Por que/Como corrigir**.
## Por que?
A maioria das ferramentas de linha de comando trata a saída de erros como uma funcionalidade secundária. Mensagens como erros "ENOENT" ou mensagens fatais obscuras presumem que o usuário consegue interpretar visualmente a saída densa do terminal e já sabe o que deu errado. Para usuários com baixa visão, deficiências cognitivas ou qualquer pessoa trabalhando sob estresse, essas mensagens são uma barreira.
O **a11y-lint** detecta esses padrões antes que sejam implementados:
- Linhas muito longas para telas ampliadas
- Texto em MAIÚSCULAS que dificulta a leitura
- Jargões sem explicação
- Uso de cores como único indicador
- Falta de contexto sobre "por que" e "como corrigir"
## Filosofia

### Categorias de Regras

Esta ferramenta distingue entre dois tipos de regras:

- **Regras WCAG**: Mapeadas para critérios de sucesso específicos do WCAG. Violações podem constituir barreiras de acessibilidade.
- **Regras de Política**: Melhores práticas para acessibilidade cognitiva. Não são requisitos do WCAG, mas melhoram a usabilidade para usuários com deficiências cognitivas.

Atualmente, apenas `no-color-only` (WCAG SC 1.4.1) é uma regra mapeada para o WCAG. Todas as outras regras são regras de política que melhoram a clareza e a legibilidade das mensagens.

### Notas vs. Integração Contínua (CI)

**Importante:** As notas (de A a F) são *resumos derivados* para relatórios executivos. Elas **nunca** devem ser o principal mecanismo para a integração contínua (CI).

Para pipelines de CI, utilize como gatilho:
- Falhas específicas em regras (especialmente regras mapeadas para o WCAG, como `no-color-only`)
- Limites de contagem de erros
- Regressões em relação a uma linha de base

```bash
# Good: Gate on errors
a11y-lint scan output.txt && echo "Passed" || echo "Failed"

# Good: Gate on specific rules
a11y-lint scan --enable=no-color-only output.txt

# Avoid: Gating purely on letter grades
```

### Selos e Conformidade

As pontuações e os selos são **apenas informativos**. Eles **NÃO** implicam conformidade com o WCAG ou certificação de acessibilidade. Esta ferramenta verifica regras de política além dos requisitos mínimos do WCAG.

## Instalação

```bash
pip install a11y-lint
```

Requer Python 3.11 ou posterior.

Ou instale a partir do código-fonte:

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-lint.git
cd a11y-lint
pip install -e ".[dev]"
```

## Início Rápido

Verifique a saída da linha de comando em busca de problemas de acessibilidade:

```bash
# Scan a file
a11y-lint scan output.txt

# Scan from stdin
echo "ERROR: It failed" | a11y-lint scan --stdin

# Generate a report
a11y-lint report output.txt -o report.md
```

## Comandos da Linha de Comando

### `scan` - Verifica se há problemas de acessibilidade

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

A opção `--color` controla a saída colorida:
- `auto` (padrão): Respeita as variáveis de ambiente `NO_COLOR` e `FORCE_COLOR`, detecta automaticamente o terminal (TTY)
- `always`: Força a saída colorida
- `never`: Desativa a saída colorida

### `validate` - Valida mensagens JSON em relação ao esquema

```bash
a11y-lint validate messages.json
a11y-lint validate -v messages.json  # Verbose output
```

### `scorecard` - Gera um relatório de acessibilidade

```bash
a11y-lint scorecard output.txt
a11y-lint scorecard --json output.txt     # JSON output
a11y-lint scorecard --badge output.txt    # shields.io badge
```

### `report` - Gera um relatório em formato Markdown

```bash
a11y-lint report output.txt
a11y-lint report output.txt -o report.md
a11y-lint report --title="My Report" output.txt
```

### `list-rules` - Exibe as regras disponíveis

```bash
a11y-lint list-rules          # Simple list
a11y-lint list-rules -v       # Verbose with categories and WCAG refs
```

### `schema` - Imprime o esquema JSON

```bash
a11y-lint schema
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-------------|
| `NO_COLOR` | Desativa a saída colorida (qualquer valor) |
| `FORCE_COLOR` | Força a saída colorida (qualquer valor, substitui `NO_COLOR=false`) |

Consulte [no-color.org](https://no-color.org/) para obter o padrão.

## Regras

### Regras WCAG

| Regra | Código | WCAG | Descrição |
|------|------|------|-------------|
| `no-color-only` | CLR001 | 1.4.1 | Não transmita informações apenas por meio de cores |

### Regras de Política

| Regra | Código | Descrição |
|------|------|-------------|
| `line-length` | FMT001 | As linhas devem ter no máximo 120 caracteres |
| `no-all-caps` | LNG002 | Evite texto em maiúsculas (difícil de ler) |
| `plain-language` | LNG001 | Evite jargões técnicos (EOF, STDIN, etc.) |
| `emoji-moderation` | SCR001 | Limite o uso de emojis (confunde leitores de tela) |
| `punctuation` | LNG003 | As mensagens de erro devem terminar com pontuação |
| `error-structure` | A11Y003 | As mensagens de erro devem explicar o motivo e como corrigir |
| `no-ambiguous-pronouns` | LNG004 | Evite começar com "ele", "isto", etc. |

## Formato das Mensagens de Erro

Todas as mensagens de erro seguem a estrutura "O que/Por que/Correção":

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

As mensagens estão em conformidade com o esquema de erros da interface de linha de comando (`schemas/cli.error.schema.v0.1.json`):

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

## Integração com CI

### Exemplo de Ação do GitHub

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

### Melhores Práticas

1. **Priorize erros, não notas**: Use códigos de saída, não notas.
2. **Habilite regras específicas**: Para conformidade com o WCAG, habilite a regra `no-color-only`.
3. **Monitore as linhas de base**: Use a saída JSON para detectar regressões.
4. **Considere os selos como informativos**: Eles não implicam conformidade.

## Segurança e Escopo de Dados

**Dados acessados:** arquivos de texto e JSON passados como argumentos da interface de linha de comando (somente leitura), entrada da entrada padrão (stdin), relatórios gerados escritos na saída padrão (stdout) ou no caminho especificado com a opção `-o`. **Dados NÃO acessados:** nenhum arquivo fora dos argumentos especificados, nenhum dado do navegador, nenhuma credencial do sistema operacional. **Não há saída de rede** — toda a análise é local. **Nenhuma telemetria** é coletada ou enviada.

## Ferramentas Complementares

| Ferramenta | Descrição |
|------|-------------|
| [a11y-ci](https://pypi.org/project/a11y-ci/) | Gate de CI para avaliações de acessibilidade com detecção de regressões na linha de base. |
| [a11y-assist](https://pypi.org/project/a11y-assist/) | Assistência determinística para acessibilidade em caso de falhas na interface de linha de comando. |

## Desenvolvimento

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

## Licença

MIT

---

Criado por <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>
