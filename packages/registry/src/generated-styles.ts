// This file is auto-generated. Do not edit.
export const generatedStyles: Record<string, { rawCss: string; styleableParts: Array<{ name: string }>; cssVariables: Array<{ name: string; value: string; defaultValue?: string; referencedVars: string[]; variant?: string | null }> }> = {
  "tooltip": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: inline-block;\n  }\n\n  .root {\n    position: absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n    pointer-events: none;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .content-frame {\n    display: flex;\n    align-items: center;\n    gap: 0.375rem;\n    padding: 0.25rem 0.5rem;\n    color: var(--foreground-200);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    white-space: nowrap;\n  }\n\n  .content-frame[data-hint] {\n    @apply pr-1;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "trigger"
      },
      {
        "name": "content"
      },
      {
        "name": "contentFrame"
      },
      {
        "name": "hintBadge"
      }
    ],
    "cssVariables": []
  },
  "toast": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    --background: var(--background-900);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n    @apply py-2.5 px-4;\n\n    width: 100%;\n    max-width: 28rem;\n    display: flex;\n    align-items: flex-start;\n    gap: var(--spacing-3);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-normal);\n    touch-action: pan-y;\n    user-select: none;\n  }\n\n  .icon {\n    flex-shrink: 0;\n    @apply mr-4 mt-2;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .content {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-sm);\n    line-height: var(--leading-tight);\n    margin: 0;\n  }\n\n  .description {\n    @apply mt-1 mb-0;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    line-height: var(--leading-normal);\n  }\n\n  .closeButton {\n    @apply p-2;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n.toast.default {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-600);\n}\n\n.toast.default .title {\n  color: var(--foreground-100);\n}\n\n.toast.default .description {\n  color: var(--foreground-300);\n}\n\n.toast.danger {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 20%, var(--background-900));\n}\n\n.toast.danger .title {\n  color: var(--foreground-100);\n}\n\n.toast.danger .description {\n  color: var(--foreground-300);\n}\n\n.toast.danger .icon {\n  color: var(--danger-600);\n}\n\n.toast.danger .closeButton {\n  color: color-mix(in srgb, var(--danger-600) 60%, var(--foreground-50));\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--danger-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 20%, var(--background-900));\n}\n\n.toast.success .title {\n  color: var(--foreground-100);\n}\n\n.toast.success .description {\n  color: var(--foreground-300);\n}\n\n.toast.success .icon {\n  color: var(--success-600);\n}\n\n.toast.success .closeButton {\n  color: color-mix(in srgb, var(--success-600) 60%, var(--foreground-50));\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--success-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 20%, var(--background-900));\n}\n\n.toast.info .title {\n  color: var(--foreground-100);\n}\n\n.toast.info .description {\n  color: var(--foreground-300);\n}\n\n.toast.info .icon {\n  color: var(--info-600);\n}\n\n.toast.info .closeButton {\n  color: color-mix(in srgb, var(--info-600) 60%, var(--foreground-50));\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--info-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 20%, var(--background-900));\n}\n\n.toast.warning .title {\n  color: var(--foreground-100);\n}\n\n.toast.warning .description {\n  color: var(--foreground-300);\n}\n\n.toast.warning .icon {\n  color: var(--warning-600);\n}\n\n.toast.warning .closeButton {\n  color: color-mix(in srgb, var(--warning-600) 60%, var(--foreground-50));\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--warning-500) 20%, var(--background-900));\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "content"
      },
      {
        "name": "title"
      },
      {
        "name": "description"
      },
      {
        "name": "closeButton"
      },
      {
        "name": "icon"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".toast"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast"
      },
      {
        "name": "--border",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".toast"
      },
      {
        "name": "--background",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".toast.default"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast.default"
      },
      {
        "name": "--border",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".toast.default"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--danger-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600",
          "--background-900"
        ],
        "variant": ".toast.danger"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast.danger"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--danger-600) 20%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600",
          "--background-900"
        ],
        "variant": ".toast.danger"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--success-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--success-600",
          "--background-900"
        ],
        "variant": ".toast.success"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast.success"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--success-600) 20%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--success-600",
          "--background-900"
        ],
        "variant": ".toast.success"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--info-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--info-600",
          "--background-900"
        ],
        "variant": ".toast.info"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast.info"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--info-600) 20%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--info-600",
          "--background-900"
        ],
        "variant": ".toast.info"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--warning-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600",
          "--background-900"
        ],
        "variant": ".toast.warning"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".toast.warning"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--warning-600) 20%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600",
          "--background-900"
        ],
        "variant": ".toast.warning"
      }
    ]
  },
  "textarea": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    resize: vertical;\n    outline: none;\n    @apply px-3 py-2;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-active] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n    }\n\n    &[data-resizable=\"false\"] {\n      resize: none;\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    font-size: var(--text-xs);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    width: 100%;\n  }\n\n  .characterCount {\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .characterCount[data-over-limit] {\n    color: var(--danger-600);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "characterCount"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--placeholder",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--border-hover",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--ring-color",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".textarea"
      },
      {
        "name": "--border",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".textarea[data-error]"
      },
      {
        "name": "--ring-color",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".textarea[data-error]"
      }
    ]
  },
  "tabs": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .tabsList {\n    @apply gap-3 py-1;\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    position: relative;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--background-700);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    --indicator-padding: 2px;\n\n    position: absolute;\n    background-color: var(--accent-500);\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: transform;\n    pointer-events: none;\n  }\n\n  .indicatorDefault {\n    background-color: color-mix(in srgb, var(--background-700) 50%, transparent);;\n    border-radius: var(--radius-sm);\n  }\n\n  .indicatorUnderline {\n    background-color: var(--accent-500);\n    border-radius: 0;\n  }\n\n  .tabsTrigger {\n    @apply px-2 py-1.5;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    background-color: transparent;\n    border: none;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    position: relative;\n    z-index: 1;\n    transition: color 0.15s ease, background-color 0.15s ease;\n    border-radius: var(--radius-sm);\n    flex-shrink: 0;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--foreground-200);\n      }\n\n      &:active {\n        color: var(--foreground-50);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground-50);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      .tabsList:not([data-variant=\"underline\"]) & {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n\n      .tabsList[data-variant=\"underline\"] & {\n        border-bottom-color: var(--accent-500);\n      }\n\n      .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--accent-500);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--background-800);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .tabsList[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      border-left-color: var(--accent-500);\n      border-bottom: none;\n    }\n  }\n\n  .triggerIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    flex-shrink: 0;\n  }\n\n  .tabsContent {\n    flex: 1;\n    width: 100%;\n    padding: 0;\n    outline: none;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &[data-variant=\"default\"] {\n      padding-top: 1rem;\n    }\n\n    &[data-variant=\"underline\"] {\n      padding-top: 1rem;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .tabsList {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .tabsTrigger {\n      @apply px-1 py-1;\n      font-size: var(--text-xs);\n\n      .tabsList[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "indicator"
      },
      {
        "name": "icon"
      }
    ],
    "cssVariables": [
      {
        "name": "--indicator-padding",
        "value": "2px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".indicator"
      }
    ]
  },
  "switch": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --track-background-unchecked: var(--background-800);\n    --track-background-checked: color-mix(in srgb, var(--accent-600) 60%, var(--background-500));\n    --track-background-hover: var(--accent-600);\n    --track-background-active: var(--accent-600);\n    --track-background-disabled: var(--background-800);\n    --thumb-background-unchecked: var(--background-500);\n    --thumb-background-checked: var(--accent-50);\n\n    --border: transparent;\n    --border-hover: transparent;\n    --border-active: transparent;\n\n    --radius: var(--radius-sm);\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .switch-track {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: transparent;\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n}\n\n.md {\n  width: 1.50rem;\n  height: 0.80rem;\n}\n\n.md .switch-thumb {\n  width: 0.5rem;\n  height: 0.5rem;\n}\n\n.lg {\n  width: 2.75rem;\n  height: 1.5rem;\n}\n\n.lg .switch-thumb {\n  width: 1rem;\n  height: 1rem;\n}\n\n.pill {\n  --radius: 9999px;\n}\n\n.round {\n  --radius: 0.375rem;\n}\n\n.switch[data-focus-visible] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "track"
      },
      {
        "name": "thumb"
      }
    ],
    "cssVariables": [
      {
        "name": "--track-background-unchecked",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".switch"
      },
      {
        "name": "--track-background-checked",
        "value": "color-mix(in srgb, var(--accent-600) 60%, var(--background-500))",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600",
          "--background-500"
        ],
        "variant": ".switch"
      },
      {
        "name": "--track-background-hover",
        "value": "var(--accent-600)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600"
        ],
        "variant": ".switch"
      },
      {
        "name": "--track-background-active",
        "value": "var(--accent-600)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600"
        ],
        "variant": ".switch"
      },
      {
        "name": "--track-background-disabled",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".switch"
      },
      {
        "name": "--thumb-background-unchecked",
        "value": "var(--background-500)",
        "defaultValue": null,
        "referencedVars": [
          "--background-500"
        ],
        "variant": ".switch"
      },
      {
        "name": "--thumb-background-checked",
        "value": "var(--accent-50)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-50"
        ],
        "variant": ".switch"
      },
      {
        "name": "--border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--border-hover",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--border-active",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".switch"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".switch"
      },
      {
        "name": "--radius",
        "value": "9999px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".pill"
      },
      {
        "name": "--radius",
        "value": "0.375rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".round"
      }
    ]
  },
  "slider": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    --slider-track-background-default: var(--background-800);\n    --slider-track-background-disabled: var(--background-800);\n    --slider-range-background-default: color-mix(in srgb, var(--accent-500) 60%, transparent);\n    --slider-range-background-disabled: var(--background-600);\n    --slider-thumb-background-default: var(--accent-500);\n    --slider-thumb-background-focus: var(--accent-400);\n    --slider-thumb-background-disabled: var(--background-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] {\n    @apply h-6;\n  }\n\n  .slider[data-size=\"md\"] {\n    @apply h-8;\n  }\n\n  .slider[data-size=\"lg\"] {\n    @apply h-10;\n  }\n\n  .slider[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n\n    position: relative;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: var(--radius-xs);\n    background-color: var(--slider-track-background-default);\n    display: flex;\n    align-items: center;\n  }\n\n  .slider[data-disabled] .track {\n    background-color: var(--slider-track-background-disabled);\n  }\n\n  .slider[data-size=\"sm\"] .track {\n    height: var(--track-height-sm);\n  }\n\n  .slider[data-size=\"md\"] .track {\n    height: var(--track-height-md);\n  }\n\n  .slider[data-size=\"lg\"] .track {\n    height: var(--track-height-lg);\n  }\n\n  .range {\n    position: absolute;\n    height: 100%;\n    background-color: var(--slider-range-background-default);\n    transition: background-color 200ms var(--ease-snappy-pop);\n    border-radius: var(--radius-xs);\n  }\n\n  .slider[data-disabled] .range {\n    background-color: var(--slider-range-background-disabled);\n  }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n\n    display: block;\n    background-color: var(--slider-thumb-background-default);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .slider[data-disabled] .thumb {\n    background-color: var(--slider-thumb-background-disabled);\n    cursor: not-allowed;\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--slider-thumb-background-focus);\n    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "track"
      },
      {
        "name": "range"
      },
      {
        "name": "thumb"
      }
    ],
    "cssVariables": [
      {
        "name": "--slider-track-background-default",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-track-background-disabled",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-range-background-default",
        "value": "color-mix(in srgb, var(--accent-500) 60%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-range-background-disabled",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-thumb-background-default",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-thumb-background-focus",
        "value": "var(--accent-400)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-400"
        ],
        "variant": ".slider"
      },
      {
        "name": "--slider-thumb-background-disabled",
        "value": "var(--background-500)",
        "defaultValue": null,
        "referencedVars": [
          "--background-500"
        ],
        "variant": ".slider"
      },
      {
        "name": "--track-height-sm",
        "value": "0.25rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".track"
      },
      {
        "name": "--track-height-md",
        "value": "0.375rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".track"
      },
      {
        "name": "--track-height-lg",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".track"
      },
      {
        "name": "--thumb-size-sm",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".thumb"
      },
      {
        "name": "--thumb-size-md",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".thumb"
      },
      {
        "name": "--thumb-size-lg",
        "value": "1.25rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".thumb"
      }
    ]
  },
  "select": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --background: color-mix(in srgb, var(--background-800) 50%, transparent);\n    --foreground: var(--foreground-300);\n    --border-color: var(--background-700);\n    --ring-color: var(--accent-400);\n\n    --hover-background: color-mix(in srgb, var(--background-700) 50%, transparent);\n    --pressed-background: color-mix(in srgb, var(--background-600) 50%, transparent);\n\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    padding: 0;\n    gap: 0;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border-color);\n    border-radius: var(--radius);\n\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n\n    user-select: none;\n    cursor: pointer;\n\n    /* Interactive States */\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: var(--pressed-background);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: var(--hover-background);\n    }\n  }\n\n  /* Variants */\n  .select.ghost {\n    --background: transparent;\n    --border-color: transparent;\n    --hover-background: color-mix(in srgb, var(--background-700) 50%, transparent);\n    --pressed-background: color-mix(in srgb, var(--background-700) 50%, transparent);\n\n    &[data-pressed]:not([data-disabled]),\n    &[aria-expanded=\"true\"] {\n      background: var(--hover-background);\n    }\n  }\n\n  .trigger {\n    display: flex;\n    align-items: stretch;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    user-select: none;\n    flex: 1;\n    gap: 0;\n    height: 100%;\n    min-width: 0;\n    padding: var(--padding-y) var(--padding-x);\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section {\n        background-color: var(--hover-background);\n      }\n\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: var(--hover-background);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 2px var(--background-950), 0 0 0 4px var(--ring-color);\n      outline: none;\n    }\n\n    :global(.group) &:focus-visible {\n      outline: none;\n    }\n  }\n\n  button.trigger {\n    padding: 0;\n  }\n\n  .value-section {\n    padding: var(--padding-y) var(--padding-x);\n    display: flex;\n    align-items: center;\n    flex: 1;\n    min-width: 0;\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n    gap: 0.5rem;\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    opacity: 0.7;\n  }\n\n  .select[aria-expanded=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    min-width: 0;\n    background: transparent;\n    border: none;\n    cursor: inherit;\n    padding: 0;\n  }\n\n  .value-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .value-text {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .content {\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] {\n      animation: slideInFromTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"open\"][data-placement=\"top\"] {\n      animation: slideInFromBottom 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"bottom\"] {\n      animation: slideOutToTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"top\"] {\n      animation: slideOutToBottom 0.15s var(--ease-snappy-pop);\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    --item-padding-x: var(--padding-x);\n    --item-padding-y: var(--padding-y);\n    --item-background-hover: color-mix(in srgb, var(--background-700) 50%, transparent);\n    --item-foreground: var(--foreground-300);\n    --item-icon-color: var(--foreground-300);\n    --item-indicator-color: var(--accent-300);\n\n    display: flex;\n    align-items: center;\n    padding: var(--item-padding-y) var(--item-padding-x);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--item-foreground);\n\n    &[data-selected=\"true\"] {\n      color: var(--item-foreground);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &[data-highlighted=\"true\"] {\n      background-color: var(--item-background-hover);\n    }\n  }\n\n  .item-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--item-icon-color);\n  }\n\n  .item-indicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--item-indicator-color);\n    margin-left: auto;\n  }\n\n  .item-content {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .item-text {\n    flex: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-with-description {\n    align-items: flex-start;\n    @apply py-2;\n  }\n\n  .item-icon-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .item-indicator-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideInFromBottom {\n    from {\n      opacity: 0;\n      translate: 0 2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n\n  @keyframes slideOutToBottom {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 2px;\n    }\n  }\n\n  .placeholder {\n    color: var(--foreground-400);\n  }\n\n  .icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .select[data-mode=\"multiple\"] .item {\n    gap: 0.5rem;\n  }\n\n  .subTrigger {\n    --subtrigger-padding-x: var(--padding-x);\n    --subtrigger-padding-y: var(--padding-y);\n    --subtrigger-background-hover: color-mix(in srgb, var(--background-700) 50%, transparent);\n    --subtrigger-foreground: var(--foreground-300);\n\n    display: flex;\n    align-items: center;\n    padding: var(--subtrigger-padding-y) var(--subtrigger-padding-x);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--subtrigger-foreground);\n    cursor: default;\n    user-select: none;\n    outline: none;\n\n    &[data-highlighted=\"true\"] {\n      background-color: var(--subtrigger-background-hover);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: var(--subtrigger-background-hover);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n    opacity: 0.6;\n  }\n\n  .subContent {\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    position: absolute;\n    z-index: 50001;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "valueSection"
      },
      {
        "name": "icon.prefix"
      },
      {
        "name": "icon.chevron"
      },
      {
        "name": "iconSection"
      },
      {
        "name": "title"
      },
      {
        "name": "icon"
      },
      {
        "name": "text"
      },
      {
        "name": "iconWrapper"
      },
      {
        "name": "contentWrapper"
      },
      {
        "name": "description"
      },
      {
        "name": "overlay"
      },
      {
        "name": "searchWrapper"
      },
      {
        "name": "listPaddingWrapper"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--background-800) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".select"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".select"
      },
      {
        "name": "--border-color",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".select"
      },
      {
        "name": "--ring-color",
        "value": "var(--accent-400)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-400"
        ],
        "variant": ".select"
      },
      {
        "name": "--hover-background",
        "value": "color-mix(in srgb, var(--background-700) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".select"
      },
      {
        "name": "--pressed-background",
        "value": "color-mix(in srgb, var(--background-600) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".select"
      },
      {
        "name": "--padding-x",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".select"
      },
      {
        "name": "--padding-y",
        "value": "var(--spacing)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".select"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".select"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".select"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".select.ghost"
      },
      {
        "name": "--border-color",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".select.ghost"
      },
      {
        "name": "--hover-background",
        "value": "color-mix(in srgb, var(--background-700) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".select.ghost"
      },
      {
        "name": "--pressed-background",
        "value": "color-mix(in srgb, var(--background-700) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".select.ghost"
      },
      {
        "name": "--padding-x",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content"
      },
      {
        "name": "--padding-y",
        "value": "var(--spacing)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".content"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".content"
      },
      {
        "name": "--item-padding-x",
        "value": "var(--padding-x)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-x"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-padding-y",
        "value": "var(--padding-y)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-y"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-background-hover",
        "value": "color-mix(in srgb, var(--background-700) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-icon-color",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-indicator-color",
        "value": "var(--accent-300)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-300"
        ],
        "variant": ".item"
      },
      {
        "name": "--subtrigger-padding-x",
        "value": "var(--padding-x)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-x"
        ],
        "variant": ".subTrigger"
      },
      {
        "name": "--subtrigger-padding-y",
        "value": "var(--padding-y)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-y"
        ],
        "variant": ".subTrigger"
      },
      {
        "name": "--subtrigger-background-hover",
        "value": "color-mix(in srgb, var(--background-700) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".subTrigger"
      },
      {
        "name": "--subtrigger-foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".subTrigger"
      },
      {
        "name": "--padding-x",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--padding-y",
        "value": "var(--spacing)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".subContent"
      }
    ]
  },
  "scroll": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    position: relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .track {\n    position: absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: transparent;\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: transparent;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--background-700);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover {\n    background-color: var(--background-600);\n  }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--background-500);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover {\n    height: 8px;\n    margin-top: 4px;\n  }\n\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "content"
      },
      {
        "name": "track"
      },
      {
        "name": "thumb"
      },
      {
        "name": "horizontal"
      },
      {
        "name": "vertical"
      }
    ],
    "cssVariables": [
      {
        "name": "--scrollbar-width",
        "value": "12px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".vertical"
      },
      {
        "name": "--scrollbar-height",
        "value": "12px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".horizontal"
      }
    ]
  },
  "radio": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .radio-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .radio-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .radio {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n    --radio-dot-unchecked: transparent;\n    --radio-dot-checked: var(--accent-50);\n    --radio-hover-background: var(--accent-500);\n    --radio-hover-border: var(--background-500);\n    --radio-error-border: var(--danger-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    cursor: pointer;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: 0.6;\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: rgb(59, 130, 246);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground, var(--foreground-300));\n    font-size: inherit;\n    line-height: inherit;\n    cursor: pointer;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled, var(--foreground-400));\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper, var(--foreground-400));\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error, var(--danger-500));\n  }\n  /* Size variants */\n  .radio.sm {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n\n  /* Variants */\n  .radio.primary[data-checked=\"true\"] {\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n  }\n\n  .radio.secondary {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline {\n    --radio-background-unchecked: transparent;\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline[data-checked=\"true\"] {\n    --radio-background-unchecked: color-mix(in srgb, var(--accent-500) 15%, transparent);\n    --radio-border-unchecked: var(--accent-500);\n    --radio-dot-unchecked: var(--accent-500);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "label"
      },
      {
        "name": "description"
      },
      {
        "name": "helperText"
      }
    ],
    "cssVariables": [
      {
        "name": "--radio-background-unchecked",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-background-checked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-border-checked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-dot-unchecked",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".radio"
      },
      {
        "name": "--radio-dot-checked",
        "value": "var(--accent-50)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-50"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-hover-background",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-hover-border",
        "value": "var(--background-500)",
        "defaultValue": null,
        "referencedVars": [
          "--background-500"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-error-border",
        "value": "var(--danger-500)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".radio"
      },
      {
        "name": "--radio-background-unchecked",
        "value": "var(--radio-background-checked)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-background-checked"
        ],
        "variant": ".radio[data-checked=\"true\"]"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--radio-border-checked)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-border-checked"
        ],
        "variant": ".radio[data-checked=\"true\"]"
      },
      {
        "name": "--radio-dot-unchecked",
        "value": "var(--radio-dot-checked)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-dot-checked"
        ],
        "variant": ".radio[data-checked=\"true\"]"
      },
      {
        "name": "--radio-background-unchecked",
        "value": "var(--radio-hover-background)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-hover-background"
        ],
        "variant": ".radio-item:not([data-disabled]):hover .radio"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--radio-hover-border)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-hover-border"
        ],
        "variant": ".radio-item:not([data-disabled]):hover .radio"
      },
      {
        "name": "--radio-dot-unchecked",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".radio-item[data-disabled] .radio"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--radio-error-border)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-error-border"
        ],
        "variant": ".radio[data-error=\"true\"]"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--radio-border-checked)",
        "defaultValue": null,
        "referencedVars": [
          "--radio-border-checked"
        ],
        "variant": ".radio[data-error=\"true\"][data-checked=\"true\"]"
      },
      {
        "name": "--radio-background-checked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio.primary[data-checked=\"true\"]"
      },
      {
        "name": "--radio-border-checked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio.primary[data-checked=\"true\"]"
      },
      {
        "name": "--radio-background-unchecked",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".radio.secondary"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".radio.secondary"
      },
      {
        "name": "--radio-background-unchecked",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".radio.outline"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".radio.outline"
      },
      {
        "name": "--radio-background-unchecked",
        "value": "color-mix(in srgb, var(--accent-500) 15%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio.outline[data-checked=\"true\"]"
      },
      {
        "name": "--radio-border-unchecked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio.outline[data-checked=\"true\"]"
      },
      {
        "name": "--radio-dot-unchecked",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".radio.outline[data-checked=\"true\"]"
      }
    ]
  },
  "progress": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    --track-background: var(--background-700);\n    --fill-background: color-mix(in srgb, var(--accent-600) 60%, var(--background-500));\n\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm {\n    height: 0.25rem;\n  }\n\n  .progress.md {\n    height: 0.5rem;\n  }\n\n  .progress.lg {\n    height: 0.75rem;\n  }\n\n  .fill {\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.default {\n    --fill-background: var(--accent-500);\n  }\n\n  .fill.success {\n    --fill-background: var(--success-500);\n  }\n\n  .fill.warning {\n    --fill-background: var(--warning-500);\n  }\n\n  .fill.error {\n    --fill-background: var(--danger-500);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    width: 100%;\n  }\n\n  .wrapper.hasLabel {\n    @apply space-y-1;\n  }\n\n  .labelRow {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% {\n      transform: translateX(-100%);\n    }\n    100% {\n      transform: translateX(400%);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "labelRow"
      },
      {
        "name": "label"
      },
      {
        "name": "value"
      },
      {
        "name": "progress"
      },
      {
        "name": "fill"
      }
    ],
    "cssVariables": [
      {
        "name": "--track-background",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".progress"
      },
      {
        "name": "--fill-background",
        "value": "color-mix(in srgb, var(--accent-600) 60%, var(--background-500))",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600",
          "--background-500"
        ],
        "variant": ".progress"
      },
      {
        "name": "--fill-background",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".fill.default"
      },
      {
        "name": "--fill-background",
        "value": "var(--success-500)",
        "defaultValue": null,
        "referencedVars": [
          "--success-500"
        ],
        "variant": ".fill.success"
      },
      {
        "name": "--fill-background",
        "value": "var(--warning-500)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-500"
        ],
        "variant": ".fill.warning"
      },
      {
        "name": "--fill-background",
        "value": "var(--danger-500)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".fill.error"
      }
    ]
  },
  "popover": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: inline-block;\n  }\n\n  .root {\n    position: absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.2s ease-out;\n    pointer-events: none;\n    min-width: 200px;\n    max-width: 400px;\n    padding: 0.75rem;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .content-frame {\n    display: flex;\n    align-items: center;\n    gap: 0.375rem;\n    padding: 0.25rem 0.5rem;\n    color: var(--foreground-200);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    white-space: nowrap;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "content"
      },
      {
        "name": "trigger"
      }
    ],
    "cssVariables": []
  },
  "path": {
    "rawCss": "@layer components {\n  .path {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n\n    display: block;\n  }\n\n  .pathList {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .pathList.withCustomSeparator .pathItem:not(:last-child)::after {\n    content: none;\n  }\n\n  .pathItem {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Separator after each item except the last */\n  .pathItem:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .pathItemLink {\n    color: var(--foreground);\n    text-decoration: none;\n    padding: 0.25rem 0.5rem;\n    border-radius: 0.375rem;\n    cursor: pointer;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    line-height: 1.5;\n    position: relative;\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: 0.6;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "list"
      },
      {
        "name": "separator"
      }
    ],
    "cssVariables": [
      {
        "name": "--foreground",
        "value": "var(--foreground-primary)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-primary"
        ],
        "variant": ".path"
      },
      {
        "name": "--foreground-muted",
        "value": "var(--foreground-secondary)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-secondary"
        ],
        "variant": ".path"
      },
      {
        "name": "--separator-color",
        "value": "var(--border-secondary)",
        "defaultValue": null,
        "referencedVars": [
          "--border-secondary"
        ],
        "variant": ".path"
      },
      {
        "name": "--focus-ring-color",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".path"
      }
    ]
  },
  "panel": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n    min-width: 0;\n    min-height: 0;\n  }\n\n  .panel[data-stacked=\"true\"] {\n    flex-direction: column;\n  }\n\n  .header {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    flex: 1;\n    display: flex;\n    min-width: 0;\n    min-height: 0;\n    overflow: auto;\n  }\n\n  .footer {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    flex-shrink: 0;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    display: flex;\n    align-items: center;\n  }\n\n  /* Group */\n  .group {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] {\n    flex-direction: column;\n  }\n\n  /* Resize handle */\n  .resize {\n    flex-shrink: 0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n    position: relative;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"]:hover::before {\n    width: auto;\n    height: 2px;\n  }\n\n  .resize[data-resizing=\"true\"]::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone {\n    gap: 0;\n  }\n\n  .spacingSm {\n    gap: var(--spacing-sm, 0.5rem);\n  }\n\n  .spacingMd {\n    gap: var(--spacing-md, 1rem);\n  }\n\n  .spacingLg {\n    gap: var(--spacing-lg, 1.5rem);\n  }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked {\n      flex-direction: column;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "page": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    position: relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    align-items: center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .paddingNone {\n    padding: 0;\n  }\n\n  .paddingSm {\n    padding: var(--spacing-sm, 0.5rem);\n  }\n\n  .paddingMd {\n    padding: var(--spacing-md, 1rem);\n  }\n\n  .paddingLg {\n    padding: var(--spacing-lg, 1.5rem);\n  }\n\n  .paddingXl {\n    padding: var(--spacing-xl, 2rem);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "modal": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --modal-bg: var(--background-900);\n    --modal-bg-footer: var(--background-800);\n    --modal-border: var(--background-700);\n    --modal-title-color: var(--foreground-100);\n    --modal-text-color: var(--foreground-300);\n    --modal-close-color: var(--foreground-400);\n    --modal-close-hover: var(--foreground-200);\n  }\n\n  .backdrop {\n    position: absolute;\n    inset: 0;\n    background-color: rgb(0 0 0 / 0.5);\n    backdrop-filter: blur(4px);\n    transition: opacity 200ms var(--ease-gentle-ease);\n    cursor: pointer;\n  }\n\n  .modal {\n    position: relative;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-bg);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-md);\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);\n    animation: modalIn 200ms var(--ease-snappy-pop);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  @keyframes modalIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  .header {\n    @apply py-4 px-6 gap-2;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    margin: 0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: auto;\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: var(--modal-close-color);\n    transition: color 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  }\n\n  .closeButton:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .closeButton:active {\n    transform: scale(0.92);\n  }\n\n  .closeButton:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply py-4 px-6 gap-4;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    background-color: var(--background-950);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "overlay"
      },
      {
        "name": "backdrop"
      },
      {
        "name": "header"
      },
      {
        "name": "title"
      },
      {
        "name": "spacer"
      },
      {
        "name": "closeButton"
      },
      {
        "name": "closeIcon"
      },
      {
        "name": "content"
      },
      {
        "name": "footer"
      }
    ],
    "cssVariables": [
      {
        "name": "--modal-bg",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-bg-footer",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-title-color",
        "value": "var(--foreground-100)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-100"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-text-color",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-close-color",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".overlay"
      },
      {
        "name": "--modal-close-hover",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".overlay"
      }
    ]
  },
  "menu": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .checkboxItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .radioItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .itemIndicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-300);\n    margin-left: auto;\n  }\n\n  .subTrigger {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subContent {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-400);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "chevron"
      },
      {
        "name": "indicator"
      }
    ],
    "cssVariables": [
      {
        "name": "--padding",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content"
      },
      {
        "name": "--radius",
        "value": "calc(var(--padding) * var(--radius-ratio))",
        "defaultValue": null,
        "referencedVars": [
          "--padding",
          "--radius-ratio"
        ],
        "variant": ".content"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".content"
      },
      {
        "name": "--menu-animation",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".content"
      },
      {
        "name": "--padding",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--radius",
        "value": "calc(var(--padding) * var(--radius-ratio))",
        "defaultValue": null,
        "referencedVars": [
          "--padding",
          "--radius-ratio"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base))",
        "defaultValue": null,
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".subContent"
      },
      {
        "name": "--menu-animation",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".subContent"
      }
    ]
  },
  "mask": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "list": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --foreground: var(--foreground-50);\n\n    max-width: 28rem;\n    margin-left: auto;\n    margin-right: auto;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--foreground-50);\n  }\n\n  .header > :last-child {\n    color: var(--foreground-400);\n  }\n\n  .item {\n    --background-hover: color-mix(in srgb, var(--background-500) 6%, transparent);\n    --background-highlighted: color-mix(in srgb, var(--background-500) 6%, transparent);\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    @apply py-1 px-2;\n    cursor: pointer;\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n  }\n\n  .media {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2rem;\n    height: 2rem;\n    flex-shrink: 0;\n  }\n\n  .desc {\n    font-size: 0.875rem;\n    color: var(--foreground-400);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .action-group {\n    display: flex;\n    align-items: center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] {\n    justify-content: space-between;\n  }\n\n  .action-group[data-justify=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .action-group[data-justify=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .footer {\n    padding: 1.5rem;\n    padding-bottom: 3rem;\n    display: flex;\n  }\n\n  .footer[data-align=\"center\"] {\n    justify-content: center;\n  }\n\n  .footer[data-align=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .footer[data-align=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".container"
      },
      {
        "name": "--background-hover",
        "value": "color-mix(in srgb, var(--background-500) 6%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-500"
        ],
        "variant": ".item"
      },
      {
        "name": "--background-highlighted",
        "value": "color-mix(in srgb, var(--background-500) 6%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-500"
        ],
        "variant": ".item"
      }
    ]
  },
  "input": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    outline: none;\n    box-sizing: border-box;\n    @apply px-3 py-2;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), background-color 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--ring-color);\n      /* box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring-color) 20%, transparent); */\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-active] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .input[data-variant=\"ghost\"] {\n    --background: transparent;\n    --border: transparent;\n    --background-hover: transparent;\n    --border-hover: transparent;\n\n    &[data-focus-visible] {\n      box-shadow: none;\n    }\n  }\n\n  .icon-wrapper {\n    position: absolute;\n    top: 50%;\n    display: flex;\n    align-items: center;\n    color: var(--foreground-400);\n    pointer-events: none;\n    transform: translateY(-50%);\n    z-index: 10;\n  }\n\n  .prefix-icon {\n    left: 0.60rem;\n  }\n\n  .suffix-icon {\n    right: 1.00rem;\n  }\n\n  .container {\n    position: relative;\n    width: 100%;\n  }\n\n  .number-controls {\n    position: absolute;\n    top: 50%;\n    right: 0.50rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n    height: 1.5rem;\n    transform: translateY(-50%);\n    pointer-events: auto;\n    z-index: 10;\n  }\n\n  .numberControls.disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    width: 1.25rem;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: color 150ms var(--ease-snappy-pop);\n\n    &:hover:not(:disabled) {\n      color: var(--foreground-400);\n    }\n\n    &:active:not(:disabled) {\n      color: var(--accent-500);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".input"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".input"
      },
      {
        "name": "--placeholder",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".input"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".input"
      },
      {
        "name": "--background-hover",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".input"
      },
      {
        "name": "--border-hover",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".input"
      },
      {
        "name": "--ring-color",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".input"
      },
      {
        "name": "--border",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".input[data-error]"
      },
      {
        "name": "--ring-color",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".input[data-error]"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".input[data-variant=\"ghost\"]"
      },
      {
        "name": "--border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".input[data-variant=\"ghost\"]"
      },
      {
        "name": "--background-hover",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".input[data-variant=\"ghost\"]"
      },
      {
        "name": "--border-hover",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".input[data-variant=\"ghost\"]"
      }
    ]
  },
  "group": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n    \n    --background: var(--background-950);\n    --border: var(--background-700);\n\n    display: flex;\n    width: fit-content;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    \n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    overflow: hidden;\n    \n    padding: var(--padding);\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    flex-direction: row;\n    align-items: stretch;\n  }\n\n  .group.vertical {\n    flex-direction: column;\n  }\n\n  /* Spacing */\n  .group.none {\n    --padding: 0;\n    @apply gap-0;\n  }\n\n  .group.sm {\n    --radius-basis: calc(var(--spacing) * 1.25);\n    --padding: var(--radius-basis);\n    @apply space-x-1;\n  }\n\n  /* Variants */\n  .group.ghost {\n    --background: transparent;\n    background-color: transparent;\n    border: none;\n    overflow: visible;\n    @apply gap-1;\n  }\n\n  .item {\n    display: flex;\n    align-items: stretch;\n    min-width: 0;\n  }\n\n  .item.grow {\n    flex: 1;\n  }\n\n  .group:not(.ghost) .item .group-item,\n  .group:not(.ghost) .group-input-wrapper input,\n  .group:not(.ghost) .item .group-select-wrapper {\n    border: none;\n  }\n\n  .group.none:not(.ghost) .item .group-item,\n  .group.none:not(.ghost) .group-input-wrapper input,\n  .group.none:not(.ghost) .item .group-select-wrapper,\n  .group.none:not(.ghost) .item .trigger {\n    border-radius: 0;\n  }\n\n  .group.none:not(.ghost) .item .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n  }\n\n  .group.sm:not(.ghost) .item .group-item,\n  .group.sm:not(.ghost) .item .trigger,\n  .group.sm:not(.ghost) .group-select-wrapper .group-item,\n  .group.sm:not(.ghost) .group-select-wrapper .trigger {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.sm:not(.ghost) .group-input-wrapper input {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .group-item {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .group-item {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .item.divider {\n    padding: 0;\n    display: flex;\n    align-items: stretch;\n  }\n\n  .item.divider > [role=\"separator\"] {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group.horizontal .item.divider {\n    margin-top: calc(var(--padding) * -1);\n    margin-bottom: calc(var(--padding) * -1);\n  }\n\n  .group.vertical .item.divider {\n    margin-left: calc(var(--padding) * -1);\n    margin-right: calc(var(--padding) * -1);\n  }\n\n  .group.ghost:not(.none) .item .group-item:not(.active) {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border: var(--border-width-base) solid transparent;\n  }\n\n  /* ghost + none: flat children — no borders or radius */\n  .group.ghost.none {\n    @apply gap-0;\n  }\n\n  .group.ghost.none .item .group-item,\n  .group.ghost.none .group-item.active {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-input-wrapper input {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n    border: none;\n    border-radius: 0;\n  }\n\n  .group:not(.ghost) .item .group-item:focus-visible,\n  .group:not(.ghost) .item .trigger:focus-visible,\n  .group-input-wrapper input:focus-visible {\n    outline: none;\n    box-shadow: inset 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group.ghost .item .group-item:focus-visible,\n  .group.ghost .item .trigger:focus-visible {\n    outline: none;\n    box-shadow: 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group-input-wrapper {\n    display: flex;\n    align-items: stretch;\n    height: 100%;\n    flex: 1;\n    overflow: visible;\n  }\n\n  .group-input-wrapper input {\n    height: 100%;\n  }\n\n  .item .group-item {\n    display: flex;\n    height: 100%;\n  }\n\n  .group.vertical .item .group-item {\n    width: 100%;\n  }\n\n  .group.sm .item button.group-item {\n    padding: calc(var(--spacing) * 1.50) calc(var(--spacing) * 2.00);\n  }\n\n  .group.none .item button.group-item {\n    padding: calc(var(--spacing) * 2.00) calc(var(--spacing) * 2.50);\n  }\n\n  .group-select-wrapper {\n    display: flex;\n    align-items: stretch;\n    padding: 0;\n    border: none;\n    background-color: transparent;\n  }\n\n  .group.none:not(.ghost) .trigger {\n    border-radius: 0;\n  }\n\n  .trigger {\n    border: none;\n  }\n\n  .group-select-wrapper .select {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group-item.active {\n    position: relative;\n  }\n\n  .group.ghost .group-item.active {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group:not(.ghost) .group-item.active {\n    background-color: var(--background-800);\n    font-weight: 500;\n  }\n}\n",
    "styleableParts": [],
    "cssVariables": [
      {
        "name": "--radius-basis",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group"
      },
      {
        "name": "--padding",
        "value": "var(--radius-basis)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-basis"
        ],
        "variant": ".group"
      },
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".group"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".group"
      },
      {
        "name": "--padding",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none"
      },
      {
        "name": "--radius-basis",
        "value": "calc(var(--spacing) * 1.25)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group.sm"
      },
      {
        "name": "--padding",
        "value": "var(--radius-basis)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-basis"
        ],
        "variant": ".group.sm"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.ghost"
      },
      {
        "name": "--radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none:not(.ghost) .item .group-select-wrapper"
      },
      {
        "name": "--inner-radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none:not(.ghost) .item .group-select-wrapper"
      },
      {
        "name": "--radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.ghost.none .group-select-wrapper"
      },
      {
        "name": "--inner-radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.ghost.none .group-select-wrapper"
      }
    ]
  },
  "grid": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    display: grid;\n    width: 100%;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap {\n    row-gap: var(--grid-row-gap);\n  }\n\n  .grid.has-col-gap {\n    column-gap: var(--grid-col-gap);\n  }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "gallery": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --border-focus: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    cursor: pointer;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    flex-direction: row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n    --background: var(--background-950);\n\n    position: relative;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n    overflow: hidden;\n  }\n\n  .view > img,\n  .view > video {\n      width: 100%;\n      height: 100%;\n    object-fit: cover;\n  }\n\n  .body {\n      display: flex;\n      flex-direction: column;\n    gap: 0.25rem;\n    padding: 0.75rem;\n    align-self: flex-start;\n    min-width: 0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-50);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".item"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".item"
      },
      {
        "name": "--border-hover",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".item"
      },
      {
        "name": "--border-focus",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".item"
      },
      {
        "name": "--aspect-ratio",
        "value": "var(--gallery-aspect-ratio, 16/9)",
        "defaultValue": "16/9",
        "referencedVars": [
          "--gallery-aspect-ratio"
        ],
        "variant": ".view"
      },
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".view"
      }
    ]
  },
  "frame": {
    "rawCss": "@layer components {\n  .root {\n    --frame-radius: var(--radius-2xl, 24px);\n    --frame-stroke-width: var(--border-width-base, 1px);\n  }\n\n  .shape {\n    rx: var(--frame-radius);\n  }\n\n  .stroke {\n    stroke-width: var(--frame-stroke-width);\n    vector-effect: non-scaling-stroke;\n  }\n\n  .frame {\n    position: relative;\n    display: inline-block;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .frame[data-has-measurements=\"true\"] {\n    border: none;\n  }\n\n  .background {\n    position: absolute;\n    inset: 0;\n    z-index: 0;\n    background: var(--frame-bg, currentColor);\n    pointer-events: none;\n  }\n\n  .svgOverlay {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n    overflow: visible; /* Crucial: Allows strokes to bleed slightly outside the path */\n  }\n\n  .pathStroke {\n    fill: none;\n    stroke: var(--frame-stroke, currentColor);\n    stroke-width: var(--frame-stroke-width, 1px);\n  }\n\n  .content {\n    position: relative;\n    z-index: 2;\n    height: 100%;\n  }\n\n  /* Padding variants applied only to the content layer */\n  .padding-none .content { padding: 0; }\n  .padding-small .content { padding: 0.5rem; }\n  .padding-medium .content { padding: 1rem; }\n  .padding-large .content { padding: 2rem; }\n\n  /* Variant styling examples */\n  .variant-default { --frame-bg: rgba(255, 255, 255, 0.05); --frame-stroke: rgba(255, 255, 255, 0.2); }\n  .variant-accent { --frame-stroke: #00f2ff; --frame-bg: rgba(0, 242, 255, 0.05); }\n  .variant-subtle { --frame-stroke: rgba(255, 255, 255, 0.1); --frame-bg: transparent; }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--frame-radius",
        "value": "var(--radius-2xl, 24px)",
        "defaultValue": "24px",
        "referencedVars": [
          "--radius-2xl"
        ],
        "variant": ".root"
      },
      {
        "name": "--frame-stroke-width",
        "value": "var(--border-width-base, 1px)",
        "defaultValue": "1px",
        "referencedVars": [
          "--border-width-base"
        ],
        "variant": ".root"
      },
      {
        "name": "--frame-bg",
        "value": "rgba(255, 255, 255, 0.05)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-default"
      },
      {
        "name": "--frame-stroke",
        "value": "rgba(255, 255, 255, 0.2)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-default"
      },
      {
        "name": "--frame-stroke",
        "value": "#00f2ff",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-accent"
      },
      {
        "name": "--frame-bg",
        "value": "rgba(0, 242, 255, 0.05)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-accent"
      },
      {
        "name": "--frame-stroke",
        "value": "rgba(255, 255, 255, 0.1)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-subtle"
      },
      {
        "name": "--frame-bg",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".variant-subtle"
      }
    ]
  },
  "flex": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n    width: 100%;\n  }\n\n  /* Direction variants */\n  .flex.row {\n    flex-direction: row;\n  }\n\n  .flex.column {\n    flex-direction: column;\n  }\n\n  /* Wrap variants */\n  .flex.wrap {\n    flex-wrap: wrap;\n  }\n\n  .flex.nowrap {\n    flex-wrap: nowrap;\n  }\n\n  /* Gap variants */\n  .flex.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .flex.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .flex.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .flex.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .flex.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start {\n    justify-content: flex-start;\n  }\n\n  .flex.justify-flex-end {\n    justify-content: flex-end;\n  }\n\n  .flex.justify-center {\n    justify-content: center;\n  }\n\n  .flex.justify-space-between {\n    justify-content: space-between;\n  }\n\n  .flex.justify-space-around {\n    justify-content: space-around;\n  }\n\n  .flex.justify-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align-items variants */\n  .flex.align-flex-start {\n    align-items: flex-start;\n  }\n\n  .flex.align-flex-end {\n    align-items: flex-end;\n  }\n\n  .flex.align-center {\n    align-items: center;\n  }\n\n  .flex.align-stretch {\n    align-items: stretch;\n  }\n\n  .flex.align-baseline {\n    align-items: baseline;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "expand": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --trigger-background: transparent;\n    --trigger-background-hover: var(--background-900);\n    --trigger-foreground: var(--foreground-50);\n    --content-background: transparent;\n    --content-foreground: var(--foreground-300);\n\n    display: flex;\n    flex-direction: column;\n  }\n\n  .expand[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply text-left cursor-pointer;\n    display: flex;\n    align-items: stretch;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--trigger-foreground);\n    background-color: var(--trigger-background);\n    border: none;\n    border-radius: var(--radius-sm);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    @apply px-3 py-2;\n    flex-shrink: 0;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    flex-direction: row-reverse;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    flex-direction: row;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .contentInner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    flex: 1;\n    font-weight: var(--font-weight-medium);\n    @apply py-2 pl-3;\n    display: flex;\n    align-items: center;\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n    min-width: 0;\n    overflow: hidden;\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    display: grid;\n    grid-template-rows: 0fr;\n    overflow: hidden;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .contentInner {\n    overflow: hidden;\n    min-height: 0;\n    color: var(--content-foreground);\n    background-color: var(--content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "trigger"
      },
      {
        "name": "content"
      }
    ],
    "cssVariables": [
      {
        "name": "--trigger-background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--trigger-background-hover",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".expand"
      },
      {
        "name": "--trigger-foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".expand"
      },
      {
        "name": "--content-background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--content-foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".expand"
      }
    ]
  },
  "confirm": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .card {\n    max-width: 28rem;\n  }\n\n  .card-compact {\n    max-width: 21rem;\n  }\n\n  .dialog-overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 50;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    max-width: 28rem;\n    margin: 0 1rem;\n  }\n\n  .header {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n  }\n\n  .header-content {\n    flex: 1;\n  }\n\n  .header-title {\n    font-weight: 600;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .body-compact {\n    gap: 0.75rem;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    padding: 0.75rem;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: color-mix(in srgb, var(--background-info) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: color-mix(in srgb, var(--background-warning) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: color-mix(in srgb, var(--background-warning-dark) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: color-mix(in srgb, var(--background-danger) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    width: 100%;\n    margin-top: 0.5rem;\n    padding: 0.5rem 0.75rem;\n    border-radius: var(--radius-sm);\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .actions-inline {\n    flex-direction: row;\n  }\n\n  .actions-dialog {\n    flex-direction: row;\n    justify-content: flex-end;\n  }\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "command": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .palette {\n    --background-default: var(--background-900);\n    --background-hover: var(--background-800);\n    --background-selected: var(--background-800);\n    --background-input: var(--background-900);\n    --border-default: var(--background-700);\n    --fg-default: var(--foreground-300);\n    --fg-muted: var(--foreground-400);\n    --fg-icon: var(--foreground-400);\n    --overlay: rgb(0 0 0 / 0.2);\n    --list-background: var(--background-950);\n    --footer-background: var(--background-800);\n  }\n\n  /* Overlay Container */\n  .overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 999;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    overflow: hidden;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: blur(4px);\n  }\n\n  /* Content */\n  .content {\n    position: relative;\n    @apply m-2;\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    width: 100%;\n    margin-inline: 1rem;\n    max-width: 28rem;\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);\n    animation: fadeInZoomIn 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    overflow: hidden;\n  }\n\n  /* Search Section */\n  .search {\n    border: none;\n    display: flex;\n    padding: 0\n  }\n\n  .search-container {\n    @apply p-1.5 pl-12; \n    position: relative;\n    width: 100%;\n  }\n\n  .search-icon {\n    position: absolute;\n    left: 1.0rem;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 1rem;\n    height: 1rem;\n    display: flex;\n    align-items: center;\n    color: var(--fg-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    width: 100%;\n    background-color: var(--background-input);\n    border: none;\n    color: var(--fg-default);\n    padding-block: 0.5rem;\n    font-size: var(--text-xs);\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    font-family: var(--text-xs);\n    font-weight: var(--font-weight-semibold);\n    color: var(--fg-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    position: absolute;\n    right: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 0.25rem;\n    border-radius: var(--radius-md);\n    background-color: transparent;\n    color: var(--fg-muted);\n    border: none;\n    cursor: pointer;\n    transition:\n      background-color 0.15s,\n      color 0.15s;\n  }\n\n  .search-clear:hover {\n    background-color: var(--background-hover);\n    color: var(--fg-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n  }\n\n  .item {\n    display: flex;\n    @apply px-2 py-0.5;\n    border-radius: 0.375rem;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n    transition: background-color 0.15s;\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    color: var(--fg-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-label {\n    font-size: var(--text-xs);\n    color: var(--fg-default);\n    font-weight: var(--font-weight-medium);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    color: var(--fg-muted);\n    font-size: 0.875rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .hint-wrapper {\n    display: flex;\n    align-items: center;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--fg-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--fg-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply px-1.5 py-2 gap-2;\n    width: 100%;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    display: flex;\n    align-items: center;\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fadeInZoomIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n}\n",
    "styleableParts": [],
    "cssVariables": [
      {
        "name": "--background-default",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".palette"
      },
      {
        "name": "--background-hover",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".palette"
      },
      {
        "name": "--background-selected",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".palette"
      },
      {
        "name": "--background-input",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".palette"
      },
      {
        "name": "--border-default",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".palette"
      },
      {
        "name": "--fg-default",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".palette"
      },
      {
        "name": "--fg-muted",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".palette"
      },
      {
        "name": "--fg-icon",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".palette"
      },
      {
        "name": "--overlay",
        "value": "rgb(0 0 0 / 0.2)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".palette"
      },
      {
        "name": "--list-background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".palette"
      },
      {
        "name": "--footer-background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".palette"
      }
    ]
  },
  "color": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);;\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .colorControls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup {\n    width: 100%;\n    display: flex;\n  }\n\n  .inputGroup > div:nth-child(1) {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .colorInput {\n    width: 100%;\n  }\n\n  .formatSelect {\n    flex-shrink: 0;\n    width: 85px; /* Fixed width for the format selector */\n  }\n\n  .color[data-size=\"sm\"] .formatSelect {\n    width: 75px;\n  }\n\n  /* Canvas Styles */\n  .canvasContainer {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    border-radius: none;\n    /* clip-path: inset(0 round var(--radius-sm)); */\n    overflow: hidden;\n  }\n\n  .canvasGradientHue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n    /* border-radius: var(--radius-sm); */\n  }\n\n  .canvasGradientSaturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n    border-radius: none;\n  }\n\n  .canvasGradientLightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n    border-radius: none\n  }\n\n  .canvasPointer {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid color-mix(in srgb, var(--foreground-200) 50%, transparent);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider {\n    display: flex;\n    align-items: center;\n    height: 16px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .hueTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hueThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hueThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider {\n    display: flex;\n    align-items: center;\n    height: 12px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .opacityTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-800),\n      var(--background-800) 10px,\n      var(--background-700) 10px,\n      var(--background-700) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .opacityThumb {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacityThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacityThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recentColorSwatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use previewSwatch instead */\n  .previewContainer {\n    display: flex;\n    justify-content: center;\n    padding: 0.5rem 0;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch {\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .previewSwatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 6px,\n      var(--background-800) 6px,\n      var(--background-800) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 10px,\n      var(--background-800) 10px,\n      var(--background-800) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .preview::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .canvasContainer {\n    min-height: 160px;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "controls"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--background-800) 30%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".color"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color"
      },
      {
        "name": "--ring-color",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".color"
      }
    ]
  },
  "code": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--background-700);\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    width: 100%;\n    min-width: 0;\n  }\n\n  .header {\n    flex: none;\n    background-color: color-mix(in srgb, var(--background-900) 90%, transparent);\n    display: flex;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: 1px solid var(--background-700);\n    padding: 0.375rem 0.75rem;\n    color: var(--foreground-400);\n  }\n\n  .header-lang {\n    color: var(--foreground-400);\n  }\n\n  .body {\n    position: relative;\n    flex: 1;\n    min-height: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .viewport {\n    overflow-y: hidden;\n    overflow-x: hidden;\n  }\n\n  .viewport :global(pre) {\n    background: transparent;\n    padding: 0;\n    margin: 0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    width: 100%;\n    overflow-x: auto;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    width: 100%;\n    @apply px-4 py-2;\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--background-700);\n    background: transparent;\n    cursor: pointer;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover {\n    background-color: var(--background-800);\n  }\n\n  .expand-icon {\n    color: var(--foreground-400);\n    flex-shrink: 0;\n  }\n\n  .copy-button {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem;\n    border-radius: var(--radius-sm);\n    padding: 0.25rem;\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    cursor: pointer;\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1;\n  }\n\n  .copy-button:hover {\n    background-color: var(--background-800);\n    color: var(--foreground-300);\n  }\n\n  .copy-button:focus {\n    opacity: 1;\n  }\n\n  .body:hover .copy-button {\n    opacity: 1;\n  }\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "checkbox": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .checkbox-root {\n    @apply gap-3;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .checkbox-container {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --background: var(--background-800);\n    --foreground: var(--accent-50);\n    --border: transparent;\n    --ring-color: var(--accent-500);\n    --hover-background: color-mix(in srgb, var(--background-800) 90%, var(--accent-500));\n    --hover-border: color-mix(in srgb, var(--background-700) 90%, var(--accent-500));\n\n    @apply cursor-pointer;\n    appearance: none;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    position: relative;\n    width: 1.25rem;\n    height: 1.25rem;\n\n    /* Interactive States */\n    &:hover:not([data-disabled=\"true\"]) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:focus-visible {\n      outline: 2px solid transparent;\n      box-shadow: 0 0 0 3px var(--ring-color);\n    }\n\n    &[data-pressed=\"true\"] {\n      transform: scale(0.92);\n    }\n\n    &[data-selected=\"true\"] {\n      --background: color-mix(in srgb, var(--accent-600) 60%, var(--background-500));\n      --border: transparent;\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-indeterminate=\"true\"] {\n      --background: var(--accent-500);\n      --border: var(--accent-500);\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: 0.6;\n      pointer-events: none;\n    }\n\n    /* Sizes */\n    &.size-sm {\n      width: 1rem;\n      height: 1rem;\n    }\n\n    &.size-md {\n      width: 1.25rem;\n      height: 1.25rem;\n    }\n\n    &.size-lg {\n      width: 1.5rem;\n      height: 1.5rem;\n    }\n  }\n\n  /* Checkmark and Indeterminate styles - combined */\n  .checkbox-checkmark,\n  .checkbox-indeterminate {\n    position: absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--accent-50); /* Use foreground for consistency */\n    pointer-events: none;\n  }\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-md {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-lg {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal {\n    color: inherit;\n  }\n\n  .helper-text-error {\n    color: var(--danger-600);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "label"
      },
      {
        "name": "helperText"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".checkbox"
      },
      {
        "name": "--foreground",
        "value": "var(--accent-50)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-50"
        ],
        "variant": ".checkbox"
      },
      {
        "name": "--border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".checkbox"
      },
      {
        "name": "--ring-color",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".checkbox"
      },
      {
        "name": "--hover-background",
        "value": "color-mix(in srgb, var(--background-800) 90%, var(--accent-500))",
        "defaultValue": null,
        "referencedVars": [
          "--background-800",
          "--accent-500"
        ],
        "variant": ".checkbox"
      },
      {
        "name": "--hover-border",
        "value": "color-mix(in srgb, var(--background-700) 90%, var(--accent-500))",
        "defaultValue": null,
        "referencedVars": [
          "--background-700",
          "--accent-500"
        ],
        "variant": ".checkbox"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--accent-600) 60%, var(--background-500))",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600",
          "--background-500"
        ],
        "variant": ".checkbox[data-selected=\"true\"]"
      },
      {
        "name": "--border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".checkbox[data-selected=\"true\"]"
      },
      {
        "name": "--background",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".checkbox[data-indeterminate=\"true\"]"
      },
      {
        "name": "--border",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".checkbox[data-indeterminate=\"true\"]"
      }
    ]
  },
  "date": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --border: var(--background-700);\n\n    display: inline-flex;\n    flex-direction: column;\n    gap: 0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .dayHeaders {\n    @apply px-4 pt-3 pb-1;\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    gap: 0.5rem;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n    background: var(--background-900);\n  }\n\n  .dayHeader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 500;\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n  }\n\n  .header {\n    display: flex;\n    @apply pl-2 pr-1.5 py-1.5;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .monthYear {\n    font-weight: 500;\n    @apply ml-2;\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .navButton {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2rem;\n    min-height: 2rem;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--foreground-400);\n    border: 1px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 500;\n  }\n\n  .navButton:hover {\n    background-color: var(--background-800);\n  }\n\n  .navButton:focus-visible {\n    background: var(--background-800);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    @apply gap-1 px-4 pb-4;\n    background-color: var(--background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n    background: var(--background-900);\n  }\n\n  .dayCell {\n    --cell-bg: transparent;\n    --cell-text: var(--foreground-300);\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 2rem;\n    @apply py-2 px-2.5;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-bg);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 400;\n  }\n\n  .weekHeader {\n    display: none;\n  }\n\n  .weekNumber {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.dayCell[data-selected=\"true\"] {\n  --cell-bg: var(--background-800);\n  --cell-text: var(--foreground-50);\n  font-weight: 500;\n}\n\n.dayCell[data-today=\"true\"] {\n  --border: transparent;\n  --foreground: var(--foreground-50);\n  --cell-bg: var(--background-800);\n  color: var(--foreground);\n  border-color: var(--border);\n}\n\n.dayCell[data-disabled=\"true\"] {\n  --cell-bg: var(--background-700);\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.dayCell[data-out-of-range=\"true\"] {\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n}\n\n.dayCell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]) {\n  --cell-bg: var(--background-800);\n}\n\n.dayCell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) {\n  outline: 2px solid var(--foreground-300);\n  outline-offset: 2px;\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "header"
      },
      {
        "name": "dayHeaders"
      },
      {
        "name": "grid"
      },
      {
        "name": "dayCell"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-950)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".calendar"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".calendar"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".calendar"
      },
      {
        "name": "--cell-bg",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".dayCell"
      },
      {
        "name": "--cell-text",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".dayCell"
      },
      {
        "name": "--cell-bg",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".dayCell[data-selected=\"true\"]"
      },
      {
        "name": "--cell-text",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".dayCell[data-selected=\"true\"]"
      },
      {
        "name": "--border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".dayCell[data-today=\"true\"]"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".dayCell[data-today=\"true\"]"
      },
      {
        "name": "--cell-bg",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".dayCell[data-today=\"true\"]"
      },
      {
        "name": "--cell-bg",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".dayCell[data-disabled=\"true\"]"
      },
      {
        "name": "--cell-text",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".dayCell[data-disabled=\"true\"]"
      },
      {
        "name": "--cell-text",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".dayCell[data-out-of-range=\"true\"]"
      },
      {
        "name": "--cell-bg",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".dayCell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"])"
      }
    ]
  },
  "card": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    --background: var(--background-800);\n    --border: var(--background-700);\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring, #0066cc);\n    outline-offset: 2px;\n  }\n\n  .header {\n    --border: var(--background-700);\n\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    --background: color-mix(in srgb, var(--background-900) 50%, transparent);\n    --border: var(--background-700);\n\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "header"
      },
      {
        "name": "body"
      },
      {
        "name": "footer"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".card"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".card"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".header"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--background-900) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".footer"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".footer"
      }
    ]
  },
  "badge": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    --background: var(--background-800);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n\n    @apply px-3 py-0.5;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.default {\n    --background: color-mix(in srgb, var(--background-600) 10%, var(--background-900));\n    --foreground: var(--foreground-200);\n\n    border: var(--border-width-base) solid var(--background-700)\n  }\n\n  .badge.secondary {\n    --background: color-mix(in srgb, var(--background-600) 40%, transparent);\n    --foreground: var(--foreground-300);\n\n    border: var(--border-width-base) solid var(--background-600);\n  }\n\n  .badge.success {\n    --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n    --foreground: var(--success-600);\n  }\n\n  .badge.warning {\n    --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n    --foreground: var(--warning-600);\n  }\n\n  .badge.danger {\n    --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n    --foreground: var(--danger-600);\n  }\n\n  .badge.info {\n    --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n    --foreground: var(--info-600);\n  }\n\n  .badge.sm {\n    @apply px-1.5 py-px;\n    gap: 0.25rem;\n    font-size: var(--text-xs);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill {\n    border-radius: 9999px;\n  }\n\n  .iconWrapper {\n    display: flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .dismissButton {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: 0.25rem;\n    @apply p-1;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismissButton[data-hovered=\"true\"] {\n    background: color-mix(in srgb, var(--background-700) 80%, var(--background-900));\n  }\n\n  .dismissButton[data-pressed=\"true\"] {\n    background: var(--background-700);\n    transform: scale(0.95);\n  }\n\n  .dismissButton[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "iconWrapper"
      },
      {
        "name": "dismissButton"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".badge"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".badge"
      },
      {
        "name": "--border",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".badge"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--background-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--background-600",
          "--background-900"
        ],
        "variant": ".badge.default"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".badge.default"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--background-600) 40%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".badge.secondary"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".badge.secondary"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--success-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--success-600",
          "--background-900"
        ],
        "variant": ".badge.success"
      },
      {
        "name": "--foreground",
        "value": "var(--success-600)",
        "defaultValue": null,
        "referencedVars": [
          "--success-600"
        ],
        "variant": ".badge.success"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--warning-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600",
          "--background-900"
        ],
        "variant": ".badge.warning"
      },
      {
        "name": "--foreground",
        "value": "var(--warning-600)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600"
        ],
        "variant": ".badge.warning"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--danger-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600",
          "--background-900"
        ],
        "variant": ".badge.danger"
      },
      {
        "name": "--foreground",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".badge.danger"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--info-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--info-600",
          "--background-900"
        ],
        "variant": ".badge.info"
      },
      {
        "name": "--foreground",
        "value": "var(--info-600)",
        "defaultValue": null,
        "referencedVars": [
          "--info-600"
        ],
        "variant": ".badge.info"
      }
    ]
  },
  "anchor": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    display: inline;\n  }\n\n  .preview {\n    display: inline;\n  }\n\n  .trigger {\n    --underline-background: var(--background-600);\n\n    display: inline-block;\n    position: relative;\n    color: var(--foreground-200);\n    text-decoration: none;\n    cursor: pointer;\n    transition: color 150ms var(--ease-gentle-ease);\n\n    &:focus-visible {\n      outline: 2px solid var(--color-background-600);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0px;\n    height: 1px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 150ms var(--ease-gentle-ease);\n    pointer-events: none;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "underline"
      },
      {
        "name": "preview"
      }
    ],
    "cssVariables": [
      {
        "name": "--underline-background",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".trigger"
      }
    ]
  },
  "button": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    --background: var(--background-800);\n    --foreground: var(--foreground-200);\n    --background-border: var(--background-600);\n    --focus-visible: var(--accent-400);\n    \n    --hover-background: var(--background-700);\n    --hover-border: var(--background-700);\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    \n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n\n    font-weight: var(--font-weight-medium, 500);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n    \n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    user-select: none;\n    cursor: pointer;\n    white-space: nowrap;\n\n    &:hover:not(:disabled) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:active:not(:disabled) {\n      filter: brightness(1.1);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 2px var(--background-950), 0 0 0 4px var(--focus-visible);\n      outline: none;\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      filter: grayscale(0.5);\n    }\n  }\n\n  .button.primary {\n    --background: var(--accent-500);\n    --foreground: var(--foreground-50);\n    --background-border: var(--accent-600);\n    --hover-background: var(--accent-400);\n    --hover-border: var(--accent-500);\n  }\n\n  .button.secondary {\n    --background: var(--background-900);\n    --foreground: var(--foreground-300);\n    --background-border: var(--background-700);\n  }\n\n  .button.outline {\n    --background: transparent;\n    --background-hover: var(--background-700);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    outline-style: unset !important;\n  }\n\n  .button.danger {\n    --background: color-mix(in srgb, var(--danger-500) 15%, transparent);\n    --foreground: var(--danger-500);\n\n    --background-border: var(--danger-500);\n    --focus-visible: var(--danger-400);\n    --hover-background: color-mix(in srgb, var(--danger-500) 25%, transparent);\n\n  }\n\n  .button.ghost {\n    --background: transparent;\n    --background-border: transparent;\n    --hover-background: var(--background-800);\n  }\n\n  .button.sm {\n    @apply px-3 py-1.5;\n    font-size: var(--text-xs);\n  }\n\n  .button.md {\n    @apply px-5 py-2;\n    font-size: var(--text-sm);\n  }\n\n  .button.lg {\n    @apply px-7 py-1.5;\n    font-size: var(--text-sm);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "icon.left"
      },
      {
        "name": "icon.right"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".button"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".button"
      },
      {
        "name": "--background-border",
        "value": "var(--background-600)",
        "defaultValue": null,
        "referencedVars": [
          "--background-600"
        ],
        "variant": ".button"
      },
      {
        "name": "--focus-visible",
        "value": "var(--accent-400)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-400"
        ],
        "variant": ".button"
      },
      {
        "name": "--hover-background",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".button"
      },
      {
        "name": "--hover-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".button"
      },
      {
        "name": "--background",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".button.primary"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-50)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-50"
        ],
        "variant": ".button.primary"
      },
      {
        "name": "--background-border",
        "value": "var(--accent-600)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-600"
        ],
        "variant": ".button.primary"
      },
      {
        "name": "--hover-background",
        "value": "var(--accent-400)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-400"
        ],
        "variant": ".button.primary"
      },
      {
        "name": "--hover-border",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".button.primary"
      },
      {
        "name": "--background",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".button.secondary"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".button.secondary"
      },
      {
        "name": "--background-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".button.secondary"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".button.outline"
      },
      {
        "name": "--background-hover",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".button.outline"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".button.outline"
      },
      {
        "name": "--border",
        "value": "var(--border-width-base) solid var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--border-width-base",
          "--background-700"
        ],
        "variant": ".button.outline"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--danger-500) 15%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".button.danger"
      },
      {
        "name": "--foreground",
        "value": "var(--danger-500)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".button.danger"
      },
      {
        "name": "--background-border",
        "value": "var(--danger-500)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".button.danger"
      },
      {
        "name": "--focus-visible",
        "value": "var(--danger-400)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-400"
        ],
        "variant": ".button.danger"
      },
      {
        "name": "--hover-background",
        "value": "color-mix(in srgb, var(--danger-500) 25%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-500"
        ],
        "variant": ".button.danger"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".button.ghost"
      },
      {
        "name": "--background-border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".button.ghost"
      },
      {
        "name": "--hover-background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".button.ghost"
      }
    ]
  },
  "banner": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    --background: var(--background-900);\n    --foreground: var(--info-50);\n    --border: var(--info-600);\n\n    width: 100%;\n    display: flex;\n    align-items: flex-start;\n    gap: var(--spacing-4);\n    font-family: inherit;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-2);\n  }\n\n  .iconContainer {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    align-self: flex-start;\n  }\n\n  .icon {\n    @apply mr-4;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .dismiss {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    padding: 0;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    @apply my-0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-medium);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    @apply my-0;\n  }\n}\n\n.banner.note {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-700);\n}\n\n.banner.note .icon {\n  color: var(--background-500);\n}\n\n.banner.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 30%, var(--background-900));\n}\n\n.banner.info .icon {\n  color: var(--info-600);\n}\n\n.banner.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 30%, var(--background-900));\n}\n\n.banner.success .icon {\n  color: var(--success-600);\n}\n\n.banner.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 30%, var(--background-900));\n}\n\n.banner.warning .icon {\n  color: var(--warning-600);\n}\n\n.banner.danger {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 30%, var(--background-900));\n}\n\n.banner.danger .icon {\n  color: var(--danger-600);\n}\n\n.banner.sm {\n  @apply px-3 py-2;\n  font-size: var(--text-xs);\n}\n\n.banner.md {\n  @apply px-4 py-3;\n  font-size: var(--text-xs);\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n  font-size: var(--text-xs);\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "iconContainer"
      },
      {
        "name": "content"
      },
      {
        "name": "dismiss"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".banner"
      },
      {
        "name": "--foreground",
        "value": "var(--info-50)",
        "defaultValue": null,
        "referencedVars": [
          "--info-50"
        ],
        "variant": ".banner"
      },
      {
        "name": "--border",
        "value": "var(--info-600)",
        "defaultValue": null,
        "referencedVars": [
          "--info-600"
        ],
        "variant": ".banner"
      },
      {
        "name": "--background",
        "value": "var(--background-900)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".banner.note"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".banner.note"
      },
      {
        "name": "--border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".banner.note"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--info-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--info-600",
          "--background-900"
        ],
        "variant": ".banner.info"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".banner.info"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--info-600) 30%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--info-600",
          "--background-900"
        ],
        "variant": ".banner.info"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--success-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--success-600",
          "--background-900"
        ],
        "variant": ".banner.success"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".banner.success"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--success-600) 30%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--success-600",
          "--background-900"
        ],
        "variant": ".banner.success"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--warning-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600",
          "--background-900"
        ],
        "variant": ".banner.warning"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".banner.warning"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--warning-600) 30%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--warning-600",
          "--background-900"
        ],
        "variant": ".banner.warning"
      },
      {
        "name": "--background",
        "value": "color-mix(in srgb, var(--danger-600) 10%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600",
          "--background-900"
        ],
        "variant": ".banner.danger"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".banner.danger"
      },
      {
        "name": "--border",
        "value": "color-mix(in srgb, var(--danger-600) 30%, var(--background-900))",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600",
          "--background-900"
        ],
        "variant": ".banner.danger"
      }
    ]
  }
};
