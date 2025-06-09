import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

export default [
  // Main build
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: ['https', 'http', 'url', 'fs', 'path'],
  },
  // Type definitions
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]
