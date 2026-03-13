import { BORDER_SCALE_STEPS, RADIUS_SCALE_STEPS, SPACING_SCALE_STEPS } from "../config/shared/layout-variables";
import { MONO_FONTS, SANS_FONTS } from "../constants/font-config";
import { DEFAULT_FONT_CONFIG, DEFAULT_LAYOUT_CONFIG } from "./default-theme-config";
import { THEME_CACHE_KEY } from "./theme-cache";

const REQUIRED_CACHE_VARS = ["--background-500", "--text-md"];

const FONT_FAMILY_MAP = Object.fromEntries(
  [...SANS_FONTS, ...MONO_FONTS].map((font) => [font.name, font.family]),
);

export function getInitialThemeScript(): string {
  return `(function(){var p=${JSON.stringify({
    cacheKey: THEME_CACHE_KEY,
    requiredCacheVars: REQUIRED_CACHE_VARS,
    defaultLayout: DEFAULT_LAYOUT_CONFIG,
    defaultFonts: DEFAULT_FONT_CONFIG,
    spacingSteps: SPACING_SCALE_STEPS,
    radiusSteps: RADIUS_SCALE_STEPS,
    borderSteps: BORDER_SCALE_STEPS,
    fontFamilyMap: FONT_FAMILY_MAP,
  })};var r=document.documentElement;function t(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function a(v){if(!v||typeof v!=="object")return;Object.keys(v).forEach(function(n){r.style.setProperty(n,v[n])})}function l(s){return typeof s==="number"&&isFinite(s)?s:null}function c(layout){var radius=l(layout&&layout.radius);var borderWidth=l(layout&&layout.borderWidth);var spacingScale=l(layout&&layout.spacingScale);var resolved={radius:radius??p.defaultLayout.radius,borderWidth:borderWidth??p.defaultLayout.borderWidth,spacingScale:spacingScale??p.defaultLayout.spacingScale};var vars={"--spacing-scale":String(resolved.spacingScale)};p.spacingSteps.forEach(function(step){vars["--spacing-"+step.name]="clamp("+(step.min*resolved.spacingScale).toFixed(3)+"rem, "+(step.fluid*resolved.spacingScale).toFixed(2)+"vw, "+(step.max*resolved.spacingScale).toFixed(3)+"rem)"});vars["--spacing"]="clamp("+(0.2*resolved.spacingScale).toFixed(3)+"rem, "+(2.5*resolved.spacingScale).toFixed(2)+"vw, "+(0.25*resolved.spacingScale).toFixed(3)+"rem)";var radiusFactor=resolved.radius/0.2;p.radiusSteps.forEach(function(step){var value=step.value*radiusFactor;vars["--radius-"+step.name]=value>100?"9999px":value.toFixed(3)+"rem"});vars["--radius-full"]="9999px";vars["--radius-ratio"]=String((resolved.radius/0.2)*0.5);var borderFactor=resolved.borderWidth/1;p.borderSteps.forEach(function(step){vars["--border-width-"+step.name]=(step.value*borderFactor).toFixed(1)+"px"});return vars}function f(fonts){var sans=fonts&&fonts.sansFont||p.defaultFonts.sansFont;var mono=fonts&&fonts.monoFont||p.defaultFonts.monoFont;r.style.setProperty("--font-sans",p.fontFamilyMap[sans]||p.fontFamilyMap[p.defaultFonts.sansFont]);r.style.setProperty("--font-mono",p.fontFamilyMap[mono]||p.fontFamilyMap[p.defaultFonts.monoFont])}function v(cache){if(!cache||typeof cache!=="object")throw new Error("Invalid cache format");if(cache.themeMode!=="light"&&cache.themeMode!=="dark")throw new Error("Invalid themeMode");if(!cache.cssVariables||typeof cache.cssVariables!=="object")throw new Error("Missing cssVariables");for(var i=0;i<p.requiredCacheVars.length;i++){var key=p.requiredCacheVars[i];if(typeof cache.cssVariables[key]!=="string")throw new Error("Missing: "+key)}return cache}try{var raw=localStorage.getItem(p.cacheKey);if(!raw){r.setAttribute("data-theme",t());a(c(p.defaultLayout));f(p.defaultFonts);return}var cache=v(JSON.parse(raw));r.setAttribute("data-theme",cache.themeMode);a(cache.cssVariables);a(c(cache.sourceConfig&&cache.sourceConfig.layout));f(cache.sourceConfig&&cache.sourceConfig.fonts)}catch(e){r.setAttribute("data-theme",t());a(c(p.defaultLayout));f(p.defaultFonts);if(e&&e.message!=="Invalid cache format"){console.warn("[Theme] Cache invalid, using defaults:",e.message)}}})();`;
}
