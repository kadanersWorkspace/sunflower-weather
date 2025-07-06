import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    //yeah it's not something that I would do in a real project. for the sake of this exercise, I'm going to disable this rule.
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
