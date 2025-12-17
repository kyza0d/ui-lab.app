# CLI Usage & Configuration Guide Generator

## Purpose
Generate comprehensive documentation for the UI Lab CLI tool (`ui-lab` command). This skill creates detailed guides about CLI commands, options, configuration, and use cases for developers installing and configuring UI Lab in their projects.

## Responsibilities
- Document all CLI commands and their options
- Explain CLI configuration management
- Create step-by-step command walkthroughs
- Explain project detection and scaffolding
- Document theme templates and presets
- Explain component dependency resolution
- Create troubleshooting guides for CLI issues
- Document interactive vs headless CLI modes

## Output Requirements
- **Accurate Command Documentation**: Verify all commands and flags from cli source code
- **Clear Option Descriptions**: Explain each flag with practical examples
- **Command Walkthroughs**: Show step-by-step interactive and headless flows
- **Real Output Examples**: Include actual CLI output where helpful
- **Framework Specific**: Show commands for Next.js and Vite projects
- **Consistent Format**: Use consistent command syntax notation

## Key Topics to Cover

1. **CLI Overview**
   - Package name: `ui-lab` (from @ui-lab/cli)
   - Installation: `npm install -g ui-lab` or `npx ui-lab`
   - Node requirement: 18+
   - Built with: Commander.js, @clack/prompts, picocolors

2. **ui-lab init Command**
   - Purpose: Initialize new UI Lab project
   - Basic usage: `npx ui-lab init`
   - Options:
     - `--yes` - Skip all interactive prompts
     - `--preset <theme>` - Use theme preset (vitesse-dark, vitesse-light, etc.)
     - `--framework <framework>` - Specify framework (nextjs, vite)
     - `--componentDir <path>` - Custom component directory
     - `--scaffold` - Scaffold entire project structure
     - `--json` - Output as JSON
   - What it does:
     - Detects Next.js or Vite project
     - Sets up CSS variables
     - Creates component directories
     - Generates configuration files
     - Sets up theme system

3. **ui-lab install / ui-lab add Command**
   - Purpose: Install specific components into project
   - Basic usage: `npx ui-lab install button input modal`
   - Aliases: `ui-lab add` works the same way
   - Options:
     - `--yes` - Skip confirmation prompts
     - `--dry-run` - Preview installation without making changes
     - `--json` - Output as JSON
   - Capabilities:
     - Component name validation with typo suggestions
     - Automatic dependency resolution
     - Installation plan preview
     - Multi-component installation

4. **Interactive vs Headless Modes**
   - Interactive mode (default): Uses @clack/prompts for user-friendly prompts
   - Headless mode: Use `--yes` flag for CI/CD automation
   - JSON output mode: `--json` for programmatic use

5. **Project Detection**
   - Framework detection (Next.js vs Vite)
   - Project structure analysis
   - Configuration file detection
   - Component directory detection

6. **Theme Presets & Templates**
   - Available presets: vitesse-dark, vitesse-light, etc.
   - What presets include:
     - CSS variable definitions
     - Color scales
     - Typography settings
   - Customizing presets
   - Creating custom theme presets

7. **Component Dependencies**
   - Dependency resolution explained
   - How CLI determines required dependencies
   - Installation order
   - Peer dependencies handling

8. **Configuration Management**
   - Config file location and format
   - Updating configuration after init
   - Component directory configuration
   - Theme configuration persistence

9. **Troubleshooting Common CLI Issues**
   - Framework detection failures and solutions
   - Permission errors and solutions
   - Component installation failures
   - Configuration conflicts
   - Theme preset not found errors

10. **CLI Integration Patterns**
    - Using CLI in scripts (package.json)
    - CI/CD integration examples
    - Programmatic CLI usage via JavaScript
    - Building custom scaffolders

## Flags & Options Reference Table
```
Command: ui-lab init
  --yes              Skip interactive prompts
  --preset           Theme preset name
  --framework        nextjs or vite
  --componentDir     Custom directory path
  --scaffold         Generate full project
  --json             JSON output format

Command: ui-lab install/add
  <components>       Component names (space-separated)
  --yes              Skip confirmation
  --dry-run          Preview only
  --json             JSON output format
```

## Quality Checklist
- ✅ Verify all commands from src/bin/ui-lab.ts
- ✅ Check option flags in CLI source code
- ✅ Test commands are accurate and work correctly
- ✅ Include real command output examples
- ✅ Show both interactive and headless examples
- ✅ Explain preset names (vitesse-dark, etc.)
- ✅ Document framework detection logic
- ✅ Include troubleshooting section
- ✅ Show CI/CD integration examples
