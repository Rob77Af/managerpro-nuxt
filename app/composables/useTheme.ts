import type { AppSettings } from '~/types'

const hexToRgb = (hex: string) => {
  let r = 0, g = 0, b = 0
  if (hex.length === 4) { r = parseInt(hex[1]+hex[1],16); g = parseInt(hex[2]+hex[2],16); b = parseInt(hex[3]+hex[3],16) }
  else if (hex.length === 7) { r = parseInt(hex.slice(1,3),16); g = parseInt(hex.slice(3,5),16); b = parseInt(hex.slice(5,7),16) }
  return `${r}, ${g}, ${b}`
}

export const useTheme = (appSettings: Ref<AppSettings>) => {
  const applyTheme = () => {
    if (typeof document === 'undefined') return
    const s = appSettings.value
    const isDark = s.theme === 'dark'
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    const styleTagId = 'custom-theme-styles'
    let styleTag = document.getElementById(styleTagId) as HTMLStyleElement
    if (!styleTag) { styleTag = document.createElement('style'); styleTag.id = styleTagId; document.head.appendChild(styleTag) }
    const p = s.customPrimaryColorLight || '#4C6F51'
    const h = s.customHullDarkColor || '#306844'
    styleTag.textContent = `:root {
      --color-port-primary-light: ${isDark ? '#4C6F51' : p};
      --color-port-primary-lightest-light: ${s.customPrimaryLightestColorLight || '#D6E3D8'};
      --color-port-primary-lighter-light: ${s.customPrimaryLighterColorLight || '#91A895'};
      --color-port-primary-dark-light: ${s.customPrimaryDarkColorLight || '#28422B'};
      --color-port-glow-light: ${s.customGlowColorLight || '#F5C25F'};
      --color-port-contrast-light: ${s.customContrastLightColorLight || '#F7F7F7'};
      --color-port-hull-dark: ${isDark ? h : '#306844'};
      --color-port-glow-dark: ${s.customGlowDarkColor || '#FFBE64'};
      --color-port-deep-dark: ${s.customDeepDarkColor || '#142346'};
      --color-port-dark-bg-dark: ${s.customDarkBgDarkColor || '#1A202C'};
      --color-port-crane-dark: ${s.customCraneDarkColor || '#BE1E2D'};
      --color-port-light: #E2E8F0;
      --color-focus-rgb: ${hexToRgb(isDark ? h : p)};
      --font-family-sans: '${s.customFontFamily || 'Play'}';
    }`
  }
  watch(appSettings, applyTheme, { deep: true, immediate: true })
  return { applyTheme }
}
