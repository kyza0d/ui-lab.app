import type { ComponentAPI, ComponentStyles } from './types';

export const generatedAPI: Record<string, ComponentAPI> = {
  "badge": {
    "props": [
      {
        "name": "variant",
        "type": "default | success | warning | danger | info",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "success",
          "warning",
          "danger",
          "info"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onDismiss",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "breadcrumbs": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "Breadcrumb": [
        {
          "name": "href",
          "type": "string",
          "required": false
        },
        {
          "name": "onPress",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "isCurrent",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    }
  },
  "button": {
    "props": [
      {
        "name": "variant",
        "type": "primary | secondary | outline | ghost",
        "required": false,
        "defaultValue": "primary",
        "enumValues": [
          "primary",
          "secondary",
          "outline",
          "ghost"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onPress",
        "type": "((e: { target: EventTarget | null; }) => void)",
        "required": false
      }
    ]
  },
  "card": {
    "props": [],
    "subComponents": {
      "Card.Header": [],
      "Card.Body": [],
      "Card.Footer": []
    }
  },
  "checkbox": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isIndeterminate",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "command-palette": {
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onOpenChange",
        "type": "((open: boolean) => void)",
        "required": false
      },
      {
        "name": "commands",
        "type": "Command[]",
        "required": false,
        "defaultValue": "[]"
      },
      {
        "name": "onCommandExecute",
        "type": "((command: Command) => void)",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "defaultValue": "Type a command or search..."
      },
      {
        "name": "emptyStateMessage",
        "type": "string",
        "required": false,
        "defaultValue": "No commands found."
      },
      {
        "name": "showCategories",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "closeOnExecute",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "enableSmartSearch",
        "type": "boolean",
        "required": false
      }
    ]
  },
  "confirmation": {
    "props": [
      {
        "name": "mode",
        "type": "inline | dialog | auto",
        "required": false,
        "defaultValue": "auto",
        "enumValues": [
          "inline",
          "dialog",
          "auto"
        ]
      },
      {
        "name": "severity",
        "type": "low | medium | high | critical",
        "required": false,
        "defaultValue": "medium",
        "enumValues": [
          "low",
          "medium",
          "high",
          "critical"
        ]
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true
      },
      {
        "name": "onCancel",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "required": true
      },
      {
        "name": "confirmLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Confirm"
      },
      {
        "name": "cancelLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Cancel"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "title",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "destructiveActionWarning",
        "type": "string",
        "required": false
      },
      {
        "name": "countdownSeconds",
        "type": "number",
        "required": false
      },
      {
        "name": "requiresReason",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "confirmationText",
        "type": "string",
        "required": false
      },
      {
        "name": "autoResetAfter",
        "type": "number",
        "required": false
      }
    ]
  },
  "divider": {
    "props": [
      {
        "name": "variant",
        "type": "solid | dashed | dotted",
        "required": false,
        "enumValues": [
          "solid",
          "dashed",
          "dotted"
        ]
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "color",
        "type": "default | muted | subtle",
        "required": false,
        "enumValues": [
          "default",
          "muted",
          "subtle"
        ]
      },
      {
        "name": "spacing",
        "type": "sm | md | lg | none",
        "required": false,
        "enumValues": [
          "sm",
          "md",
          "lg",
          "none"
        ]
      }
    ]
  },
  "flex": {
    "props": [
      {
        "name": "direction",
        "type": "row | column",
        "required": false,
        "defaultValue": "row",
        "enumValues": [
          "row",
          "column"
        ]
      },
      {
        "name": "wrap",
        "type": "wrap | nowrap",
        "required": false,
        "defaultValue": "nowrap",
        "enumValues": [
          "wrap",
          "nowrap"
        ]
      },
      {
        "name": "gap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "justify",
        "type": "flex-start | flex-end | center | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "flex-start",
        "enumValues": [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "align",
        "type": "flex-start | flex-end | center | stretch | baseline",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "flex-start",
          "flex-end",
          "center",
          "stretch",
          "baseline"
        ]
      },
      {
        "name": "containerQueryResponsive",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "fold": {
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "isExpanded",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onExpandedChange",
        "type": "((isExpanded: boolean) => void)",
        "required": false
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "triggerClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      }
    ]
  },
  "form": {
    "props": [
      {
        "name": "initialValues",
        "type": "FormValues",
        "required": true
      },
      {
        "name": "validationRules",
        "type": "ValidationRules",
        "required": false,
        "defaultValue": "{}"
      },
      {
        "name": "onSubmit",
        "type": "(values: FormValues) => void | Promise<void>",
        "required": true
      },
      {
        "name": "onError",
        "type": "((errors: FormErrors) => void)",
        "required": false
      },
      {
        "name": "errorBoundaryFallback",
        "type": "((error: Error) => ReactNode)",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "FormField": [
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "label",
          "type": "string",
          "required": false
        },
        {
          "name": "required",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    }
  },
  "grid": {
    "props": [
      {
        "name": "columns",
        "type": "1 | 2 | 3 | 4 | 5 | 6 | auto-fit | auto-fill",
        "required": false,
        "defaultValue": "3",
        "enumValues": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "auto-fit",
          "auto-fill"
        ]
      },
      {
        "name": "rows",
        "type": "1 | 2 | 3 | 4 | 5 | 6 | auto",
        "required": false,
        "defaultValue": "auto",
        "enumValues": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "auto"
        ]
      },
      {
        "name": "gap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "rowGap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "columnGap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "justifyItems",
        "type": "start | end | center | stretch",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch"
        ]
      },
      {
        "name": "alignItems",
        "type": "start | end | center | stretch | baseline",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "baseline"
        ]
      },
      {
        "name": "justifyContent",
        "type": "start | end | center | stretch | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "start",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "alignContent",
        "type": "start | end | center | stretch | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "start",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "autoFlow",
        "type": "row | column | row-dense | column-dense",
        "required": false,
        "defaultValue": "row",
        "enumValues": [
          "row",
          "column",
          "row-dense",
          "column-dense"
        ]
      },
      {
        "name": "containerQueryResponsive",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "group": {
    "props": [
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "spacing",
        "type": "tight | normal | relaxed",
        "required": false,
        "defaultValue": "normal",
        "enumValues": [
          "tight",
          "normal",
          "relaxed"
        ]
      },
      {
        "name": "variant",
        "type": "primary | secondary | outline | ghost",
        "required": false,
        "defaultValue": "primary",
        "enumValues": [
          "primary",
          "secondary",
          "outline",
          "ghost"
        ]
      },
      {
        "name": "showDividers",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "input": {
    "props": [
      {
        "name": "variant",
        "type": "default | ghost",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "ghost"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "prefixIcon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "suffixIcon",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "label": {
    "props": [
      {
        "name": "required",
        "type": "boolean",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | null",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean | null",
        "required": false
      },
      {
        "name": "error",
        "type": "boolean | null",
        "required": false
      }
    ]
  },
  "menu": {
    "props": [
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "MenuContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "onCloseAutoFocus",
          "type": "((event: Event) => void)",
          "required": false
        },
        {
          "name": "onEscapeKeyDown",
          "type": "((event: KeyboardEvent) => void)",
          "required": false
        },
        {
          "name": "onPointerDownOutside",
          "type": "((event: PointerEvent) => void)",
          "required": false
        },
        {
          "name": "alignOffset",
          "type": "number",
          "required": false
        },
        {
          "name": "sideOffset",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        }
      ],
      "MenuGroup": [],
      "MenuRadioGroup": [
        {
          "name": "value",
          "type": "string",
          "required": false
        },
        {
          "name": "onValueChange",
          "type": "((value: string) => void)",
          "required": false
        }
      ],
      "MenuLabel": [
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "MenuSeparator": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "MenuShortcut": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "Menu": [
        {
          "name": "selectionMode",
          "type": "none | single | multiple",
          "required": false,
          "defaultValue": "none",
          "enumValues": [
            "none",
            "single",
            "multiple"
          ]
        },
        {
          "name": "selectedKeys",
          "type": "Set<Key>",
          "required": false
        },
        {
          "name": "defaultSelectedKeys",
          "type": "Set<Key>",
          "required": false
        },
        {
          "name": "onSelectionChange",
          "type": "((keys: Set<Key>) => void)",
          "required": false
        }
      ],
      "MenuPortal": [
        {
          "name": "container",
          "type": "HTMLElement",
          "required": false
        }
      ],
      "MenuItem": [
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuCheckboxItem": [
        {
          "name": "checked",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onCheckedChange",
          "type": "((checked: boolean) => void)",
          "required": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuRadioItem": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuSub": [
        {
          "name": "open",
          "type": "boolean",
          "required": false
        },
        {
          "name": "defaultOpen",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onOpenChange",
          "type": "((open: boolean) => void)",
          "required": false
        }
      ],
      "MenuSubContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "sideOffset",
          "type": "number",
          "required": false,
          "defaultValue": "2"
        },
        {
          "name": "alignOffset",
          "type": "number",
          "required": false,
          "defaultValue": "-4"
        }
      ],
      "MenuSubTrigger": [
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuContext": [],
      "MenuSubmenuContext": [],
      "RadioGroupContext": []
    }
  },
  "modal": {
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "closeButton",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "size",
        "type": "sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "isDismissable",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "isKeyboardDismissDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false
      }
    ]
  },
  "popover": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "bottom",
        "enumValues": [
          "top",
          "right",
          "bottom",
          "left"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "progress": {
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "defaultValue": "0"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100"
      },
      {
        "name": "variant",
        "type": "default | success | warning | error",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "success",
          "warning",
          "error"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "radio": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "select": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "SearchableContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "searchPlaceholder",
          "type": "string",
          "required": false,
          "defaultValue": "Search items..."
        },
        {
          "name": "onSearch",
          "type": "((value: string) => void)",
          "required": false
        }
      ],
      "SelectSeparator": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SelectScrollUpButton": [],
      "SelectScrollDownButton": [],
      "SelectItem": [
        {
          "name": "value",
          "type": "Key",
          "required": true
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_focusedKey",
          "type": "Key | null",
          "required": false
        }
      ],
      "SelectGroup": [
        {
          "name": "key",
          "type": "string",
          "required": false
        },
        {
          "name": "title",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SelectValue": [
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "defaultValue": "Select an option"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "Select": [
        {
          "name": "items",
          "type": "any[]",
          "required": false,
          "defaultValue": "[]"
        },
        {
          "name": "selectedKey",
          "type": "Key | null",
          "required": false
        },
        {
          "name": "defaultSelectedKey",
          "type": "Key | null",
          "required": false
        },
        {
          "name": "onSelectionChange",
          "type": "((key: Key | null) => void)",
          "required": false
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "autoFocus",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "maxItems",
          "type": "number",
          "required": false,
          "defaultValue": "6"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "trigger",
          "type": "click | hover",
          "required": false,
          "defaultValue": "click",
          "enumValues": [
            "click",
            "hover"
          ]
        }
      ],
      "SelectListBox": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SelectTrigger": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SearchableTrigger": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "defaultValue": "Search..."
        }
      ]
    }
  },
  "slider": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "defaultValue": "0"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100"
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "defaultValue": "1"
      },
      {
        "name": "defaultValue",
        "type": "number | number[]",
        "required": false
      },
      {
        "name": "value",
        "type": "number | number[]",
        "required": false
      },
      {
        "name": "onValueChange",
        "type": "((value: number[]) => void)",
        "required": false
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false
      }
    ]
  },
  "switch": {
    "props": [
      {
        "name": "isSelected",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onChange",
        "type": "((isSelected: boolean) => void)",
        "required": false
      },
      {
        "name": "defaultSelected",
        "type": "boolean",
        "required": false
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "tabs": {
    "props": [
      {
        "name": "variant",
        "type": "default | underline",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "underline"
        ]
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "required": false
      },
      {
        "name": "onValueChange",
        "type": "((value: string) => void)",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "TabsList": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "aria-label",
          "type": "string",
          "required": false
        }
      ],
      "TabsTrigger": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "required": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "TabsContent": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    }
  },
  "textarea": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "resizable",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "showCharacterCount",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "maxCharacters",
        "type": "number",
        "required": false
      }
    ]
  },
  "toast": {
    "props": [
      {
        "name": "toast",
        "type": "ToastProps",
        "required": true
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "pauseOnFocus",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  },
  "tooltip": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "top",
        "enumValues": [
          "top",
          "right",
          "bottom",
          "left"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "defaultValue": "200"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ]
  }
};

