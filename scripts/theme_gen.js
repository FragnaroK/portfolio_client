import clipboard from 'clipboardy'

function generateThemeScheme(colors) {
    const { primary } = colors;

    function hexToHSL(hex) {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h = 0,
            s = 0,
            l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    }

    function lightenHSL(hsl, percent) {
        return [hsl[0], hsl[1], Math.min(100, hsl[2] + percent)];
    }

    function darkenHSL(hsl, percent) {
        return [hsl[0], hsl[1], Math.max(0, hsl[2] - percent)];
    }

    function hslToString(hsl) {
        return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }

    function hslaToString(hsl, alpha) {
        return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${alpha})`;
    }

    function adjustForeground(backgroundHSL) {
        return backgroundHSL[2] > 50 ? [0, 0, 0] : [0, 0, 100];
    }

    function getAlphaValue(value) {
        const parsedInt = parseInt(value.replace(/\D+/g, ''))
        return parsedInt / 100
    }

    const primaryHSL = hexToHSL(primary);
    const secondaryHSL = darkenHSL(primaryHSL, 45);
    const backgroundHSL = darkenHSL(primaryHSL, 50);
    const cardBackgroundHSL = darkenHSL(primaryHSL, 40);

    const cssVariables = {
        '--background': backgroundHSL,
        '--background-alpha-50': backgroundHSL,
        '--foreground': adjustForeground(backgroundHSL),
        '--primary': primaryHSL,
        '--primary-alpha-50': primaryHSL,
        '--primary-lighter': lightenHSL(primaryHSL, 8),
        '--primary-foreground': adjustForeground(primaryHSL),
        '--secondary': secondaryHSL,
        '--secondary-foreground': adjustForeground(secondaryHSL),
        '--card': cardBackgroundHSL,
        '--card-alpha-70': cardBackgroundHSL,
        '--card-foreground': adjustForeground(cardBackgroundHSL),
        '--muted': lightenHSL(backgroundHSL, 30),
        '--muted-foreground': adjustForeground(lightenHSL(backgroundHSL, 30)),
        '--border': lightenHSL(cardBackgroundHSL, 10),
        '--input': cardBackgroundHSL, 
        '--popover': 'var(--card)',
        '--popover-foreground': 'var(--card-foreground)',
        '--accent': 'var(--secondary)',
        '--accent-foreground': 'var(--secondary-foreground)',
        '--ring': 'var(--primary)',
    };

    let cssString = ':root {\n';
    let cssVarsOnly = ''
    for (const [key, value] of Object.entries(cssVariables)) {
        let cssValue = ''
        if (!value.includes('var')) {
            cssValue = key.includes('alpha') ? hslaToString(value, getAlphaValue(key)) : hslToString(value);
        } else {
            cssValue = value
        }
        cssString += `    ${key}: ${cssValue};\n`;
        cssVarsOnly += `${key}: ${cssValue};\n`
    }
    cssString += '}';

    try { clipboard.writeSync(cssVarsOnly); console.info("CSS Variables copied to clipboard") } catch(err) {
        console.warn("Could not copy to clipboard. ", err?.message ?? '')
    }

    return cssString;
}

// Example usage:
const themeCSS = generateThemeScheme({ primary: "#ff7f00" });

// #1aa7ec

console.log(themeCSS);