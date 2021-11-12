module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      160: '40rem',
    },
    extend: {
      spacing: {
        112: '28rem',
        120: '30rem',
        128: '32rem',
        160: '40rem',
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
    container: {
      padding: '1rem',
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
