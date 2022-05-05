module.exports = {
    content: ['./src/routes/**/*.{svelte,js,ts}'],
    purgeLayersByDefault: false,
    removeDeprecatedGapUtilities: true,
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],

    // daisyUI config (optional)
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
    },
}
