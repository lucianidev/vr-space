module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],

  // daisyUI config (optional - here are the default values)


  theme: {
    extend: {
      colors: {
        'form': '#0b0b21',
      },
    }
  }
};
