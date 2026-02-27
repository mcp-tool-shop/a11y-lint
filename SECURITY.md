# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability

Email: **64996768+mcp-tool-shop@users.noreply.github.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Version affected
- Potential impact

### Response timeline

| Action | Target |
|--------|--------|
| Acknowledge report | 48 hours |
| Assess severity | 7 days |
| Release fix | 30 days |

## Scope

This tool operates **locally only** as a CLI linter.

- **Data touched:** text files and JSON files passed as arguments (read-only), stdin input, generated reports and scorecards written to stdout or `-o` path
- **Data NOT touched:** no files outside specified arguments, no browser data, no OS credentials, no network resources
- **Permissions required:** filesystem read for input files, filesystem write only when `-o` specified
- **No network egress** — all linting is local, no external API calls
- **No secrets handling** — does not read, store, or transmit credentials
- **No telemetry** is collected or sent
