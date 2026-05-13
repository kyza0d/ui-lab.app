// This file is auto-generated. Do not edit.
export const generatedStyles: Record<string, { rawCss: string; styleableParts: Array<{ name: string }>; cssVariables: Array<{ name: string; value: string; defaultValue?: string; referencedVars: string[]; variant?: string | null }> }> = {
  "tooltip": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: contents;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--background);\n    --frame-stroke-color: var(--background-border);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n  }\n\n  .content[data-open=\"true\"] {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .content[data-instant=\"true\"] {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1 whitespace-nowrap;\n    color: var(--foreground);\n  }\n\n  .frame[data-hint=\"true\"] {\n    @apply pr-1;\n  }\n\n  .hint {\n    @apply flex-shrink-0;\n  }\n}\n",
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
        "name": "frame"
      },
      {
        "name": "hint"
      }
    ],
    "cssVariables": [
      {
        "name": "--frame-fill",
        "value": "var(--background)",
        "defaultValue": null,
        "referencedVars": [
          "--background"
        ],
        "variant": ".content"
      },
      {
        "name": "--frame-stroke-color",
        "value": "var(--background-border)",
        "defaultValue": null,
        "referencedVars": [
          "--background-border"
        ],
        "variant": ".content"
      }
    ]
  },
  "toast": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply flex w-full max-w-[28rem] items-start gap-3 px-4 py-2.5 select-none;\n    background: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    box-shadow: var(--background-shadow);\n    font-family: inherit;\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-normal, 1.5);\n    touch-action: pan-y;\n  }\n\n  .icon-wrap {\n    @apply mr-4 mt-2 h-5 w-5 shrink-0;\n  }\n\n  .icon {\n    @apply h-5 w-5;\n    color: var(--foreground);\n  }\n\n  .content {\n    @apply min-w-0 flex-1;\n  }\n\n  .title {\n    @apply m-0;\n    --foreground: inherit;\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n    color: var(--foreground);\n  }\n\n  .description {\n    @apply mt-1 mb-0;\n    --foreground: inherit;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-normal, 1.5);\n    color: var(--foreground);\n  }\n\n  .close {\n    @apply flex shrink-0 items-center justify-center p-2 cursor-pointer;\n    --foreground: currentColor;\n    background-color: var(--background, transparent);\n    border: none;\n    border-radius: var(--radius-sm, 0.375rem);\n    color: var(--foreground);\n    opacity: 0.6;\n    transition:\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-settle-in, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-settle-in, ease-out));\n\n    &[data-focus-visible=\"true\"] {\n      box-shadow: 0 0 0 var(--border-width-base, 1px) var(--focus-visible);\n      outline: none;\n    }\n\n    &[data-hovered=\"true\"] {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n      opacity: 1;\n    }\n  }\n\n  .close-icon {\n    @apply h-4 w-4;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "iconWrap"
      },
      {
        "name": "icon"
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
        "name": "close"
      },
      {
        "name": "closeIcon"
      }
    ],
    "cssVariables": [
      {
        "name": "--foreground",
        "value": "inherit",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".title"
      },
      {
        "name": "--foreground",
        "value": "inherit",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".description"
      },
      {
        "name": "--foreground",
        "value": "currentColor",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".close"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".close[data-hovered=\"true\"]"
      }
    ]
  },
  "tabs": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    @apply flex w-full flex-col;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .list {\n    @apply relative flex w-full flex-row items-center gap-3 py-1;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: fit-content;\n      min-width: 0;\n      height: auto;\n      align-self: flex-start;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0 0 4px;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--border);\n      align-items: stretch;\n      padding: 0 0 0 4px;\n    }\n  }\n\n  .indicator {\n    @apply absolute;\n    background-color: var(--background);\n    box-sizing: border-box;\n    border-radius: var(--radius-sm);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n\n  .indicator-fallback {\n    z-index: -1;\n  }\n\n  .indicator-underline {\n    border-radius: 0;\n  }\n\n  .trigger {\n    @apply relative z-[1] flex shrink-0 items-center justify-center gap-2 px-2 py-1.5 cursor-pointer select-none;\n    height: auto;\n    background-color: var(--background);\n    border: none;\n    color: var(--foreground);\n    outline: none;\n    box-shadow: none;\n    transition:\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n\n    &[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-selected=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-selected=\"true\"] {\n      cursor: pointer;\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      .list[data-variant=\"underline\"] & {\n        border-bottom-color: var(--underline-border);\n      }\n\n      .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--underline-border);\n      }\n    }\n\n    &:focus,\n    &:focus-visible {\n      outline: none !important;\n      box-shadow: none !important;\n    }\n\n    &[data-disabled=\"true\"] {\n      --disabled-opacity: 0.5;\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .list[data-variant=\"underline\"] & {\n      background-color: var(--background);\n      background-clip: padding-box;\n      border-radius: var(--radius-sm);\n      border-bottom: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"] &:focus,\n    .list[data-variant=\"underline\"] &:focus-visible {\n      outline: none !important;\n      box-shadow: none !important;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      border-left-color: var(--underline-border);\n      border-bottom: none;\n    }\n  }\n\n  .icon {\n    @apply flex h-4 w-4 shrink-0 items-center justify-center;\n  }\n\n  .content {\n    @apply w-full p-0 outline-none;\n    flex: 1;\n    padding-top: 1rem;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-visible);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .list {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0 0 4px;\n      }\n    }\n\n    .trigger {\n      @apply px-1 py-1;\n      .list[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "indicator"
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".trigger[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-selected=\"true\"])"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".trigger[data-disabled=\"true\"]"
      }
    ]
  },
  "table": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply w-full;\n  }\n\n  .container {\n    @apply w-full overflow-x-auto rounded-sm;\n    border: var(--border-width-base) solid var(--border, var(--background-border));\n    background-color: var(--container-background, var(--background));\n  }\n\n  .container {\n    display: block;\n    max-width: none;\n  }\n\n  .table {\n    @apply w-full;\n    display: table;\n    border-collapse: collapse;\n    min-width: max-content;\n    background-color: var(--background, transparent);\n    color: var(--foreground);\n    font-size: var(--text-xs);\n  }\n\n  .header {\n    display: table-header-group;\n    background-color: var(--background);\n  }\n\n  .body {\n    display: table-row-group;\n    background-color: var(--background);\n  }\n\n  .headerRow {\n    display: table-row;\n    background-color: var(--background);\n  }\n\n  .headerCell {\n    @apply px-4 py-3 text-left;\n    display: table-cell;\n    background-color: var(--background);\n    color: var(--foreground);\n    font-weight: var(--header-font-weight, var(--font-weight-semibold));\n    white-space: nowrap;\n    border-bottom: var(--border-width-base) solid var(--border, var(--background-border));\n  }\n\n  .headerCell:first-child {\n    border-top-left-radius: var(--radius-xs);\n  }\n\n  .headerCell:last-child {\n    border-top-right-radius: var(--radius-xs);\n  }\n\n  .row {\n    display: table-row;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .row[data-interactive=\"true\"] {\n    @apply cursor-pointer;\n  }\n\n  .row[data-interactive=\"true\"]:hover .cell {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .row[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: var(--disabled-opacity, 0.5);\n  }\n\n  .row:focus-visible {\n    outline: 2px solid var(--focus-ring);\n    outline-offset: -2px;\n  }\n\n  .interactive {\n    @apply cursor-pointer;\n  }\n\n  .cell {\n    @apply px-4 py-3 align-middle;\n    display: table-cell;\n    background-color: var(--background, transparent);\n    color: var(--foreground);\n    border-bottom: var(--border-width-base) solid var(--border, var(--background-border));\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .row:last-child .cell {\n    border-bottom: none;\n  }\n\n  .row:last-child .cell:first-child {\n    border-bottom-left-radius: var(--radius-xs);\n  }\n\n  .row:last-child .cell:last-child {\n    border-bottom-right-radius: var(--radius-xs);\n  }\n\n  .emptyRow {\n    border-bottom: none;\n  }\n\n  .emptyRow {\n    display: table-row;\n  }\n\n  .emptyState {\n    @apply px-4 py-8 text-center;\n    background-color: var(--background);\n    color: var(--foreground);\n  }\n\n  .emptyState {\n    display: table-cell;\n  }\n\n  .filterBar {\n    @apply mb-4 rounded-xs border p-4;\n    border: var(--border-width-base) solid var(--background-border);\n    background-color: var(--background);\n  }\n\n  .filterBar {\n    display: block;\n  }\n\n  .filterGrid {\n    @apply grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;\n    background-color: var(--background);\n  }\n\n  .filterGrid {\n    display: grid;\n  }\n\n  .filterField {\n    @apply min-w-0;\n  }\n\n  .filterLabel {\n    @apply mb-2 block;\n    color: var(--foreground);\n    font-size: var(--filter-label-font-size, var(--text-xs));\n    font-weight: var(--filter-label-font-weight, var(--font-weight-medium));\n  }\n\n  .filterLabel {\n    display: block;\n  }\n\n  .filterInput {\n    @apply w-full;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "container"
      },
      {
        "name": "filterBar"
      },
      {
        "name": "filterGrid"
      },
      {
        "name": "filterLabel"
      },
      {
        "name": "filterInput"
      },
      {
        "name": "table"
      },
      {
        "name": "header"
      },
      {
        "name": "body"
      },
      {
        "name": "headerRow"
      },
      {
        "name": "headerCell"
      },
      {
        "name": "row"
      },
      {
        "name": "cell"
      },
      {
        "name": "emptyRow"
      },
      {
        "name": "emptyState"
      }
    ],
    "cssVariables": [
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".row[data-interactive=\"true\"]:hover .cell"
      }
    ]
  },
  "textarea": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --padding-inline: 0.75rem;\n    --padding-block: 0.5rem;\n\n    @apply block w-full px-3 py-2;\n    box-sizing: border-box;\n    resize: none;\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    background-color: var(--background);\n    color: var(--foreground);\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    outline: none;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &:hover:not([data-disabled=\"true\"]),\n    &[data-hovered=\"true\"]:not([data-disabled=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-resize-axis=\"x\"],\n    &[data-resize-axis=\"both\"] {\n      padding-inline-end: calc(var(--padding-inline) + 1rem);\n    }\n\n    &[data-resize-axis=\"y\"],\n    &[data-resize-axis=\"both\"] {\n      padding-block-end: calc(var(--padding-block) + 1rem);\n    }\n\n    &[data-scroll=\"true\"] {\n      border: none;\n      border-radius: 0;\n      background: transparent;\n      box-shadow: none;\n      overflow: hidden;\n\n      &[data-disabled=\"true\"] {\n        opacity: 1;\n      }\n    }\n  }\n\n  .size-sm {\n    min-height: 5rem;\n    --padding-inline: 0.5rem;\n    --padding-block: 0.25rem;\n    font-size: var(--text-sm);\n    @apply px-2 py-1;\n  }\n\n  .size-md {\n    min-height: 6rem;\n    --padding-inline: 0.75rem;\n    --padding-block: 0.5rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .size-lg {\n    min-height: 8rem;\n    --padding-inline: 1rem;\n    --padding-block: 0.75rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    min-width: 0;\n    @apply w-full;\n  }\n\n  .scope {\n    @apply relative flex w-full;\n    overflow: visible;\n  }\n\n  .surface {\n    min-width: 0;\n    @apply relative w-full;\n  }\n\n  .scroll-wrapper {\n    @apply w-full overflow-hidden;\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    background-color: var(--background);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &:hover:not([data-disabled=\"true\"]),\n    &[data-hovered=\"true\"]:not([data-disabled=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-disabled=\"true\"] {\n      opacity: var(--disabled-opacity);\n    }\n  }\n\n  .resize-handle {\n    position: absolute;\n    z-index: 1;\n    touch-action: none;\n    user-select: none;\n\n    &::before,\n    &::after {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--background);\n      transition:\n        background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    }\n\n    &:hover::before,\n    &:hover::after {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n  }\n\n  .resize-handle-both {\n    right: 3px;\n    bottom: 3px;\n    width: 1.5rem;\n    height: 1.5rem;\n    cursor: nwse-resize;\n\n    &::before {\n      right: 0.15rem;\n      bottom: 0.35rem;\n      width: 0.5rem;\n      height: 0.125rem;\n      transform: rotate(-45deg);\n      transform-origin: center;\n    }\n\n    &::after {\n      right: 0.2rem;\n      bottom: 0.6rem;\n      width: 1rem;\n      height: 0.125rem;\n      transform: rotate(-45deg);\n      transform-origin: center;\n    }\n  }\n\n  .resize-handle-x {\n    top: 50%;\n    right: 0;\n    width: 0.75rem;\n    height: 2rem;\n    cursor: ew-resize;\n    transform: translateY(-50%);\n\n    &::before {\n      top: 50%;\n      left: 50%;\n      width: 0.125rem;\n      height: 1.5rem;\n      transform: translate(-50%, -50%);\n    }\n\n    &::after {\n      display: none;\n    }\n  }\n\n  .resize-handle-y {\n    left: 50%;\n    bottom: 0;\n    width: 2rem;\n    height: 0.75rem;\n    cursor: ns-resize;\n    transform: translateX(-50%);\n\n    &::before {\n      top: 50%;\n      left: 50%;\n      width: 1.5rem;\n      height: 0.125rem;\n      transform: translate(-50%, -50%);\n    }\n\n    &::after {\n      display: none;\n    }\n  }\n\n  .character-count {\n    @apply mt-1;\n    color: var(--foreground);\n    font-size: var(--text-sm);\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .character-count[data-over-limit=\"true\"] {\n    color: var(--foreground-error);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "container"
      },
      {
        "name": "surface"
      },
      {
        "name": "scrollWrapper"
      },
      {
        "name": "resizeHandle.both"
      },
      {
        "name": "resizeHandle.x"
      },
      {
        "name": "resizeHandle.y"
      },
      {
        "name": "characterCount"
      }
    ],
    "cssVariables": [
      {
        "name": "--padding-inline",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea"
      },
      {
        "name": "--padding-block",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".textarea:hover:not([data-disabled=\"true\"]),\n    .textarea[data-hovered=\"true\"]:not([data-disabled=\"true\"])"
      },
      {
        "name": "--padding-inline",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-sm"
      },
      {
        "name": "--padding-block",
        "value": "0.25rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-sm"
      },
      {
        "name": "--padding-inline",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-md"
      },
      {
        "name": "--padding-block",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-md"
      },
      {
        "name": "--padding-inline",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-lg"
      },
      {
        "name": "--padding-block",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".size-lg"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".scroll-wrapper:hover:not([data-disabled=\"true\"]),\n    .scroll-wrapper[data-hovered=\"true\"]:not([data-disabled=\"true\"])"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".resize-handle:hover::before,\n    .resize-handle:hover::after"
      }
    ]
  },
  "switch": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --radius: 9999px;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    --width: 2.75rem;\n    --height: 1.5rem;\n    --thumb-size: 1rem;\n    --thumb-offset: 0.25rem;\n\n    --disabled-opacity: 0.6;\n\n    @apply relative inline-flex cursor-pointer items-center;\n    user-select: none;\n    border-radius: var(--radius);\n    width: var(--width);\n    height: var(--height);\n  }\n\n  .switch-track {\n    @apply absolute inset-0;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--background-border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    @apply absolute top-0 bottom-0 my-auto;\n    left: var(--thumb-offset);\n    width: var(--thumb-size);\n    height: var(--thumb-size);\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--foreground);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-thumb {\n    left: calc(var(--width) - var(--thumb-size) - var(--thumb-offset));\n  }\n\n  @media (hover: hover) {\n    .switch[data-hovered=\"true\"]:not([data-disabled]) .switch-track {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n  }\n\n  .switch[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n\n  .switch-sm {\n    --width: 1.75rem;\n    --height: 1rem;\n    --thumb-size: 0.625rem;\n    --thumb-offset: 0.1875rem;\n  }\n}\n",
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
        "name": "--radius",
        "value": "9999px",
        "defaultValue": null,
        "referencedVars": [],
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
        "name": "--width",
        "value": "2.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--height",
        "value": "1.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--thumb-size",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--thumb-offset",
        "value": "0.25rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".switch[data-hovered=\"true\"]:not([data-disabled]) .switch-track"
      },
      {
        "name": "--width",
        "value": "1.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch-sm"
      },
      {
        "name": "--height",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch-sm"
      },
      {
        "name": "--thumb-size",
        "value": "0.625rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch-sm"
      },
      {
        "name": "--thumb-offset",
        "value": "0.1875rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".switch-sm"
      }
    ]
  },
  "slider": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    --disabled-opacity: 0.6;\n    --slider-track-size: 0.375rem;\n    --slider-thumb-size: 1rem;\n\n    @apply relative flex w-full items-center;\n    min-inline-size: var(--slider-min-inline-size, 12rem);\n    min-height: var(--slider-hit-size, 2rem);\n    touch-action: none;\n    user-select: none;\n  }\n\n  .track {\n    @apply relative flex grow items-center;\n    flex-grow: 1;\n    height: var(--slider-track-size);\n    overflow: visible;\n    border-radius: var(--slider-track-radius, var(--radius-xs, 0.25rem));\n    border: var(--slider-track-border, 0);\n    background: var(--slider-track-background, var(--background));\n  }\n\n  .range {\n    @apply absolute;\n    display: var(--slider-range-display, block);\n    pointer-events: none;\n    border-radius: var(--slider-track-radius, var(--radius-xs, 0.25rem));\n    background: var(--slider-range-background, var(--background));\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .thumb {\n    @apply absolute block;\n    top: 50%;\n    width: var(--slider-thumb-size);\n    height: var(--slider-thumb-size);\n    transform: var(--slider-thumb-transform, translate(-50%, -50%));\n    border-radius: var(--radius-full, 9999px);\n    outline: none;\n    background: var(--slider-thumb-background, var(--background));\n    border: var(--slider-thumb-border, 1px solid var(--background-border));\n    box-shadow: var(--slider-thumb-shadow, none);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      box-shadow var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .slider[data-orientation=\"horizontal\"] .range {\n    top: 0;\n    height: 100%;\n  }\n\n  .slider[data-orientation=\"vertical\"] {\n    justify-content: center;\n    min-inline-size: auto;\n    width: fit-content;\n  }\n\n  .slider[data-orientation=\"vertical\"] .track {\n    width: var(--slider-track-size);\n    height: 100%;\n  }\n\n  .slider[data-orientation=\"vertical\"] .range {\n    left: 0;\n    width: 100%;\n  }\n\n  .slider[data-orientation=\"vertical\"] .thumb {\n    left: 50%;\n    top: auto;\n    --slider-thumb-transform: translate(-50%, 50%);\n  }\n\n  .slider[data-disabled=\"true\"] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .slider[data-disabled=\"true\"] .range {\n    background: var(--slider-range-background-disabled, var(--background-disabled, var(--slider-range-background, var(--background))));\n  }\n\n  .thumb[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    background: var(--slider-thumb-background-disabled, var(--background-disabled, var(--slider-thumb-background, var(--background))));\n  }\n\n  .thumb[data-pressed=\"true\"] {\n    transform: var(--slider-thumb-transform, translate(-50%, -50%)) scale(var(--slider-thumb-scale-active, 1.08));\n  }\n\n  .slider[data-orientation=\"vertical\"] .thumb[data-pressed=\"true\"] {\n    transform: var(--slider-thumb-transform, translate(-50%, 50%)) scale(var(--slider-thumb-scale-active, 1.08));\n  }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".slider"
      },
      {
        "name": "--slider-track-size",
        "value": "0.375rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".slider"
      },
      {
        "name": "--slider-thumb-size",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".slider"
      },
      {
        "name": "--slider-thumb-transform",
        "value": "translate(-50%, 50%)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".slider[data-orientation=\"vertical\"] .thumb"
      }
    ]
  },
  "select": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .scope {\n    @apply flex w-full;\n    position: relative;\n    overflow: visible;\n  }\n\n  .select {\n    --disabled-opacity: 0.5;\n    --trigger-padding-inline: calc(var(--spacing) * 1.60);\n    --trigger-padding-block: calc(var(--spacing) * 1.30);\n    --background-radius: var(--radius-sm, 0.375rem);\n    --background-inner-radius: calc(var(--background-radius) - var(--border-width-base, 1px));\n    font-size: var(--foreground-size);\n    height: fit-content;\n    align-self: center;\n\n    @apply p-0 gap-0 w-full flex-row items-center;\n    position: relative;\n    overflow: visible;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--background-radius);\n\n    @apply select-none cursor-pointer;\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n    }\n\n    &[data-pressed=\"true\"]:not([data-disabled]) {\n      background-color: var(--background-pressed, var(--background-hover, var(--background)));\n    }\n\n    &[data-open=\"true\"] {\n      background-color: var(--background-hover);\n    }\n\n    &:global(.group) {\n      height: 100%;\n      align-self: stretch;\n    }\n  }\n\n  .trigger {\n    @apply flex items-stretch flex-1 gap-0 w-full h-full min-h-0;\n\n    background: transparent;\n\n    @apply border-none cursor-pointer select-none;\n\n    @media (hover: hover) {\n      &:not([data-disabled]):hover .icon-section,\n      &:not([data-disabled]):hover .value-section:not(:empty) {\n        --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n        background-color: var(--background-hover);\n      }\n    }\n\n    &[data-focus-visible=\"true\"] {\n      @apply outline-none;\n    }\n  }\n\n  .trigger-compact {\n    @apply flex-none w-auto;\n  }\n\n  .select button.trigger { @apply p-0; }\n\n  .value-section {\n    @apply flex items-center flex-1 min-w-0 gap-0.5;\n\n    padding: var(--trigger-padding-block) var(--trigger-padding-inline);\n    border-radius: var(--background-inner-radius) 0 0 var(--background-inner-radius);\n    font-size: var(--foreground-size);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &:only-child {\n      border-radius: var(--background-inner-radius);\n      justify-content: center;\n    }\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    @apply flex items-center justify-center shrink-0;\n    padding: var(--trigger-padding-block) var(--trigger-padding-inline);\n    border-radius: 0 var(--background-inner-radius) var(--background-inner-radius) 0;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .icon {\n    @apply flex items-center justify-center w-4 h-4 opacity-70;\n  }\n\n  .select .trigger[data-open=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    @apply flex items-center flex-1 min-w-0 gap-2 bg-transparent border-none;\n    cursor: inherit;\n  }\n\n  .value-icon {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n    color: var(--foreground);\n  }\n\n  .value-text {\n    font-weight: var(--font-weight-medium);\n    @apply min-w-0 overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .content,\n  .sub-content {\n    --item-padding-inline: calc(var(--spacing) * 1.5);\n    --item-padding-block: var(--spacing);\n    --background-radius: var(--radius-sm, 0.375rem);\n    --background-inner-radius: calc(var(--background-radius) - var(--border-width-base, 1px));\n    overflow: hidden;\n    background-color: var(--background);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--background-radius);\n  }\n\n  .content-root,\n  .sub-content-root {\n    position: absolute;\n  }\n\n  .content {\n    &[data-state=\"open\"][data-placement=\"bottom\"] { animation: slide-in-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"open\"][data-placement=\"top\"] { animation: slide-in-from-bottom 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"bottom\"] { animation: slide-out-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"top\"] { animation: slide-out-from-bottom 0.15s var(--ease-snappy-pop); }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item,\n  .sub-trigger {\n    @apply flex items-center gap-2 outline-none cursor-default select-none;\n    background-color: var(--background);\n    border-radius: var(--background-inner-radius);\n    font-size: var(--foreground-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n  }\n\n  .item {\n    --item-padding-inline: var(--trigger-padding-inline);\n    --item-padding-block: calc(var(--trigger-padding-block) * 1.15);\n\n    padding: var(--item-padding-block) var(--item-padding-inline);\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground);\n    }\n\n    &[data-highlighted=\"true\"] {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n  }\n\n  .item-content {\n    @apply flex flex-col flex-1 min-w-0;\n  }\n\n  .item-text {\n    @apply min-w-0 overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    font-size: var(--foreground-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-muted);\n    @apply min-w-0 whitespace-normal break-words;\n  }\n\n  .item-icon, .item-indicator {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n  }\n\n  .item-icon { color: var(--icon-foreground); }\n  .item-indicator { color: var(--indicator-foreground); margin-left: auto; }\n\n  .item-with-description { @apply items-start py-2; }\n  .item-icon-with-description, .item-indicator-with-description { @apply mt-0.5; }\n\n  .separator {\n    @apply my-1 -mx-1 h-px;\n    background-color: var(--background-border);\n  }\n\n  .placeholder {\n    color: var(--foreground-muted);\n  }\n\n  .icon-prefix {\n    @apply inline-flex items-center shrink-0;\n  }\n\n  .select[data-mode=\"multiple\"] .item { gap: 0.5rem; }\n\n  .search-trigger {\n    @apply flex items-stretch relative bg-transparent cursor-text overflow-hidden;\n    border-radius: var(--background-inner-radius);\n    transition: box-shadow 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop);\n\n    &:focus-within {\n      @apply outline-none;\n      z-index: 1;\n    }\n  }\n\n  .search-trigger :global(.focus-indicator) {\n    display: none;\n  }\n\n  .search-value-section {\n    @apply p-0;\n    border-radius: var(--background-inner-radius) 0 0 var(--background-inner-radius);\n  }\n\n  .input {\n    padding-right: calc(var(--trigger-padding-inline) * 2 + 1rem);\n    @apply border-none rounded-none shadow-none bg-transparent;\n\n    &[data-focused], &[data-focus-visible] {\n      @apply border-none shadow-none;\n    }\n  }\n\n  .search-content-input {\n    @apply border-none rounded-none bg-transparent;\n  }\n\n  .search-icon-section {\n    @apply absolute right-0 top-0 bottom-0 flex items-center justify-center bg-transparent pointer-events-none;\n    padding-inline: var(--trigger-padding-inline);\n  }\n\n\n  .search-wrapper {\n    @apply overflow-hidden;\n    border-bottom: var(--border-width-base, 1px) solid var(--background-border);\n  }\n\n  .empty-state {\n    @apply px-3 py-2;\n    color: var(--foreground-muted);\n  }\n\n  .content[data-placement=\"top\"] .search-wrapper {\n    border-radius: 0;\n    border-bottom: none;\n    border-top: var(--border-width-base, 1px) solid var(--background-border);\n  }\n\n  .sub-trigger {\n    padding: var(--trigger-padding-block) var(--trigger-padding-inline);\n\n    &[data-highlighted=\"true\"],\n    &[data-open=\"true\"]:not([data-highlighted=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply shrink-0 ml-auto w-4 h-4 opacity-60;\n  }\n\n  .sub-content {\n    min-width: 160px;\n    max-width: 320px;\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-in-from-bottom { from { opacity: 0; translate: 0 2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-from-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n  @keyframes slide-out-from-bottom { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 2px; } }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "valueSection"
      },
      {
        "name": "icon.left"
      },
      {
        "name": "icon.right"
      },
      {
        "name": "iconSection"
      },
      {
        "name": "input"
      },
      {
        "name": "icon"
      },
      {
        "name": "overlay"
      },
      {
        "name": "list"
      },
      {
        "name": "listPaddingWrapper"
      },
      {
        "name": "title"
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
        "name": "searchWrapper"
      },
      {
        "name": "searchInput"
      },
      {
        "name": "emptyState"
      }
    ],
    "cssVariables": [
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".select"
      },
      {
        "name": "--trigger-padding-inline",
        "value": "calc(var(--spacing) * 1.60)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".select"
      },
      {
        "name": "--trigger-padding-block",
        "value": "calc(var(--spacing) * 1.30)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".select"
      },
      {
        "name": "--background-radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".select"
      },
      {
        "name": "--background-inner-radius",
        "value": "calc(var(--background-radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--background-radius",
          "--border-width-base"
        ],
        "variant": ".select"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": "&:not([data-disabled]):hover .icon-section,\n      &:not([data-disabled]):hover .value-section:not(:empty)"
      },
      {
        "name": "--item-padding-inline",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--item-padding-block",
        "value": "var(--spacing)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--background-radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--background-inner-radius",
        "value": "calc(var(--background-radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--background-radius",
          "--border-width-base"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--item-padding-inline",
        "value": "var(--trigger-padding-inline)",
        "defaultValue": null,
        "referencedVars": [
          "--trigger-padding-inline"
        ],
        "variant": ".item"
      },
      {
        "name": "--item-padding-block",
        "value": "calc(var(--trigger-padding-block) * 1.15)",
        "defaultValue": null,
        "referencedVars": [
          "--trigger-padding-block"
        ],
        "variant": ".item"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".item[data-highlighted=\"true\"]"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".sub-trigger[data-highlighted=\"true\"],\n    .sub-trigger[data-open=\"true\"]:not([data-highlighted=\"true\"])"
      }
    ]
  },
  "scroll": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply relative;\n    min-height: 0;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    @apply h-full w-full;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical[data-inline=\"true\"] .content {\n    padding-right: 16px;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal[data-inline=\"true\"] .content {\n    padding-bottom: 16px;\n  }\n\n  .vertical .content::-webkit-scrollbar,\n  .horizontal .content::-webkit-scrollbar { display: none; }\n\n  .track {\n    @apply absolute;\n    z-index: 10;\n    background-color: var(--track-background);\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms));\n    transition-timing-function: var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs, 0.25rem) * 0.80);\n    background-color: var(--thumb-background);\n    transition-property: background-color, width, height;\n    transition-duration: var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms));\n    transition-timing-function: var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .thumb:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--thumb-background-hover);\n  }\n\n  .root[data-pressed] .thumb {\n    background-color: var(--thumb-background-pressed);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms));\n    transition-timing-function: var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .vertical .thumb:hover,\n  .vertical[data-pressed] .thumb {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms));\n    transition-timing-function: var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .horizontal .thumb:hover,\n  .horizontal[data-pressed] .thumb {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
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
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".thumb:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".vertical .thumb:hover,\n  .vertical[data-pressed] .thumb"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".horizontal .thumb:hover,\n  .horizontal[data-pressed] .thumb"
      }
    ]
  },
  "radio": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-items {\n    @apply flex flex-col gap-3;\n  }\n\n  .radio-item {\n    @apply flex items-start gap-3 cursor-pointer select-none;\n    position: relative;\n    overflow: visible;\n  }\n\n  .radio-surface {\n    @apply inline-flex shrink-0;\n    border-radius: 9999px;\n  }\n\n  .radio-input {\n    @apply absolute inset-0 h-full w-full cursor-pointer opacity-0;\n  }\n\n  .radio {\n    --disabled-opacity: 0.6;\n    @apply relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center;\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: 9999px;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    background-color: var(--background);\n    color: var(--foreground);\n\n    &[data-focus-visible=\"true\"] {\n      outline: none;\n    }\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--background);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop), background-color 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-selected=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled=\"true\"]):hover .radio {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled=\"true\"] .radio {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .radio-label {\n    @apply cursor-pointer;\n    color: var(--foreground);\n    font-size: inherit;\n    font-weight: var(--font-weight-medium, 500);\n    line-height: inherit;\n    transition: color 200ms var(--ease-snappy-pop);\n    user-select: none;\n\n    &[data-disabled=\"true\"] {\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n    }\n  }\n\n  .radio-description {\n    color: var(--foreground);\n    font-size: var(--text-sm, 0.875rem);\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text {\n    color: var(--foreground);\n    font-size: var(--text-sm, 0.875rem);\n    margin-top: 0.5rem;\n    margin-left: 2rem;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .radio.sm {\n    @apply h-4 w-4;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    @apply h-5 w-5;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.5rem;\n    height: 0.5rem;\n  }\n\n  .radio.lg {\n    @apply h-6 w-6;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "item"
      },
      {
        "name": "input"
      },
      {
        "name": "dot"
      },
      {
        "name": "label"
      },
      {
        "name": "description"
      },
      {
        "name": "helperText"
      },
      {
        "name": "group"
      }
    ],
    "cssVariables": [
      {
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".radio"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".radio-item:not([data-disabled=\"true\"]):hover .radio"
      }
    ]
  },
  "progress": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .bar {\n    @apply relative w-full overflow-hidden;\n    border-radius: var(--radius-full, 9999px);\n    background-color: var(--background);\n  }\n\n  .bar { height: 0.5rem; }\n\n  .fill {\n    @apply h-full;\n    border-radius: var(--radius-full, 9999px);\n    background-color: var(--background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill[data-animated=\"true\"] {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill[data-indeterminate=\"true\"] {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    @apply w-full;\n  }\n\n  .wrapper[data-has-label=\"true\"] {\n    @apply space-y-1;\n  }\n\n  .label-row {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n}\n",
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
    "cssVariables": []
  },
  "popover": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    @apply inline-block;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--background);\n    --frame-stroke-color: var(--border);\n    --frame-radius: 8px;\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n    pointer-events: none;\n    min-width: 200px;\n    max-width: 400px;\n    padding: 0.75rem;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 p-2.5;\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "content"
      },
      {
        "name": "trigger"
      },
      {
        "name": "frame"
      }
    ],
    "cssVariables": [
      {
        "name": "--frame-fill",
        "value": "var(--background)",
        "defaultValue": null,
        "referencedVars": [
          "--background"
        ],
        "variant": ".content"
      },
      {
        "name": "--frame-stroke-color",
        "value": "var(--border)",
        "defaultValue": null,
        "referencedVars": [
          "--border"
        ],
        "variant": ".content"
      },
      {
        "name": "--frame-radius",
        "value": "8px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".content"
      }
    ]
  },
  "path": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .path {\n    @apply block;\n  }\n\n  .list {\n    @apply m-0 flex flex-wrap items-center gap-2 p-0;\n    list-style: none;\n  }\n\n  .list[data-separator=\"custom\"] .item:not(:last-child)::after {\n    content: none;\n  }\n\n  .item {\n    @apply m-0 flex items-center gap-2 p-0;\n  }\n\n  .item:not(:last-child)::after {\n    content: \"/\";\n    margin-inline-start: 0.5rem;\n    color: var(--foreground);\n    pointer-events: none;\n    user-select: none;\n  }\n\n  .separator {\n    @apply m-0 flex items-center p-0;\n    list-style: none;\n    color: var(--foreground);\n    pointer-events: none;\n    user-select: none;\n  }\n\n  .link {\n    @apply relative cursor-pointer px-2 py-1;\n    border: 0;\n    background-color: var(--background);\n    color: var(--foreground);\n    font-size: var(--text-sm, 0.875rem);\n    font-weight: var(--font-weight-medium, 500);\n    line-height: var(--leading-normal, 1.5);\n    text-decoration: none;\n    transition:\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    outline: none;\n  }\n\n  button.link {\n    font: inherit;\n  }\n\n  .link:focus,\n  .link:focus-visible {\n    outline: none;\n  }\n\n  .link[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-selected=\"true\"]) {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .link[data-selected=\"true\"] {\n    cursor: default;\n  }\n\n  .link[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: var(--disabled-opacity);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "link"
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".link[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-selected=\"true\"])"
      }
    ]
  },
  "panel": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    @apply flex h-full w-full min-h-0 min-w-0 flex-row;\n    background: inherit;\n  }\n\n  .panel[data-stacked=\"true\"] { flex-direction: column; }\n\n  .header,\n  .footer {\n    @apply shrink-0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    @apply flex min-h-0 min-w-0;\n    flex: 1;\n    overflow: auto;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    @apply shrink-0 overflow-hidden;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--panel-border-color);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--panel-border-color);\n  }\n\n  /* Toggle */\n  .toggle {\n    @apply flex items-center;\n  }\n\n  /* Group */\n  .group {\n    @apply flex w-full h-full;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] { flex-direction: column; }\n\n  /* Resize handle */\n  .resize {\n    @apply relative shrink-0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--panel-divider-color, #374151);\n    transform: translateX(-50%);\n    transition:\n      width var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      height var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before,\n  .resize[data-resizing=\"true\"]::before {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"]:hover::before,\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone,\n  .spacing-none { gap: 0; }\n\n  .spacingSm,\n  .spacing-sm { gap: var(--spacing-sm, 0.5rem); }\n\n  .spacingMd,\n  .spacing-md { gap: var(--spacing-md, 1rem); }\n\n  .spacingLg,\n  .spacing-lg { gap: var(--spacing-lg, 1.5rem); }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked { flex-direction: column; }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".resize:hover::before,\n  .resize[data-resizing=\"true\"]::before"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".resize[data-direction=\"vertical\"]:hover::before,\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before"
      }
    ]
  },
  "page": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    --padding: var(--page-padding-md, 1rem);\n\n    @apply flex flex-col w-full relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    @apply items-center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .padding-none { --padding: 0; padding: 0; }\n\n  .padding-sm { --padding: var(--page-padding-sm, 0.5rem); padding: var(--padding); }\n\n  .padding-md { --padding: var(--page-padding-md, 1rem); padding: var(--padding); }\n\n  .padding-lg { --padding: var(--page-padding-lg, 1.5rem); padding: var(--padding); }\n\n  .padding-xl { --padding: var(--page-padding-xl, 2rem); padding: var(--padding); }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--padding",
        "value": "var(--page-padding-md, 1rem)",
        "defaultValue": "1rem",
        "referencedVars": [
          "--page-padding-md"
        ],
        "variant": ".page"
      },
      {
        "name": "--padding",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".padding-none"
      },
      {
        "name": "--padding",
        "value": "var(--page-padding-sm, 0.5rem)",
        "defaultValue": "0.5rem",
        "referencedVars": [
          "--page-padding-sm"
        ],
        "variant": ".padding-sm"
      },
      {
        "name": "--padding",
        "value": "var(--page-padding-md, 1rem)",
        "defaultValue": "1rem",
        "referencedVars": [
          "--page-padding-md"
        ],
        "variant": ".padding-md"
      },
      {
        "name": "--padding",
        "value": "var(--page-padding-lg, 1.5rem)",
        "defaultValue": "1.5rem",
        "referencedVars": [
          "--page-padding-lg"
        ],
        "variant": ".padding-lg"
      },
      {
        "name": "--padding",
        "value": "var(--page-padding-xl, 2rem)",
        "defaultValue": "2rem",
        "referencedVars": [
          "--page-padding-xl"
        ],
        "variant": ".padding-xl"
      }
    ]
  },
  "modal": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .backdrop {\n    @apply absolute inset-0 cursor-pointer;\n    background-color: var(--backdrop-background);\n    backdrop-filter: blur(4px);\n  }\n\n  .panel {\n    @apply relative flex w-full flex-col overflow-hidden;\n    z-index: 1;\n    max-height: 90vh;\n    margin: 1rem;\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    pointer-events: auto;\n    overflow: hidden;\n\n    &[data-focus-visible=\"true\"] {\n      outline: none;\n      box-shadow: 0 0 0 1.5px var(--focus-visible);\n    }\n  }\n\n  .header {\n    @apply flex shrink-0 items-center justify-between gap-2 px-6 py-4;\n    border-bottom: var(--border-width-base, 1px) solid var(--background-border);\n  }\n\n  .title {\n    @apply m-0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--title-foreground, var(--foreground));\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close {\n    @apply ml-auto flex items-center justify-center cursor-pointer;\n    background: none;\n    border: none;\n    color: var(--foreground);\n    transition:\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &[data-hovered=\"true\"] {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-pressed=\"true\"] {\n      transform: scale(0.92);\n    }\n\n    &[data-focus-visible=\"true\"] {\n      outline: 2px solid var(--focus-visible);\n      outline-offset: 2px;\n      border-radius: var(--radius-xs, 0.25rem);\n    }\n  }\n\n  .close-icon {\n    @apply h-5 w-5;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--foreground);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background-color: var(--background);\n    border-radius: 3px;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .footer {\n    @apply flex shrink-0 items-center justify-between gap-4 px-6 py-4;\n    background-color: var(--footer-background, var(--background));\n    border-top: var(--border-width-base, 1px) solid var(--background-border);\n  }\n\n  /* Size variants */\n  .panel[data-size=\"fit\"] {\n    width: fit-content;\n  }\n\n  .panel[data-size=\"auto\"] {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .panel {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
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
        "name": "close"
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".close[data-hovered=\"true\"]"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".content::-webkit-scrollbar-thumb:hover"
      }
    ]
  },
  "menu": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  :global(.menu) {\n    display: contents;\n\n    .content,\n    .sub-content {\n      --content-padding: calc(var(--spacing) * 1.5);\n      --content-radius: var(--radius-sm, 0.375rem);\n      --content-inner-radius: calc(var(--content-radius) - var(--border-width-base, 1px));\n      --open-animation: slide-in-from-top 0.15s var(--ease-snappy-pop);\n      --closed-animation: slide-out-to-top 0.15s var(--ease-snappy-pop);\n      --disabled-opacity: 0.5;\n\n      @apply absolute min-w-40 max-w-80 overflow-hidden;\n      z-index: 50000;\n      background-color: var(--background);\n      border: var(--border-width-base, 1px) solid var(--background-border);\n      border-radius: var(--content-radius);\n    }\n\n    .trigger {\n      &[data-type=\"pop-over\"][data-pressed=\"true\"] {\n        opacity: 1;\n        background-color: var(--background-pressed);\n        border-radius: var(--radius-sm, 0.375rem);\n      }\n    }\n\n    .content[data-state=\"open\"],\n    .sub-content[data-state=\"open\"] {\n      animation: var(--open-animation);\n    }\n\n    .content[data-state=\"closed\"],\n    .sub-content[data-state=\"closed\"] {\n      animation: var(--closed-animation);\n    }\n\n    .list {\n      @apply space-y-1;\n      max-height: 24rem;\n      overflow-y: auto;\n    }\n\n    .item,\n    .checkbox-item,\n    .radio-item,\n    .sub-trigger {\n      @apply flex min-w-0 items-center gap-2;\n      padding: var(--item-padding, var(--content-padding));\n      border-radius: var(--item-radius, var(--content-inner-radius));\n      cursor: default;\n      user-select: none;\n      outline: none;\n      color: var(--foreground);\n\n      &[data-focused=\"true\"] {\n        background-color: var(--background-focused, var(--background-hover));\n      }\n\n      &[data-disabled=\"true\"] {\n        opacity: var(--disabled-opacity);\n        pointer-events: none;\n      }\n    }\n\n    .item,\n    .sub-trigger {\n      &[data-inset=\"true\"] {\n        padding-left: calc(var(--item-padding, var(--content-padding)) * 2.67);\n      }\n    }\n\n    .item-indicator {\n      @apply ml-auto flex h-4 w-4 shrink-0 items-center justify-center;\n      color: var(--foreground);\n    }\n\n    .sub-trigger[data-state=\"open\"]:not([data-focused=\"true\"]) {\n      background-color: var(--background-focused, var(--background-hover));\n    }\n\n    .sub-trigger-chevron {\n      @apply ml-auto h-4 w-4 shrink-0;\n      color: var(--chevron-foreground, currentColor);\n    }\n\n    .label {\n      padding: var(--content-padding);\n      color: var(--foreground-muted);\n\n      &[data-inset=\"true\"] {\n        padding-left: calc(var(--content-padding) * 2.67);\n      }\n    }\n\n    .separator {\n      @apply -mx-1 my-1 h-px;\n      background-color: var(--background-border);\n    }\n\n    .shortcut {\n      margin-left: auto;\n      color: var(--foreground-muted);\n    }\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-to-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "chevron"
      },
      {
        "name": "list"
      },
      {
        "name": "indicator"
      }
    ],
    "cssVariables": [
      {
        "name": "--content-padding",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ":global(.menu) .content,\n    .sub-content"
      },
      {
        "name": "--content-radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ":global(.menu) .content,\n    .sub-content"
      },
      {
        "name": "--content-inner-radius",
        "value": "calc(var(--content-radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--content-radius",
          "--border-width-base"
        ],
        "variant": ":global(.menu) .content,\n    .sub-content"
      },
      {
        "name": "--open-animation",
        "value": "slide-in-from-top 0.15s var(--ease-snappy-pop)",
        "defaultValue": null,
        "referencedVars": [
          "--ease-snappy-pop"
        ],
        "variant": ":global(.menu) .content,\n    .sub-content"
      },
      {
        "name": "--closed-animation",
        "value": "slide-out-to-top 0.15s var(--ease-snappy-pop)",
        "defaultValue": null,
        "referencedVars": [
          "--ease-snappy-pop"
        ],
        "variant": ":global(.menu) .content,\n    .sub-content"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ":global(.menu) .content,\n    .sub-content"
      }
    ]
  },
  "mask": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    @apply relative h-full w-full;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "gradient"
      }
    ],
    "cssVariables": []
  },
  "list": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --gap-scale: 0.75;\n\n    color: var(--foreground);\n    @apply flex flex-col;\n    gap: calc(var(--spacing, 0.25rem) * var(--list-gap-step, 0) * var(--gap-scale, 1));\n  }\n\n  .container[data-orientation=\"horizontal\"] {\n    @apply flex-row flex-wrap;\n  }\n\n  .header {\n    @apply flex items-center justify-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--header-title-foreground);\n  }\n\n  .header > :last-child {\n    color: var(--header-subtitle-foreground);\n  }\n\n  .item {\n    --background: transparent;\n\n    @apply flex gap-3 px-2 py-1 cursor-pointer;\n    background-color: var(--background);\n    color: var(--foreground);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .item[data-focus-visible=\"true\"] {\n    box-shadow:\n      inset 0 0 0 1px var(--item-focus-visible-background, var(--focus-visible-background)),\n      0 0 0 2px var(--item-focus-visible, var(--focus-visible));\n    border-radius: var(--item-radius, var(--radius-sm, 0.375rem));\n    outline: none;\n  }\n\n  .item:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .item[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: var(--disabled-opacity, 0.6);\n    pointer-events: none;\n  }\n\n  .checkbox,\n  .control,\n  .media {\n    @apply flex items-center justify-center flex-shrink-0;\n  }\n\n  .control {\n    margin-left: auto;\n  }\n\n  .control[data-placement=\"start\"] {\n    margin-left: 0;\n  }\n\n  .media {\n    @apply h-8 w-8;\n  }\n\n  .title {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground);\n    @apply truncate;\n  }\n\n  .desc {\n    font-size: var(--text-sm);\n    color: var(--desc-foreground);\n    @apply truncate;\n  }\n\n  .actionGroup {\n    @apply flex items-center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .actionGroup[data-justify=\"between\"] { justify-content: space-between; }\n  .actionGroup[data-justify=\"start\"] { justify-content: flex-start; }\n  .actionGroup[data-justify=\"end\"] { justify-content: flex-end; }\n\n  .actions {\n    align-items: center;\n    gap: 0.25rem;\n    margin-left: auto;\n    flex-shrink: 0;\n    @apply flex p-1.5 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100;\n  }\n\n  .action {\n    --background: transparent;\n\n    @apply flex items-center justify-center;\n    border-radius: 0.25rem;\n    background-color: var(--background);\n    color: var(--foreground);\n    @apply p-2;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .action:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .footer {\n    @apply flex p-6 pb-12;\n  }\n\n  .footer[data-align=\"center\"] { justify-content: center; }\n  .footer[data-align=\"start\"] { justify-content: flex-start; }\n  .footer[data-align=\"end\"] { justify-content: flex-end; }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "header"
      },
      {
        "name": "item"
      },
      {
        "name": "checkbox"
      },
      {
        "name": "control"
      },
      {
        "name": "media"
      },
      {
        "name": "title"
      },
      {
        "name": "desc"
      },
      {
        "name": "actions"
      },
      {
        "name": "action"
      },
      {
        "name": "footer"
      }
    ],
    "cssVariables": [
      {
        "name": "--gap-scale",
        "value": "0.75",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".container"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".item"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".item:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"]"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".action"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".action:hover"
      }
    ]
  },
  "label": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .label {\n    --background: transparent;\n    --foreground: var(--foreground-primary);\n    --foreground-disabled: var(--foreground-secondary);\n    --foreground-error: var(--danger-600);\n  }\n\n  .label > label {\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n    transition: color 150ms ease;\n\n    &[data-size=\"sm\"] { font-size: var(--text-sm); }\n    &[data-size=\"lg\"] { font-size: var(--text-md); }\n\n    &[data-disabled] {\n      color: var(--foreground-disabled);\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &[data-error] {\n      color: var(--foreground-error);\n    }\n  }\n\n  .label > .required-indicator {\n    margin-left: 0.25rem;\n    color: var(--required-color);\n  }\n\n  .label > .helper-text {\n    --helper-foreground: var(--foreground-secondary);\n    --helper-foreground-error: var(--danger-600);\n\n    display: block;\n    font-size: var(--text-sm);\n    margin-top: 0.25rem;\n    transition: color 150ms ease;\n    color: var(--helper-foreground);\n\n    &[data-error] {\n      color: var(--helper-foreground-error);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "requiredIndicator"
      },
      {
        "name": "helperText"
      }
    ],
    "cssVariables": [
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".label"
      },
      {
        "name": "--foreground",
        "value": "var(--foreground-primary)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-primary"
        ],
        "variant": ".label"
      },
      {
        "name": "--foreground-disabled",
        "value": "var(--foreground-secondary)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-secondary"
        ],
        "variant": ".label"
      },
      {
        "name": "--foreground-error",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".label"
      },
      {
        "name": "--helper-foreground",
        "value": "var(--foreground-secondary)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-secondary"
        ],
        "variant": ".label > .helper-text"
      },
      {
        "name": "--helper-foreground-error",
        "value": "var(--danger-600)",
        "defaultValue": null,
        "referencedVars": [
          "--danger-600"
        ],
        "variant": ".label > .helper-text"
      }
    ]
  },
  "input": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .scope {\n    @apply flex w-full;\n    position: relative;\n    overflow: visible;\n  }\n\n  .field {\n    height: fit-content;\n    flex: 1;\n    min-width: 0;\n    @apply py-1.5 px-3;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: transparent;\n    border: none;\n    outline: none;\n    box-sizing: border-box;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .icon-wrapper {\n    @apply z-10 flex items-center;\n    pointer-events: none;\n  }\n\n  .icon {\n    @apply flex items-center shrink-0;\n    color: var(--foreground, currentColor);\n  }\n\n  .icon-left {\n    @apply relative;\n  }\n\n  .icon-right {\n    @apply relative;\n  }\n\n  .container {\n    --adornment-offset: calc(var(--spacing, 0.25rem) * 1.5);\n\n    display: flex;\n    align-items: center;\n    width: 100%;\n    background-color: var(--background);\n    border: var(--input-border-width, var(--border-width-base, 1px)) solid var(--input-border-color, var(--background-border));\n    border-radius: var(--radius-sm, 0.375rem);\n    box-sizing: border-box;\n    overflow: hidden;\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n\n    &[data-variant=\"ghost\"] {\n      --ring-shadow: none;\n      --ring-border: transparent;\n      --ring-border-visible: transparent;\n\n      background-color: transparent;\n      border-color: transparent;\n    }\n  }\n\n  .start-adornments,\n  .end-adornments {\n    @apply flex items-center gap-1;\n    align-self: stretch;\n    flex-shrink: 0;\n    pointer-events: none;\n  }\n\n  .start-adornments {\n    @apply pl-2.5;\n  }\n\n  .end-adornments {\n    padding-right: var(--adornment-offset);\n\n    &:has(.controls) {\n      padding-right: 0;\n    }\n\n    &:has([data-hint]) {\n      padding-right: 0;\n    }\n  }\n\n  .actions {\n    @apply flex items-center gap-1;\n    pointer-events: auto;\n  }\n\n  .action {\n    @apply flex items-center justify-center p-2;\n    border-radius: 0.25rem;\n    color: var(--action-foreground);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .action:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--action-background-hover);\n    color: var(--action-foreground-hover);\n  }\n\n  .hint {\n    @apply inline-flex items-center justify-center whitespace-nowrap;\n    flex-shrink: 0;\n    margin-inline-start: calc(var(--spacing, 0.25rem) * 0.5);\n    margin-inline-end: var(--adornment-offset);\n    font-size: var(--text-sm);\n    line-height: 1;\n    color: var(--foreground);\n    background-color: var(--background);\n    pointer-events: auto;\n  }\n\n  .controls {\n    @apply flex w-7.5 flex-col;\n    align-self: stretch;\n    border-left: 1px solid var(--input-border-color, var(--background-border));\n    pointer-events: auto;\n  }\n\n  .controls[data-disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .stepper {\n    @apply flex w-full flex-1 items-center justify-center p-0 cursor-pointer;\n    flex: 1;\n    background-color: transparent;\n    border: none;\n    color: var(--foreground);\n    transition:\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &+.stepper {\n      border-top: 1px solid var(--input-border-color, var(--background-border));\n    }\n\n    &:hover:not(:disabled) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n      background-color: var(--hover-background);\n      color: var(--hover-color);\n    }\n\n    &:active:not(:disabled) {\n      background-color: var(--active-background);\n      color: var(--active-color);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "icon.left"
      },
      {
        "name": "icon.right"
      },
      {
        "name": "stepper.up"
      },
      {
        "name": "stepper.down"
      }
    ],
    "cssVariables": [
      {
        "name": "--adornment-offset",
        "value": "calc(var(--spacing, 0.25rem) * 1.5)",
        "defaultValue": "0.25rem",
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".container"
      },
      {
        "name": "--ring-shadow",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".container[data-variant=\"ghost\"]"
      },
      {
        "name": "--ring-border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".container[data-variant=\"ghost\"]"
      },
      {
        "name": "--ring-border-visible",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".container[data-variant=\"ghost\"]"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".action:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".stepper:hover:not(:disabled)"
      }
    ]
  },
  "group": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --layout-radius-size: calc(var(--spacing) * 1.5);\n    --layout-padding-size: var(--layout-radius-size);\n    --background-radius: var(--radius-sm, 0.375rem);\n    --background-border-width: var(--border-width-base, 1px);\n    --background-inner-radius: calc(var(--background-radius) - var(--background-border-width));\n    --layout-text-height: calc(0.8em * var(--leading-tight, 1.25));\n    --layout-vertical-spacing: calc(var(--spacing) * 4);\n    --layout-border-height: calc(var(--background-border-width) * 2);\n    --layout-padding-height: calc(var(--layout-padding-size) * 2);\n    --group-input-border-width: 0px;\n    --group-input-border: transparent;\n    --group-input-hover-border: var(--group-input-border);\n    --group-input-focused-border: var(--group-input-border);\n\n    --layout-control-height: calc(\n      var(--layout-text-height) +\n      var(--layout-vertical-spacing) +\n      var(--layout-border-height)\n    );\n    --item-height: max(\n      calc(\n        var(--layout-control-height) -\n        var(--layout-padding-height) -\n        var(--layout-border-height)\n      ),\n      0px\n    );\n\n    @apply flex overflow-hidden shrink-0 box-border;\n    color: var(--foreground, currentColor);\n    background-color: var(--background, transparent);\n    border: var(--background-border-width) solid var(--background-border, transparent);\n    border-radius: var(--background-radius);\n    padding: var(--layout-padding-size);\n\n    &.horizontal {\n      @apply flex-row items-stretch;\n      height: var(--layout-control-height);\n\n      .item.divider {\n        margin-block: calc(var(--layout-padding-size) * -1);\n      }\n      .item.divider > [role=\"separator\"] {\n        height: 100%;\n      }\n    }\n\n    &.vertical {\n      @apply flex-col;\n\n      .item .button {\n        @apply w-full;\n      }\n\n      .item.divider {\n        margin-inline: calc(var(--layout-padding-size) * -1);\n      }\n      .item.divider > [role=\"separator\"] {\n        width: 100%;\n      }\n    }\n\n    &.none {\n      --layout-padding-size: 0px;\n      @apply gap-0;\n    }\n\n    &.xs {\n      --layout-radius-size: calc(var(--spacing) * 0.875);\n      @apply space-x-0.5;\n    }\n\n    &.sm {\n      --layout-radius-size: calc(var(--spacing) * 1.25);\n      @apply space-x-1;\n    }\n\n  }\n\n  .item {\n    @apply flex items-stretch;\n    position: relative;\n    isolation: isolate;\n    border-radius: var(--group-item-radius, 0);\n    overflow: visible;\n\n    &.grow {\n      flex: 1;\n    }\n\n    &.divider {\n      @apply p-0 shrink-0 flex-none;\n\n      > [role=\"separator\"] {\n        flex: 0 0 auto;\n      }\n    }\n  }\n\n  :is(.button, .input, .select, .expand) {\n    height: 100%;\n    min-height: var(--item-height);\n    position: relative;\n    isolation: isolate;\n    overflow: visible;\n  }\n\n  .button {\n    @apply flex box-border;\n    width: auto;\n    border-radius: var(--group-item-radius, var(--background-inner-radius));\n\n    &[data-selected=\"true\"] {\n      @apply relative;\n      background-color: var(--button-selected-background, var(--background-pressed, var(--background-hover, var(--background))));\n      color: var(--button-selected-foreground, var(--foreground));\n    }\n  }\n\n  .input {\n    @apply flex flex-1 items-stretch overflow-visible;\n    border-radius: var(--group-item-radius, var(--background-inner-radius));\n\n    > [data-ring=\"true\"] {\n      border-radius: inherit;\n    }\n\n    input {\n      @apply h-full px-2;\n    }\n  }\n\n  .select {\n    @apply flex items-stretch p-0 bg-transparent border-none;\n    border-radius: var(--group-item-radius, var(--background-inner-radius));\n  }\n\n  .expand {\n    @apply flex items-stretch;\n    border-radius: var(--group-item-radius, var(--background-inner-radius));\n  }\n\n  .expand :global(.expand-scope),\n  .expand :global(.expand) {\n    @apply flex w-full h-full;\n  }\n\n  .expand :global(.expand) {\n    @apply flex-col;\n    border-radius: inherit;\n  }\n\n  .expand :global(.trigger) {\n    @apply min-h-0;\n    border-radius: inherit;\n  }\n\n  .trigger {}\n\n  .group {\n    .item :is(.button, .select) {\n      border: none;\n    }\n\n    .button[data-selected=\"true\"] {\n      font-weight: 500;\n    }\n\n    .input {\n      --input-border-width: var(--group-input-border-width);\n      --input-border-color: var(--group-input-border);\n      --background-border: var(--group-input-border);\n      --background-hover-border: var(--group-input-hover-border);\n      --background-focused-border: var(--group-input-focused-border);\n    }\n\n    .item.divider > [role=\"separator\"] {\n      --divider-background: var(--background);\n    }\n\n    &.none {\n      .item:not(.divider) {\n        overflow: hidden;\n      }\n\n      :is(.button, .trigger, .select) {\n        border-radius: 0;\n        --background-radius: 0;\n        --background-inner-radius: 0;\n      }\n\n      .input {\n        --radius-sm: 0;\n      }\n\n      .item:first-child {\n        --group-item-radius: var(--background-inner-radius) 0 0 var(--background-inner-radius);\n      }\n\n      .item:last-child {\n        --group-item-radius: 0 var(--background-inner-radius) var(--background-inner-radius) 0;\n      }\n\n      &.horizontal {\n        .item:first-child :is( .button, .trigger, .input > *, .select) {\n          border-top-left-radius: var(--background-inner-radius);\n          border-bottom-left-radius: var(--background-inner-radius);\n        }\n\n        .item:last-child :is( .button, .trigger, .input > *, .select) {\n          border-top-right-radius: var(--background-inner-radius);\n          border-bottom-right-radius: var(--background-inner-radius);\n        }\n\n        .item:last-child .trigger .icon-section {\n          border-top-right-radius: var(--background-inner-radius);\n          border-bottom-right-radius: var(--background-inner-radius);\n        }\n      }\n\n      &.vertical {\n        .item:first-child {\n          --group-item-radius: var(--background-inner-radius) var(--background-inner-radius) 0 0;\n        }\n\n        .item:last-child {\n          --group-item-radius: 0 0 var(--background-inner-radius) var(--background-inner-radius);\n        }\n\n        .item:first-child :is(\n          .button,\n          .trigger,\n          .input > *,\n          .select\n        ) {\n          border-top-left-radius: var(--background-inner-radius);\n          border-top-right-radius: var(--background-inner-radius);\n        }\n\n        .item:last-child :is(\n          .button,\n          .trigger,\n          .input > *,\n          .select\n        ) {\n          border-bottom-left-radius: var(--background-inner-radius);\n          border-bottom-right-radius: var(--background-inner-radius);\n        }\n      }\n    }\n\n    &:is(.xs, .sm) {\n      .item {\n        --group-item-radius: var(--background-inner-radius);\n      }\n\n      :is(.button, .trigger, .select) {\n        border-radius: var(--background-inner-radius);\n      }\n\n      .input {\n        --radius-sm: var(--background-inner-radius);\n      }\n    }\n  }\n\n  .group [data-ring=\"true\"] {\n    --ring-shadow: none;\n    --ring-border: transparent;\n    --ring-border-visible: transparent;\n  }\n\n  .group :global(.focus-indicator) {\n    display: none;\n  }\n\n  .group [data-focus-indicator=\"local\"] {\n    display: none;\n  }\n\n  :is(.button[data-focus-visible=\"true\"], .trigger[data-focus-visible=\"true\"]) {\n    @apply outline-none;\n    box-shadow: none;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "item.first"
      },
      {
        "name": "item.last"
      },
      {
        "name": "item.divider"
      },
      {
        "name": "item.grow"
      },
      {
        "name": "button"
      },
      {
        "name": "input"
      },
      {
        "name": "select"
      },
      {
        "name": "expand"
      }
    ],
    "cssVariables": [
      {
        "name": "--layout-radius-size",
        "value": "calc(var(--spacing) * 1.5)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-padding-size",
        "value": "var(--layout-radius-size)",
        "defaultValue": null,
        "referencedVars": [
          "--layout-radius-size"
        ],
        "variant": ".group"
      },
      {
        "name": "--background-radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".group"
      },
      {
        "name": "--background-border-width",
        "value": "var(--border-width-base, 1px)",
        "defaultValue": "1px",
        "referencedVars": [
          "--border-width-base"
        ],
        "variant": ".group"
      },
      {
        "name": "--background-inner-radius",
        "value": "calc(var(--background-radius) - var(--background-border-width))",
        "defaultValue": null,
        "referencedVars": [
          "--background-radius",
          "--background-border-width"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-text-height",
        "value": "calc(0.8em * var(--leading-tight, 1.25))",
        "defaultValue": "1.25",
        "referencedVars": [
          "--leading-tight"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-vertical-spacing",
        "value": "calc(var(--spacing) * 4)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-border-height",
        "value": "calc(var(--background-border-width) * 2)",
        "defaultValue": null,
        "referencedVars": [
          "--background-border-width"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-padding-height",
        "value": "calc(var(--layout-padding-size) * 2)",
        "defaultValue": null,
        "referencedVars": [
          "--layout-padding-size"
        ],
        "variant": ".group"
      },
      {
        "name": "--group-input-border-width",
        "value": "0px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group"
      },
      {
        "name": "--group-input-border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group"
      },
      {
        "name": "--group-input-hover-border",
        "value": "var(--group-input-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-border"
        ],
        "variant": ".group"
      },
      {
        "name": "--group-input-focused-border",
        "value": "var(--group-input-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-border"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-control-height",
        "value": "calc(\n      var(--layout-text-height) +\n      var(--layout-vertical-spacing) +\n      var(--layout-border-height)\n    )",
        "defaultValue": null,
        "referencedVars": [
          "--layout-text-height",
          "--layout-vertical-spacing",
          "--layout-border-height"
        ],
        "variant": ".group"
      },
      {
        "name": "--item-height",
        "value": "max(\n      calc(\n        var(--layout-control-height) -\n        var(--layout-padding-height) -\n        var(--layout-border-height)\n      ),\n      0px\n    )",
        "defaultValue": null,
        "referencedVars": [
          "--layout-control-height",
          "--layout-padding-height",
          "--layout-border-height"
        ],
        "variant": ".group"
      },
      {
        "name": "--layout-padding-size",
        "value": "0px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none"
      },
      {
        "name": "--layout-radius-size",
        "value": "calc(var(--spacing) * 0.875)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group.xs"
      },
      {
        "name": "--layout-radius-size",
        "value": "calc(var(--spacing) * 1.25)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group.sm"
      },
      {
        "name": "--input-border-width",
        "value": "var(--group-input-border-width)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-border-width"
        ],
        "variant": ".group .input"
      },
      {
        "name": "--input-border-color",
        "value": "var(--group-input-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-border"
        ],
        "variant": ".group .input"
      },
      {
        "name": "--background-border",
        "value": "var(--group-input-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-border"
        ],
        "variant": ".group .input"
      },
      {
        "name": "--background-hover-border",
        "value": "var(--group-input-hover-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-hover-border"
        ],
        "variant": ".group .input"
      },
      {
        "name": "--background-focused-border",
        "value": "var(--group-input-focused-border)",
        "defaultValue": null,
        "referencedVars": [
          "--group-input-focused-border"
        ],
        "variant": ".group .input"
      },
      {
        "name": "--divider-background",
        "value": "var(--background)",
        "defaultValue": null,
        "referencedVars": [
          "--background"
        ],
        "variant": ".group .item.divider > [role=\"separator\"]"
      },
      {
        "name": "--background-radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none :is(.button, .trigger, .select)"
      },
      {
        "name": "--background-inner-radius",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none :is(.button, .trigger, .select)"
      },
      {
        "name": "--radius-sm",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none .input"
      },
      {
        "name": "--group-item-radius",
        "value": "var(--background-inner-radius) 0 0 var(--background-inner-radius)",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group.none .item:first-child"
      },
      {
        "name": "--group-item-radius",
        "value": "0 var(--background-inner-radius) var(--background-inner-radius) 0",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group.none .item:last-child"
      },
      {
        "name": "--group-item-radius",
        "value": "var(--background-inner-radius) var(--background-inner-radius) 0 0",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group.none.vertical .item:first-child"
      },
      {
        "name": "--group-item-radius",
        "value": "0 0 var(--background-inner-radius) var(--background-inner-radius)",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group.none.vertical .item:last-child"
      },
      {
        "name": "--group-item-radius",
        "value": "var(--background-inner-radius)",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group:is(.xs, .sm) .item"
      },
      {
        "name": "--radius-sm",
        "value": "var(--background-inner-radius)",
        "defaultValue": null,
        "referencedVars": [
          "--background-inner-radius"
        ],
        "variant": ".group:is(.xs, .sm) .input"
      },
      {
        "name": "--ring-shadow",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group [data-ring=\"true\"]"
      },
      {
        "name": "--ring-border",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group [data-ring=\"true\"]"
      },
      {
        "name": "--ring-border-visible",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group [data-ring=\"true\"]"
      }
    ]
  },
  "grid": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    --gap-scale: 1;\n\n    --background: transparent;\n    --foreground: inherit;\n\n    @apply grid w-full;\n    background-color: var(--background);\n    color: var(--foreground);\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: calc(var(--spacing, 0.25rem) * var(--grid-gap-step, 4) * var(--gap-scale, 1));\n    row-gap: calc(var(--spacing, 0.25rem) * var(--grid-row-gap-step, var(--grid-gap-step, 4)) * var(--gap-scale, 1));\n    column-gap: calc(var(--spacing, 0.25rem) * var(--grid-col-gap-step, var(--grid-gap-step, 4)) * var(--gap-scale, 1));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n    @apply w-full;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    --grid-gap-step: var(--grid-gap-step-sm, 2);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      --grid-gap-step: var(--grid-gap-step-md, var(--grid-gap-step-sm, 4));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      --grid-gap-step: var(--grid-gap-step-lg, var(--grid-gap-step-md, var(--grid-gap-step-sm, 4)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      --grid-gap-step: var(--grid-gap-step-xl, var(--grid-gap-step-lg, var(--grid-gap-step-md, var(--grid-gap-step-sm, 4))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap {\n    row-gap: calc(var(--spacing, 0.25rem) * var(--grid-row-gap-step, var(--grid-gap-step, 4)) * var(--gap-scale, 1));\n  }\n\n  .grid.has-col-gap {\n    column-gap: calc(var(--spacing, 0.25rem) * var(--grid-col-gap-step, var(--grid-gap-step, 4)) * var(--gap-scale, 1));\n  }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      --grid-gap-step: 2;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--gap-scale",
        "value": "1",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".grid"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".grid"
      },
      {
        "name": "--foreground",
        "value": "inherit",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".grid"
      },
      {
        "name": "--grid-gap-step",
        "value": "var(--grid-gap-step-sm, 2)",
        "defaultValue": "2",
        "referencedVars": [
          "--grid-gap-step-sm"
        ],
        "variant": ".grid.responsive-gap"
      },
      {
        "name": "--grid-gap-step",
        "value": "var(--grid-gap-step-md, var(--grid-gap-step-sm, 4))",
        "defaultValue": "var(--grid-gap-step-sm, 4",
        "referencedVars": [
          "--grid-gap-step-md"
        ],
        "variant": ".grid.responsive-gap"
      },
      {
        "name": "--grid-gap-step",
        "value": "var(--grid-gap-step-lg, var(--grid-gap-step-md, var(--grid-gap-step-sm, 4)))",
        "defaultValue": "var(--grid-gap-step-md, var(--grid-gap-step-sm, 4",
        "referencedVars": [
          "--grid-gap-step-lg"
        ],
        "variant": ".grid.responsive-gap"
      },
      {
        "name": "--grid-gap-step",
        "value": "var(--grid-gap-step-xl, var(--grid-gap-step-lg, var(--grid-gap-step-md, var(--grid-gap-step-sm, 4))))",
        "defaultValue": "var(--grid-gap-step-lg, var(--grid-gap-step-md, var(--grid-gap-step-sm, 4",
        "referencedVars": [
          "--grid-gap-step-xl"
        ],
        "variant": ".grid.responsive-gap"
      },
      {
        "name": "--grid-gap-step",
        "value": "2",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".container .grid"
      }
    ]
  },
  "gallery": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .item-scope {\n    @apply block min-w-0 h-full;\n  }\n\n  .item {\n    --border-width: var(--border-width-base, 1px);\n    --radius: var(--radius-sm, 0.375rem);\n    --transition: var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    --view-width: 200px;\n\n    @apply flex flex-col overflow-hidden no-underline cursor-pointer w-full h-full;\n\n    color: inherit;\n    background: var(--background);\n    border: var(--border-width) solid var(--background-border);\n    border-radius: var(--radius);\n    transition:\n      border-color var(--transition),\n      transform var(--transition),\n      background-color var(--transition),\n      box-shadow var(--transition);\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-disabled=\"true\"] {\n    @apply cursor-not-allowed;\n  }\n\n  .item[data-hovered=\"true\"] {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    border-color: var(--background-hover-border);\n  }\n\n  .item[data-pressed=\"true\"] {\n    border-color: var(--background-pressed-border, var(--background-hover-border));\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    @apply flex-row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--view-width);\n  }\n\n  .view {\n    --aspect-ratio: 16/9;\n    --background: transparent;\n\n    @apply relative overflow-hidden;\n\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n  }\n\n  .view > img,\n  .view > video {\n    @apply w-full h-full object-cover;\n  }\n\n  .body {\n    --gap: calc(var(--spacing, 0.25rem) * 1);\n    --padding: calc(var(--spacing, 0.25rem) * 3);\n    --title-color: var(--foreground);\n    --description-color: var(--foreground-muted, var(--foreground));\n\n    @apply flex flex-col self-start min-w-0;\n\n    gap: var(--gap);\n    padding: var(--padding);\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    color: var(--title-color);\n    font-weight: var(--font-weight-medium, 500);\n  }\n\n  .body > :not(:first-child) {\n    color: var(--description-color);\n    font-size: var(--text-sm, 0.875rem);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "item"
      },
      {
        "name": "view"
      },
      {
        "name": "body"
      }
    ],
    "cssVariables": [
      {
        "name": "--border-width",
        "value": "var(--border-width-base, 1px)",
        "defaultValue": "1px",
        "referencedVars": [
          "--border-width-base"
        ],
        "variant": ".item"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".item"
      },
      {
        "name": "--transition",
        "value": "var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out))",
        "defaultValue": "var(--hover-transition-leave-duration, 300ms",
        "referencedVars": [
          "--hover-transition-duration",
          "--hover-transition-timing-function"
        ],
        "variant": ".item"
      },
      {
        "name": "--view-width",
        "value": "200px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".item"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".item[data-hovered=\"true\"]"
      },
      {
        "name": "--aspect-ratio",
        "value": "16/9",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".view"
      },
      {
        "name": "--background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".view"
      },
      {
        "name": "--gap",
        "value": "calc(var(--spacing, 0.25rem) * 1)",
        "defaultValue": "0.25rem",
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".body"
      },
      {
        "name": "--padding",
        "value": "calc(var(--spacing, 0.25rem) * 3)",
        "defaultValue": "0.25rem",
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".body"
      },
      {
        "name": "--title-color",
        "value": "var(--foreground)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground"
        ],
        "variant": ".body"
      },
      {
        "name": "--description-color",
        "value": "var(--foreground-muted, var(--foreground))",
        "defaultValue": "var(--foreground",
        "referencedVars": [
          "--foreground-muted"
        ],
        "variant": ".body"
      }
    ]
  },
  "frame": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    --frame-radius: var(--radius-sm, 24px);\n    --frame-stroke-width: var(--border-width-base, 1px);\n  }\n\n  .shape {\n    rx: var(--frame-radius);\n  }\n\n  .stroke {\n    stroke-width: var(--frame-stroke-width);\n    vector-effect: non-scaling-stroke;\n  }\n\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--frame-radius",
        "value": "var(--radius-sm, 24px)",
        "defaultValue": "24px",
        "referencedVars": [
          "--radius-sm"
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
      }
    ]
  },
  "flex": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    --gap-scale: 0.5;\n\n    @apply flex w-full;\n    gap: calc(var(--spacing, 0.25rem) * var(--flex-gap-step, 4) * var(--gap-scale, 1));\n  }\n\n  /* Direction variants */\n  .flex.row { flex-direction: row; }\n  .flex.column { flex-direction: column; }\n\n  /* Wrap variants */\n  .flex.wrap { flex-wrap: wrap; }\n  .flex.nowrap { flex-wrap: nowrap; }\n\n  /* Justify-content variants */\n  .flex.justify-start { justify-content: flex-start; }\n  .flex.justify-end { justify-content: flex-end; }\n  .flex.justify-center { justify-content: center; }\n  .flex.justify-between { justify-content: space-between; }\n  .flex.justify-around { justify-content: space-around; }\n  .flex.justify-evenly { justify-content: space-evenly; }\n\n  /* Align-items variants */\n  .flex.align-start { align-items: flex-start; }\n  .flex.align-end { align-items: flex-end; }\n  .flex.align-center { align-items: center; }\n  .flex.align-stretch { align-items: stretch; }\n  .flex.align-baseline { align-items: baseline; }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    @apply w-full;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      --flex-gap-step: 2;\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      --flex-gap-step: 2;\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      --flex-gap-step: 4;\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      --flex-gap-step: 6;\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--gap-scale",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".flex"
      },
      {
        "name": "--flex-gap-step",
        "value": "2",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".flex.container-responsive"
      },
      {
        "name": "--flex-gap-step",
        "value": "2",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".flex.container-responsive"
      },
      {
        "name": "--flex-gap-step",
        "value": "4",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".flex.container-responsive"
      },
      {
        "name": "--flex-gap-step",
        "value": "6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".flex.container-responsive"
      }
    ]
  },
  "expand": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .scope {\n    position: relative;\n    display: block;\n    width: 100%;\n  }\n\n  .expand {\n    --expand-disabled-opacity: 0.6;\n    --expand-trigger-padding-x: 0.75rem;\n    --expand-trigger-padding-y: 0.5rem;\n    --expand-divider-spacing: 0.5rem;\n\n    @apply flex w-full flex-col;\n  }\n\n  .expand[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: var(--expand-disabled-opacity);\n  }\n\n  .trigger {\n    @apply flex w-full items-stretch justify-between border-0 p-0 text-left;\n\n    appearance: none;\n    color: var(--foreground);\n    background-color: var(--background);\n    cursor: pointer;\n    border-radius: 0;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    outline: none;\n    box-shadow: none;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-smooth-settle, ease-out)),\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-smooth-settle, ease-out));\n  }\n\n  .trigger:focus,\n  .trigger:focus-visible {\n    outline: none;\n    box-shadow: none;\n  }\n\n  .trigger[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: var(--expand-disabled-opacity);\n  }\n\n  .title {\n    @apply flex min-w-0 flex-1 items-center overflow-hidden;\n\n    padding: var(--expand-trigger-padding-y) 0 var(--expand-trigger-padding-y)\n      var(--expand-trigger-padding-x);\n    font-weight: var(--font-weight-medium);\n    border-radius: 0;\n    color: inherit;\n    background-color: var(--background);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-smooth-settle, ease-out));\n  }\n\n  .trigger:not([data-disabled=\"true\"]):has(.icon:hover) .title {\n    background-color: transparent;\n  }\n\n  .icon {\n    @apply flex shrink-0 items-center justify-center;\n\n    padding: var(--expand-trigger-padding-y) var(--expand-trigger-padding-x);\n    color: inherit;\n    background-color: var(--background);\n    border-radius: 0;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-smooth-settle, ease-out));\n  }\n\n  @media (hover: hover) {\n    .trigger:not([data-disabled=\"true\"]):hover .title,\n    .trigger:not([data-disabled=\"true\"]):hover .icon {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    .trigger:not([data-disabled=\"true\"]):has(.icon:hover) .title {\n      background-color: transparent;\n    }\n\n    .trigger:not([data-disabled=\"true\"]) .icon:hover {\n      border-radius: 0;\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .icon[data-selected=\"true\"] > * {\n    transform: rotate(180deg);\n  }\n\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n  }\n\n  .expand:has(.content[data-from=\"above\"]) .icon > * {\n    transform: rotate(180deg);\n  }\n\n  .expand:has(.content[data-from=\"above\"]) .icon[data-selected=\"true\"] > * {\n    transform: rotate(0deg);\n  }\n\n  .expand:has(.content[data-from=\"left\"]) {\n    @apply flex-row-reverse items-start;\n  }\n\n  .expand:has(.content[data-from=\"left\"]) .trigger {\n    @apply w-auto flex-col;\n  }\n\n  .expand:has(.content[data-from=\"left\"]) .icon > * {\n    transform: rotate(-90deg);\n  }\n\n  .expand:has(.content[data-from=\"left\"]) .icon[data-selected=\"true\"] > * {\n    transform: rotate(90deg);\n  }\n\n  .expand:has(.content[data-from=\"right\"]) {\n    @apply flex-row items-start;\n  }\n\n  .expand:has(.content[data-from=\"right\"]) .trigger {\n    @apply w-auto flex-col;\n  }\n\n  .expand:has(.content[data-from=\"right\"]) .icon > * {\n    transform: rotate(90deg);\n  }\n\n  .expand:has(.content[data-from=\"right\"]) .icon[data-selected=\"true\"] > * {\n    transform: rotate(-90deg);\n  }\n\n  .content {\n    display: grid;\n    overflow: hidden;\n    grid-template-rows: 0fr;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n  }\n\n  .content[data-selected=\"true\"] {\n    grid-template-rows: 1fr;\n  }\n\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n  }\n\n  .content[data-from=\"left\"][data-selected=\"true\"],\n  .content[data-from=\"right\"][data-selected=\"true\"] {\n    grid-template-columns: 1fr;\n  }\n\n  .content-inner {\n    @apply min-h-0 overflow-hidden;\n\n    min-width: 0;\n    color: var(--foreground);\n    background-color: var(--background);\n  }\n\n  .divider {\n    margin-top: var(--expand-divider-spacing);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "trigger"
      },
      {
        "name": "icon.collapsed"
      },
      {
        "name": "icon.expanded"
      },
      {
        "name": "title"
      },
      {
        "name": "content"
      },
      {
        "name": "contentInner"
      },
      {
        "name": "divider"
      }
    ],
    "cssVariables": [
      {
        "name": "--expand-disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--expand-trigger-padding-x",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--expand-trigger-padding-y",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--expand-divider-spacing",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".trigger:not([data-disabled=\"true\"]):hover .title,\n    .trigger:not([data-disabled=\"true\"]):hover .icon"
      }
    ]
  },
  "divider": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .divider {\n    --divider-background: var(--group-divider-background, var(--background-border, var(--background)));\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--divider-background",
        "value": "var(--group-divider-background, var(--background-border, var(--background)))",
        "defaultValue": "var(--background-border, var(--background",
        "referencedVars": [
          "--group-divider-background"
        ],
        "variant": ".divider"
      }
    ]
  },
  "date": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --disabled-opacity: 0.5;\n\n    @apply inline-flex p-1.5 flex-col overflow-hidden gap-0;\n    border-radius: var(--radius-xs);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .day-headers {\n    @apply grid gap-2 px-4 pt-3 pb-1;\n    grid-template-columns: repeat(7, 1fr);\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-bottom: none;\n    border-radius: var(--radius-xs) var(--radius-xs) 0 0;\n  }\n\n  .day-header {\n    @apply flex items-center justify-center;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    color: var(--foreground);\n  }\n\n  .header {\n    @apply flex items-center justify-between gap-4 pl-2 pr-1.5 py-1.5;\n    color: var(--foreground);\n  }\n\n  .month-year {\n    @apply ml-2;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .nav-button {\n    @apply inline-flex min-h-8 min-w-8 items-center justify-center cursor-pointer;\n    border-radius: var(--radius-xs);\n    background-color: var(--background, transparent);\n    color: var(--foreground);\n    border: 1px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 500;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .nav-button:focus-visible {\n    outline: none;\n  }\n\n  .nav-button:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .grid {\n    @apply grid gap-1 px-4 pb-4;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    background: var(--background);\n    border-radius: 0 0 var(--radius-xs) var(--radius-xs);\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .day-cell {\n    @apply flex min-h-8 items-center justify-center px-2.5 py-2 cursor-pointer;\n    border-radius: var(--radius-base);\n    background-color: var(--background, transparent);\n    color: var(--foreground);\n    border: 2px solid transparent;\n    font-size: var(--text-xs);\n    font-weight: 400;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .day-cell:focus-visible {\n    outline: none;\n  }\n\n  .week-header {\n    display: none;\n  }\n\n  .week-number {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.day-cell[data-selected=\"true\"] {\n  font-weight: 500;\n}\n\n.day-cell[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]),\n.day-cell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]) {\n  --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n}\n\n.day-cell[data-today=\"true\"] {\n  border-color: transparent;\n}\n\n.day-cell[data-disabled=\"true\"],\n.day-cell[data-out-of-range=\"true\"] {\n  opacity: var(--disabled-opacity);\n}\n\n.day-cell[data-disabled=\"true\"] { cursor: not-allowed; }\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "header"
      },
      {
        "name": "\"day-headers\""
      },
      {
        "name": "grid"
      },
      {
        "name": "\"day-cell\""
      }
    ],
    "cssVariables": [
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".calendar"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".nav-button:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".day-cell[data-hovered=\"true\"]:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]),\n.day-cell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"])"
      }
    ]
  },
  "confirm": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .confirm {\n    --overlay-background: mix(var(--background-950) 50%, transparent);\n    --header-foreground: var(--foreground-100);\n    --description-foreground: var(--foreground-300);\n    --error-foreground: var(--foreground-danger);\n    --countdown-foreground: var(--foreground-400);\n    --label-foreground: var(--foreground-300);\n    --input-background: var(--background-800);\n    --input-border-color: var(--background-700);\n    --input-foreground: var(--foreground-100);\n    --input-focus-visible: var(--accent-500);\n  }\n\n  .container {\n    @apply flex flex-col;\n  }\n\n  .card {\n    @apply max-w-[28rem];\n  }\n\n  .body {\n    @apply flex flex-col gap-4;\n  }\n\n  .body-compact {\n    @apply gap-3;\n  }\n\n  .dialog-overlay {\n    @apply fixed inset-0 z-50 flex items-center justify-center;\n    background-color: var(--overlay-background);\n  }\n\n  .dialog-card {\n    @apply max-w-[28rem];\n    margin: 0 1rem;\n  }\n\n  .header {\n    @apply flex items-start gap-3;\n  }\n\n  .header-content {\n    @apply flex-1;\n  }\n\n  .header-title {\n    @apply font-semibold;\n    color: var(--header-foreground);\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--description-foreground);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--error-foreground);\n  }\n\n  .warning-box {\n    @apply p-3 rounded-sm;\n    border: var(--border-width-base, 1px) solid var(--warning-border-color);\n    background-color: var(--warning-background);\n    color: var(--warning-foreground);\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    --warning-background: var(--warning-background-low);\n    --warning-border-color: var(--warning-border-color-low);\n    --warning-foreground: var(--warning-foreground-low);\n  }\n\n  .warning-box-medium {\n    --warning-background: var(--warning-background-medium);\n    --warning-border-color: var(--warning-border-color-medium);\n    --warning-foreground: var(--warning-foreground-medium);\n  }\n\n  .warning-box-high {\n    --warning-background: var(--warning-background-high);\n    --warning-border-color: var(--warning-border-color-high);\n    --warning-foreground: var(--warning-foreground-high);\n  }\n\n  .warning-box-critical {\n    --warning-background: var(--warning-background-critical);\n    --warning-border-color: var(--warning-border-color-critical);\n    --warning-foreground: var(--warning-foreground-critical);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--countdown-foreground);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--label-foreground);\n  }\n\n  .input {\n    @apply w-full mt-2 px-3 py-2 rounded-sm transition-all duration-200;\n    background-color: var(--input-background);\n    border: var(--border-width-base, 1px) solid var(--input-border-color);\n    color: var(--input-foreground);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--input-focus-visible);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    @apply flex gap-2;\n  }\n\n  .actions-inline {\n    @apply flex-row;\n  }\n\n  .actions-dialog {\n    @apply flex-row justify-end;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "container"
      },
      {
        "name": "card"
      },
      {
        "name": "header"
      },
      {
        "name": "body"
      },
      {
        "name": "actions"
      },
      {
        "name": "description"
      },
      {
        "name": "errorMessage"
      },
      {
        "name": "warningBox"
      },
      {
        "name": "input"
      }
    ],
    "cssVariables": [
      {
        "name": "--overlay-background",
        "value": "mix(var(--background-950) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--header-foreground",
        "value": "var(--foreground-100)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-100"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--description-foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--error-foreground",
        "value": "var(--foreground-danger)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-danger"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--countdown-foreground",
        "value": "var(--foreground-400)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-400"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--label-foreground",
        "value": "var(--foreground-300)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-300"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--input-background",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--input-border-color",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--input-foreground",
        "value": "var(--foreground-100)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-100"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--input-focus-visible",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".confirm"
      },
      {
        "name": "--warning-background",
        "value": "var(--warning-background-low)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-background-low"
        ],
        "variant": ".warning-box-low"
      },
      {
        "name": "--warning-border-color",
        "value": "var(--warning-border-color-low)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-border-color-low"
        ],
        "variant": ".warning-box-low"
      },
      {
        "name": "--warning-foreground",
        "value": "var(--warning-foreground-low)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-foreground-low"
        ],
        "variant": ".warning-box-low"
      },
      {
        "name": "--warning-background",
        "value": "var(--warning-background-medium)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-background-medium"
        ],
        "variant": ".warning-box-medium"
      },
      {
        "name": "--warning-border-color",
        "value": "var(--warning-border-color-medium)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-border-color-medium"
        ],
        "variant": ".warning-box-medium"
      },
      {
        "name": "--warning-foreground",
        "value": "var(--warning-foreground-medium)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-foreground-medium"
        ],
        "variant": ".warning-box-medium"
      },
      {
        "name": "--warning-background",
        "value": "var(--warning-background-high)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-background-high"
        ],
        "variant": ".warning-box-high"
      },
      {
        "name": "--warning-border-color",
        "value": "var(--warning-border-color-high)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-border-color-high"
        ],
        "variant": ".warning-box-high"
      },
      {
        "name": "--warning-foreground",
        "value": "var(--warning-foreground-high)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-foreground-high"
        ],
        "variant": ".warning-box-high"
      },
      {
        "name": "--warning-background",
        "value": "var(--warning-background-critical)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-background-critical"
        ],
        "variant": ".warning-box-critical"
      },
      {
        "name": "--warning-border-color",
        "value": "var(--warning-border-color-critical)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-border-color-critical"
        ],
        "variant": ".warning-box-critical"
      },
      {
        "name": "--warning-foreground",
        "value": "var(--warning-foreground-critical)",
        "defaultValue": null,
        "referencedVars": [
          "--warning-foreground-critical"
        ],
        "variant": ".warning-box-critical"
      }
    ]
  },
  "command": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Overlay Container */\n  .overlay {\n    @apply fixed inset-0 flex items-start justify-center overflow-hidden;\n    z-index: 999;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: var(--overlay-backdrop);\n  }\n\n  /* Content */\n  .content {\n    @apply relative m-2 w-full max-w-[28rem];\n    border-radius: var(--radius-sm);\n    background: var(--background);\n    margin-inline: 1rem;\n    box-shadow: var(--shadow);\n    animation: fade-in-zoom-in 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border);\n    @apply overflow-hidden;\n  }\n\n  /* Search Section */\n  .search {\n    @apply border-none flex p-1.5;\n    --input-active-border-color: transparent;\n    --input-active-box-shadow: none;\n  }\n\n  .input {\n    border-color: transparent;\n    background: transparent;\n    box-shadow: none;\n\n    &[data-active],\n    &[data-focus-visible] {\n      border-color: transparent;\n      box-shadow: none;\n    }\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--background-list);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    @apply flex w-full flex-col;\n  }\n\n  .item {\n    @apply flex items-center justify-between rounded-sm px-2 py-0.5 cursor-pointer;\n    border-radius: 0.375rem;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    background-color: var(--background);\n    color: var(--foreground);\n  }\n\n  .item:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n  }\n\n  .item-content {\n    @apply flex min-w-0 flex-1 items-center gap-2.5;\n    flex: 1;\n  }\n\n  .item-icon {\n    @apply flex h-6 w-6 shrink-0 items-center justify-center;\n    color: var(--foreground);\n  }\n\n  .item-labels {\n    flex: 1;\n    @apply min-w-0;\n  }\n\n  .item-label {\n    font-size: var(--text-sm);\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    color: var(--foreground-muted);\n    font-size: 0.875rem;\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .hint-wrapper {\n    @apply flex items-center;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--foreground-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--foreground-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply flex w-full items-center gap-2 px-1.5 py-2;\n    background-color: var(--background-footer);\n    border-top: 1px solid var(--border);\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fade-in-zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "overlay"
      },
      {
        "name": "input"
      },
      {
        "name": "list"
      },
      {
        "name": "item"
      },
      {
        "name": "itemContent"
      },
      {
        "name": "footer"
      }
    ],
    "cssVariables": [
      {
        "name": "--input-active-border-color",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".search"
      },
      {
        "name": "--input-active-box-shadow",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".search"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".item:hover"
      }
    ]
  },
  "color": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);\n    --background-border: var(--background-700);\n    --focus-visible: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .color[data-variant=\"popover\"] {\n    background: transparent;\n    border-color: transparent;\n    border-radius: 0;\n  }\n\n  .color-provider {\n    display: inline-flex;\n    width: fit-content;\n  }\n\n  .color-provider .color-trigger {\n    --trigger-background: color-mix(in srgb, var(--background-800) 35%, transparent);\n    --trigger-background-hover: color-mix(in srgb, var(--background-700) 45%, transparent);\n    --trigger-border: var(--background-700);\n    --trigger-text: var(--foreground-200);\n    --background-border: var(--background-700);\n    --focus-visible: var(--accent-500);\n    --checkerboard-dark: var(--background-700);\n    --checkerboard-light: var(--background-800);\n\n    display: inline-flex;\n    align-items: center;\n    gap: 0.625rem;\n    min-width: 170px;\n    height: 40px;\n    padding: 0 0.75rem;\n    border: var(--border-width-base, 1px) solid var(--trigger-border);\n    border-radius: var(--radius-sm, 0.375rem);\n    background: var(--trigger-background);\n    color: var(--trigger-text);\n    cursor: pointer;\n    font: inherit;\n    font-size: 0.875rem;\n    line-height: 1;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .color-provider .color-trigger:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background: var(--trigger-background-hover);\n  }\n\n  .color-provider .color-trigger:focus-visible {\n    outline: 2px solid var(--focus-visible);\n    outline-offset: 2px;\n  }\n\n  .color-provider .color-trigger[data-disabled=\"true\"] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .color-provider .color-trigger[data-size=\"sm\"] {\n    min-width: 150px;\n    height: 34px;\n    padding: 0 0.625rem;\n    font-size: 0.8125rem;\n  }\n\n  .color-provider .color-trigger[data-size=\"lg\"] {\n    min-width: 190px;\n    height: 46px;\n    padding: 0 0.875rem;\n    font-size: 0.9375rem;\n  }\n\n  .color-provider .color-trigger-swatch {\n    position: relative;\n    width: 20px;\n    height: 20px;\n    flex: 0 0 auto;\n    border-radius: var(--radius-xs, 0.25rem);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    overflow: hidden;\n  }\n\n  .color-provider .color-trigger-swatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-dark),\n      var(--checkerboard-dark) 4px,\n      var(--checkerboard-light) 4px,\n      var(--checkerboard-light) 8px\n    );\n  }\n\n  .color-provider .color-trigger-swatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n  }\n\n  .color-provider .color-trigger-value {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .color .controls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  .input-group {\n    width: 100%;\n  }\n\n  .input-group > div:first-child {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .input-group .input {\n    width: 100%;\n  }\n\n  .input-group .format {\n    flex-shrink: 0;\n    width: 85px;\n  }\n\n  .color[data-size=\"sm\"] .format {\n    width: 75px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n    min-height: 160px;\n  }\n\n  .canvas[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--focus-visible);\n    outline-offset: 2px;\n  }\n\n  .canvas .canvas-inner {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    overflow: hidden;\n  }\n\n  .canvas .canvas-gradient-hue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n  }\n\n  .canvas .canvas-gradient-saturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n  }\n\n  .canvas .canvas-gradient-brightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n  }\n\n  .canvas .canvas-pointer {\n    --pointer-border: color-mix(in srgb, var(--foreground-200) 50%, transparent);\n\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid var(--pointer-border);\n    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.3), 0 2px 4px rgb(0 0 0 / 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  .hue-slider {\n    --slider-track-size: 16px;\n    --slider-thumb-size: 12px;\n    --slider-hit-size: 16px;\n    --slider-track-radius: var(--radius-full);\n    --slider-track-border: var(--border-width-base, 1px) solid var(--background-border);\n    --slider-track-background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    --slider-range-display: none;\n    --slider-thumb-scale-active: 1;\n\n    width: 100%;\n    min-height: 16px;\n    border-radius: var(--radius-full);\n  }\n\n  .hue-slider .hue-track {\n    position: relative;\n    width: 100%;\n  }\n\n  .hue-slider .hue-thumb {\n    --thumb-border: white;\n    --thumb-background: white;\n    --slider-thumb-background: var(--thumb-background);\n    --slider-thumb-border: 2px solid var(--thumb-border);\n    --slider-thumb-shadow: 0 2px 4px rgb(0 0 0 / 0.3);\n    --slider-thumb-shadow-hover: 0 2px 6px rgb(0 0 0 / 0.4);\n    --slider-thumb-shadow-active: 0 1px 3px rgb(0 0 0 / 0.3);\n\n    border-radius: var(--radius-full);\n  }\n\n  .hue-slider .hue-thumb[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--focus-visible);\n    outline-offset: 2px;\n  }\n\n  .hue-slider .hue-thumb[data-hovered=\"true\"] {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    box-shadow: var(--slider-thumb-shadow-hover);\n  }\n\n  .hue-slider .hue-thumb[data-pressed=\"true\"] {\n    box-shadow: var(--slider-thumb-shadow-active);\n  }\n\n  .opacity-slider {\n    --slider-track-size: 12px;\n    --slider-thumb-size: 10px;\n    --slider-hit-size: 12px;\n    --slider-track-radius: var(--radius-full);\n    --slider-track-border: var(--border-width-base, 1px) solid var(--background-border);\n    --slider-range-display: none;\n    --slider-thumb-scale-active: 1;\n    --checkerboard-dark: var(--background-800);\n    --checkerboard-light: var(--background-700);\n    --slider-track-background:\n      linear-gradient(to right, transparent, var(--color-slider-opacity-color, rgb(0, 0, 0))),\n      repeating-linear-gradient(\n        45deg,\n        var(--checkerboard-dark),\n        var(--checkerboard-dark) 10px,\n        var(--checkerboard-light) 10px,\n        var(--checkerboard-light) 20px\n      );\n\n    width: 100%;\n    min-height: 12px;\n    border-radius: var(--radius-full);\n  }\n\n  .opacity-slider .opacity-track {\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n  }\n\n  .opacity-slider .opacity-thumb {\n    --thumb-border: white;\n    --thumb-background: white;\n    --slider-thumb-background: var(--thumb-background);\n    --slider-thumb-border: 2px solid var(--thumb-border);\n    --slider-thumb-shadow: 0 2px 4px rgb(0 0 0 / 0.3);\n    --slider-thumb-shadow-hover: 0 2px 6px rgb(0 0 0 / 0.4);\n    --slider-thumb-shadow-active: 0 1px 3px rgb(0 0 0 / 0.3);\n\n    border-radius: var(--radius-full);\n  }\n\n  .opacity-slider .opacity-thumb[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--focus-visible);\n    outline-offset: 2px;\n  }\n\n  .opacity-slider .opacity-thumb[data-hovered=\"true\"] {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    box-shadow: var(--slider-thumb-shadow-hover);\n  }\n\n  .opacity-slider .opacity-thumb[data-pressed=\"true\"] {\n    box-shadow: var(--slider-thumb-shadow-active);\n  }\n\n  .recent-colors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recent-colors .recent-color-swatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n    transition:\n      box-shadow var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .recent-colors .recent-color-swatch:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--focus-visible);\n  }\n\n  .recent-colors .recent-color-swatch:active {\n    transform: scale(0.95);\n  }\n\n  .recent-colors .recent-color-swatch:focus-visible {\n    outline: 2px solid var(--focus-visible);\n    outline-offset: 2px;\n  }\n\n  .preview-swatch {\n    --checkerboard-dark: var(--background-700);\n    --checkerboard-light: var(--background-800);\n\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .preview-swatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-dark),\n      var(--checkerboard-dark) 6px,\n      var(--checkerboard-light) 6px,\n      var(--checkerboard-light) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .preview-swatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    --checkerboard-dark: var(--background-700);\n    --checkerboard-light: var(--background-800);\n\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    box-shadow: 0 2px 8px rgb(0 0 0 / 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-dark),\n      var(--checkerboard-dark) 10px,\n      var(--checkerboard-light) 10px,\n      var(--checkerboard-light) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "provider"
      },
      {
        "name": "root"
      },
      {
        "name": "trigger"
      },
      {
        "name": "triggerSwatch"
      },
      {
        "name": "triggerValue"
      },
      {
        "name": "controls"
      },
      {
        "name": "canvas"
      },
      {
        "name": "canvasInner"
      },
      {
        "name": "canvasGradient.hue"
      },
      {
        "name": "canvasGradient.saturation"
      },
      {
        "name": "canvasGradient.brightness"
      },
      {
        "name": "canvasPointer"
      },
      {
        "name": "slider.hue"
      },
      {
        "name": "slider.opacity"
      },
      {
        "name": "sliderTrack.hue"
      },
      {
        "name": "sliderTrack.opacity"
      },
      {
        "name": "sliderThumb.hue"
      },
      {
        "name": "sliderThumb.opacity"
      },
      {
        "name": "recentColors"
      },
      {
        "name": "recentColorSwatch"
      },
      {
        "name": "inputGroup"
      },
      {
        "name": "input"
      },
      {
        "name": "format"
      },
      {
        "name": "previewSwatch"
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
        "name": "--background-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color"
      },
      {
        "name": "--focus-visible",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".color"
      },
      {
        "name": "--trigger-background",
        "value": "color-mix(in srgb, var(--background-800) 35%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--trigger-background-hover",
        "value": "color-mix(in srgb, var(--background-700) 45%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--trigger-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--trigger-text",
        "value": "var(--foreground-200)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--background-border",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--focus-visible",
        "value": "var(--accent-500)",
        "defaultValue": null,
        "referencedVars": [
          "--accent-500"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--checkerboard-dark",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--checkerboard-light",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".color-provider .color-trigger"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".color-provider .color-trigger:hover"
      },
      {
        "name": "--pointer-border",
        "value": "color-mix(in srgb, var(--foreground-200) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--foreground-200"
        ],
        "variant": ".canvas .canvas-pointer"
      },
      {
        "name": "--slider-track-size",
        "value": "16px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-thumb-size",
        "value": "12px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-hit-size",
        "value": "16px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-track-radius",
        "value": "var(--radius-full)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-full"
        ],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-track-border",
        "value": "var(--border-width-base, 1px) solid var(--background-border)",
        "defaultValue": "1px",
        "referencedVars": [
          "--border-width-base",
          "--background-border"
        ],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-track-background",
        "value": "linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    )",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-range-display",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--slider-thumb-scale-active",
        "value": "1",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider"
      },
      {
        "name": "--thumb-border",
        "value": "white",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--thumb-background",
        "value": "white",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--slider-thumb-background",
        "value": "var(--thumb-background)",
        "defaultValue": null,
        "referencedVars": [
          "--thumb-background"
        ],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--slider-thumb-border",
        "value": "2px solid var(--thumb-border)",
        "defaultValue": null,
        "referencedVars": [
          "--thumb-border"
        ],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--slider-thumb-shadow",
        "value": "0 2px 4px rgb(0 0 0 / 0.3)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--slider-thumb-shadow-hover",
        "value": "0 2px 6px rgb(0 0 0 / 0.4)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--slider-thumb-shadow-active",
        "value": "0 1px 3px rgb(0 0 0 / 0.3)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".hue-slider .hue-thumb"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".hue-slider .hue-thumb[data-hovered=\"true\"]"
      },
      {
        "name": "--slider-track-size",
        "value": "12px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-thumb-size",
        "value": "10px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-hit-size",
        "value": "12px",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-track-radius",
        "value": "var(--radius-full)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-full"
        ],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-track-border",
        "value": "var(--border-width-base, 1px) solid var(--background-border)",
        "defaultValue": "1px",
        "referencedVars": [
          "--border-width-base",
          "--background-border"
        ],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-range-display",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-thumb-scale-active",
        "value": "1",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider"
      },
      {
        "name": "--checkerboard-dark",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".opacity-slider"
      },
      {
        "name": "--checkerboard-light",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".opacity-slider"
      },
      {
        "name": "--slider-track-background",
        "value": "linear-gradient(to right, transparent, var(--color-slider-opacity-color, rgb(0, 0, 0))),\n      repeating-linear-gradient(\n        45deg,\n        var(--checkerboard-dark),\n        var(--checkerboard-dark) 10px,\n        var(--checkerboard-light) 10px,\n        var(--checkerboard-light) 20px\n      )",
        "defaultValue": "rgb(0, 0, 0",
        "referencedVars": [
          "--color-slider-opacity-color",
          "--checkerboard-dark",
          "--checkerboard-light"
        ],
        "variant": ".opacity-slider"
      },
      {
        "name": "--thumb-border",
        "value": "white",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--thumb-background",
        "value": "white",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--slider-thumb-background",
        "value": "var(--thumb-background)",
        "defaultValue": null,
        "referencedVars": [
          "--thumb-background"
        ],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--slider-thumb-border",
        "value": "2px solid var(--thumb-border)",
        "defaultValue": null,
        "referencedVars": [
          "--thumb-border"
        ],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--slider-thumb-shadow",
        "value": "0 2px 4px rgb(0 0 0 / 0.3)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--slider-thumb-shadow-hover",
        "value": "0 2px 6px rgb(0 0 0 / 0.4)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--slider-thumb-shadow-active",
        "value": "0 1px 3px rgb(0 0 0 / 0.3)",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".opacity-slider .opacity-thumb"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".opacity-slider .opacity-thumb[data-hovered=\"true\"]"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".recent-colors .recent-color-swatch:hover"
      },
      {
        "name": "--checkerboard-dark",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".preview-swatch"
      },
      {
        "name": "--checkerboard-light",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".preview-swatch"
      },
      {
        "name": "--checkerboard-dark",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".preview"
      },
      {
        "name": "--checkerboard-light",
        "value": "var(--background-800)",
        "defaultValue": null,
        "referencedVars": [
          "--background-800"
        ],
        "variant": ".preview"
      }
    ]
  },
  "code": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    --border-color: var(--background-700);\n    --header-bg: mix(var(--background-900) 90%, transparent);\n    --scroll-track-bg: mix(var(--background-950) 50%, transparent);\n\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border-color);\n    @apply flex w-full min-w-0 flex-col overflow-hidden;\n  }\n\n  .header {\n    flex: none;\n    background-color: var(--header-bg);\n    @apply flex items-center justify-between px-3 py-1.5;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    border-bottom: 1px solid var(--border-color);\n    color: var(--foreground-400);\n  }\n\n\n  .body {\n    @apply relative flex min-h-0 flex-1 flex-col;\n    flex: 1;\n  }\n\n  .viewport { @apply overflow-hidden; }\n\n  .viewport :global(pre) {\n    background: transparent;\n    @apply m-0 p-0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background-color: var(--background-700);\n    border-radius: 9999px;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    @apply w-full;\n    overflow-x: auto;\n    background-color: var(--scroll-track-bg);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    @apply flex w-full items-center gap-3 px-4 py-2 cursor-pointer;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    border-top: 1px solid var(--border-color);\n    background: transparent;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--background-800);\n  }\n\n  .expand-icon { @apply shrink-0; color: var(--foreground-400); }\n\n  .copy-button {\n    @apply absolute right-2 top-2 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-sm);\n    color: var(--foreground-400);\n    opacity: 0;\n    transition:\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    background: transparent;\n    border: none;\n    z-index: 1;\n  }\n\n  .copy-button:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--background-800);\n    color: var(--foreground-300);\n  }\n\n  .copy-button:focus,\n  .body:hover .copy-button {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    opacity: 1;\n  }\n}\n",
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
        "name": "viewport"
      }
    ],
    "cssVariables": [
      {
        "name": "--border-color",
        "value": "var(--background-700)",
        "defaultValue": null,
        "referencedVars": [
          "--background-700"
        ],
        "variant": ".code"
      },
      {
        "name": "--header-bg",
        "value": "mix(var(--background-900) 90%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-900"
        ],
        "variant": ".code"
      },
      {
        "name": "--scroll-track-bg",
        "value": "mix(var(--background-950) 50%, transparent)",
        "defaultValue": null,
        "referencedVars": [
          "--background-950"
        ],
        "variant": ".code"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".viewport::-webkit-scrollbar-thumb:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".expand-button:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".copy-button:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".copy-button:focus,\n  .body:hover .copy-button"
      }
    ]
  },
  "checkbox": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .checkbox {\n    @apply inline-grid gap-x-3;\n    grid-template-columns: auto 1fr;\n    grid-template-rows: auto auto;\n  }\n\n  .container {\n    @apply relative inline-flex items-center justify-center;\n  }\n\n  .box {\n    @apply relative h-5 w-5 cursor-pointer appearance-none;\n\n    background-color: var(--background);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-xs, 0.25rem);\n    outline: none;\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &:hover:not([data-disabled=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-invalid=\"true\"] {\n      border-color: var(--background-error-border, var(--danger-600));\n    }\n\n    &[data-invalid=\"true\"][data-selected=\"true\"],\n    &[data-invalid=\"true\"][data-indeterminate=\"true\"] {\n      border-color: var(--background-border);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity, 0.6);\n      pointer-events: none;\n    }\n  }\n\n  .checkmark,\n  .indeterminate {\n    @apply absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--foreground);\n    pointer-events: none;\n  }\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n\n    &[data-disabled=\"true\"] {\n      @apply opacity-60 cursor-not-allowed;\n    }\n  }\n\n  .label-md {\n    font-size: var(--text-sm, 0.875rem);\n    font-weight: var(--font-weight-medium, 500);\n  }\n\n  .helper-text {\n    @apply text-xs;\n    grid-column: 2;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--helper-foreground);\n\n    &[data-error=\"true\"] {\n      color: var(--helper-error-foreground, var(--foreground-error, var(--danger-600)));\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "checkbox"
      },
      {
        "name": "\"icon-checkmark\""
      },
      {
        "name": "\"icon-indeterminate\""
      },
      {
        "name": "icon.checkmark"
      },
      {
        "name": "icon.indeterminate"
      },
      {
        "name": "label"
      },
      {
        "name": "\"helper-text\""
      }
    ],
    "cssVariables": [
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".box:hover:not([data-disabled=\"true\"])"
      }
    ]
  },
  "card": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    @apply overflow-hidden;\n    background-color: var(--background, var(--background-800));\n    color: var(--foreground, inherit);\n    border: var(--border-width-base, 1px) solid var(--background-border, var(--border));\n    border-radius: var(--radius-sm, 0.375rem);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .header {\n    @apply p-4;\n    color: var(--foreground, inherit);\n    border-bottom: var(--border-width-base, 1px) solid var(--background-border, var(--border));\n  }\n\n  .body {\n    @apply px-4 py-2;\n    color: var(--foreground, inherit);\n  }\n\n  .footer {\n    @apply px-2 py-2;\n    color: var(--foreground, inherit);\n    background-color: var(--background, var(--background-800));\n    border-top: var(--border-width-base, 1px) solid var(--background-border, var(--border));\n  }\n}\n",
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
    "cssVariables": []
  },
  "button": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply inline-flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap;\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n\n    font-weight: var(--font-weight-medium, 500);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &[data-hovered=\"true\"]:not([data-disabled=\"true\"]) {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &:focus-visible {\n      outline: none;\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      filter: grayscale(0.5);\n    }\n  }\n}\n",
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".button[data-hovered=\"true\"]:not([data-disabled=\"true\"])"
      }
    ]
  },
  "banner": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    @apply flex w-full items-start gap-3 px-4 py-3;\n    font-family: inherit;\n    font-weight: var(--font-weight-medium, 500);\n    line-height: var(--leading-normal, 1.5);\n    background-color: var(--background, var(--background-900));\n    color: var(--foreground, var(--foreground-200));\n    border: var(--border-width-base, 1px) solid var(--border, var(--background-700));\n    border-radius: var(--radius-sm, 0.375rem);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      border-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n  }\n\n  .banner:hover {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--background-hover, var(--background));\n    border-color: var(--border-hover, var(--border));\n  }\n\n  .banner[data-pressed=\"true\"] {\n    background-color: var(--background-pressed, var(--background-hover, var(--background)));\n    border-color: var(--border-pressed, var(--border-hover, var(--border)));\n  }\n\n  .content {\n    @apply min-w-0 flex flex-col gap-1;\n  }\n\n  .iconContainer {\n    @apply flex shrink-0 items-start justify-center pt-0.5;\n  }\n\n  .icon {\n    @apply h-5 w-5;\n    color: var(--icon-color, currentColor);\n  }\n\n  .dismiss {\n    @apply flex h-8 w-8 shrink-0 items-center justify-center p-0 cursor-pointer;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm, 0.375rem);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n\n    &:hover {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n      background-color: var(--dismiss-hover-background, transparent);\n    }\n\n    &[data-pressed=\"true\"] {\n      background-color: var(--dismiss-pressed-background, transparent);\n    }\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold, 600);\n    font-size: inherit;\n    line-height: var(--leading-tight, 1.25);\n    @apply my-0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-medium, 500);\n    font-size: inherit;\n    line-height: var(--leading-normal, 1.5);\n    @apply my-0;\n  }\n}\n",
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".banner:hover"
      },
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".dismiss:hover"
      }
    ]
  },
  "badge": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    @apply inline-flex items-center justify-center gap-2 select-none whitespace-nowrap px-1.5;\n    height: fit-content;\n    width: fit-content;\n    background-color: var(--background, var(--background-800));\n    color: var(--foreground, var(--foreground-200));\n    border: var(--border-width-base, 1px) solid var(--background-border, var(--background-600));\n    border-radius: var(--radius-sm, 0.375rem);\n    font-weight: var(--font-weight-semibold, 600);\n    font-size: var(--text-xs, 0.75rem);\n    line-height: var(--leading-tight, 1.25);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .pill {\n    border-radius: 9999px;\n  }\n\n  .icon {\n    @apply flex items-center shrink-0;\n  }\n\n  .dismiss {\n    @apply ml-1 flex shrink-0 items-center justify-center p-0 cursor-pointer;\n    width: 1em;\n    height: 1em;\n    line-height: 1;\n    border-radius: var(--radius-xs, 0.25rem);\n    background-color: var(--dismiss-background, var(--background, transparent));\n    color: var(--foreground, var(--foreground-400));\n    border: none;\n    transition:\n      opacity var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    outline: none;\n  }\n\n  .dismiss svg {\n    width: 100%;\n    height: 100%;\n  }\n\n  .dismiss[data-hovered=\"true\"] {\n    --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    background-color: var(--background-hover, var(--dismiss-background, transparent));\n  }\n\n  .dismiss[data-pressed=\"true\"] {\n    background-color: var(\n      --background-pressed,\n      var(--background-hover, var(--dismiss-background, transparent))\n    );\n    transform: scale(0.95);\n  }\n\n  .dismiss[data-focus-visible=\"true\"] {\n    box-shadow: 0 0 0 1.5px var(--focus-visible, var(--foreground));\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "icon.left"
      },
      {
        "name": "icon.right"
      },
      {
        "name": "iconLeft"
      },
      {
        "name": "iconRight"
      },
      {
        "name": "dismiss"
      }
    ],
    "cssVariables": [
      {
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".dismiss[data-hovered=\"true\"]"
      }
    ]
  },
  "anchor": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .preview, .anchor {\n    display: inline\n  }\n\n  .root {\n    @apply inline-block relative cursor-pointer;\n    display: inline-block;\n    color: var(--foreground, currentColor);\n    text-decoration: none;\n\n    &[data-hovered=\"true\"]:not([data-disabled=\"true\"]) .underline {\n      --hover-transition-duration: var(--hover-transition-enter-duration, 0ms);\n    }\n\n    &[data-focus-visible=\"true\"] {\n      outline: 2px solid var(--focus-visible, var(--focus-ring));\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    @apply absolute left-0 right-0 bottom-0 h-px;\n    background-color: var(--underline-background, var(--background-600));\n    transform-origin: right;\n    transform: scaleX(1);\n    transition:\n      background-color var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out)),\n      transform var(--hover-transition-duration, var(--hover-transition-leave-duration, 300ms)) var(--hover-transition-timing-function, var(--ease-snappy-pop, ease-out));\n    pointer-events: none;\n  }\n\n  .preview {\n  }\n}\n",
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
        "name": "--hover-transition-duration",
        "value": "var(--hover-transition-enter-duration, 0ms)",
        "defaultValue": "0ms",
        "referencedVars": [
          "--hover-transition-enter-duration"
        ],
        "variant": ".root[data-hovered=\"true\"]:not([data-disabled=\"true\"]) .underline"
      }
    ]
  }
};
