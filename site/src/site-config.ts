import type { SiteConfig } from '@mcptoolshop/site-theme';

export const config: SiteConfig = {
  title: 'a11y-lint',
  description: 'Accessibility linter for CLI output. Validates that error messages follow accessible patterns with [OK]/[WARN]/[ERROR] + What/Why/Fix structure.',
  logoBadge: 'A1',
  brandName: 'a11y-lint',
  repoUrl: 'https://github.com/mcp-tool-shop-org/a11y-lint',
  footerText: 'MIT Licensed — built by <a href="https://github.com/mcp-tool-shop-org" style="color:var(--color-muted);text-decoration:underline">mcp-tool-shop-org</a>',

  hero: {
    badge: 'Accessibility',
    headline: 'Lint your CLI output',
    headlineAccent: 'for accessibility.',
    description: 'Catches inaccessible error messages before they ship — lines too long, ALL-CAPS text, missing context, color-only signals, and jargon without explanation.',
    primaryCta: { href: '#usage', label: 'Get started' },
    secondaryCta: { href: '#rules', label: 'See rules' },
    previews: [
      { label: 'Install', code: 'pip install a11y-lint' },
      { label: 'Scan', code: 'a11y-lint scan output.txt' },
      { label: 'Output', code: '[WARN] FMT001: Line exceeds 120 characters\n  Why: Hard to read on magnified displays\n  Fix: Break into multiple lines' },
    ],
  },

  sections: [
    {
      kind: 'features',
      id: 'features',
      title: 'Features',
      subtitle: 'Low-vision-first linting for CLI tools.',
      features: [
        { title: 'What/Why/Fix', desc: 'Every finding includes what happened, why it matters, and how to fix it — the same pattern it enforces.' },
        { title: 'WCAG + policy rules', desc: 'Distinguishes WCAG-mapped rules (like no-color-only) from best-practice policy rules for cognitive accessibility.' },
        { title: 'CI-ready', desc: 'Gate on exit codes and specific rules, not letter grades. Supports JSON output, strict mode, and baseline tracking.' },
      ],
    },
    {
      kind: 'code-cards',
      id: 'usage',
      title: 'Usage',
      cards: [
        {
          title: 'CLI',
          code: '# Scan a file\na11y-lint scan output.txt\n\n# Scan from stdin\necho "ERROR: It failed" | a11y-lint scan --stdin\n\n# Generate a report\na11y-lint report output.txt -o report.md',
        },
        {
          title: 'Python API',
          code: 'from a11y_lint import scan, A11yMessage\n\nmessages = scan("ERROR: It failed")\n\nmsg = A11yMessage.error(\n    code="APP001",\n    what="Config file missing",\n    why="App cannot start without config.yaml",\n    fix="Create config.yaml in project root"\n)',
        },
      ],
    },
    {
      kind: 'data-table',
      id: 'rules',
      title: 'Rules',
      subtitle: '1 WCAG rule + 7 policy rules for cognitive accessibility.',
      columns: ['Rule', 'Code', 'Description'],
      rows: [
        ['no-color-only', 'CLR001', "Don't convey information only through color (WCAG 1.4.1)"],
        ['line-length', 'FMT001', 'Lines should be 120 characters or fewer'],
        ['no-all-caps', 'LNG002', 'Avoid all-caps text (hard to read)'],
        ['plain-language', 'LNG001', 'Avoid technical jargon (EOF, STDIN, etc.)'],
        ['emoji-moderation', 'SCR001', 'Limit emoji use (confuses screen readers)'],
        ['punctuation', 'LNG003', 'Error messages should end with punctuation'],
        ['error-structure', 'A11Y003', 'Errors should explain why and how to fix'],
        ['no-ambiguous-pronouns', 'LNG004', 'Avoid starting with "it", "this", etc.'],
      ],
    },
    {
      kind: 'features',
      id: 'companion',
      title: 'Companion Tools',
      subtitle: 'Part of the a11y toolkit.',
      features: [
        { title: 'a11y-ci', desc: 'CI gate for a11y-lint scorecards with baseline regression detection.' },
        { title: 'a11y-assist', desc: 'Deterministic accessibility assistance for CLI failures.' },
        { title: 'a11y-evidence-engine', desc: 'Evidence collection and WCAG mapping for accessibility claims.' },
      ],
    },
  ],
};
