"use client";

import {
  FaCopy,
  FaCheck,
  FaBook,
  FaBox,
  FaTerminal
} from "react-icons/fa6";
import { Select, Button } from "ui-lab-components";
import { Aura, InlineCodeHighlight } from "@/shared";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const installCommands: Record<PackageManager, string> = {
  npm: "npm install ui-lab-components",
  pnpm: "pnpm install ui-lab-components",
  yarn: "yarn add ui-lab-components",
  bun: "bun add ui-lab-components",
};

const TailwindSvg = () => (
  <svg
    viewBox="0 0 256 154"
    width="256"
    height="154"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="w-7 h-7"
  >
    <defs>
      {/* Removed the gradient since we're using a solid variable color */}
    </defs>
    <path
      d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
      fill="var(--background-500)"
    />
  </svg>
);

const ReactAriaSvg = () => (
  <svg
    viewBox="200 206 800 790"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
  >
    <path
      d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
      fill="var(--background-500)"
    />
  </svg>
);

const ReactSvg = () => (
  <svg
    viewBox="0 0 256 228"
    width="256"
    height="228"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="w-7 h-7 text-background-500"
  >
    <path
      d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3Z"
      fill="var(--background-500)"
    />
  </svg>
);

const TypeScriptSvg = () => (
  <svg
    viewBox="0 0 256 256"
    width="256"
    height="256"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="w-7 h-7"
  >
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="var(--background-500)"
    />
    <path
      d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      fill="white"
    />
  </svg>
);

interface HeroSectionProps {
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
  copied: boolean;
  onCopy: () => void;
}

function HeroSection({
  packageManager,
  onPackageManagerChange,
  copied,
  onCopy,
}: HeroSectionProps) {
  return (
    <>
      <div className="absolute flex gap-6 bottom-0 left-0 w-full px-[14px]">
        <div className="p-[12px] flex space-x-[28px] w-full">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2.5 bg-background-800 border-b-[2px] border-background-700 rounded-[8px]"><FaTerminal className="w-3.5 h-3.5" /></div> Powerful CLI
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2.5 bg-background-800 border-b-[2px] border-background-700 rounded-[8px]"><FaBox className="w-3.5 h-3.5" /></div> 40+ Components
          </div>
        </div>
      </div>
      <div className="z-10  rounded-t-none! border-t-0! mx-4 mb-[60px] overflow-hidden">
        <div className="p-[22px] h-full flex flex-col justify-center">
          <div className="hidden">
            <Aura />
          </div>
          <div className="pl-[8px] flex flex-col">
            <span className="flex h-[30px] items-center gap-[9px] bg-background-950 border-[2px] border-background-700 rounded-[8px] text-foreground-300 text-sm w-fit pl-[2px]  mb-4">
              <div className="p-[4px] bg-background-800 rounded-[5px]">
                <FaBook className="text-foreground-400 w-3 h-3" />
              </div>{" "}
              Release Notes <div className="flex items-center bg-background-800/60 border-l-[1px] rounded-r-[8px] pr-[10px] h-[30px] border-background-700 pl-[9px] font-bold">v0.1.5</div>
            </span>
            <h1 className="leading-tight max-w-[31ch] pb-[9px] font-bold text-foreground-200 tracking-tight">
              From vision to production in no time. Built on gorgeous, AI-ready components.
            </h1>
            <p className="text-sm text-foreground-400 w-[59ch] leading-relaxed">
              Accessible, production-ready React components with intelligent
              metadata that enable AI to generate perfectly consistent, beautiful
              code.
            </p>
            <Button className="mt-10 w-38" variant="primary">Get Started</Button>
          </div>
          <div className="hidden absolute bottom-0 left-0 p-[12px] w-140">
            <div className="flex justify-start items-center rounded-full mt-[30px] gap-3 bg-background-950 border-[2px] border-background-700 p-1">
              <Select
                className="w-fit"
                selectedKey={packageManager}
                defaultValue={packageManager}
                onSelectionChange={(key) => onPackageManagerChange(key as PackageManager)}
              >
                <Select.Trigger className="w-28 px-3 py-2 text-sm bg-background-800 border-[2px] border-background-600 rounded-full">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="npm" textValue="npm">
                    npm
                  </Select.Item>
                  <Select.Item value="pnpm" textValue="pnpm">
                    pnpm
                  </Select.Item>
                  <Select.Item value="yarn" textValue="yarn">
                    yarn
                  </Select.Item>
                  <Select.Item value="bun" textValue="bun">
                    bun
                  </Select.Item>
                </Select.Content>
              </Select>
              <InlineCodeHighlight
                code={installCommands[packageManager]}
                language="bash"
                className="text-foreground-100 whitespace-nowrap"
              />
              <Button
                onClick={onCopy}
                variant="ghost"
                className="p-2! mr-0.5 ml-auto hover:bg-background-800 rounded-full transition-colors shrink-0"
                title="Copy to clipboard"
              >
                {copied ? (
                  <FaCheck size={16} className="text-accent-500" />
                ) : (
                  <FaCopy size={16} className="text-foreground-400" />
                )}
              </Button>
            </div>

            <div className="hidden space-y-3">
              <div className="w-140 grid grid-cols-2 gap-3">
                {[
                  {
                    Icon: TailwindSvg,
                    name: "Tailwind CSS",
                    version: "v4.1",
                    link: "https://tailwindcss.com",
                  },
                  {
                    Icon: ReactSvg,
                    name: "React",
                    version: "v19.1",
                    link: "https://react.dev",
                  },
                  {
                    Icon: ReactAriaSvg,
                    name: "React Aria",
                    version: "v1.9",
                    link: "https://react-spectrum.adobe.com/react-aria/",
                  },
                  {
                    Icon: TypeScriptSvg,
                    name: "TypeScript",
                    version: "v5.8",
                    link: "https://www.typescriptlang.org",
                  },
                ].map(({ Icon, name, version, link }) => (
                  <a
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex justify-start items-start flex-row gap-8 px-[9px] pl-[14px] pt-[9px] h-[90px] rounded-lg border-[2px] border-background-700 bg-background-800/50 backdrop-blur-sm transition-all hover:border-background-600 hover:bg-background-800 cursor-pointer"
                  >
                    <Icon />
                    <div>
                      <div className="text-sm font-medium text-foreground-200">
                        {name}
                      </div>
                      <div className="text-sm text-foreground-400">{version}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { HeroSection };
export { Showcase } from "./components/showcase";
export { SettingsPanel } from "./components/settings-panel";
export { LandingThemeToggle as ThemeToggle } from "./components/theme-toggle";
export { NodeSection } from "./components/node-section";
