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
          // Pastel panel rotation (Maximus-style)
          ice: "#E6EEF4",
          "ice-edge": "#C9D8E2",
          peach: "#F4E2D2",
          "peach-edge": "#E2C9B3",
          sage: "#DDE3DA",
          "sage-edge": "#BFC9BC",
          rust: "#C97A4A",
          success: "#1D6F42",
          warning: "#C2440E",
          // V3 locked tokens
          black: "#0A0A0A",
          ceramic: "#FFFFF3",
          rock: "#E8E9DB",
          acid: "#C6F184",
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
        display: ["General Sans", "system-ui", "sans-serif"],
        serif: ["General Sans", "system-ui", "sans-serif"],
        sans: ["General Sans", "system-ui", "sans-serif"],
        mono: ["General Sans", "system-ui", "sans-serif"],
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
