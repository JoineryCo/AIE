/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#2563EB', // Primary Blue
          hover: '#1D4ED8',  // Hover state
          active: '#1E40AF', // Active state
        },
        // Status Colors
        status: {
          pending: {
            DEFAULT: '#FCD34D', // Yellow
            bg: '#FEF3C7',     // Background variant
            border: '#FDE68A',  // Border variant
            text: '#D97706',    // Text variant
          },
          processing: {
            DEFAULT: '#60A5FA', // Blue
            bg: '#EFF6FF',     // Background variant
            border: '#BFDBFE',  // Border variant
            text: '#2563EB',    // Text variant
          },
          completed: {
            DEFAULT: '#34D399', // Green
            bg: '#ECFDF5',     // Background variant
            border: '#A7F3D0',  // Border variant
            text: '#059669',    // Text variant
          },
          error: {
            DEFAULT: '#F87171', // Red
            bg: '#FEF2F2',     // Background variant
            border: '#FECACA',  // Border variant
            text: '#DC2626',    // Text variant
          },
          discarded: {
            DEFAULT: '#9CA3AF', // Gray
            bg: '#F9FAFB',     // Background variant
            border: '#E5E7EB',  // Border variant
            text: '#6B7280',    // Text variant
          },
          clarification: {
            DEFAULT: '#F59E0B', // Amber
            bg: '#FFFBEB',     // Background variant
            border: '#FDE68A',  // Border variant
            text: '#D97706',    // Text variant
          },
        },
        // Severity Colors
        severity: {
          high: {
            DEFAULT: '#EF4444', // Red
            bg: '#FEF2F2',     // Background variant
          },
          medium: {
            DEFAULT: '#F59E0B', // Amber
            bg: '#FFFBEB',     // Background variant
          },
          low: {
            DEFAULT: '#3B82F6', // Blue
            bg: '#EFF6FF',     // Background variant
          },
        },
        // Confidence Indicators
        confidence: {
          high: {
            DEFAULT: '#10B981', // Green
            bg: '#ECFDF5',     // Background variant
          },
          medium: {
            DEFAULT: '#F59E0B', // Amber
            bg: '#FFFBEB',     // Background variant
          },
          low: {
            DEFAULT: '#EF4444', // Red
            bg: '#FEF2F2',     // Background variant
          },
        },
        // Price Source Indicators
        priceSource: {
          supplier: {
            DEFAULT: '#3B82F6', // Blue
            bg: '#EFF6FF',     // Background variant
          },
          historical: {
            DEFAULT: '#6B7280', // Gray
            bg: '#F9FAFB',     // Background variant
          },
          estimated: {
            DEFAULT: '#F59E0B', // Amber
            bg: '#FFFBEB',     // Background variant
          },
          pendingQuote: {
            DEFAULT: '#F97316', // Orange
            bg: '#FFF7ED',     // Background variant
          },
          manualEntry: {
            DEFAULT: '#8B5CF6', // Violet
            bg: '#F5F3FF',     // Background variant
          },
          missing: {
            DEFAULT: '#EF4444', // Red
            bg: '#FEF2F2',     // Background variant
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Headings
        'h1': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'h4': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'h5': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        // Body Text
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        // Interactive Elements
        'button': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'link': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'nav': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'label': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        // 8-point grid system
        'xs': '4px',  // Extra small
        'sm': '8px',  // Small
        'ms': '12px', // Medium-small
        'md': '16px', // Medium
        'ml': '24px', // Medium-large
        'lg': '32px', // Large
        'xl': '48px', // Extra large
        '2xl': '64px', // 2x large
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0px 1px 3px rgba(0, 0, 0, 0.1)',
        'dropdown': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      gridTemplateColumns: {
        // Standard grid layouts
        'sidebar': '240px minmax(0, 1fr)',
        'sidebar-collapsed': '64px minmax(0, 1fr)',
        'sidepanel': 'minmax(0, 1fr) 320px',
      },
      keyframes: {
        'spinner': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'spinner': 'spinner 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
