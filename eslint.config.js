import { defineConfig } from "eslint/config";
import globals from "globals";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"], languageOptions: {
    globals: globals.node,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  }, 
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
},
    {
    ignores: ['dist/'],
  },
]);

