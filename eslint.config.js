import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    rules: {
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
      "vue/no-unused-vars": "error",
      "vue/no-mutating-props": "error",
      "vue/script-setup-uses-vars": "error"
    }
  },
  {
    ignores: ["dist/*"]
  },
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];