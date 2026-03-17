// This file is auto-generated. Do not edit.
export const generatedStyles: Record<string, { rawCss: string; styleableParts: Array<{ name: string }>; cssVariables: Array<{ name: string; value: string; defaultValue?: string; referencedVars: string[]; variant?: string | null }> }> = {
  "tooltip": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    @apply inline-block;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--tooltip-fill);\n    --frame-stroke-color: var(--tooltip-border-color);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .content[data-instant],\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1;\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    @apply whitespace-nowrap;\n  }\n\n  .frame[data-hint] {\n    @apply pr-1;\n  }\n}\n",
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
        "name": "hintBadge"
      }
    ],
    "cssVariables": [
      {
        "name": "--frame-fill",
        "value": "var(--tooltip-fill)",
        "defaultValue": null,
        "referencedVars": [
          "--tooltip-fill"
        ],
        "variant": ".content"
      },
      {
        "name": "--frame-stroke-color",
        "value": "var(--tooltip-border-color)",
        "defaultValue": null,
        "referencedVars": [
          "--tooltip-border-color"
        ],
        "variant": ".content"
      }
    ]
  },
  "toast": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    @apply flex w-full max-w-[28rem] items-start gap-3 px-4 py-2.5 select-none;\n    background: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: var(--shadow);\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-normal);\n    touch-action: pan-y;\n  }\n\n  .icon {\n    @apply mr-4 mt-2 h-5 w-5 shrink-0;\n    color: var(--icon-color);\n  }\n\n  .content {\n    @apply min-w-0 flex-1;\n  }\n\n  .title {\n    @apply m-0;\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-sm);\n    line-height: var(--leading-tight);\n    color: var(--title-color);\n  }\n\n  .description {\n    @apply mt-1 mb-0;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    line-height: var(--leading-normal);\n    color: var(--description-color);\n  }\n\n  .close {\n    @apply flex shrink-0 items-center justify-center p-2 cursor-pointer;\n    background: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    color: var(--close-color);\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n        background: var(--close-hover-background);\n      }\n    }\n  }\n}\n",
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
        "name": "close"
      },
      {
        "name": "icon"
      }
    ],
    "cssVariables": []
  },
  "textarea": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    --disabled-opacity: 0.6;\n\n    @apply block w-full px-3 py-2;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-sizing: border-box;\n    resize: none;\n    outline: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    &[data-resize-axis=\"x\"],\n    &[data-resize-axis=\"both\"] {\n      padding-inline-end: calc(var(--textarea-padding-x) + 1rem);\n    }\n\n    &[data-resize-axis=\"y\"],\n    &[data-resize-axis=\"both\"] {\n      padding-block-end: calc(var(--textarea-padding-y) + 1rem);\n    }\n\n    &[data-scroll=\"true\"] {\n      overflow: hidden;\n      resize: none;\n      background: transparent;\n      border: none;\n      border-radius: 0;\n      box-shadow: none;\n\n      &[data-active],\n      &[data-focus-visible] {\n        border-color: transparent;\n        box-shadow: none;\n      }\n\n      &[data-disabled] {\n        background-color: transparent;\n        opacity: 1;\n      }\n\n      &[data-error] {\n        border-color: transparent;\n\n        &[data-active] {\n          border-color: transparent;\n          box-shadow: none;\n        }\n      }\n    }\n  }\n\n  .surface {\n    @apply relative w-full;\n  }\n\n  .resize-handle {\n    position: absolute;\n    z-index: 1;\n    touch-action: none;\n    user-select: none;\n\n    &::before {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &::after {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &:hover::before,\n    &:hover::after {\n      background-color: var(--resize-handle-color-hover);\n    }\n\n    &[data-axis=\"both\"] {\n      right: 3px;\n      bottom: 3px;\n      width: 1.5rem;\n      height: 1.5rem;\n      cursor: nwse-resize;\n\n      &::before {\n        bottom: 0.35rem;\n        right: 0.15rem;\n        width: 0.5rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n\n      &::after {\n        bottom: 0.6rem;\n        right: 0.2rem;\n        width: 1.0rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n    }\n\n    &[data-axis=\"x\"] {\n      top: 50%;\n      right: 0;\n      width: 0.75rem;\n      height: 2rem;\n      cursor: ew-resize;\n      transform: translateY(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 0.125rem;\n        height: 1.5rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n\n    &[data-axis=\"y\"] {\n      left: 50%;\n      bottom: 0;\n      width: 2rem;\n      height: 0.75rem;\n      cursor: ns-resize;\n      transform: translateX(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 1.5rem;\n        height: 0.125rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n  }\n\n  .scroll-wrapper {\n    --disabled-opacity: 0.6;\n\n    @apply w-full overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    --textarea-padding-x: 0.5rem;\n    --textarea-padding-y: 0.25rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    font-size: var(--text-xs);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    --textarea-padding-x: 1rem;\n    --textarea-padding-y: 0.75rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    @apply w-full;\n  }\n\n  .character-count {\n    font-size: var(--text-xs);\n    color: var(--character-count-color);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .character-count[data-over-limit] {\n    color: var(--character-count-over-limit-color);\n  }\n}\n",
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
        "name": "--textarea-padding-x",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea"
      },
      {
        "name": "--textarea-padding-y",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".scroll-wrapper"
      },
      {
        "name": "--textarea-padding-x",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"sm\"]"
      },
      {
        "name": "--textarea-padding-y",
        "value": "0.25rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"sm\"]"
      },
      {
        "name": "--textarea-padding-x",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"md\"]"
      },
      {
        "name": "--textarea-padding-y",
        "value": "0.5rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"md\"]"
      },
      {
        "name": "--textarea-padding-x",
        "value": "1rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"lg\"]"
      },
      {
        "name": "--textarea-padding-y",
        "value": "0.75rem",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".textarea[data-size=\"lg\"]"
      }
    ]
  },
  "tabs": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    @apply flex w-full flex-col;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .list {\n    @apply relative flex w-full flex-row items-center gap-3 py-1;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--list-border-color);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    --indicator-padding: 2px;\n\n    @apply absolute;\n    background-color: var(--indicator-background);\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n\n  .indicator-underline {\n    border-radius: 0;\n  }\n\n  .trigger {\n    @apply relative z-[1] flex shrink-0 items-center justify-center gap-2 rounded-sm px-2 py-1.5 cursor-pointer select-none;\n    background-color: transparent;\n    border: none;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--trigger-color);\n    outline: none;\n    transition: color 0.15s ease, background-color 0.15s ease;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--trigger-hover-color);\n      }\n\n      &:active {\n        color: var(--trigger-active-color);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--trigger-selected-color);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      .list & {\n        background-color: var(--trigger-selected-background);\n      }\n\n      .list[data-variant=\"underline\"] & {\n        background-color: transparent;\n        border-bottom-color: var(--trigger-underline-color);\n      }\n\n      .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--trigger-underline-color);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--trigger-focus-background);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      --disabled-opacity: 0.5;\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .list[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      border-left-color: var(--trigger-underline-color);\n      border-bottom: none;\n    }\n  }\n\n  .trigger-icon {\n    @apply flex h-4 w-4 shrink-0 items-center justify-center;\n  }\n\n  .content {\n    @apply w-full p-0 outline-none;\n    flex: 1;\n    padding-top: 1rem;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--content-outline-color);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .list {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .trigger {\n      @apply px-1 py-1;\n      font-size: var(--text-xs);\n\n      .list[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
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
  "switch": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --radius: 9999px;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    --width: 2.75rem;\n    --height: 1.5rem;\n    --thumb-size: 1rem;\n    --thumb-offset: 0.25rem;\n\n    --disabled-opacity: 0.6;\n\n    @apply relative inline-flex cursor-pointer items-center;\n    user-select: none;\n    width: var(--width);\n    height: var(--height);\n  }\n\n  .switch-track {\n    @apply absolute inset-0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop), transform 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    @apply absolute top-0 bottom-0 my-auto;\n    left: var(--thumb-offset);\n    width: var(--thumb-size);\n    height: var(--thumb-size);\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--border-checked);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n    left: calc(var(--width) - var(--thumb-size) - var(--thumb-offset));\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n\n\n  .switch[data-focus-visible] {\n    box-shadow: var(--focus-ring);\n  }\n\n  .switch-sm {\n    --width: 1.75rem;\n    --height: 1rem;\n    --thumb-size: 0.625rem;\n    --thumb-offset: 0.1875rem;\n  }\n}\n",
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex w-full items-center;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] { @apply h-6; }\n  .slider[data-size=\"md\"] { @apply h-8; }\n  .slider[data-size=\"lg\"] { @apply h-10; }\n\n  .slider[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n\n    @apply relative flex grow items-center;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: var(--radius-xs);\n    background-color: var(--slider-track-background);\n  }\n\n  .slider[data-size=\"sm\"] .track { height: var(--track-height-sm); }\n  .slider[data-size=\"md\"] .track { height: var(--track-height-md); }\n  .slider[data-size=\"lg\"] .track { height: var(--track-height-lg); }\n\n  .range {\n    @apply absolute h-full;\n    background-color: var(--slider-range-background-default);\n    transition: background-color 200ms var(--ease-snappy-pop);\n    border-radius: var(--radius-xs);\n  }\n\n  .slider[data-disabled] .range { background-color: var(--slider-range-background-disabled); }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n\n    @apply absolute block;\n    background-color: var(--slider-thumb-background-default);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .slider[data-disabled] .thumb {\n    background-color: var(--slider-thumb-background-disabled);\n    cursor: not-allowed;\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--slider-thumb-background-focus);\n    box-shadow: 0 0 0 3px var(--slider-thumb-ring);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --disabled-opacity: 0.5;\n\n    --padding-x: calc(var(--spacing) * 2.00);\n    --padding-y: calc(var(--spacing) * 1.75);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n\n    @apply p-0 gap-0 w-full flex-row items-center;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--border-color);\n    border-radius: var(--radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n\n    @apply select-none cursor-pointer;\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: var(--pressed-background);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: var(--hover-background);\n    }\n  }\n\n  .trigger {\n    @apply flex items-stretch flex-1 gap-0 w-full h-full min-h-0;\n\n    background: transparent;\n\n    @apply border-none cursor-pointer select-none;\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section,\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: var(--hover-background);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 2px var(--focus-ring-background), 0 0 0 4px var(--ring-color);\n      @apply outline-none;\n    }\n\n    :global(.group) &:focus-visible {\n      @apply outline-none;\n    }\n  }\n\n  button.trigger { @apply p-0; }\n\n  .value-section {\n    @apply flex items-center flex-1 min-w-0 gap-0.5;\n\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    @apply flex items-center justify-center shrink-0;\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    @apply flex items-center justify-center w-4 h-4 opacity-70;\n    transition: transform 0.2s ease;\n  }\n\n  .select[aria-expanded=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    @apply flex items-center flex-1 min-w-0 gap-2 bg-transparent border-none p-0;\n    cursor: inherit;\n  }\n\n  .value-icon {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n    color: var(--foreground);\n  }\n\n  .value-text {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .content,\n  .sub-content {\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    overflow: hidden;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n  }\n\n  .content {\n    position: absolute;\n    z-index: 50000;\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] { animation: slide-in-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"open\"][data-placement=\"top\"] { animation: slide-in-from-bottom 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"bottom\"] { animation: slide-out-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"top\"] { animation: slide-out-from-bottom 0.15s var(--ease-snappy-pop); }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    --item-padding-x: var(--padding-x);\n    --item-padding-y: calc(var(--padding-y) * 1.15);\n\n    @apply flex items-center gap-2 outline-none cursor-default select-none;\n    padding: var(--item-padding-y) var(--item-padding-x);\n\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-foreground);\n\n    &[data-selected=\"true\"] {\n      color: var(--item-foreground);\n    }\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n    &[data-highlighted=\"true\"] {\n      background-color: var(--item-background-hover);\n    }\n  }\n\n  .item-content {\n    @apply flex flex-col flex-1 min-w-0;\n  }\n\n  .item-text {\n    @apply flex-1 overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-description-color);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-icon, .item-indicator {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n  }\n\n  .item-icon { color: var(--item-icon-color); }\n  .item-indicator { color: var(--item-indicator-color); margin-left: auto; }\n\n  .item-with-description { @apply items-start py-2; }\n  .item-icon-with-description, .item-indicator-with-description { @apply mt-0.5; }\n\n  .separator {\n    @apply my-1 -mx-1 h-px;\n    background-color: var(--content-border); /* Reuses content border var */\n  }\n\n  .placeholder {\n    color: var(--placeholder-color);\n  }\n\n  .icon-prefix {\n    @apply inline-flex items-center shrink-0;\n  }\n\n  .select[data-mode=\"multiple\"] .item { gap: 0.5rem; }\n\n  .search-trigger {\n    @apply flex items-stretch relative bg-transparent cursor-text;\n    border-radius: var(--inner-radius);\n    transition: box-shadow 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop);\n\n    @media (hover: hover) {\n      &:not([data-disabled]):hover .search-icon-section,\n      &:not([data-disabled]):hover .search-value-section {\n        background-color: transparent;\n      }\n    }\n\n    &:focus-within {\n      @apply outline-none;\n      box-shadow: 0 0 0 1px var(--search-focus-ring);\n      z-index: 1;\n    }\n  }\n\n  .search-value-section {\n    @apply p-0;\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n  }\n\n  .search-trigger-input {\n    padding: var(--padding-y) calc(var(--padding-x) * 1.50);\n    @apply border-none rounded-none shadow-none bg-transparent;\n\n    &[data-active], &[data-focus-visible] {\n      @apply border-none shadow-none;\n    }\n  }\n\n  .search-content-input {\n    padding-inline: calc(var(--padding-x) * 1.50);\n    @apply border-none rounded-none bg-transparent;\n  }\n\n  .search-icon-section {\n    @apply relative px-0 bg-transparent;\n    padding-block: var(--padding-y);\n  }\n\n  .search-trigger[data-placement=\"top\"] .search-icon-section {\n    border-top: none;\n  }\n\n  .search-trigger:focus-within .search-icon-section {\n    border-color: var(--search-focus-ring);\n  }\n\n  .search-wrapper {\n    @apply overflow-hidden;\n    border-bottom: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .content[data-placement=\"top\"] .search-wrapper {\n    border-radius: 0;\n    border-bottom: none;\n    border-top: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .sub-trigger {\n    --subtrigger-padding-x: var(--padding-x);\n    --subtrigger-padding-y: var(--padding-y);\n\n    @apply flex items-center gap-2 cursor-default select-none outline-none;\n    padding: var(--subtrigger-padding-y) var(--subtrigger-padding-x);\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--subtrigger-foreground);\n\n    &[data-highlighted=\"true\"],\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: var(--subtrigger-background-hover);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply shrink-0 ml-auto w-4 h-4 opacity-60;\n  }\n\n  .sub-content {\n    position: absolute;\n    z-index: 50001;\n    min-width: 160px;\n    max-width: 320px;\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-in-from-bottom { from { opacity: 0; translate: 0 2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-from-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n  @keyframes slide-out-from-bottom { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 2px; } }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".select"
      },
      {
        "name": "--padding-x",
        "value": "calc(var(--spacing) * 2.00)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".select"
      },
      {
        "name": "--padding-y",
        "value": "calc(var(--spacing) * 1.75)",
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
        "value": "calc(var(--radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--radius",
          "--border-width-base"
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
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--padding-y",
        "value": "var(--spacing)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".content,\n  .sub-content"
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
        "value": "calc(var(--padding-y) * 1.15)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-y"
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
        "variant": ".sub-trigger"
      },
      {
        "name": "--subtrigger-padding-y",
        "value": "var(--padding-y)",
        "defaultValue": null,
        "referencedVars": [
          "--padding-y"
        ],
        "variant": ".sub-trigger"
      }
    ]
  },
  "scroll": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal { --scrollbar-height: 12px; }\n\n  .content {\n    @apply h-full w-full;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar,\n  .horizontal .content::-webkit-scrollbar { display: none; }\n\n  .track {\n    @apply absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: var(--track-background);\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: var(--track-background);\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--thumb-background);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover { background-color: var(--thumb-hover-background); }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--thumb-dragging-background);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover,\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover,\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    @apply flex flex-col gap-3;\n  }\n\n  .radio-item {\n    @apply flex items-start gap-3 cursor-pointer select-none;\n  }\n\n  .radio-input {\n    @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer\n  }\n\n  .radio {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: var(--ring-color);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    @apply cursor-pointer;\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground);\n    font-size: inherit;\n    line-height: inherit;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled);\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper);\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error);\n  }\n  /* Size variants */\n  .radio.sm {\n    @apply h-4 w-4;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    @apply h-5 w-5;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    @apply h-6 w-6;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
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
      }
    ]
  },
  "popover": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    @apply inline-block;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--popover-fill);\n    --frame-stroke-color: var(--popover-border-color);\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n    pointer-events: none;\n    min-width: 200px;\n    max-width: 400px;\n    padding: 0.75rem;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1;\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    @apply whitespace-nowrap;\n  }\n}\n",
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
    "cssVariables": [
      {
        "name": "--frame-fill",
        "value": "var(--popover-fill)",
        "defaultValue": null,
        "referencedVars": [
          "--popover-fill"
        ],
        "variant": ".content"
      },
      {
        "name": "--frame-stroke-color",
        "value": "var(--popover-border-color)",
        "defaultValue": null,
        "referencedVars": [
          "--popover-border-color"
        ],
        "variant": ".content"
      }
    ]
  },
  "progress": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    @apply relative w-full overflow-hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm { height: 0.25rem; }\n  .progress.md { height: 0.5rem; }\n  .progress.lg { height: 0.75rem; }\n\n  .fill {\n    @apply h-full;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    @apply w-full;\n  }\n\n  .wrapper.has-label {\n    @apply space-y-1;\n  }\n\n  .label-row {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "['label-row']"
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
  "path": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .path {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --disabled-opacity: 0.6;\n\n    @apply block;\n  }\n\n  .path-list {\n    list-style: none;\n    @apply m-0 flex flex-wrap items-center gap-2 p-0;\n    flex-wrap: wrap;\n  }\n\n  .path-list.with-custom-separator .path-item:not(:last-child)::after {\n    content: none;\n  }\n\n  .path-item {\n    @apply m-0 flex items-center gap-2 p-0;\n  }\n\n  /* Separator after each item except the last */\n  .path-item:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    @apply m-0 flex items-center p-0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .path-item-link {\n    @apply relative cursor-pointer rounded-sm px-2 py-1;\n    color: var(--foreground);\n    text-decoration: none;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    line-height: 1.5;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
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
      },
      {
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".path"
      }
    ]
  },
  "panel": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    @apply flex h-full w-full min-h-0 min-w-0 flex-row;\n    background: inherit;\n  }\n\n  .panel[data-stacked=\"true\"] { flex-direction: column; }\n\n  .header,\n  .footer {\n    @apply shrink-0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    @apply flex min-h-0 min-w-0;\n    flex: 1;\n    overflow: auto;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    @apply shrink-0 overflow-hidden;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    @apply flex items-center;\n  }\n\n  /* Group */\n  .group {\n    @apply flex w-full h-full;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] { flex-direction: column; }\n\n  /* Resize handle */\n  .resize {\n    @apply relative shrink-0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before,\n  .resize[data-resizing=\"true\"]::before { width: 2px; }\n\n  .resize[data-direction=\"vertical\"]:hover::before,\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone,\n  .spacing-none { gap: 0; }\n\n  .spacingSm,\n  .spacing-sm { gap: var(--spacing-sm, 0.5rem); }\n\n  .spacingMd,\n  .spacing-md { gap: var(--spacing-md, 1rem); }\n\n  .spacingLg,\n  .spacing-lg { gap: var(--spacing-lg, 1.5rem); }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked { flex-direction: column; }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "page": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    @apply flex flex-col w-full relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    @apply items-center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .padding-none { padding: 0; }\n\n  .padding-sm { padding: var(--spacing-sm, 0.5rem); }\n\n  .padding-md { padding: var(--spacing-md, 1rem); }\n\n  .padding-lg { padding: var(--spacing-lg, 1.5rem); }\n\n  .padding-xl { padding: var(--spacing-xl, 2rem); }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "modal": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --disabled-opacity: 0.5;\n  }\n\n  .backdrop {\n    @apply absolute inset-0 cursor-pointer;\n    background-color: var(--backdrop-background);\n    backdrop-filter: blur(4px);\n  }\n\n  .modal {\n    @apply relative flex w-full flex-col overflow-hidden;\n    z-index: 1;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-background);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-sm);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  .header {\n    @apply flex shrink-0 items-center justify-between gap-2 px-6 py-4;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    @apply m-0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close {\n    @apply ml-auto flex items-center justify-center cursor-pointer;\n    background: none;\n    border: none;\n    color: var(--modal-close-color);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .close:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .close:active {\n    transform: scale(0.92);\n  }\n\n  .close:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    @apply h-5 w-5;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n    transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply flex shrink-0 items-center justify-between gap-4 px-6 py-4;\n    background-color: var(--footer-background);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".overlay"
      }
    ]
  },
  "menu": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .content,\n  .sub-content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    --menu-animation: none;\n    --disabled-opacity: 0.5;\n  }\n\n  .trigger {\n    &[data-type=\"pop-over\"][data-active] {\n      opacity: 1 !important;\n      background-color: var(--background-700);\n    }\n  }\n\n  .content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--background-900);\n    border: var(--border-width-base, 1px) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item,\n  .checkbox-item,\n  .radio-item {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    &[data-highlighted] {\n      background-color: mix(var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .item,\n  .sub-trigger {\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .item-indicator {\n    @apply ml-auto flex h-4 w-4 shrink-0 items-center justify-center;\n    color: var(--accent-300);\n  }\n\n  .sub-trigger {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    &[data-highlighted] {\n      background-color: mix(var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: mix(var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply ml-auto h-4 w-4 shrink-0;\n  }\n\n  .sub-content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--background-900);\n    border: var(--border-width-base, 1px) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    @apply -mx-1 my-1 h-px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-400);\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-to-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n}\n",
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
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--radius",
        "value": "var(--radius-sm, 0.375rem)",
        "defaultValue": "0.375rem",
        "referencedVars": [
          "--radius-sm"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--inner-radius",
        "value": "calc(var(--radius) - var(--border-width-base, 1px))",
        "defaultValue": "1px",
        "referencedVars": [
          "--radius",
          "--border-width-base"
        ],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--menu-animation",
        "value": "none",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".content,\n  .sub-content"
      },
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".content,\n  .sub-content"
      }
    ]
  },
  "mask": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    @apply relative h-full w-full;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "list": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply mx-auto;\n    max-width: 28rem;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    @apply flex items-center justify-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky { position: sticky; top: 0; }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--header-title-color);\n  }\n\n  .header > :last-child { color: var(--header-subtitle-color); }\n\n  .item {\n    @apply flex flex-row items-center gap-3 px-2 py-1 cursor-pointer;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox,\n  .control,\n  .media {\n    @apply flex items-center justify-center flex-shrink-0;\n  }\n\n  .control { margin-left: auto; }\n\n  .media {\n    @apply h-8 w-8;\n  }\n\n  .desc {\n    font-size: var(--text-xs);\n    color: var(--desc-color);\n    @apply truncate;\n  }\n\n  .action-group {\n    @apply flex items-center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] { justify-content: space-between; }\n  .action-group[data-justify=\"flex-start\"] { justify-content: flex-start; }\n  .action-group[data-justify=\"flex-end\"] { justify-content: flex-end; }\n\n  .actions {\n    align-items: center;\n    gap: 0.25rem;\n    margin-left: auto;\n    flex-shrink: 0;\n    @apply p-1.5 hidden group-hover:flex;\n  }\n\n  .action {\n    @apply flex items-center justify-center;\n    border-radius: 0.25rem;\n    color: var(--action-color);\n    @apply p-2;\n  }\n\n  .action:hover {\n    background-color: var(--background-hover);\n    color: var(--action-hover-color);\n  }\n\n  .footer {\n    @apply flex p-6 pb-12;\n  }\n\n  .footer[data-align=\"center\"] { justify-content: center; }\n  .footer[data-align=\"flex-start\"] { justify-content: flex-start; }\n  .footer[data-align=\"flex-end\"] { justify-content: flex-end; }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "label": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .label {\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n    transition: color 150ms ease;\n\n    &[data-size=\"sm\"] { font-size: var(--text-xs); }\n    &[data-size=\"lg\"] { font-size: var(--text-md); }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &[data-error] {\n      color: var(--error-foreground);\n    }\n  }\n\n  .required-indicator {\n    margin-left: 0.25rem;\n    color: var(--required-color);\n  }\n\n  .helper-text {\n    display: block;\n    font-size: var(--text-xs);\n    margin-top: 0.25rem;\n    transition: color 150ms ease;\n    color: var(--helper-color);\n\n    &[data-error] {\n      color: var(--helper-error-color);\n    }\n  }\n}\n",
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
    "cssVariables": []
  },
  "input": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --disabled-opacity: 0.5;\n\n    @apply block w-full px-3 py-2;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    outline: none;\n    box-sizing: border-box;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), background-color 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--ring-color);\n      /* box-shadow: 0 0 0 3px mix(var(--ring-color) 20%, transparent); */\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .icon-wrapper {\n    @apply absolute top-1/2 z-10 flex -translate-y-1/2 items-center;\n    color: var(--icon-color);\n    pointer-events: none;\n  }\n\n  .prefix-icon { left: 0.60rem; }\n\n  .suffix-icon { right: 1.00rem; }\n\n  .container {\n    @apply relative w-full;\n  }\n\n  .number-controls {\n    @apply absolute inset-y-0 right-0 z-10 flex w-6 flex-col;\n    pointer-events: auto;\n  }\n\n  .number-controls.disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    @apply flex w-full flex-1 items-center justify-center p-0 cursor-pointer;\n    flex: 1;\n    background-color: transparent;\n    border: none;\n    color: var(--spin-color);\n    transition: color 150ms ease-out, background-color 150ms ease-out;\n\n    &:hover:not(:disabled) {\n      background-color: var(--spin-hover-background);\n      color: var(--spin-hover-color);\n    }\n\n    &:active:not(:disabled) {\n      background-color: var(--spin-active-background);\n      color: var(--spin-active-color);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".input"
      }
    ]
  },
  "group": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n\n    @apply flex overflow-hidden;\n    width: fit-content;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    \n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    padding: var(--padding);\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    @apply flex-row items-stretch;\n  }\n\n  .group.vertical {\n    @apply flex-col;\n  }\n\n  /* Spacing */\n  .group.none {\n    --padding: 0;\n    @apply gap-0;\n  }\n\n  .group.xs {\n    --radius-basis: calc(var(--spacing) * 0.875);\n    --padding: var(--radius-basis);\n    @apply space-x-0.5;\n  }\n\n  .group.sm {\n    --radius-basis: calc(var(--spacing) * 1.25);\n    --padding: var(--radius-basis);\n    @apply space-x-1;\n  }\n\n  /* Variants */\n  .group.ghost {\n    border: none;\n    overflow: visible;\n    @apply gap-1;\n  }\n\n  .item {\n    @apply flex min-w-0 items-stretch;\n  }\n\n  .item.grow {\n    flex: 1;\n  }\n\n  .group:not(.ghost) .item .group-item,\n  .group:not(.ghost) .group-input-wrapper input,\n  .group:not(.ghost) .item .group-select-wrapper {\n    border: none;\n  }\n\n  .group.none:not(.ghost) .item .group-item,\n  .group.none:not(.ghost) .group-input-wrapper input,\n  .group.none:not(.ghost) .item .group-select-wrapper,\n  .group.none:not(.ghost) .item .trigger {\n    border-radius: 0;\n  }\n\n  .group.none:not(.ghost) .item .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n  }\n\n  .group.xs:not(.ghost) .item .group-item,\n  .group.xs:not(.ghost) .item .trigger,\n  .group.xs:not(.ghost) .group-select-wrapper .group-item,\n  .group.xs:not(.ghost) .group-select-wrapper .trigger,\n  .group.xs:not(.ghost) .group-input-wrapper input,\n  .group.sm:not(.ghost) .item .group-item,\n  .group.sm:not(.ghost) .item .trigger,\n  .group.sm:not(.ghost) .group-select-wrapper .group-item,\n  .group.sm:not(.ghost) .group-select-wrapper .trigger,\n  .group.sm:not(.ghost) .group-input-wrapper input {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .group-item {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .group-item {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .item.divider {\n    @apply flex items-stretch p-0;\n  }\n\n  .item.divider > [role=\"separator\"] {\n    @apply h-full w-full;\n  }\n\n  .group.horizontal .item.divider {\n    margin-top: calc(var(--padding) * -1);\n    margin-bottom: calc(var(--padding) * -1);\n  }\n\n  .group.vertical .item.divider {\n    margin-left: calc(var(--padding) * -1);\n    margin-right: calc(var(--padding) * -1);\n  }\n\n  .group.ghost:not(.none) .item .group-item:not(.active) {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border: var(--border-width-base) solid transparent;\n  }\n\n  /* ghost + none: flat children — no borders or radius */\n  .group.ghost.none {\n    @apply gap-0;\n  }\n\n  .group.ghost.none .item .group-item,\n  .group.ghost.none .group-item.active {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-input-wrapper input {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n    border: none;\n    border-radius: 0;\n  }\n\n  .group:not(.ghost) .item .group-item:focus-visible,\n  .group:not(.ghost) .item .trigger:focus-visible,\n  .group-input-wrapper input:focus-visible {\n    outline: none;\n    box-shadow: inset 0 0 0 1px var(--focus-ring-color);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group.ghost .item .group-item:focus-visible,\n  .group.ghost .item .trigger:focus-visible {\n    outline: none;\n    box-shadow: 0 0 0 1px var(--focus-ring-color);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group-input-wrapper {\n    @apply flex h-full items-stretch;\n    flex: 1;\n    overflow: visible;\n  }\n\n  .group-input-wrapper input {\n    height: 100%;\n  }\n\n  .item .group-item {\n    @apply flex h-full;\n  }\n\n  .group.vertical .item .group-item {\n    @apply w-full;\n  }\n\n  .group.xs .item button.group-item {\n    padding: calc(var(--spacing) * 1.00) calc(var(--spacing) * 1.50);\n  }\n\n  .group.sm .item button.group-item {\n    padding: calc(var(--spacing) * 1.50) calc(var(--spacing) * 2.00);\n  }\n\n  .group.none .item button.group-item {\n    padding: calc(var(--spacing) * 2.00) calc(var(--spacing) * 2.50);\n  }\n\n  .group-select-wrapper {\n    @apply flex items-stretch p-0;\n    border: none;\n    background-color: transparent;\n  }\n\n  .group.none:not(.ghost) .trigger {\n    border-radius: 0;\n  }\n\n  .trigger {\n    border: none;\n  }\n\n  .group-select-wrapper .select {\n    @apply h-full w-full;\n  }\n\n  .group-item.active {\n    @apply relative;\n  }\n\n  .group.ghost .group-item.active {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group:not(.ghost) .group-item.active {\n    background-color: var(--active-background);\n    font-weight: 500;\n  }\n}\n",
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
        "name": "--padding",
        "value": "0",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".group.none"
      },
      {
        "name": "--radius-basis",
        "value": "calc(var(--spacing) * 0.875)",
        "defaultValue": null,
        "referencedVars": [
          "--spacing"
        ],
        "variant": ".group.xs"
      },
      {
        "name": "--padding",
        "value": "var(--radius-basis)",
        "defaultValue": null,
        "referencedVars": [
          "--radius-basis"
        ],
        "variant": ".group.xs"
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    @apply grid w-full;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap { row-gap: var(--grid-row-gap); }\n  .grid.has-col-gap { column-gap: var(--grid-col-gap); }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "gallery": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    @apply flex flex-col border overflow-hidden no-underline cursor-pointer;\n\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    color: inherit;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    @apply flex-row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n\n    @apply relative overflow-hidden;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n  }\n\n  .view > img,\n  .view > video {\n    @apply w-full h-full object-cover;\n  }\n\n  .body {\n    @apply flex flex-col gap-1 p-3 self-start min-w-0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--title-color);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--description-color);\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": [
      {
        "name": "--aspect-ratio",
        "value": "var(--gallery-aspect-ratio, 16/9)",
        "defaultValue": "16/9",
        "referencedVars": [
          "--gallery-aspect-ratio"
        ],
        "variant": ".view"
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    @apply flex w-full flex-row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n  }\n\n  /* Direction variants */\n  .flex.row { flex-direction: row; }\n  .flex.column { flex-direction: column; }\n\n  /* Wrap variants */\n  .flex.wrap { flex-wrap: wrap; }\n  .flex.nowrap { flex-wrap: nowrap; }\n\n  /* Gap variants */\n  .flex.gap-xs { gap: var(--spacing-xs); }\n  .flex.gap-sm { gap: var(--spacing-sm); }\n  .flex.gap-md { gap: var(--spacing-md); }\n  .flex.gap-lg { gap: var(--spacing-lg); }\n  .flex.gap-xl { gap: var(--spacing-xl); }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start { justify-content: flex-start; }\n  .flex.justify-flex-end { justify-content: flex-end; }\n  .flex.justify-center { justify-content: center; }\n  .flex.justify-space-between { justify-content: space-between; }\n  .flex.justify-space-around { justify-content: space-around; }\n  .flex.justify-space-evenly { justify-content: space-evenly; }\n\n  /* Align-items variants */\n  .flex.align-flex-start { align-items: flex-start; }\n  .flex.align-flex-end { align-items: flex-end; }\n  .flex.align-center { align-items: center; }\n  .flex.align-stretch { align-items: stretch; }\n  .flex.align-baseline { align-items: baseline; }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    @apply w-full;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      }
    ],
    "cssVariables": []
  },
  "expand": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --disabled-opacity: 0.6;\n\n    @apply flex flex-col;\n  }\n\n  .expand[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply flex w-full items-stretch justify-between p-0 text-left cursor-pointer;\n\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--trigger-foreground);\n    background-color: var(--trigger-background);\n\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n\n  .icon {\n    @apply flex shrink-0 items-center justify-center px-3 py-2;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > *,\n  .icon[data-expanded=\"true\"] > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    @apply flex-row-reverse items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    @apply flex-row items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .content-inner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    @apply flex flex-1 min-w-0 items-center overflow-hidden py-2 pl-3;\n\n    font-weight: var(--font-weight-medium);\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    @apply grid overflow-hidden;\n    grid-template-rows: 0fr;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .content-inner {\n    @apply min-h-0 overflow-hidden;\n    color: var(--content-foreground);\n    background-color: var(--content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".expand"
      }
    ]
  },
  "date": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --disabled-opacity: 0.5;\n\n    @apply inline-flex flex-col overflow-hidden gap-0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .day-headers {\n    @apply grid gap-2 px-4 pt-3 pb-1;\n    grid-template-columns: repeat(7, 1fr);\n    background: var(--day-headers-background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n  }\n\n  .day-header {\n    @apply flex items-center justify-center;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-xs);\n    color: var(--day-header-color);\n  }\n\n  .header {\n    @apply flex items-center justify-between gap-4 pl-2 pr-1.5 py-1.5;\n    color: var(--header-color);\n  }\n\n  .month-year {\n    @apply ml-2;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .nav-button {\n    @apply inline-flex min-h-8 min-w-8 items-center justify-center cursor-pointer;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--nav-button-color);\n    border: 1px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 500;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .nav-button:hover { background-color: var(--nav-button-background-hover); }\n\n  .nav-button:focus-visible {\n    background: var(--nav-button-background-hover);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    @apply grid gap-1 px-4 pb-4;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    background: var(--grid-background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n  }\n\n  .day-cell {\n    --cell-background: transparent;\n\n    @apply flex min-h-8 items-center justify-center px-2.5 py-2 cursor-pointer;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-background);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 400;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .week-header {\n    display: none;\n  }\n\n  .week-number {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.day-cell[data-selected=\"true\"] {\n  font-weight: 500;\n}\n\n.day-cell[data-today=\"true\"] {\n  border-color: transparent;\n}\n\n.day-cell[data-disabled=\"true\"],\n.day-cell[data-out-of-range=\"true\"] {\n  opacity: var(--disabled-opacity);\n}\n\n.day-cell[data-disabled=\"true\"] { cursor: not-allowed; }\n\n.day-cell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) { outline: 2px solid var(--focus-ring); outline-offset: 2px; }\n",
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
        "name": "--cell-background",
        "value": "transparent",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".day-cell"
      }
    ]
  },
  "confirm": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply flex flex-col;\n  }\n\n  .card {\n    @apply max-w-[28rem];\n  }\n\n  .card-compact {\n    @apply max-w-[21rem];\n  }\n\n  .dialog-overlay {\n    @apply fixed inset-0 z-50 flex items-center justify-center;\n    background-color: mix(var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    @apply max-w-[28rem];\n    margin: 0 1rem;\n  }\n\n  .header {\n    @apply flex items-start gap-3;\n  }\n\n  .header-content {\n    @apply flex-1;\n  }\n\n  .header-title {\n    @apply font-semibold;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    @apply flex flex-col gap-4;\n  }\n\n  .body-compact {\n    @apply gap-3;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    @apply p-3 rounded-sm;\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: mix(var(--background-info) 20%, transparent);\n    border-color: mix(var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: mix(var(--background-warning) 20%, transparent);\n    border-color: mix(var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: mix(var(--background-warning-dark) 20%, transparent);\n    border-color: mix(var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: mix(var(--background-danger) 20%, transparent);\n    border-color: mix(var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    @apply w-full mt-2 px-3 py-2 rounded-sm transition-all duration-200;\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    @apply flex gap-2;\n  }\n\n  .actions-inline {\n    @apply flex-row;\n  }\n\n  .actions-dialog {\n    @apply flex-row justify-end;\n  }\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "command": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Overlay Container */\n  .overlay {\n    @apply fixed inset-0 flex items-start justify-center overflow-hidden;\n    z-index: 999;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: var(--overlay-backdrop);\n  }\n\n  /* Content */\n  .content {\n    @apply relative m-2 w-full max-w-[28rem];\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    margin-inline: 1rem;\n    box-shadow: var(--shadow);\n    animation: fade-in-zoom-in 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    @apply overflow-hidden;\n  }\n\n  /* Search Section */\n  .search {\n    @apply border-none flex p-0;\n  }\n\n  .search-container {\n    @apply relative w-full p-1.5 pl-12;\n  }\n\n  .search-icon {\n    @apply absolute flex h-4 w-4 items-center;\n    left: 1.0rem;\n    top: 50%;\n    transform: translateY(-50%);\n    color: var(--color-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    @apply w-full;\n    background-color: var(--background-input);\n    border: none;\n    color: var(--color-default);\n    padding-block: 0.5rem;\n    font-size: var(--text-xs);\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    font-family: var(--text-xs);\n    font-weight: var(--font-weight-semibold);\n    color: var(--color-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    @apply absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1;\n    border-radius: var(--radius-md);\n    background-color: transparent;\n    color: var(--color-muted);\n    border: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .search-clear:hover {\n    background-color: var(--background-hover);\n    color: var(--color-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    @apply flex w-full flex-col;\n  }\n\n  .item {\n    @apply flex items-center justify-between rounded-sm px-2 py-0.5 cursor-pointer;\n    border-radius: 0.375rem;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    @apply flex min-w-0 flex-1 items-center gap-2.5;\n    flex: 1;\n  }\n\n  .item-icon {\n    @apply flex h-6 w-6 shrink-0 items-center justify-center;\n    color: var(--color-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    @apply min-w-0;\n  }\n\n  .item-label {\n    font-size: var(--text-xs);\n    color: var(--color-default);\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    color: var(--color-muted);\n    font-size: 0.875rem;\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .hint-wrapper {\n    @apply flex items-center;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--color-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--color-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply flex w-full items-center gap-2 px-1.5 py-2;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fade-in-zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }\n}\n",
    "styleableParts": [],
    "cssVariables": []
  },
  "color": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --disabled-opacity: 0.5;\n    @apply flex flex-col gap-4;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: var(--disabled-opacity);\n    pointer-events: none;\n  }\n\n  .colorControls,\n  .color-controls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup,\n  .input-group {\n    @apply flex w-full;\n  }\n\n  .inputGroup > div:nth-child(1),\n  .input-group > div:nth-child(1) {\n    flex: 1;\n    @apply min-w-0;\n  }\n\n  .colorInput,\n  .color-input { @apply w-full; }\n\n  .formatSelect,\n  .format-select { @apply shrink-0; width: 85px; }\n\n  .color[data-size=\"sm\"] .formatSelect,\n  .color[data-size=\"sm\"] .format-select { width: 75px; }\n\n  /* Canvas Styles */\n  .canvasContainer,\n  .canvas-container {\n    @apply relative mx-auto mt-2 flex flex-col;\n    width: 96%;\n    cursor: crosshair;\n    touch-action: none;\n    min-height: 160px;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"],\n  .canvas-container[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    @apply relative w-full flex-1 overflow-hidden;\n    flex: 1;\n    border-radius: none;\n  }\n\n  .canvasGradientHue,\n  .canvas-gradient-hue {\n    @apply absolute inset-0 overflow-hidden;\n  }\n\n  .canvasGradientSaturation,\n  .canvasGradientLightness,\n  .canvas-gradient-saturation,\n  .canvas-gradient-lightness {\n    @apply absolute inset-0;\n    border-radius: none;\n  }\n\n  .canvas-gradient-saturation {\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n  }\n\n  .canvas-gradient-lightness {\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n  }\n\n  .canvasPointer,\n  .canvas-pointer {\n    @apply absolute h-3 w-3;\n    border-radius: var(--radius-full);\n    border: 2px solid var(--pointer-border);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider,\n  .hue-slider {\n    @apply relative flex items-center overflow-hidden;\n    height: 16px;\n    border-radius: var(--radius-full);\n    cursor: pointer;\n    touch-action: none;\n  }\n\n  .hueTrack,\n  .hue-track {\n    @apply relative h-full w-full;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb,\n  .opacityThumb,\n  .hue-thumb,\n  .opacity-thumb {\n    @apply absolute;\n    border-radius: var(--radius-full);\n    border: 2px solid var(--thumb-border);\n    top: 50%;\n    background: var(--thumb-background);\n    pointer-events: none;\n  }\n\n  .hueThumb,\n  .hue-thumb {\n    @apply h-3 w-3;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    transform: translateY(-50%) translateX(-50%);\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb,\n  .hue-slider[data-focus-visible=\"true\"] .hue-thumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hue-thumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hue-thumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider,\n  .opacity-slider {\n    @apply relative flex items-center overflow-hidden;\n    height: 12px;\n    border-radius: var(--radius-full);\n    cursor: pointer;\n    touch-action: none;\n  }\n\n  .opacityTrack,\n  .opacity-track {\n    @apply relative h-full w-full overflow-hidden;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-dark),\n      var(--checkerboard-dark) 10px,\n      var(--checkerboard-light) 10px,\n      var(--checkerboard-light) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .opacityThumb,\n  .opacity-thumb {\n    @apply h-2.5 w-2.5;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    transform: translateY(-50%) translateX(-50%);\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb,\n  .opacity-slider[data-focus-visible=\"true\"] .opacity-thumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacity-thumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacity-thumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors,\n  .recent-colors {\n    @apply flex gap-2 overflow-x-auto pb-1;\n  }\n\n  .recentColorSwatch,\n  .recent-color-swatch {\n    @apply h-8 w-8 shrink-0 cursor-pointer p-0;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    background: none;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover,\n  .recent-color-swatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active,\n  .recent-color-swatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible,\n  .recent-color-swatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use preview-swatch instead */\n  .previewContainer,\n  .preview-container {\n    @apply flex justify-center py-2;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch,\n  .preview-swatch {\n    @apply relative h-9 w-9 shrink-0 overflow-hidden;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  }\n\n  .previewSwatch::before,\n  .preview-swatch::before {\n    content: \"\";\n    @apply absolute inset-0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-light),\n      var(--checkerboard-light) 6px,\n      var(--checkerboard-dark) 6px,\n      var(--checkerboard-dark) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .preview {\n    @apply relative h-16 w-16 overflow-hidden;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  }\n\n  .preview::before {\n    content: \"\";\n    @apply absolute inset-0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--checkerboard-light),\n      var(--checkerboard-light) 10px,\n      var(--checkerboard-dark) 10px,\n      var(--checkerboard-dark) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after,\n  .preview-swatch::after,\n  .preview::after {\n    content: \"\";\n    @apply absolute inset-0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.5",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".color"
      }
    ]
  },
  "code": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    --border-color: var(--background-700);\n    --header-bg: mix(var(--background-900) 90%, transparent);\n    --scroll-track-bg: mix(var(--background-950) 50%, transparent);\n\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border-color);\n    @apply flex w-full min-w-0 flex-col overflow-hidden;\n  }\n\n  .header {\n    flex: none;\n    background-color: var(--header-bg);\n    @apply flex items-center justify-between px-3 py-1.5;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    border-bottom: 1px solid var(--border-color);\n    color: var(--foreground-400);\n  }\n\n\n  .body {\n    @apply relative flex min-h-0 flex-1 flex-col;\n    flex: 1;\n  }\n\n  .viewport { @apply overflow-hidden; }\n\n  .viewport :global(pre) {\n    background: transparent;\n    @apply m-0 p-0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    @apply w-full;\n    overflow-x: auto;\n    background-color: var(--scroll-track-bg);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    @apply flex w-full items-center gap-3 px-4 py-2 cursor-pointer;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--border-color);\n    background: transparent;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover { background-color: var(--background-800); }\n\n  .expand-icon { @apply shrink-0; color: var(--foreground-400); }\n\n  .copy-button {\n    @apply absolute right-2 top-2 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-sm);\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    border: none;\n    z-index: 1;\n  }\n\n  .copy-button:hover { background-color: var(--background-800); color: var(--foreground-300); }\n\n  .copy-button:focus, .body:hover .copy-button { opacity: 1; }\n}\n",
    "styleableParts": [],
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
      }
    ]
  },
  "checkbox": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    @apply absolute inset-0 h-full w-full cursor-pointer;\n    opacity: 0;\n  }\n\n  .checkbox-root {\n    @apply inline-flex items-center justify-center gap-3;\n  }\n\n  .checkbox-container {\n    @apply relative inline-flex items-center justify-center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --disabled-opacity: 0.6;\n\n    @apply relative h-5 w-5 cursor-pointer appearance-none;\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    /* Interactive States */\n    &:hover:not([data-disabled=\"true\"]) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:focus-visible {\n      outline: 2px solid transparent;\n      box-shadow: 0 0 0 3px var(--ring-color);\n    }\n\n    &[data-pressed=\"true\"] {\n      transform: scale(0.92);\n    }\n\n    &[data-selected=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-indeterminate=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n\n    /* Sizes */\n    &.size-sm {\n      @apply h-4 w-4;\n    }\n\n    &.size-md {\n      @apply h-5 w-5;\n    }\n\n    &.size-lg {\n      @apply h-6 w-6;\n    }\n  }\n\n  /* Checkmark and Indeterminate styles - combined */\n  .checkbox-checkmark,\n  .checkbox-indeterminate {\n    @apply absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--checkmark-color);\n    pointer-events: none;\n  }\n\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-md {\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-lg {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal { color: inherit; }\n\n  .helper-text-error { color: var(--error-color); }\n}\n",
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
        "name": "--disabled-opacity",
        "value": "0.6",
        "defaultValue": null,
        "referencedVars": [],
        "variant": ".checkbox"
      }
    ]
  },
  "card": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    @apply overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring);\n    outline-offset: 2px;\n  }\n\n  .header {\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
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
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply inline-flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap;;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n\n    font-weight: var(--font-weight-medium, 500);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover:not(:disabled) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:active:not(:disabled) {\n      filter: brightness(1.1);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 1.5px var(--focus-visible);\n      outline: none;\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      filter: grayscale(0.5);\n    }\n  }\n\n  .button.sm { @apply px-3 py-1.5; font-size: var(--text-xs); }\n  .button.md { @apply px-5 py-2;   font-size: var(--text-sm); }\n  .button.lg { @apply px-7 py-1.5; font-size: var(--text-sm); }\n}\n",
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
    "cssVariables": []
  },
  "banner": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    @apply flex w-full items-start gap-4;\n    font-family: inherit;\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    @apply flex flex-col gap-2;\n  }\n\n  .icon-container {\n    @apply flex shrink-0 items-center justify-center self-start;\n  }\n\n  .icon {\n    @apply mr-4 h-5 w-5;\n    color: var(--icon-color, currentColor);\n  }\n\n  .dismiss {\n    @apply flex h-8 w-8 shrink-0 items-center justify-center p-0 cursor-pointer;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    @apply my-0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-medium);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    @apply my-0;\n  }\n}\n\n\n.banner.sm {\n  @apply px-3 py-2;\n  font-size: var(--text-xs);\n}\n\n.banner.md {\n  @apply px-4 py-3;\n  font-size: var(--text-xs);\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n  font-size: var(--text-xs);\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "\"icon-container\""
      },
      {
        "name": "content"
      },
      {
        "name": "dismiss"
      }
    ],
    "cssVariables": []
  },
  "badge": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    @apply inline-flex items-center justify-center gap-2 px-3 py-0.5;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.sm {\n    @apply px-1.5 py-px;\n    gap: 0.25rem;\n    font-size: var(--text-xs);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill { border-radius: 9999px; }\n\n  .icon {\n    @apply flex items-center shrink-0;\n  }\n\n  .dismiss {\n    @apply ml-1 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--dismiss-color);\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismiss-button[data-hovered=\"true\"] {\n    background: var(--dismiss-hover-background);\n  }\n\n  .dismiss-button[data-pressed=\"true\"] {\n    background: var(--dismiss-pressed-background);\n    transform: scale(0.95);\n  }\n\n  .dismiss-button[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n",
    "styleableParts": [
      {
        "name": "root"
      },
      {
        "name": "icon"
      },
      {
        "name": "dismiss"
      }
    ],
    "cssVariables": []
  },
  "anchor": {
    "rawCss": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    @apply inline;\n  }\n\n  .preview {\n    @apply inline;\n  }\n\n  .trigger {\n    @apply inline-block relative cursor-pointer;\n    color: var(--foreground);\n    text-decoration: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    @apply absolute left-0 right-0 bottom-0 h-px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n}\n",
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
    "cssVariables": []
  }
};
