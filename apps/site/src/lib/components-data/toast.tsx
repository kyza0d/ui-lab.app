"use client";

import { toast } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { Button } from "ui-lab-components";
import { Badge } from "ui-lab-components";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation, FaCloudArrowUp } from "react-icons/fa6";

const toastControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Success", value: "success" },
      { label: "Destructive", value: "destructive" },
      { label: "Info", value: "info" },
      { label: "Warning", value: "warning" },
    ],
    defaultValue: "default",
  },
  {
    name: "position",
    label: "Position",
    type: "select",
    options: [
      { label: "Top Left", value: "top-left" },
      { label: "Top Center", value: "top" },
      { label: "Top Right", value: "top-right" },
      { label: "Bottom Left", value: "bottom-left" },
      { label: "Bottom Center", value: "bottom" },
      { label: "Bottom Right", value: "bottom-right" },
    ],
    defaultValue: "bottom-left",
  },
  {
    name: "spawnDirection",
    label: "Spawn Direction",
    type: "select",
    options: [
      { label: "From Top", value: "top" },
      { label: "From Bottom", value: "bottom" },
    ],
    defaultValue: "top",
  },
  {
    name: "duration",
    label: "Auto-dismiss (ms)",
    type: "select",
    options: [
      { label: "3 seconds", value: "3000" },
      { label: "5 seconds", value: "5000" },
      { label: "10 seconds", value: "10000" },
      { label: "Never", value: "Infinity" },
    ],
    defaultValue: "5000",
  },
];

const toastBasicCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <Button
      onClick={() =>
        toast({
          title: "Success!",
          description: "Your message has been sent.",
          variant: "success",
        })
      }
    >
      Show Toast
    </Button>
  );
}`;

const toastVariantsCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({
            title: "Default",
            description: "A default toast message",
          })
        }
      >
        Default
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Success",
            description: "Operation completed successfully",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Info",
            description: "Here's some information",
            variant: "info",
          })
        }
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Warning",
            description: "Please be careful with this action",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
    </div>
  );
}`;

const toastDurationCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({
            title: "Auto-dismiss in 3s",
            description: "This toast will disappear quickly",
            duration: 3000,
          })
        }
      >
        3 Seconds
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Auto-dismiss in 10s",
            description: "This toast will stay longer",
            duration: 10000,
          })
        }
      >
        10 Seconds
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Manual dismiss only",
            description: "Click the X to close this toast",
            duration: Infinity,
          })
        }
      >
        Never Auto-dismiss
      </Button>
    </div>
  );
}`;

const toastPositionCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Button
        onClick={() =>
          toast({
            title: "Top Left",
            position: "top-left",
          })
        }
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Top Center",
            position: "top",
          })
        }
      >
        Top Center
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Top Right",
            position: "top-right",
          })
        }
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Bottom Left",
            position: "bottom-left",
          })
        }
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Bottom Center",
            position: "bottom",
          })
        }
      >
        Bottom Center
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Bottom Right",
            position: "bottom-right",
          })
        }
      >
        Bottom Right
      </Button>
    </div>
  );
}`;

const toastCustomCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <Button
      onClick={() => {
        const toastId = toast({
          title: "Processing...",
          description: "Your request is being processed",
          duration: Infinity,
        });

        // Simulate async operation
        setTimeout(() => {
          toastId.update({
            title: "Complete!",
            description: "Your request has been processed",
            variant: "success",
            duration: 5000,
          });
        }, 2000);
      }}
    >
      Show Async Toast
    </Button>
  );
}`;

const toastRichCode = `import { toast } from "@/components/ui/toast/use-toast";
import { Button } from "ui-lab-components";
import { Badge } from "ui-lab-components";

