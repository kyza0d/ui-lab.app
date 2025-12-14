import { defineConfig } from 'tsup'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'bin/ui-lab': 'src/bin/ui-lab.ts'
  },
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  target: 'node18',
  shims: true,
  onSuccess: async () => {
    // Copy templates directory to dist
    const srcTemplatesDir = path.join(process.cwd(), 'src/templates')
    const distTemplatesDir = path.join(process.cwd(), 'dist/templates')

    if (fs.existsSync(srcTemplatesDir)) {
      fs.mkdirSync(distTemplatesDir, { recursive: true })
      const files = fs.readdirSync(srcTemplatesDir)
      for (const file of files) {
        const srcFile = path.join(srcTemplatesDir, file)
        const distFile = path.join(distTemplatesDir, file)
        fs.copyFileSync(srcFile, distFile)
      }
    }
  }
})
