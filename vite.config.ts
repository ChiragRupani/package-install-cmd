import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // experimental: { enableNativePlugin: true },
  build: {
    lib: {
      entry: [
        resolve(__dirname, "src/index.ts"),
        resolve(__dirname, "src/cli.ts"),
      ],
      name: "index",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      output: {
        minify: false,
        globals: {
          "node:fs": "fs",
          "node:os": "os",
          "node:util": "util",
        },
      },
      external: (id) => !(isAbsolute(id) || id.startsWith(".")),
    },
    minify: false,
    reportCompressedSize: false,
  },
  test: {
    globals: true,
    coverage: {
      reporter: [["cobertura", { file: "coverage.xml" }], "text"],
    },
    reporters: ["default", "junit"],
    outputFile: { junit: "coverage/test-results.xml" },
    pool: "threads",
  },
});