export const generatedStyles: Record<string, ComponentStyles> = {
  "badge": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--background-300)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-600)"
      }
    ],
    "classes": [
      {
        "name": "badge"
      },
      {
        "name": "default"
      },
      {
        "name": "success"
      },
      {
        "name": "warning"
      },
      {
        "name": "danger"
      },
      {
        "name": "info"
      },
      {
        "name": "sm"
      },
      {
        "name": "md"
      },
      {
        "name": "lg"
      },
      {
        "name": "pill"
      },
      {
        "name": "iconWrapper"
      },
      {
        "name": "dismissButton"
      }
    ],
    "variants": {
      "variant": [
        "default"
      ],
      "size": [
        "sm",
        "md",
        "lg"
      ],
      "state": [
        "success",
        "warning"
      ]
    },
    "sizes": [
      "sm",
      "md",
      "lg"
    ]
  },
  "breadcrumbs": {
    "cssVariables": [
      {
        "name": "--foreground",
        "defaultValue": "var(--foreground-primary)"
      },
      {
        "name": "--foreground-muted",
        "defaultValue": "var(--foreground-secondary)"
      },
      {
        "name": "--separator-color",
        "defaultValue": "var(--border-secondary)"
      },
      {
        "name": "--focus-ring-color",
        "defaultValue": "var(--accent-500)"
      }
    ],
    "classes": [
      {
        "name": "breadcrumbs"
      },
      {
        "name": "breadcrumbsList"
      },
      {
        "name": "breadcrumb"
      },
      {
        "name": "breadcrumbLink"
      }
    ]
  },
  "button": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--accent-50)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--background-hover",
        "defaultValue": "var(--accent-600)"
      },
      {
        "name": "--border-hover",
        "defaultValue": "var(--accent-600)"
      },
      {
        "name": "--background-active",
        "defaultValue": "var(--accent-700)"
      },
      {
        "name": "--border-active",
        "defaultValue": "var(--accent-700)"
      }
    ],
    "classes": [
      {
        "name": "button"
      },
      {
        "name": "primary"
      },
      {
        "name": "secondary"
      },
      {
        "name": "outline"
      },
      {
        "name": "ghost"
      },
      {
        "name": "sm"
      },
      {
        "name": "md"
      },
      {
        "name": "lg"
      }
    ],
    "variants": {
      "variant": [
        "primary",
        "secondary",
        "outline",
        "ghost"
      ],
      "size": [
        "sm",
        "md",
        "lg"
      ]
    },
    "sizes": [
      "sm",
      "md",
      "lg"
    ]
  },
  "card": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      }
    ],
    "classes": [
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
        "name": "footer"
      }
    ]
  },
  "checkbox": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--accent-50)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--ring-color",
        "defaultValue": "var(--accent-500)"
      }
    ],
    "classes": [
      {
        "name": "base"
      },
      {
        "name": "size-sm"
      },
      {
        "name": "size-md"
      },
      {
        "name": "size-lg"
      },
      {
        "name": "label"
      },
      {
        "name": "label-sm"
      },
      {
        "name": "label-md"
      },
      {
        "name": "label-lg"
      },
      {
        "name": "label-disabled"
      },
      {
        "name": "helper-text"
      },
      {
        "name": "helper-text-normal"
      },
      {
        "name": "helper-text-error"
      },
      {
        "name": "indeterminate"
      }
    ]
  },
  "flex": {
    "cssVariables": [],
    "classes": [
      {
        "name": "flex"
      },
      {
        "name": "row"
      },
      {
        "name": "column"
      },
      {
        "name": "wrap"
      },
      {
        "name": "nowrap"
      },
      {
        "name": "gap-xs"
      },
      {
        "name": "gap-sm"
      },
      {
        "name": "gap-md"
      },
      {
        "name": "gap-lg"
      },
      {
        "name": "gap-xl"
      },
      {
        "name": "justify-flex-start"
      },
      {
        "name": "justify-flex-end"
      },
      {
        "name": "justify-center"
      },
      {
        "name": "justify-space-between"
      },
      {
        "name": "justify-space-around"
      },
      {
        "name": "justify-space-evenly"
      },
      {
        "name": "align-flex-start"
      },
      {
        "name": "align-flex-end"
      },
      {
        "name": "align-center"
      },
      {
        "name": "align-stretch"
      },
      {
        "name": "align-baseline"
      },
      {
        "name": "container-query-parent"
      },
      {
        "name": "container-responsive"
      }
    ]
  },
  "fold": {
    "cssVariables": [
      {
        "name": "--fold-trigger-background",
        "defaultValue": "transparent"
      },
      {
        "name": "--fold-trigger-background-hover",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--fold-trigger-foreground",
        "defaultValue": "var(--foreground-50)"
      },
      {
        "name": "--fold-content-background",
        "defaultValue": "transparent"
      },
      {
        "name": "--fold-content-foreground",
        "defaultValue": "var(--foreground-300)"
      }
    ],
    "classes": [
      {
        "name": "fold"
      },
      {
        "name": "trigger"
      },
      {
        "name": "icon"
      },
      {
        "name": "title"
      },
      {
        "name": "content"
      },
      {
        "name": "contentInner"
      }
    ]
  },
  "grid": {
    "cssVariables": [],
    "classes": [
      {
        "name": "grid"
      },
      {
        "name": "columns-1"
      },
      {
        "name": "columns-2"
      },
      {
        "name": "columns-3"
      },
      {
        "name": "columns-4"
      },
      {
        "name": "columns-5"
      },
      {
        "name": "columns-6"
      },
      {
        "name": "columns-auto-fit"
      },
      {
        "name": "columns-auto-fill"
      },
      {
        "name": "rows-1"
      },
      {
        "name": "rows-2"
      },
      {
        "name": "rows-3"
      },
      {
        "name": "rows-4"
      },
      {
        "name": "rows-5"
      },
      {
        "name": "rows-6"
      },
      {
        "name": "rows-auto"
      },
      {
        "name": "gap-xs"
      },
      {
        "name": "gap-sm"
      },
      {
        "name": "gap-md"
      },
      {
        "name": "gap-lg"
      },
      {
        "name": "gap-xl"
      },
      {
        "name": "row-gap-xs"
      },
      {
        "name": "row-gap-sm"
      },
      {
        "name": "row-gap-md"
      },
      {
        "name": "row-gap-lg"
      },
      {
        "name": "row-gap-xl"
      },
      {
        "name": "column-gap-xs"
      },
      {
        "name": "column-gap-sm"
      },
      {
        "name": "column-gap-md"
      },
      {
        "name": "column-gap-lg"
      },
      {
        "name": "column-gap-xl"
      },
      {
        "name": "justify-items-start"
      },
      {
        "name": "justify-items-end"
      },
      {
        "name": "justify-items-center"
      },
      {
        "name": "justify-items-stretch"
      },
      {
        "name": "align-items-start"
      },
      {
        "name": "align-items-end"
      },
      {
        "name": "align-items-center"
      },
      {
        "name": "align-items-stretch"
      },
      {
        "name": "align-items-baseline"
      },
      {
        "name": "justify-content-start"
      },
      {
        "name": "justify-content-end"
      },
      {
        "name": "justify-content-center"
      },
      {
        "name": "justify-content-stretch"
      },
      {
        "name": "justify-content-space-between"
      },
      {
        "name": "justify-content-space-around"
      },
      {
        "name": "justify-content-space-evenly"
      },
      {
        "name": "align-content-start"
      },
      {
        "name": "align-content-end"
      },
      {
        "name": "align-content-center"
      },
      {
        "name": "align-content-stretch"
      },
      {
        "name": "align-content-space-between"
      },
      {
        "name": "align-content-space-around"
      },
      {
        "name": "align-content-space-evenly"
      },
      {
        "name": "auto-flow-row"
      },
      {
        "name": "auto-flow-column"
      },
      {
        "name": "auto-flow-row-dense"
      },
      {
        "name": "auto-flow-column-dense"
      },
      {
        "name": "container-query-parent"
      },
      {
        "name": "container-responsive"
      }
    ]
  },
  "group": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-950)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      }
    ],
    "classes": [
      {
        "name": "group"
      },
      {
        "name": "horizontal"
      },
      {
        "name": "vertical"
      },
      {
        "name": "tight"
      },
      {
        "name": "normal"
      },
      {
        "name": "relaxed"
      },
      {
        "name": "ghost"
      },
      {
        "name": "itemWrapper"
      },
      {
        "name": "groupItem"
      }
    ],
    "variants": {
      "variant": [
        "ghost"
      ]
    }
  },
  "input": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-950)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--foreground-50)"
      },
      {
        "name": "--placeholder",
        "defaultValue": "var(--foreground-500)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--background-hover",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--border-hover",
        "defaultValue": "var(--background-600)"
      },
      {
        "name": "--ring-color",
        "defaultValue": "var(--accent-500)"
      }
    ],
    "classes": [
      {
        "name": "input"
      },
      {
        "name": "iconWrapper"
      },
      {
        "name": "prefixIcon"
      },
      {
        "name": "suffixIcon"
      },
      {
        "name": "container"
      }
    ]
  },
  "menu": {
    "cssVariables": [],
    "classes": [
      {
        "name": "content"
      },
      {
        "name": "viewport"
      },
      {
        "name": "item"
      },
      {
        "name": "checkboxItem"
      },
      {
        "name": "radioItem"
      },
      {
        "name": "itemIndicator"
      },
      {
        "name": "subTrigger"
      },
      {
        "name": "subTriggerChevron"
      },
      {
        "name": "subContent"
      },
      {
        "name": "label"
      },
      {
        "name": "separator"
      },
      {
        "name": "shortcut"
      }
    ]
  },
  "modal": {
    "cssVariables": [
      {
        "name": "--modal-bg",
        "defaultValue": "var(--color-background-900, #0f0f0f)"
      },
      {
        "name": "--modal-border",
        "defaultValue": "var(--color-background-700, #1a1a1a)"
      },
      {
        "name": "--modal-title-color",
        "defaultValue": "var(--color-foreground-100, #f5f5f5)"
      },
      {
        "name": "--modal-close-color",
        "defaultValue": "var(--color-foreground-500, #8b8b8b)"
      },
      {
        "name": "--modal-close-hover",
        "defaultValue": "var(--color-foreground-200, #e5e5e5)"
      }
    ],
    "classes": [
      {
        "name": "overlay"
      },
      {
        "name": "backdrop"
      },
      {
        "name": "modal"
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
      },
      {
        "name": "size-sm"
      },
      {
        "name": "size-md"
      },
      {
        "name": "size-lg"
      },
      {
        "name": "size-xl"
      }
    ]
  },
  "progress": {
    "cssVariables": [
      {
        "name": "--track-background",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--fill-background",
        "defaultValue": "var(--accent-500)"
      }
    ],
    "classes": [
      {
        "name": "progress"
      },
      {
        "name": "sm"
      },
      {
        "name": "md"
      },
      {
        "name": "lg"
      },
      {
        "name": "fill"
      },
      {
        "name": "default"
      },
      {
        "name": "success"
      },
      {
        "name": "warning"
      },
      {
        "name": "error"
      },
      {
        "name": "animated"
      },
      {
        "name": "indeterminate"
      },
      {
        "name": "wrapper"
      },
      {
        "name": "hasLabel"
      },
      {
        "name": "labelRow"
      },
      {
        "name": "label"
      },
      {
        "name": "value"
      }
    ],
    "variants": {
      "variant": [
        "default"
      ],
      "size": [
        "sm",
        "md",
        "lg"
      ],
      "state": [
        "success",
        "warning",
        "error"
      ]
    },
    "sizes": [
      "sm",
      "md",
      "lg"
    ]
  },
  "radio": {
    "cssVariables": [
      {
        "name": "--radio-background-unchecked",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--radio-border-unchecked",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--radio-background-checked",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--radio-border-checked",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--radio-dot-unchecked",
        "defaultValue": "transparent"
      },
      {
        "name": "--radio-dot-checked",
        "defaultValue": "var(--accent-50)"
      },
      {
        "name": "--radio-hover-background",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--radio-hover-border",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--radio-error-border",
        "defaultValue": "var(--danger-500)"
      }
    ],
    "classes": [
      {
        "name": "radio-group"
      },
      {
        "name": "radio-item"
      },
      {
        "name": "radio-input"
      },
      {
        "name": "radio"
      },
      {
        "name": "radio-dot"
      },
      {
        "name": "radio-label"
      },
      {
        "name": "radio-label-disabled"
      },
      {
        "name": "radio-description"
      },
      {
        "name": "radio-description-error"
      },
      {
        "name": "sm"
      },
      {
        "name": "md"
      },
      {
        "name": "lg"
      },
      {
        "name": "secondary"
      },
      {
        "name": "outline"
      }
    ],
    "variants": {
      "variant": [
        "secondary",
        "outline"
      ],
      "size": [
        "sm",
        "md",
        "lg"
      ]
    },
    "sizes": [
      "sm",
      "md",
      "lg"
    ]
  },
  "select": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--foreground-50)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--background-hover",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--border-hover",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--background-active",
        "defaultValue": "var(--background-600)"
      },
      {
        "name": "--border-active",
        "defaultValue": "var(--background-600)"
      }
    ],
    "classes": [
      {
        "name": "select"
      },
      {
        "name": "trigger"
      },
      {
        "name": "icon"
      },
      {
        "name": "content"
      },
      {
        "name": "viewport"
      },
      {
        "name": "item"
      },
      {
        "name": "itemIndicator"
      },
      {
        "name": "itemText"
      },
      {
        "name": "separator"
      },
      {
        "name": "scrollButton"
      }
    ]
  },
  "slider": {
    "cssVariables": [
      {
        "name": "--track-height-sm",
        "defaultValue": "0.25rem"
      },
      {
        "name": "--track-height-md",
        "defaultValue": "0.375rem"
      },
      {
        "name": "--track-height-lg",
        "defaultValue": "0.5rem"
      },
      {
        "name": "--background",
        "defaultValue": "var(--background-600)"
      },
      {
        "name": "--background-disabled",
        "defaultValue": "var(--background-500)"
      },
      {
        "name": "--thumb-size-sm",
        "defaultValue": "0.75rem"
      },
      {
        "name": "--thumb-size-md",
        "defaultValue": "1rem"
      },
      {
        "name": "--thumb-size-lg",
        "defaultValue": "1.25rem"
      },
      {
        "name": "--background-focus",
        "defaultValue": "var(--accent-400)"
      }
    ],
    "classes": [
      {
        "name": "slider"
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
    ]
  },
  "switch": {
    "cssVariables": [
      {
        "name": "--track-background-unchecked",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--track-background-checked",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--track-background-hover",
        "defaultValue": "var(--accent-600)"
      },
      {
        "name": "--track-background-active",
        "defaultValue": "var(--accent-700)"
      },
      {
        "name": "--track-background-disabled",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--thumb-background-unchecked",
        "defaultValue": "var(--background-500)"
      },
      {
        "name": "--thumb-background-checked",
        "defaultValue": "var(--accent-50)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--border-hover",
        "defaultValue": "var(--accent-500)"
      },
      {
        "name": "--border-active",
        "defaultValue": "var(--accent-600)"
      }
    ],
    "classes": [
      {
        "name": "switch"
      },
      {
        "name": "switch-track"
      },
      {
        "name": "switch-thumb"
      },
      {
        "name": "sm"
      },
      {
        "name": "md"
      },
      {
        "name": "lg"
      },
      {
        "name": "pill"
      },
      {
        "name": "round"
      }
    ],
    "variants": {
      "size": [
        "sm",
        "md",
        "lg"
      ]
    },
    "sizes": [
      "sm",
      "md",
      "lg"
    ]
  },
  "tabs": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-800)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--indicator-background",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--foreground-400)"
      },
      {
        "name": "--foreground-hover",
        "defaultValue": "var(--foreground-200)"
      },
      {
        "name": "--foreground-active",
        "defaultValue": "var(--foreground-50)"
      }
    ],
    "classes": [
      {
        "name": "tabs"
      },
      {
        "name": "tabsList"
      },
      {
        "name": "indicator"
      },
      {
        "name": "indicatorDefault"
      },
      {
        "name": "indicatorUnderline"
      },
      {
        "name": "tabsTrigger"
      },
      {
        "name": "triggerIcon"
      },
      {
        "name": "tabsContent"
      }
    ]
  },
  "textarea": {
    "cssVariables": [
      {
        "name": "--background",
        "defaultValue": "var(--background-950)"
      },
      {
        "name": "--foreground",
        "defaultValue": "var(--foreground-50)"
      },
      {
        "name": "--placeholder",
        "defaultValue": "var(--foreground-500)"
      },
      {
        "name": "--border",
        "defaultValue": "var(--background-700)"
      },
      {
        "name": "--border-hover",
        "defaultValue": "var(--background-600)"
      },
      {
        "name": "--ring-color",
        "defaultValue": "var(--accent-500)"
      }
    ],
    "classes": [
      {
        "name": "textarea"
      },
      {
        "name": "container"
      },
      {
        "name": "characterCount"
      }
    ]
  }
};

