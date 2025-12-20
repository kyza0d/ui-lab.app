import pc from 'picocolors'
import type { LoggerOptions, LogEntry } from '../types/index.js'

export class Logger {
  private entries: LogEntry[] = []

  constructor(private options: LoggerOptions = {}) {}

  private log(level: LogEntry['level'], message: string, data?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    }
    this.entries.push(entry)

    if (this.options.quiet && level !== 'error') return
    if (this.options.json) return

    const prefix = {
      info: pc.blue('i'),
      success: pc.green('✓'),
      warn: pc.yellow('!'),
      error: pc.red('✗')
    }[level]

    const coloredMessage = {
      info: pc.dim(message),
      success: pc.green(message),
      warn: pc.yellow(message),
      error: pc.red(message)
    }[level]

    console.log(`${prefix} ${coloredMessage}`)

    if (this.options.verbose && data) {
      console.log(pc.dim(JSON.stringify(data, null, 2)))
    }
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log('info', message, data)
  }

  success(message: string, data?: Record<string, unknown>) {
    this.log('success', message, data)
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log('warn', message, data)
  }

  error(message: string, data?: Record<string, unknown>) {
    this.log('error', message, data)
  }

  newline() {
    if (!this.options.json && !this.options.quiet) {
      console.log()
    }
  }

  header(text: string) {
    if (!this.options.json && !this.options.quiet) {
      console.log()
      console.log(pc.bold(text))
      console.log()
    }
  }

  list(items: string[], indent = 2) {
    if (!this.options.json && !this.options.quiet) {
      items.forEach(item => {
        console.log(' '.repeat(indent) + pc.dim('•') + ' ' + item)
      })
    }
  }

  code(code: string) {
    if (!this.options.json && !this.options.quiet) {
      console.log()
      console.log(pc.cyan(code))
      console.log()
    }
  }

  toJSON(): LogEntry[] {
    return this.entries
  }

  getEntries(): LogEntry[] {
    return [...this.entries]
  }

  clear() {
    this.entries = []
  }
}

export function createLogger(options: LoggerOptions = {}): Logger {
  return new Logger(options)
}
