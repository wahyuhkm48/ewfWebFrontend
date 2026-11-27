import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // ===== Batas impor antar sisi dan lapisan =====
  {
    files: ["features/landing/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/user/**", "@/features/admin/**"],
              message:
                "Landing tidak boleh mengimpor dari user atau admin. Pindahkan bagian bersama ke features/shared.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["features/user/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/landing/**", "@/features/admin/**"],
              message:
                "Sisi user tidak boleh mengimpor dari landing atau admin. Pindahkan bagian bersama ke features/shared.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["features/admin/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/landing/**", "@/features/user/**"],
              message:
                "Sisi admin tidak boleh mengimpor dari landing atau user. Pindahkan bagian bersama ke features/shared.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["features/shared/**/*.{ts,tsx}", "features/auth/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/landing/**",
                "@/features/user/**",
                "@/features/admin/**",
              ],
              message:
                "shared dan auth tidak boleh bergantung pada landing, user, atau admin.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/**"],
              message: "components dan lib tidak boleh mengimpor dari features.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;