export function Example() {
  return (
    <Button
      onClick={() =>
        toast({
          jsx: (
            <div className="space-y-3 w-full">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground-50 truncate">quarterly-report.pdf</h4>
                    <Badge variant="info" size="sm">PDF</Badge>
                  </div>
                  <p className="text-sm text-foreground-400 mt-0.5">2.4 MB • Uploaded by you</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-background-700 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }} />
                </div>
                <span className="text-xs text-foreground-400 tabular-nums">100%</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" variant="secondary">View File</Button>
                <Button size="sm" variant="ghost">Share</Button>
              </div>
            </div>
          ),
          duration: Infinity,
        })
      }
    >
      Show Rich Toast
    </Button>
  );
}`;

export const toastDetail: ComponentDetail = {
  id: "toast",
  name: "Toast",
  description: "Transient notifications that appear and automatically dismiss",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        Toast components are transient notifications that appear in a corner of the screen to inform users about events or actions. They automatically dismiss after a duration or can be manually closed.
      </p>
      <p>
        Use toasts to provide feedback for user actions, display system messages, or notify users of important events without blocking the main interface.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Toast",
      description: "The simplest form of a toast notification",
      code: toastBasicCode,
      preview: (
        <Button
          onClick={() =>
            toast({
              title: "Success!",
              description: "Your message has been sent.",
              variant: "success",
            })
          }
        >
          Show Toast
        </Button>
      ),
      controls: toastControls,
      renderPreview: (props: any) => (
        <Button
          onClick={() =>
            toast({
              title: "Toast Title",
              description: "Toast description goes here",
              variant: props.variant,
              position: props.position,
              spawnDirection: props.spawnDirection,
              duration: props.duration === "Infinity" ? Infinity : parseInt(props.duration),
            })
          }
        >
          Show Toast
        </Button>
      ),
    },
    {
      id: "variants",
      title: "Toast Variants",
      description: "Different variants for different message types",
      code: toastVariantsCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast({
                title: "Default",
                description: "A default toast message",
              })
            }
            variant="secondary"
          >
            Default
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Success",
                description: "Operation completed successfully",
                variant: "success",
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
              })
            }
          >
            Error
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Info",
                description: "Here's some information",
                variant: "info",
              })
            }
          >
            Info
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Warning",
                description: "Please be careful with this action",
                variant: "warning",
              })
            }
          >
            Warning
          </Button>
        </div>
      ),
    },
    {
      id: "duration",
      title: "Auto-dismiss Duration",
      description: "Control how long the toast stays visible",
      code: toastDurationCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast({
                title: "Auto-dismiss in 3s",
                description: "This toast will disappear quickly",
                duration: 3000,
              })
            }
          >
            3 Seconds
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Auto-dismiss in 10s",
                description: "This toast will stay longer",
                duration: 10000,
              })
            }
          >
            10 Seconds
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Manual dismiss only",
                description: "Click the X to close this toast",
                duration: Infinity,
              })
            }
          >
            Never Auto-dismiss
          </Button>
        </div>
      ),
    },
    {
      id: "position",
      title: "Toast Position",
      description: "Toast can appear at different positions on screen",
      code: toastPositionCode,
      preview: (
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() =>
              toast({
                title: "Top Left",
                position: "top-left",
              })
            }
            size="sm"
          >
            Top Left
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Top Center",
                position: "top",
              })
            }
            size="sm"
          >
            Top Center
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Top Right",
                position: "top-right",
              })
            }
            size="sm"
          >
            Top Right
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Bottom Left",
                position: "bottom-left",
              })
            }
            size="sm"
          >
            Bottom Left
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Bottom Center",
                position: "bottom",
              })
            }
            size="sm"
          >
            Bottom Center
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Bottom Right",
                position: "bottom-right",
              })
            }
            size="sm"
          >
            Bottom Right
          </Button>
        </div>
      ),
    },
    {
      id: "custom",
      title: "Updating Toast",
      description: "Update toast content dynamically (e.g., for async operations)",
      code: toastCustomCode,
      preview: (
        <Button
          onClick={() => {
            const toastId = toast({
              title: "Processing...",
              description: "Your request is being processed",
              duration: Infinity,
            });

            setTimeout(() => {
              toastId.update({
                title: "Complete!",
                description: "Your request has been processed",
                variant: "success",
                duration: 5000,
              });
            }, 2000);
          }}
        >
          Show Async Toast
        </Button>
      ),
    },
    {
      id: "rich",
      title: "Rich Content Toast",
      description: "Display complex content with file details, progress, and action buttons",
      code: toastRichCode,
      preview: (
        <Button
          onClick={() =>
            toast({
              jsx: (
                <div className="space-y-3 w-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                      <FaCloudArrowUp className="w-5 h-5 text-accent-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground-50 truncate">quarterly-report.pdf</h4>
                        <Badge variant="info" size="sm">PDF</Badge>
                      </div>
                      <p className="text-sm text-foreground-400 mt-0.5">2.4 MB • Uploaded by you</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-background-700 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                    <span className="text-xs text-foreground-400 tabular-nums">100%</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="sm" variant="secondary">View File</Button>
                    <Button size="sm" variant="ghost">Share</Button>
                  </div>
                </div>
              ),
              duration: Infinity,
            })
          }
        >
          Show Rich Toast
        </Button>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard gray toast",
      code: `toast({ title: "Default", description: "A default message" })`,
      preview: (
        <div className="bg-background-800 border border-background-700 text-foreground-200 rounded-lg shadow-lg flex items-start gap-3 p-3 w-full max-w-sm">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground-50">Default</h4>
            <p className="text-sm text-foreground-200 mt-1">A default message</p>
          </div>
        </div>
      ),
    },
    {
      id: "success",
      name: "Success",
      description: "Green toast for successful operations",
      code: `toast({ title: "Success", description: "Operation successful", variant: "success" })`,
      preview: (
        <div className="bg-success-50 border border-success-300 text-red-500 rounded-lg shadow-lg flex items-start gap-3 p-3 w-full max-w-sm">
          <FaCircleCheck className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-success-900">Success</h4>
            <p className="text-sm text-success-800 mt-1">Operation successful</p>
          </div>
        </div>
      ),
    },
    {
      id: "destructive",
      name: "Destructive",
      description: "Red toast for errors",
      code: `toast({ title: "Error", description: "Something went wrong", variant: "destructive" })`,
      preview: (
        <div className="bg-danger-50 border border-danger-300 text-danger-900 rounded-lg shadow-lg flex items-start gap-3 p-3 w-full max-w-sm">
          <FaCircleExclamation className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-danger-900">Error</h4>
            <p className="text-sm text-danger-800 mt-1">Something went wrong</p>
          </div>
        </div>
      ),
    },
    {
      id: "info",
      name: "Info",
      description: "Blue toast for informational messages",
      code: `toast({ title: "Info", description: "Here's some information", variant: "info" })`,
      preview: (
        <div className="bg-info-50 border border-info-300 text-info-900 rounded-lg shadow-lg flex items-start gap-3 p-3 w-full max-w-sm">
          <FaCircleInfo className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-info-900">Info</h4>
            <p className="text-sm text-info-800 mt-1">Here's some information</p>
          </div>
        </div>
      ),
    },
    {
      id: "warning",
      name: "Warning",
      description: "Yellow/orange toast for warnings and cautions",
      code: `toast({ title: "Warning", description: "Please be careful with this action", variant: "warning" })`,
      preview: (
        <div className="bg-warning-100 border border-warning-300 text-warning-900 rounded-lg shadow-lg flex items-start gap-3 p-3 w-full max-w-sm">
          <FaTriangleExclamation className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-warning-900">Warning</h4>
            <p className="text-sm text-warning-700 mt-1">Please be careful with this action</p>
          </div>
        </div>
      ),
    },
  ],
};
