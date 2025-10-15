module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["import","boundaries"],
  extends: ["eslint:recommended","plugin:import/errors","plugin:import/warnings"],
  rules: {
    "import/no-cycle": ["error", { maxDepth: 1 }],
    "boundaries/element-types": ["error", {
      default: "disallow",
      rules: [
        { from: ["ui"], to: ["application","domain"], allowSameLayer: false },
        { from: ["application"], to: ["domain"], allowSameLayer: true },
        { from: ["infrastructure"], to: ["application","domain"], allowSameLayer: true },
        { from: ["domain"], to: [], allowSameLayer: true }
      ]
    }],
    "boundaries/no-unknown-files": "error"
  },
  settings: {
    "boundaries/elements": [
      { type: "ui", pattern: "src/ui/**" },
      { type: "application", pattern: "src/application/**" },
      { type: "domain", pattern: "src/domain/**" },
      { type: "infrastructure", pattern: "src/infrastructure/**" }
    ]
  }
};
