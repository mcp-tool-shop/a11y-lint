# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.0] - 2026-02-27

### Added
- SECURITY.md with vulnerability reporting policy and data scope
- Threat model section in README (data touched, data NOT touched, permissions)
- Codecov badge in README
- MCP Tool Shop footer in README
- `scripts/verify.sh` — one-command test + CLI smoke + build
- Coverage reporting with Codecov upload in CI
- Dependency audit job with pip-audit in CI
- SHIP_GATE.md and SCORECARD.md for product standards tracking

### Changed
- Promoted to v1.0.0 — all Shipcheck hard gates pass
- Development Status classifier updated to Production/Stable

## [0.3.0] - 2026-02-26

### Added
- Landing page via @mcptoolshop/site-theme
- CI workflow with ruff lint, pyright typecheck, pytest coverage, build check
- 8-language README translations via polyglot-mcp

### Changed
- Migrated to mcp-tool-shop-org GitHub organization
- Lint cleanup with ruff integration

## [0.2.0] - 2026-02-25

### Added
- Scorecard system with letter grades (A-F) and percentage scores
- Markdown report generation
- JSON schema validation for CLI error messages
- 8 accessibility rules (1 WCAG-mapped, 7 policy)
- Python API (Scanner, A11yMessage, create_scorecard, render_report_md)

## [0.1.0] - 2026-02-24

### Added
- Initial release with CLI linting for accessibility
- What/Why/Fix structured error messages
- Click-based CLI with scan, validate, scorecard, report, list-rules, schema commands
