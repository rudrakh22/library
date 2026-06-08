/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [
    require("nativewind/preset"),
  ],

  darkMode: "media",

  theme: {

    extend: {

      colors: {

        background:
          "hsl(var(--background) / <alpha-value>)",

        foreground:
          "hsl(var(--foreground) / <alpha-value>)",

        card:
          "hsl(var(--card) / <alpha-value>)",

        "card-foreground":
          "hsl(var(--card-foreground) / <alpha-value>)",

        primary: {

          DEFAULT:
            "hsl(var(--primary) / <alpha-value>)",

          foreground:
            "hsl(var(--primary-foreground) / <alpha-value>)",
        },

        secondary: {

          DEFAULT:
            "hsl(var(--secondary) / <alpha-value>)",

          foreground:
            "hsl(var(--secondary-foreground) / <alpha-value>)",
        },

        muted: {

          DEFAULT:
            "hsl(var(--muted) / <alpha-value>)",

          foreground:
            "hsl(var(--muted-foreground) / <alpha-value>)",
        },

        accent: {

          DEFAULT:
            "hsl(var(--accent) / <alpha-value>)",
        },

        destructive: {

          DEFAULT:
            "hsl(var(--destructive) / <alpha-value>)",

          foreground:
            "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        border:
          "hsl(var(--border) / <alpha-value>)",

        input:
          "hsl(var(--input) / <alpha-value>)",

        ring:
          "hsl(var(--ring) / <alpha-value>)",

        success: {

          DEFAULT:
            "hsl(var(--success) / <alpha-value>)",
        },

        role: {

          user:
            "hsl(var(--role-user) / <alpha-value>)",

          vendor:
            "hsl(var(--role-vendor) / <alpha-value>)",

          admin:
            "hsl(var(--role-admin) / <alpha-value>)",
        },
      },
    },
  },

  plugins: [],
};