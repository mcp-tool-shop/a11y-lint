"""a11y-lint: Accessibility linter for CLI output.

Validates that CLI error messages follow accessible patterns
with [OK]/[WARN]/[ERROR] + What/Why/Fix structure.
"""

__version__ = "1.0.0"

from .errors import A11yMessage, ErrorCodes, Level, Location
from .render import Renderer, render, render_colored, render_plain, should_use_color
from .report_md import (
    MarkdownReporter,
    generate_badge_md,
    render_report_md,
    render_scorecard_md,
)
from .scan_cli_text import RULES, Rule, RuleCategory, Scanner, get_rule_names, scan
from .scorecard import RuleScore, Scorecard, ScorecardBuilder, create_scorecard
from .validate import (
    MessageValidator,
    is_valid,
    validate_dict,
    validate_json_file,
    validate_message,
)

__all__ = [
    "RULES",
    "A11yMessage",
    "ErrorCodes",
    "Level",
    "Location",
    "MarkdownReporter",
    "MessageValidator",
    "Renderer",
    "Rule",
    "RuleCategory",
    "RuleScore",
    "Scanner",
    "Scorecard",
    "ScorecardBuilder",
    "__version__",
    "create_scorecard",
    "generate_badge_md",
    "get_rule_names",
    "is_valid",
    "render",
    "render_colored",
    "render_plain",
    "render_report_md",
    "render_scorecard_md",
    "scan",
    "should_use_color",
    "validate_dict",
    "validate_json_file",
    "validate_message",
]
