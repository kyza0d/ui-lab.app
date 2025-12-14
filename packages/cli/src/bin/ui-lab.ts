#!/usr/bin/env node

import { Command } from 'commander'
import { initCommand } from '../commands/init.js'
import { installCommand } from '../commands/install.js'

const program = new Command()

program
  .name('ui-lab')
  .description('CLI for installing ui-lab components')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize a new ui-lab project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('--preset <preset>', 'Theme preset (vitesse-dark, vitesse-light)')
  .option('--json', 'Output JSON instead of human-readable format')
  .action(async (options) => {
    await initCommand(options)
  })

program
  .command('install')
  .alias('add')
  .description('Install ui-lab components')
  .argument('[components...]', 'Components to install')
  .option('-y, --yes', 'Skip confirmation prompt')
  .option('--dry-run', 'Show what would be installed without installing')
  .option('--json', 'Output JSON instead of human-readable format')
  .action(async (components, options) => {
    await installCommand(components, options)
  })

program.parse()
