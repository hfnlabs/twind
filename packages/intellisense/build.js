import { buildSync } from 'esbuild'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  minify: true,
  pure: ['console.warn'],
  external: Object.keys(pkg.dependencies),
})

fs.writeFileSync(
  'dist/package.json',
  JSON.stringify({
    name: 'twind-intellisense-hfc',
    version: '1.0.1',
    type: 'module',
    main: 'index.js',
    dependencies: pkg.dependencies,
  }),
)
