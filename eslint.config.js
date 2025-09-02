import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    },
    // ---------------------------------------------------------------------
    // TypeScript rules (apply to all .ts / .tsx files) --------------------
    // ---------------------------------------------------------------------
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {
            // Bring in the recommended rule-set from the plugin
            ...tsPlugin.configs.recommended.rules,
            semi: ["error", "always"],
            indent: [
                "error",
                4,
                {
                    MemberExpression: 1,
                    ignoredNodes: ["FunctionExpression > .params[decorators.length > 0]", "FunctionExpression > .params > :matches(Decorator, :not(:first-child))", "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"]
                }
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ]
        }
    }
];
