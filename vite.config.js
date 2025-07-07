/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'BLWDataVizSegment',
      filename: 'blw-dataviz-segment'
    }
  },
  server: {
    port: 8002,
    host: '127.0.0.1'
  },
  test: {}
})