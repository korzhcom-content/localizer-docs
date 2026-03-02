import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
    plugins: [pluginLineNumbers()],
    defaultProps: {
        showLineNumbers: false,
        wrap: false,
        overridesByLang: {
            'js,ts,html,pas,pascal': { showLineNumbers: true, },
            'bash,ps,sh': { preserveIndent: false },
        },
    },
}