export const reactAriaUrls: Record<string, string> = {
  "badge": "",
  "breadcrumbs": "https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html",
  "button": "https://react-spectrum.adobe.com/react-aria/useButton.html",
  "card": "",
  "checkbox": "https://react-spectrum.adobe.com/react-aria/useCheckbox.html",
  "command-palette": "",
  "confirmation": "",
  "divider": "",
  "flex": "",
  "fold": "",
  "form": "",
  "grid": "",
  "group": "",
  "input": "https://react-spectrum.adobe.com/react-aria/useTextField.html",
  "label": "https://react-spectrum.adobe.com/react-aria/useLabel.html",
  "menu": "https://react-spectrum.adobe.com/react-aria/useMenu.html",
  "modal": "https://react-spectrum.adobe.com/react-aria/useDialog.html",
  "popover": "https://react-spectrum.adobe.com/react-aria/usePopover.html",
  "progress": "https://react-spectrum.adobe.com/react-aria/useProgressBar.html",
  "radio": "https://react-spectrum.adobe.com/react-aria/useRadioGroup.html",
  "select": "https://react-spectrum.adobe.com/react-aria/useSelect.html",
  "slider": "https://react-spectrum.adobe.com/react-aria/useSlider.html",
  "switch": "https://react-spectrum.adobe.com/react-aria/useSwitch.html",
  "tabs": "https://react-spectrum.adobe.com/react-aria/useTabs.html",
  "textarea": "https://react-spectrum.adobe.com/react-aria/useTextField.html",
  "toast": "",
  "tooltip": "https://react-spectrum.adobe.com/react-aria/useTooltip.html"
};

export const sourceUrls: Record<string, string> = {
  "badge": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/badge",
  "breadcrumbs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/breadcrumbs",
  "button": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/button",
  "card": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/card",
  "checkbox": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/checkbox",
  "command-palette": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/command-palette",
  "confirmation": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/confirmation",
  "divider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/divider",
  "flex": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/flex",
  "fold": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/fold",
  "form": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/form",
  "grid": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/grid",
  "group": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/group",
  "input": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/input",
  "label": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/label",
  "menu": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/menu",
  "modal": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/modal",
  "popover": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/popover",
  "progress": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/progress",
  "radio": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/radio",
  "select": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/select",
  "slider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/slider",
  "switch": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/switch",
  "tabs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/tabs",
  "textarea": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/textarea",
  "toast": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/toast",
  "tooltip": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/tooltip"
};
