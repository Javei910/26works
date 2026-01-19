# Global Skills Directory

This directory contains skills that are used across **all projects** in the AIGC_Project workspace.

## Structure

Each skill should be in its own folder with a `SKILL.md` file:

```
.agent/skills/
├── documentation/
│   └── SKILL.md
├── code-style/
│   └── SKILL.md
└── project-setup/
    └── SKILL.md
```

## How Skills Work

Skills are specialized instructions that guide the AI agent on specific tasks:

- **SKILL.md Format**: YAML frontmatter + markdown instructions
- **Frontmatter**: `name` and `description` fields
- **Content**: Detailed instructions, rules, and examples

## Example SKILL.md

```markdown
---
name: Documentation Standards
description: Guidelines for writing clear, consistent documentation
---

# Documentation Standards

## Rules
1. Use markdown formatting
2. Include code examples
3. Keep it concise

## Templates
...
```

## Usage

The agent automatically discovers and applies skills when relevant to the current task.

## Global vs Project Skills

- **Global Skills** (here): Apply to ALL projects
- **Project Skills** (e.g., `SWJ/skills/`): Apply only to that specific project
