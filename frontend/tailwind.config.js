module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        'fg-inverse': 'var(--color-fg-inverse)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',

        'header': 'var(--color-bg-header)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
