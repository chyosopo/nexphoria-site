import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nexphoria locked design tokens — cobalt + white/cream
        nx: {
          bg: "#FFFFFF",
          "bg-cream": "#FAFAF7",
          "bg-dark": "#0A0A0A",
          fg: "#0A0A0A",
          graphite: "#4A4A4A",
          muted: "#8A8A8A",
          border: "#E5E5E2",
          cobalt: "#1747D6",
          "cobalt-hover": "#0E33A8",
          "cobalt-soft": "#E8EEFB",
          success: "#1D6F42",
          warning: "#C2440E",
        },
        // shadcn semantic — light mode, cobalt accent
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["Playfair Display", "EB Garamond", "Georgia", "serif"],
        serif: ["Playfair Display", "EB Garamond", "Georgia", "serif"],
        sans: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "fluid-xs": "var(--text-xs)",
        "fluid-sm": "var(--text-sm)",
        "fluid-base": "var(--text-base)",
        "fluid-lg": "var(--text-lg)",
        "fluid-xl": "var(--text-xl)",
        "fluid-2xl": "var(--text-2xl)",
        "fluid-3xl": "var(--text-3xl)",
        "fluid-4xl": "var(--text-4xl)",
        "fluid-5xl": "var(--text-5xl)",
        "fluid-hero": "var(--text-hero)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(.2,.8,.2,1)",
        "slide-up": "slideUp 0.6s cubic-bezier(.2,.8,.2,1)",
        "word-in": "wordIn 0.6s cubic-bezier(.2,.8,.2,1) forwards",
        "word-out": "wordOut 0.6s cubic-bezier(.2,.8,.2,1) forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        wordIn: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        wordOut: { from: { opacity: "1", transform: "translateY(0)" }, to: { opacity: "0", transform: "translateY(-12px)" } },
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
